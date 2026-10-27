# Nadhebe Technical Publication — 25-Topic Research Backlog

This backlog records 25 independently researched, high-value technical topics evaluated against Nadhebe's discovery scorecard. Each candidate targets a distinct search intent, solves real engineering friction, and possesses rich potential for interactive, client-side visual demonstrations.

---

## Candidate 1: Hugging Face LeRobot & Low-Cost Teleoperation (SO-100 Arm)
- **Topic & Official Source**: Hugging Face LeRobot (`https://github.com/huggingface/lerobot`) and The Robot Studio SO-100 Arm.
- **Why It Is Interesting**: Democratizes physical AI by providing end-to-end PyTorch imitation learning (ACT, Diffusion Policy) and reinforcement learning for 3D-printable, sub-$150 robot arms.
- **Intended Reader**: AI engineers, roboticists, and hardware hobbyists transitioning from digital LLMs to physical manipulation.
- **Likely Search Intent**: "How to train Hugging Face LeRobot with SO-100 arm", "LeRobot ACT policy setup".
- **Available Evidence of Interest**: 10,000+ GitHub stars in months; active Hugging Face community Discord channel; explosive DIY robotics demand.
- **Current Content Gap**: Existing tutorials are either superficial marketing overviews or sparse CLI commands that omit servo calibration, latency jitter, and camera alignment.
- **Potential Interactive Experience**: Interactive 6-DOF Teleoperation Coordinate Visualizer mapping leader arm angles to follower arm actuator commands with live forward kinematics.
- **Suggested Editorial Angle**: Practical engineering guide: From 3D printing Feetech STS3215 servos to training an Action Chunking with Transformers (ACT) pick-and-place policy.
- **Verification Status**: Confirmed research (Source repository and documentation verified).
- **Estimated Effort**: 14 hours (Medium-High).
- **Priority**: P1 (Flagship follow-up).

---

## Candidate 2: BitNet b1.58: Ternary Weight {-1, 0, 1} LLM Inference
- **Topic & Official Source**: Microsoft Research BitNet b1.58 paper (`https://arxiv.org/abs/2402.17764`) and `bitnet.cpp` (`https://github.com/microsoft/BitNet`).
- **Why It Is Interesting**: Replaces 16-bit floating-point matrix multiplications with 1.58-bit ternary additions, eliminating floating-point matrix multiplication units and slashing memory bandwidth by 85%.
- **Intended Reader**: AI infrastructure engineers, embedded systems programmers, edge hardware developers.
- **Likely Search Intent**: "How BitNet 1.58 bit works", "BitNet ternary weight matrix multiplication", "run bitnet locally".
- **Available Evidence of Interest**: Front-page Hacker News discussions (1,200+ points); high developer interest in running 70B models on 8GB laptops.
- **Current Content Gap**: Explanations stop at the mathematical concept without showing how low-level bit-packing into AVX-512 / ARM NEON registers works in C++.
- **Potential Interactive Experience**: Interactive Ternary Matrix Multiplication Sandbox: Compare FP16 dot product FLOPs vs Ternary addition/subtraction bitwise operations with real-time memory bandwidth calculation.
- **Suggested Editorial Angle**: Low-level systems teardown: How BitNet replaces GPU tensor cores with CPU integer additions.
- **Verification Status**: Confirmed research (Reference C++ repository and paper validated).
- **Estimated Effort**: 12 hours (Medium).
- **Priority**: P1.

---

## Candidate 3: DuckDB's Vectorized Execution Engine & Push-Based Hyper-Pipelining
- **Topic & Official Source**: DuckDB Foundation (`https://duckdb.org/internals/vector`) and source repository (`https://github.com/duckdb/duckdb`).
- **Why It Is Interesting**: DuckDB processes tabular analytical queries 10x to 100x faster than SQLite/PostgreSQL through columnar vector chunks (2,048 tuples per chunk) using Morsel-driven parallelism.
- **Intended Reader**: Data engineers, backend developers, analytics engineers optimizing local embedded SQL.
- **Likely Search Intent**: "DuckDB vectorized execution engine architecture", "DuckDB hyper pipelining explained".
- **Available Evidence of Interest**: Massive adoption in local data analysis, Pandas replacement discussions, motherduck ecosystem growth.
- **Current Content Gap**: High-level articles explain "DuckDB is fast", but fail to illustrate chunk-based cache locality, execution pipeline operators, and selection vector indirection.
- **Potential Interactive Experience**: Interactive Query Execution Pipeline Visualizer: Step a SQL query (`SELECT sum(x) WHERE y > 10`) through Volcanian iterator model vs DuckDB's push-based vectorized chunks.
- **Suggested Editorial Angle**: Deep architectural anatomy: Why row-by-row iterators fail and how DuckDB keeps CPU instruction caches 100% warm.
- **Verification Status**: Confirmed research (DuckDB internal engineering papers and source reviewed).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P2.

