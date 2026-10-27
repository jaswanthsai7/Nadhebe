---
title: "Inside SQLite's Write-Ahead Log: Frame Headers, Checkpointing, and Concurrency Anatomy"
description: "A binary-level engineering anatomy of SQLite's Write-Ahead Log (WAL). Explore the 32-byte WAL header, 24-byte frame serialization, the shared-memory wal-index (-shm), and checkpoint starvation prevention."
pubDate: 2026-10-28T00:00:00.000Z
updatedDate: 2026-10-28T00:00:00.000Z
author: nadhebe-team
category: "Storage Engines & Databases"
tags:
  - "SQLite"
  - "Write-Ahead Log"
  - "Database Internals"
  - "Storage Engines"
  - "Concurrency"
  - "Systems Programming"
heroImage: "/images/sqlite-wal-hero.webp"
heroAlt: "Vintage editorial collage illustration of a hard disk cylinder mechanism, database punch cards, and terracotta geometric rings on a warm sand background"
estimatedReadingTime: 17
isPillar: true
topic: "Storage Engines & Architecture"
searchIntent: "How SQLite WAL write ahead log works binary frame format checkpointing"
difficulty: "advanced"
relatedTopics:
  - "SQLite State Sharing"
  - "Embedded Vector Search"
  - "Cloudflare Workers Error 1102"
canonicalUrl: "https://nadhebe.com/guides/sqlite-write-ahead-log-wal-architecture/"
draft: false
sources:
  - label: "SQLite Source Code: src/wal.c (D. Richard Hipp)"
    url: "https://sqlite.org/src/file/src/wal.c"
  - label: "SQLite Official Documentation: Write-Ahead Logging"
    url: "https://sqlite.org/wal.html"
  - label: "SQLite File Format Specification (Section 3: The Write-Ahead Log)"
    url: "https://sqlite.org/fileformat2.html#walformat"
faq:
  - question: "How does SQLite's Write-Ahead Log (WAL) mode differ from rollback journals?"
    answer: "In traditional rollback journal mode (DELETE, TRUNCATE, or PERSIST), changes are written directly into the main database file while original uncommitted pages are copied into a rollback journal. This requires exclusive locks that block all readers during writes. In WAL mode, the main database file remains unmodified during transactions; new pages are appended sequentially to a separate -wal file. Readers read undisturbed from the main file and WAL snapshots without blocking writers."
  - question: "What is the structure of a WAL frame in SQLite?"
    answer: "Every frame in SQLite's -wal file consists of a 24-byte Frame Header followed immediately by exactly one page of database data (typically 4,096 bytes). The 24-byte header contains: a 4-byte big-endian page number (pgno), a 4-byte commit flag/database size in pages, an 8-byte salt matching the WAL header, and an 8-byte cumulative 64-bit checksum pair."
  - question: "What causes WAL checkpoint starvation and unbounded file growth?"
    answer: "Checkpoint starvation occurs when long-running read transactions continually overlap. SQLite checkpointers cannot overwrite or truncate WAL frames that are part of an active reader's snapshot mark. If at least one active reader is always open, the checkpointer can only copy frames up to that reader's mark, causing new writes to continually append to the end of the -wal file, growing it to gigabytes."
---

SQLite is the most widely deployed software library in computing history. It powers local storage inside every Android and iOS smartphone, every major web browser (storing cookies, history, and IndexedDB backings), operating system daemons, edge runtimes, and local AI agent coordination frameworks.

For its first decade, SQLite relied on **rollback journals** (`PRAGMA journal_mode=DELETE`). Under rollback journaling, writing to the database requires an exclusive file lock: readers block writers, and writers block readers. An unoptimized query or slow transaction immediately triggers `SQLITE_BUSY`.

In 2010 (SQLite version 3.7.0), architect D. Richard Hipp introduced **Write-Ahead Logging (WAL)**. WAL fundamentally transformed SQLite from a single-threaded embedded file store into a high-concurrency storage engine capable of thousands of concurrent reads alongside continuous streaming writes.

Yet, despite its ubiquitous adoption, few software engineers understand the **binary byte-level mechanics** of WAL framing, the role of the shared-memory `-shm` wal-index, or the dangerous failure mode of **checkpoint starvation**.

---

## The Three Physical Files of SQLite in WAL Mode

When WAL mode is enabled via `PRAGMA journal_mode=WAL;`, SQLite operates across three tightly coordinated disk files:

```text
┌─────────────────────────────────┐
│       1. Main Database          │  --> Stores base B-tree pages (e.g. 4096 bytes).
│       (my-database.db)          │      Updated only during checkpoint flushes.
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│   2. Write-Ahead Log File       │  --> Sequential append-only log of committed pages.
│     (my-database.db-wal)        │      Each entry = 24-byte Frame Header + 4096-byte Page.
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│   3. Shared Memory WAL-Index    │  --> Memory-mapped hash table (shm) mapping Page IDs
│     (my-database.db-shm)        │      to frame numbers. Contains read-lock marks.
└─────────────────────────────────┘
```

---

## 1. Rollback Journals vs. Write-Ahead Logs: The Architectural Shift

To appreciate why WAL mode is transformative, consider the physical I/O sequence of traditional rollback journals versus write-ahead logs.

```
Traditional Rollback Journal:
1. EXCLUSIVE LOCK acquired on my-database.db (All readers blocked!)
2. Original pages copied to my-database.db-journal
3. FSYNC journal file to NVMe disk
4. Modified pages written directly to my-database.db
5. FSYNC database file
6. Journal file deleted/truncated
7. EXCLUSIVE LOCK released

Write-Ahead Log (WAL Mode):
1. SHARED READ LOCK allows unlimited concurrent readers
2. Writers append new pages sequentially to my-database.db-wal
3. FSYNC wal file once per commit
4. Database file (my-database.db) remains 100% UNTOUCHED!
5. Readers continue reading past snapshots with zero blocking!
```

Under WAL mode:
- **Readers never block writers.**
- **Writers never block readers.**
- **Disk writes are purely sequential** append operations rather than random seeks across the database b-tree, dramatically improving write throughput on NVMe SSDs and embedded eMMC storage.

---

## 2. The Binary Format of the `-wal` File

An active SQLite database in WAL mode is accompanied by two auxiliary files:
1. `my-database.db-wal`: The write-ahead log containing sequential frame records.
2. `my-database.db-shm`: The shared-memory index mapping page numbers to WAL frames.

The `-wal` file consists of a **32-byte File Header** followed by zero or more **WAL Frames**. Each frame consists of a **24-byte Frame Header** followed by the $P$-byte database page.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SQLite WAL File Binary Layout                        │
├────────────────────────────────────────────────────────────────────────┤
│ 32-Byte WAL File Header                                                │
│  ├─ Offset 0..3:   Magic Number (0x377f0682 or 0x377f0683)            │
│  ├─ Offset 4..7:   File Format Version (3007000)                       │
│  ├─ Offset 8..11:  Database Page Size (e.g. 4096 bytes)                │
│  ├─ Offset 12..15: Checkpoint Sequence Number (Incremental)            │
│  ├─ Offset 16..23: Salt-1 & Salt-2 (Randomized 64-bit pair)            │
│  └─ Offset 24..31: Cumulative Checksum (Checksum-1 & Checksum-2)       │
├────────────────────────────────────────────────────────────────────────┤
│ Frame 1: 24-Byte Frame Header + 4,096-Byte Page Data                   │
├────────────────────────────────────────────────────────────────────────┤
│ Frame 2: 24-Byte Frame Header + 4,096-Byte Page Data                   │
├────────────────────────────────────────────────────────────────────────┤
│ Frame N: 24-Byte Frame Header + 4,096-Byte Page Data                   │
└────────────────────────────────────────────────────────────────────────┘
```

### The 24-Byte Frame Header Decomposition

Every individual frame header in `src/wal.c` is defined by the following struct:

```c
/* Extracted from SQLite src/wal.h */
struct WalFrameHeader {
  u32 pgno;       /* Database page number being updated */
  u32 nTruncate;   /* Commit flag: size of database in pages, or 0 */
  u32 s1, s2;      /* Salt-1 and Salt-2 copied from WAL header */
  u32 aChecksum[2];/* Cumulative checksum pair across preceding frames */
};
```

1. **Page Number (`pgno`, 4 Bytes, Big-Endian)**:
   Specifies which page in the primary `.db` file is updated by this frame. For example, if `pgno = 7`, this frame contains the replacement binary data for Page 7.

2. **Commit Flag / Database Size (`nTruncate`, 4 Bytes)**:
   For intermediate pages written within a multi-page transaction, `nTruncate = 0`. For the final frame that commits the transaction, `nTruncate` is non-zero and stores the **total size of the database in pages** after the commit. A reader knows a transaction is valid and committed if and only if it encounters a frame where `nTruncate > 0` with a matching checksum.

3. **Salt-1 and Salt-2 (`s1`, `s2`, 8 Bytes)**:
   Two 32-bit random integers copied directly from the 32-byte WAL file header. If the system crashes and SQLite restarts with a new WAL file, stale un-overwritten frames lingering at the end of the file are recognized as invalid because their salt values do not match the current header.

4. **Cumulative Checksum (`aChecksum[2]`, 8 Bytes)**:
   Two 32-bit big-endian integers computed recursively over the frame header and the 4,096 page bytes. If any byte is corrupted during a power loss, the checksum mismatch causes SQLite recovery to halt at the last verified commit frame.

---

## 3. The `-shm` Shared-Memory WAL Index

If every read transaction had to scan the entire `-wal` file sequentially from beginning to end to find whether Page 7 has been updated, read latency would scale as $O(N)$ with log length.

To achieve $O(1)$ read lookups, SQLite uses the **`-shm` (shared-memory) file**.

```
Read Transaction for Page 7:
1. Reader attaches to my-database.db-shm via mmap()
2. Reads the current mxFrame pointer (e.g. Frame 140)
3. Hashes Page 7 into the 32KB in-memory hash table
4. Found match: Page 7 is located at WAL Frame 82!
5. Read Page 7 directly from my-database.db-wal at offset:
   32 + (82 - 1) * (24 + 4096) + 24