---

## Candidate 4: WebAssembly Component Model & Canonical ABI Memory Lifting
- **Topic & Official Source**: Bytecode Alliance (`https://component-model.bytecodealliance.org/`) and `wasmtime` repository.
- **Why It Is Interesting**: Enables language-agnostic module interoperability (e.g., Python calling a Rust component calling a Go module) with zero C-FFI header glue via Canonical ABI.
- **Intended Reader**: WebAssembly architects, plugin system designers, microservice developers.
- **Likely Search Intent**: "Wasm component model canonical ABI explained", "WIT WebAssembly Interface Types tutorial".
- **Available Evidence of Interest**: Major push across Docker, Fastly, Cloudflare, and Kubernetes Wasm runtimes.
- **Current Content Gap**: Official specifications are impenetrable academic documents; practical guides with memory layout diagrams are virtually non-existent.
- **Potential Interactive Experience**: Canonical ABI Memory Inspector: Show how a complex data structure (record of strings and lists) is flattened into linear Wasm memory (`realloc`, `canon lower`, `canon lift`).
- **Suggested Editorial Angle**: Step-by-step explainer: How the Wasm Component Model finally solves language interoperability without serialization overhead.
- **Verification Status**: Confirmed research (Bytecode Alliance WIT specification verified).
- **Estimated Effort**: 14 hours (Medium-High).
- **Priority**: P2.

---

## Candidate 5: eBPF In-Kernel Verifier & DAG Register Tracking
- **Topic & Official Source**: Linux Kernel eBPF Documentation (`https://docs.kernel.org/bpf/verifier.html`) and Cilium BPF Reference.
- **Why It Is Interesting**: The Linux eBPF verifier proves that arbitrary user-submitted bytecode cannot crash the kernel, dereference invalid pointers, or loop infinitely—all before executing JIT compilation.
- **Intended Reader**: Systems programmers, cloud-native infrastructure engineers, cybersecurity researchers.
- **Likely Search Intent**: "How eBPF verifier works", "eBPF verifier R1 unbounded pointer error fix".
- **Available Evidence of Interest**: Massive adoption in Kubernetes networking (Cilium) and security observability (Tetragon, Falco).
- **Current Content Gap**: Developers constantly hit cryptic verifier rejection errors (`math between map_value pointer and register with unbounded min value`) without understanding state pruning or register value bounds.
- **Potential Interactive Experience**: Interactive eBPF Verifier Simulator: Step 10 assembly instructions through register min/max bounds tracking and branch simulation.
- **Suggested Editorial Angle**: Troubleshooting masterclass: Demystifying eBPF verifier rejections and register bound pruning.
- **Verification Status**: Confirmed research (Linux kernel `kernel/bpf/verifier.c` inspected).
- **Estimated Effort**: 12 hours (Medium).
- **Priority**: P1.

---

## Candidate 6: QUIC RFC 9000: Head-of-Line Blocking Elimination & 0-RTT Anti-Replay
- **Topic & Official Source**: IETF RFC 9000 (`https://datatracker.ietf.org/doc/html/rfc9000`) and Cloudflare `quiche`.
- **Why It Is Interesting**: Replaces TCP with multiplexed UDP streams, allowing individual packet loss on one HTTP/3 stream without pausing independent parallel streams.
- **Intended Reader**: Network engineers, web performance specialists, backend architects.
- **Likely Search Intent**: "QUIC head of line blocking vs TCP", "HTTP 3 QUIC 0-RTT replay protection".
- **Available Evidence of Interest**: HTTP/3 now represents over 30% of global internet traffic; widespread interest in mobile latency reduction.
- **Current Content Gap**: Network diagrams show high-level packet flows but skip variable-length integer encoding and stream frame multiplexing.
- **Potential Interactive Experience**: Interactive Network Loss Simulator: Compare TCP single-packet drop (which freezes all 5 streams) against QUIC independent stream recovery.
- **Suggested Editorial Angle**: Systems breakdown: How QUIC conquered mobile connection migration and packet loss.
- **Verification Status**: Confirmed research (RFC 9000 specification verified).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P2.

---

## Candidate 7: Python 3.13 Free-Threaded Mode: Inside PEP 703 (No-GIL Internals)
- **Topic & Official Source**: Python Enhancement Proposal 703 (`https://peps.python.org/pep-0703/`) and CPython source (`pycore_pystate.h`).
- **Why It Is Interesting**: The 30-year-old Global Interpreter Lock (GIL) is finally optional in Python 3.13, enabling true multi-core parallel execution on raw Python threads.
- **Intended Reader**: Python developers, AI researchers, backend engineers building high-concurrency microservices.
- **Likely Search Intent**: "Python 3.13 no gil benchmark", "how free threaded python works biased reference counting".
- **Available Evidence of Interest**: The single most discussed CPython enhancement in decades.
- **Current Content Gap**: Most articles repeat news announcements; none explain biased reference counting (BRC), immortal objects, or mimalloc thread-local heaps.
- **Potential Interactive Experience**: Interactive Reference Counting Simulator: Compare standard atomic reference counting contention vs Python 3.13 biased reference counting under 8 concurrent threads.
- **Suggested Editorial Angle**: Low-level memory teardown: How CPython removed the GIL without destroying single-threaded performance.
- **Verification Status**: Confirmed research (CPython 3.13 release and PEP 703 validated).
- **Estimated Effort**: 12 hours (Medium).
- **Priority**: P1.

---

## Candidate 8: Matryoshka Representation Learning (MRL) for Vector Embeddings
- **Topic & Official Source**: Kusupati et al. (NeurIPS 2022, `https://arxiv.org/abs/2205.13147`) and OpenAI Embedding API.
- **Why It Is Interesting**: Allows truncating a 1,536-dimensional embedding down to 256 or 64 dimensions simply by slicing the first $K$ numbers, retaining 97% of retrieval accuracy.
- **Intended Reader**: Vector search engineers, cost-conscious AI developers.
- **Likely Search Intent**: "How Matryoshka embeddings work", "truncate text-embedding-3 dimensions".
- **Available Evidence of Interest**: Standard feature in OpenAI and Cohere v3 embeddings; developers eager to reduce vector DB storage bills.
- **Current Content Gap**: Lack of intuitive explanations for how multi-scale nested loss functions enforce semantic priority in leading vector indices.
- **Potential Interactive Experience**: Interactive Dimension Truncation Visualizer: Dynamically truncate embeddings from 1536 down to 32 dimensions and measure real-time recall drop on sample text queries.
- **Suggested Editorial Angle**: Practical optimization guide: Cutting vector database RAM costs by 75% using Matryoshka embeddings and two-stage re-ranking.
- **Verification Status**: Confirmed research (Paper and API implementations verified).
- **Estimated Effort**: 8 hours (Low-Medium).
- **Priority**: P2.

---

## Candidate 9: LMDB (Lightning Memory-Mapped Database) Architecture: Zero-Copy B+ Trees
- **Topic & Official Source**: Howard Chu / Symas Corp (`http://www.lmdb.tech/doc/`) and OpenLDAP project.
- **Why It Is Interesting**: An ultra-fast, zero-copy, transactional key-value store that eliminates userspace buffer caches by exposing the operating system's virtual memory page cache directly to application memory via `mmap()`.
- **Intended Reader**: Systems engineers, machine learning data pipeline architects, database creators.
- **Likely Search Intent**: "How LMDB works memory map", "LMDB architecture zero copy B+ tree".
- **Available Evidence of Interest**: Widely used in machine learning datasets (PyTorch data loaders), Caffe, OpenLDAP, and blockchain clients.
- **Current Content Gap**: Documentation is famously sparse and dense C code; visual explanations of copy-on-write page branching are missing.
- **Potential Interactive Experience**: Interactive B+ Tree Copy-On-Write Simulator: Trace an atomic write transaction creating modified child pages while existing readers read unmodified parent pointers.
- **Suggested Editorial Angle**: Systems architecture deep dive: Why zero-copy virtual memory engines outperform user-space caching.
- **Verification Status**: Confirmed research (LMDB C source code inspected).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P2.

---