6. Zero seeks in main .db! Immediate L1/OS page cache hit!
```

The `-shm` file contains:
- **`wal-index-header`**: Contains the current `mxFrame` (the highest committed frame in the WAL), the database change counter, and an array of **Read Marks** (`aReadMark[5]`).
- **Hash Tables**: Pre-computed 32 KB hash tables mapping page numbers to frame numbers. When a transaction writes a frame, it updates the hash table in shared memory so readers immediately resolve page addresses without file scans.

---

## 4. Checkpointing Modes and the Checkpoint Starvation Trap

Eventually, frames accumulated in the `-wal` file must be copied back into the primary `my-database.db` file. This synchronization process is known as **checkpointing**.

SQLite supports four checkpointing modes via `PRAGMA wal_checkpoint(MODE)`:

| Checkpoint Mode | Concurrency Behavior | Flushes Frames | Resets WAL Size? |
| :--- | :--- | :--- | :--- |
| **`PASSIVE`** (Default) | Non-blocking; yields if a reader or writer is active | Flushes up to lowest active reader mark | No |
| **`FULL`** | Blocks new writers until current readers finish | Flushes all committed frames | No |
| **`RESTART`** | Blocks writers and waits for all active readers | Flushes all frames; resets write pointer to Frame 1 | No |
| **`TRUNCATE`** | Same as RESTART, but truncates `-wal` file to 0 bytes | Flushes all frames; deletes WAL content | **Yes (0 Bytes)** |

### The Checkpoint Starvation Failure Mode

By default, SQLite automatically invokes a `PASSIVE` checkpoint when the WAL reaches 1,000 frames (`PRAGMA wal_autocheckpoint=1000`).

However, in web applications, background workers, or multi-agent LLM systems with continuous read traffic, **checkpoint starvation** frequently occurs:

```
Timeline of Checkpoint Starvation:
T1: Reader A begins long-running query (Holds Read Mark at Frame 200)
T2: Auto-checkpoint triggers at Frame 1,000
    --> PASSIVE checkpoint can ONLY flush frames 1..200 into .db!
    --> Frames 201..1,000 CANNOT be flushed because Reader A is still open!
T3: Writer appends frames 1,001..2,500
T4: Reader B begins query (Holds Read Mark at Frame 1,800)
T5: Reader A finishes, but Reader B is now holding Frame 1,800!
    --> Checkpointer remains blocked from resetting WAL!
Result: The .db-wal file balloons to 5 GB, 10 GB, or 50 GB!
```

### Production Remedies for Starvation:
1. **Never hold long transactions open**: Wrap all `SELECT` queries in tight, quick transactions.
2. **Configure Busy Handlers**: Set `PRAGMA busy_timeout = 5000;` so checkpointers retry rather than immediately aborting.
3. **Dedicated Maintenance Jobs**: Periodically execute `PRAGMA wal_checkpoint(TRUNCATE)` during off-peak intervals.

---

## 5. Summary & Key Takeaways

1. **Non-Blocking Architecture**: SQLite's WAL mode decouples read snapshots from concurrent write commits, allowing high-throughput read workloads without locking writers.
2. **24-Byte Self-Validating Frames**: Each WAL frame encapsulates its own page number, commit marker, matching salt, and 64-bit cumulative checksum, providing atomic crash recovery.
3. **Zero-Copy Memory-Mapped Index**: The `-shm` file maintains volatile hash tables mapping page IDs to frame positions, enabling $O(1)$ page lookups during queries.
4. **Active Vigilance on Checkpointing**: Applications must monitor `-wal` file growth and prevent long-lived overlapping read locks to avoid checkpoint starvation.