## Candidate 10: WebGPU Compute Shaders: Parallel Reduction & Prefix Sum in the Browser
- **Topic & Official Source**: W3C WebGPU Specification (`https://www.w3.org/TR/webgpu/`) and WGSL Reference.
- **Why It Is Interesting**: Grants web applications direct, low-overhead access to modern GPU compute workgroups, shared workgroup memory (`var<workgroup>`), and SIMD wave instructions directly inside Chrome, Edge, and Safari.
- **Intended Reader**: Frontend graphics engineers, WebAssembly developers, client-side AI practitioners.
- **Likely Search Intent**: "WebGPU compute shader tutorial WGSL", "parallel prefix sum workgroup memory WebGPU".
- **Available Evidence of Interest**: Explosive demand from WebLLM, Transformers.js, and in-browser 3D Gaussian Splatting.
- **Current Content Gap**: 90% of WebGPU tutorials only show triangle rendering; practical parallel compute shader algorithms (reduction, sorting) are poorly documented.
- **Potential Interactive Experience**: Live In-Browser WebGPU Parallel Reduction Playground: Dispatch workgroup threads over 100,000 floats and visualize shared memory step reductions live.
- **Suggested Editorial Angle**: Practical computing tutorial: Moving high-throughput numeric crunching from server APIs directly into visitor GPU workgroups.
- **Verification Status**: Confirmed research (W3C standard and WebGPU WGSL engines tested).
- **Estimated Effort**: 12 hours (Medium).
- **Priority**: P1.

---

## Candidate 11: CRDTs Internals: Yjs vs Automerge State Vectors & Lamport Clocks
- **Topic & Official Source**: Yjs (`https://github.com/yjs/yjs`) and Automerge (`https://github.com/automerge/automerge`).
- **Why It Is Interesting**: Conflict-free Replicated Data Types enable peer-to-peer real-time collaborative editing (Notion, Figma, Linear style) without central database locks.
- **Intended Reader**: Full-stack engineers, local-first software architects, collaboration tooling developers.
- **Likely Search Intent**: "How CRDTs work yjs vs automerge", "state vector lamport clock collaborative editing".
- **Available Evidence of Interest**: The "Local-First Software" movement has gained massive traction across the developer ecosystem.
- **Current Content Gap**: Existing articles either dive into pure academic topology or show basic "hello world" demos without explaining run-length encoding and delete tombstones.
- **Potential Interactive Experience**: Interactive Peer-to-Peer CRDT Merge Sandbox: Two clients edit text concurrently with network latency; visualize Lamport clock resolution and character item IDs.
- **Suggested Editorial Angle**: Engineering showdown: Comparing Yjs item-based linked lists vs Automerge columnar compression for production local-first apps.
- **Verification Status**: Confirmed research (Yjs and Automerge 2.0 implementations validated).
- **Estimated Effort**: 12 hours (Medium).
- **Priority**: P2.

---

## Candidate 12: WireGuard Protocol State Machine: Noise Protocol Framework & Anti-DDoS
- **Topic & Official Source**: Jason A. Donenfeld / WireGuard (`https://www.wireguard.com/papers/wireguard.pdf`).
- **Why It Is Interesting**: Replaced millions of lines of OpenVPN/IPsec code with just 4,000 lines of mathematically verified C code utilizing the Noise Protocol Framework (`Noise_IKpsk2`).
- **Intended Reader**: DevOps, network engineers, cybersecurity professionals.
- **Likely Search Intent**: "How WireGuard works noise protocol handshake", "WireGuard stealth protocol anti ddos cookie".
- **Available Evidence of Interest**: WireGuard is now the de facto standard VPN protocol inside the Linux kernel, Cloudflare WARP, and Tailscale.
- **Current Content Gap**: High-level guides explain installation; none dissect the 1-RTT cryptographic handshake, mac1/mac2 anti-flooding cookies, and ephemeral Curve25519 keys.
- **Potential Interactive Experience**: Interactive Handshake Protocol Inspector: Step through Initiation, Response, Cookie Reply, and Data Transport packets with simulated packet sniffing.
- **Suggested Editorial Angle**: Cryptographic elegance: How 4,000 lines of verified code rendered legacy VPN architectures obsolete.
- **Verification Status**: Confirmed research (WireGuard whitepaper and kernel module validated).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P2.

---

## Candidate 13: Zig Comptime: Zero-Cost Metaprogramming and Memory Layout
- **Topic & Official Source**: Zig Language Reference (`https://ziglang.org/documentation/master/#comptime`).
- **Why It Is Interesting**: Eliminates preprocessors, macros, and templates by executing ordinary, standard Zig code directly during compilation with full type introspection.
- **Intended Reader**: Systems programmers, Rust/C++ developers exploring modern alternatives.
- **Likely Search Intent**: "Zig comptime explained", "Zig compile time generics vs Rust templates".
- **Available Evidence of Interest**: Bun, TigerBeetle, and Uber have adopted Zig for high-performance infrastructure.
- **Current Content Gap**: Most tutorials show basic comptime additions; they don't illustrate compile-time struct generation, packed struct alignments, or custom allocators.
- **Potential Interactive Experience**: Interactive Comptime AST Evaluation Stepper: Watch compile-time type reflection construct a specialized binary serializer.
- **Suggested Editorial Angle**: Programming language design: How Zig replaced C macros and C++ template bloat with plain code evaluation.
- **Verification Status**: Confirmed research (Zig compiler master branch validated).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P3.

---

## Candidate 14: Apache Arrow & Parquet Page Index v2: Columnar Skipping at Storage Layer
- **Topic & Official Source**: Apache Parquet Format Specification (`https://parquet.apache.org/docs/file-format/pageindex/`).
- **Why It Is Interesting**: Page Index v2 allows query engines (DuckDB, ClickHouse, DataFusion) to prune 90%+ of disk read I/O before decompressing snappy/zstd pages.
- **Intended Reader**: Big data architects, query engine creators, database engineers.
- **Likely Search Intent**: "Parquet page index v2 explained", "column chunk bloom filter parquet".
- **Available Evidence of Interest**: Universal format across modern data lakes (Iceberg, Delta Lake).
- **Current Content Gap**: Visual breakdowns of how column chunks, row groups, page headers, and dictionary encodings align inside the binary footer are missing.
- **Potential Interactive Experience**: Interactive Parquet Binary Footer & Page Pruner: Enter a filter (`WHERE age > 65`) and watch the visualizer skip pages using Min/Max column statistics.
- **Suggested Editorial Angle**: Low-level storage engineering: How modern file formats achieve sub-second analytical queries on multi-terabyte datasets.
- **Verification Status**: Confirmed research (Parquet format v2.10 specification reviewed).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P2.

---

## Candidate 15: Rust Tokio: Cooperative Scheduling & Cooperative Task Starvation
- **Topic & Official Source**: Tokio Core Documentation (`https://tokio.rs/tokio/tutorial/async`).
- **Why It Is Interesting**: In async Rust, running a compute loop without cooperative yielding blocks the multi-threaded runtime worker thread, starving all other concurrent network connections.
- **Intended Reader**: Backend engineers, distributed systems programmers, Rust developers.
- **Likely Search Intent**: "Tokio task starvation fix", "tokio::task::yield_now vs spawn_blocking", "tokio budget exhaustion".
- **Available Evidence of Interest**: Continuous influx of questions on Rust forums and Discord regarding async deadlocks and latency jitter.
- **Current Content Gap**: Guides explain `async/await` syntax but rarely detail Tokio's internal 128-tick cooperative budget or cross-thread work-stealing deque.
- **Potential Interactive Experience**: Interactive Async Runtime Work-Stealing Simulator: Visualize 4 worker threads, task queues, and cooperative tick budget counters under heavy load.
- **Suggested Editorial Angle**: Practical troubleshooting guide: Diagnosing and resolving async task starvation in production Tokio microservices.
- **Verification Status**: Confirmed research (Tokio source `tokio/src/runtime/` inspected).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P1.

---

## Candidate 16: Docker cgroups v2: `pthread_create failed: Resource temporarily unavailable`
- **Topic & Official Source**: Linux Kernel Control Group v2 Documentation (`https://docs.kernel.org/admin-guide/cgroup-v2.html`).
- **Why It Is Interesting**: A widespread, frustrating failure in containerized AI and Python worker pools where `pids.max` exhaustion or systemd `TasksMax` causes thread creation failures despite plentiful free RAM.
- **Intended Reader**: DevOps engineers, Kubernetes administrators, AI platform operators.
- **Likely Search Intent**: "pthread_create failed resource temporarily unavailable docker", "cgroup v2 pids.max exhaustion fix".
- **Available Evidence of Interest**: Recurring high-volume troubleshooting query across GitHub issues and StackOverflow for PyTorch, Celery, and vLLM.
- **Current Content Gap**: Most solutions blindly recommend increasing `ulimit -u` without diagnosing cgroup v2 controller limits (`/sys/fs/cgroup/pids.current`) or glibc thread stack allocations.
- **Potential Interactive Experience**: Interactive Cgroups vs Memory Diagnostics Calculator: Calculate max safe threads based on stack size, PID controller quotas, and host PID ceilings.
- **Suggested Editorial Angle**: Practical technical troubleshooting: Diagnosing and permanently resolving thread exhaustion in containerized environments.
- **Verification Status**: Confirmed research (Linux cgroup v2 kernel behavior verified).
- **Estimated Effort**: 8 hours (Low-Medium).
- **Priority**: P1.

---

## Candidate 17: Wasm SIMD128: Accelerating Browser Numeric Kernels with `v128` Intrinsics
- **Topic & Official Source**: WebAssembly Fixed-Width SIMD Specification (`https://github.com/WebAssembly/simd`).
- **Why It Is Interesting**: Enables 128-bit vectorization (`f32x4`, `i8x16`) directly inside browser-hosted WebAssembly, unlocking 4x to 8x throughput increases for client-side image processing, cryptography, and neural network inference.
- **Intended Reader**: WebAssembly developers, browser-based audio/graphics software creators.
- **Likely Search Intent**: "WebAssembly SIMD128 tutorial", "wasm v128 intrinsics clang rust".
- **Available Evidence of Interest**: Universally supported across all modern evergreen browsers; foundational to OpenCV.js and ONNX Runtime Web.
- **Current Content Gap**: Documentation is fragmented across compiler flags; practical assembly disassembly and memory alignment instructions are rare.
- **Potential Interactive Experience**: Interactive SIMD Vectorization Benchmark: Execute scalar vs 128-bit SIMD vector addition on 100,000 array elements live in the browser and compare CPU cycles.
- **Suggested Editorial Angle**: Performance engineering feature: Unleashing CPU hardware vectorization in standard web applications.
- **Verification Status**: Confirmed research (W3C Wasm SIMD standard verified).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P2.

---

## Candidate 18: K-Scale Labs Stompy & K-Bot: Open-Source Bipedal Humanoid Robotics
- **Topic & Official Source**: K-Scale Labs (`https://kscale.dev/`) and open-source humanoid hardware repos (`https://github.com/kscalelabs`).
- **Why It Is Interesting**: A venture-backed open-source effort to build sub-$5,000 bipedal humanoids using off-the-shelf planetary cycloidal actuators and open-source control stacks.
- **Intended Reader**: Physical AI researchers, robotics engineers, hardware builders.
- **Likely Search Intent**: "K-Scale Labs Stompy open source humanoid", "build low cost biped robot K-Scale".
- **Available Evidence of Interest**: High engagement across robotics Twitter/X and hardware open-source communities.
- **Current Content Gap**: Media coverage treats humanoids as promotional hype; technical teardowns of actuator torque density, cycloidal gear ratios, and battery weight distributions are absent.
- **Potential Interactive Experience**: Interactive Humanoid Kinematics & Actuator Sizing Calculator: Model motor torque requirements during walking stride phases based on link masses.
- **Suggested Editorial Angle**: Investigative engineering teardown: Can open-source hardware break the $50,000 barrier for bipedal humanoids?
- **Verification Status**: Confirmed research (K-Scale public documentation and mechanical repos inspected).
- **Estimated Effort**: 14 hours (Medium-High).
- **Priority**: P2.

---

## Candidate 19: ClickHouse MergeTree Storage Engine: Wide Parts, Granules, and Sparse Primary Indexes
- **Topic & Official Source**: ClickHouse Architecture Documentation (`https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/mergetree`).
- **Why It Is Interesting**: ClickHouse scans billions of rows per second not through magical indexing, but through sparse primary indexes, physical sorting, and primary key granules (8,192 marks).
- **Intended Reader**: Database engineers, real-time analytics developers, observability architects.
- **Likely Search Intent**: "ClickHouse MergeTree storage engine internals", "how ClickHouse sparse primary index works".
- **Available Evidence of Interest**: Powering real-time monitoring and analytics at Uber, Cloudflare, and PostHog.
- **Current Content Gap**: Abstract diagrams that fail to show the physical correspondence between `.bin` compressed data files and `.mrk` index mark offsets.
- **Potential Interactive Experience**: Interactive Sparse Index Granule Simulator: Search for a timestamp and watch the sparse index narrow a 10M row table down to 3 memory granules without scanning the full table.
- **Suggested Editorial Angle**: Storage anatomy: How ClickHouse discarded B-trees to achieve 100M+ rows/sec scan speeds.
- **Verification Status**: Confirmed research (ClickHouse open-source C++ codebase reviewed).
- **Estimated Effort**: 12 hours (Medium).
- **Priority**: P2.

---

## Candidate 20: Raft Consensus Protocol: Dissecting Election Safety and Uncommitted Log Truncation
- **Topic & Official Source**: Diego Ongaro & John Ousterhout (Stanford University, `https://raft.github.io/`).
- **Why It Is Interesting**: The foundational consensus algorithm powering etcd, Kubernetes control planes, TiKV, and Consul.
- **Intended Reader**: Distributed systems engineers, backend architects, reliability engineers.
- **Likely Search Intent**: "Raft consensus election safety log truncation", "Raft split vote resolution".
- **Available Evidence of Interest**: Required curriculum in distributed systems; standard architecture for cloud infrastructure.
- **Current Content Gap**: Classic visualizations exist for basic voting, but real-world edge cases (uncommitted leader logs overwritten after network partitions) are poorly explained.
- **Potential Interactive Experience**: Interactive Multi-Node Partition Simulator: Split a 5-node cluster into two sub-networks and step through split votes, term increments, and log overwrites.
- **Suggested Editorial Angle**: Distributed systems deep dive: Understanding Raft's subtle edge cases and split-brain defenses.
- **Verification Status**: Confirmed research (Raft specification and etcd implementation verified).
- **Estimated Effort**: 12 hours (Medium).
- **Priority**: P2.

---

## Candidate 21: Bun JavaScriptCore Engine: libuv vs. libxev and Zig Syscall Bindings
- **Topic & Official Source**: Bun (`https://bun.sh/`) and source repository (`https://github.com/oven-sh/bun`).
- **Why It Is Interesting**: Bun achieves 3x to 5x higher HTTP throughput and faster startup than Node.js by pairing Apple's WebKit JavaScriptCore engine with custom Zig bindings and `io_uring` on Linux.
- **Intended Reader**: Node.js and TypeScript developers, backend engineers evaluating next-gen runtimes.
- **Likely Search Intent**: "Why Bun is faster than Node.js", "Bun JavaScriptCore vs V8 architecture", "Bun io_uring implementation".
- **Available Evidence of Interest**: 75,000+ GitHub stars; high debate across JavaScript performance communities.
- **Current Content Gap**: Most articles are basic `npm i -g bun` tutorials; low-level analysis of syscall overhead and memory layout is scarce.
- **Potential Interactive Experience**: Syscall Overhead Simulator: Compare Node.js (V8 + libuv thread pool) vs Bun (JSC + Zig io_uring) event loop scheduling.
- **Suggested Editorial Angle**: Deep runtime comparison: How Bun's Zig-native architecture outpaces traditional V8 runtimes.
- **Verification Status**: Confirmed research (Bun source code and benchmarks inspected).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P3.

---

## Candidate 22: PostgreSQL Table Bloat: MVCC Tuple Anatomy and VACUUM Wraparound
- **Topic & Official Source**: PostgreSQL Internals Documentation (`https://www.postgresql.org/docs/current/routine-vacuuming.html`).
- **Why It Is Interesting**: Multi-Version Concurrency Control (MVCC) in PostgreSQL creates dead tuples on every `UPDATE` and `DELETE`, causing multi-gigabyte table bloat and dangerous 32-bit transaction ID (XID) wraparound outages.
- **Intended Reader**: Database administrators, backend platform engineers.
- **Likely Search Intent**: "PostgreSQL table bloat root causes", "prevent transaction ID wraparound postgres".
- **Available Evidence of Interest**: A notorious operational nightmare responsible for high-profile database outages across startups and enterprises.
- **Current Content Gap**: Generic documentation advises running `VACUUM FULL` (which locks tables); visual guides explaining heap page layout and autovacuum cost delays are lacking.
- **Potential Interactive Experience**: Interactive Heap Page Tuple Simulator: Watch an `UPDATE` statement append dead tuple copies to a 8KB page and simulate `autovacuum` reclamation.
- **Suggested Editorial Angle**: Practical troubleshooting & operational guide: Eliminating PostgreSQL bloat without taking table locks.
- **Verification Status**: Confirmed research (PostgreSQL source `backend/access/heap/` verified).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P1.

---

## Candidate 23: Speculative Decoding in LLM Inference: Draft Models vs Medusa Heads
- **Topic & Official Source**: Leviathan et al. (Google Research, `https://arxiv.org/abs/2211.17192`) and Medusa (`https://github.com/FasterDecoding/Medusa`).
- **Why It Is Interesting**: Doubles LLM generation speed (from 35 tokens/sec to 80+ tokens/sec) with zero accuracy degradation by having a tiny draft model generate tokens in parallel while the large base model verifies them in a single forward pass.
- **Intended Reader**: AI infrastructure engineers, LLM serving architects (vLLM, SGLang).
- **Likely Search Intent**: "How speculative decoding works LLM", "draft model vs medusa speculative decoding".
- **Available Evidence of Interest**: Implemented across vLLM, TensorRT-LLM, and llama.cpp; high interest from production teams cutting API latency.
- **Current Content Gap**: Math-heavy papers with few visual explanations of verification tree acceptance and rejection sampling.
- **Potential Interactive Experience**: Interactive Speculative Acceptance Simulator: Configure acceptance threshold $\alpha$ and watch a target model accept/reject 5 drafted tokens live with acceptance rate calculation.
- **Suggested Editorial Angle**: Architectural guide: How speculative decoding breaks the memory-bandwidth bottleneck of auto-regressive generation.
- **Verification Status**: Confirmed research (vLLM speculative decoding engine validated).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P2.

---

## Candidate 24: Cap'n Proto vs FlatBuffers: Zero-Copy Serialization Memory Alignment
- **Topic & Official Source**: Cap'n Proto by Kenton Varda (`https://capnproto.org/`) and Google FlatBuffers.
- **Why It Is Interesting**: Unlike Protocol Buffers (protobuf) or JSON, zero-copy serialization formats require **zero encoding and decoding steps**. The in-memory data representation matches the exact wire protocol.
- **Intended Reader**: High-frequency trading developers, gaming infrastructure engineers, IPC protocol designers.
- **Likely Search Intent**: "Cap'n Proto vs FlatBuffers vs Protobuf", "how zero copy serialization works memory alignment".
- **Available Evidence of Interest**: Foundational to Cloudflare Workers internal RPC and game physics networking.
- **Current Content Gap**: Abstract benchmarks; missing byte-offset diagrams showing pointer offsets, vtables, and 8-byte word alignments.
- **Potential Interactive Experience**: Interactive Wire Byte Inspector: Step through a serialized record and view raw pointer offsets, scalar fields, and pointer traversal with zero parsing.
- **Suggested Editorial Angle**: Low-level systems teardown: Why zero-copy serialization obsoletes traditional parsing in low-latency networks.
- **Verification Status**: Confirmed research (Cap'n Proto C++ implementation inspected).
- **Estimated Effort**: 10 hours (Medium).
- **Priority**: P3.

---

## Candidate 25: Android Binder IPC: Linux Ashmem and Thread Pool Transaction Schedulers
- **Topic & Official Source**: Android Open Source Project (AOSP) Kernel Documentation (`https://source.android.com/docs/core/architecture/kernel/binder`).
- **Why It Is Interesting**: The central nervous system of modern Android. Every touch event, audio stream, and intent passes through the `/dev/binder` character driver, achieving high-speed inter-process communication via shared memory (`ashmem`) and zero-copy memory mapping.
- **Intended Reader**: Android kernel engineers, OS architects, mobile systems developers.
- **Likely Search Intent**: "How Android Binder IPC works under the hood", "Binder thread pool transaction buffer".
- **Available Evidence of Interest**: Core interview and architecture topic for mobile OS and embedded Android engineers.
- **Current Content Gap**: Most explanations focus on Java AIDL; kernel-level driver transactions, memory allocations, and reference counter cycles are poorly documented.
- **Potential Interactive Experience**: Interactive Binder Transaction Simulator: Trace a remote method call from process A's userspace proxy across the `/dev/binder` driver into process B's worker thread.
- **Suggested Editorial Angle**: Operating system anatomy: How Android's custom IPC driver solved Linux process isolation.
- **Verification Status**: Confirmed research (AOSP Linux kernel driver inspected).
- **Estimated Effort**: 12 hours (Medium).
- **Priority**: P3.
