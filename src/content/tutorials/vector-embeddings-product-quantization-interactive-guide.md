---
title: "Product Quantization (PQ) for Vector Databases: Compress 1,536-D Embeddings by 95% with Asymmetric Distance Computation"
description: "Master Product Quantization (PQ) for high-dimensional vector search. Learn sub-space decomposition, Voronoi codebook training, and Asymmetric Distance Computation (ADC) with an interactive visualizer."
pubDate: 2026-10-28T00:00:00.000Z
updatedDate: 2026-10-28T00:00:00.000Z
author: nadhebe-team
category: "AI Engineering & Vector Search"
tags:
  - "Vector Search"
  - "Product Quantization"
  - "Embeddings"
  - "Qdrant"
  - "Milvus"
  - "Faiss"
  - "Information Retrieval"
heroImage: "/images/product-quantization-hero.webp"
heroAlt: "Vintage editorial collage illustration of vector coordinate grids, mathematical matrices, and warm orange geometric circles on a soft sage green background"
estimatedReadingTime: 16
isPillar: true
topic: "Vector Search & Retrieval"
searchIntent: "How product quantization works for vector database compression and asymmetric distance computation"
difficulty: "intermediate"
relatedTopics:
  - "Embedded Vector Search"
  - "SQLite State Sharing"
  - "vLLM KV Cache Optimization"
canonicalUrl: "https://nadhebe.com/tutorials/vector-embeddings-product-quantization-interactive-guide/"
draft: false
sources:
  - label: "Product Quantization for Nearest Neighbor Search (Jégou, Douze, Schmid)"
    url: "https://hal.inria.fr/inria-00514462v2/document"
  - label: "Faiss: A Library for Efficient Similarity Search (Meta AI Research)"
    url: "https://github.com/facebookresearch/faiss"
  - label: "Qdrant Vector Database Quantization Engine Documentation"
    url: "https://qdrant.tech/documentation/guides/quantization/"
faq:
  - question: "What is Product Quantization (PQ) in vector search?"
    answer: "Product Quantization is a lossy vector compression algorithm that splits high-dimensional floating-point vectors into multiple lower-dimensional orthogonal subspaces. In each subspace, k-means clustering trains a codebook of centroids (typically 256). Each vector chunk is then replaced by the 1-byte index of its nearest centroid, compressing a 1,536-dimensional float32 vector (6,144 bytes) down to 64 bytes—a 98.96% memory reduction."
  - question: "How does Asymmetric Distance Computation (ADC) work in Product Quantization?"
    answer: "In Asymmetric Distance Computation (ADC), the query vector remains unquantized in high-precision float32, while database vectors are compressed as byte codebooks. When a search query arrives, the engine computes the Euclidean distance from each query sub-vector to all 256 pre-trained centroids, storing the results in a tiny lookup table. Evaluating candidate vectors requires only m table lookups and integer additions, eliminating millions of costly floating-point dot products."
  - question: "What is the difference between Scalar Quantization (SQ8) and Product Quantization (PQ)?"
    answer: "Scalar Quantization (SQ8) compresses each floating-point dimension independently into an 8-bit integer, yielding a constant 4x (75%) memory reduction while preserving individual coordinate values. Product Quantization (PQ) groups multiple dimensions together into joint subspaces and quantizes coordinates into shared cluster centroids, achieving 16x to 96x compression (93%–98% memory reduction), though with slightly higher recall loss."
---

Modern Retrieval-Augmented Generation (RAG) architectures and semantic search engines are encountering an aggressive infrastructure ceiling: **RAM exhaustion**.

Standard commercial embedding models—such as OpenAI's `text-embedding-3-small` (1,536 dimensions), Cohere's `embed-v3` (1,024 dimensions), or open-source BAAI models (768–1,024 dimensions)—represent vector coordinates as 32-bit floating-point numbers (`float32`). At 1,536 dimensions, a single uncompressed vector consumes:

```math
1,536 dimensions × 4 bytes = 6,144 bytes ≈ 6.14 KB
```

When scaling an enterprise knowledge graph or documentation index to **10 million vectors**, storing raw embeddings in memory requires **61.44 GB of RAM**, excluding the memory overhead of HNSW graph edges or IVF posting lists. Cloud memory at this scale is expensive and degrades cache locality across CPU memory buses.

**Product Quantization (PQ)**, originally formulated by Hervé Jégou, Matthijs Douze, and Cordelia Schmid at INRIA, solves this crisis. By decomposing high-dimensional spaces into Cartesian products of lower-dimensional sub-spaces, PQ compresses a 1,536-D embedding from 6,144 bytes down to **64 bytes**—a **98.96% compression ratio**—while maintaining high nearest-neighbor recall through **Asymmetric Distance Computation (ADC)**.

---

## High-Dimensional Vector Compression Profile

The table below illustrates the memory footprint and distance computation mechanics across different subspace configurations for a 10-million vector index:

| Parameter / Metric | Raw Baseline (float32) | PQ-32 Configuration | PQ-64 Production Standard |
| :--- | :--- | :--- | :--- |
| **Subspaces (`m`)** | None (1,536D) | 32 subspaces (48D each) | **64 subspaces (24D each)** |
| **Centroids per Subspace (`k*`)** | None | 256 centroids (1 byte) | **256 centroids (1 byte)** |
| **Vector Storage Footprint** | 6,144 bytes | 32 bytes | **64 bytes** |
| **10 Million Vectors in RAM** | **61.44 GB** | **0.32 GB (320 MB)** | **0.64 GB (640 MB)** |
| **Compression Ratio** | Baseline (0%) | 99.48% reduction | **98.96% reduction** |
| **Query Distance Method** | Exact Dot Product | Asymmetric Table Lookup | **Asymmetric Table Lookup (ADC)** |
| **Estimated 1-Recall@10** | 100% | ~88.5% | **~94.8% (98%+ with re-rank)** |

---

## 1. The Core Mathematics of Product Quantization

Traditional vector quantization (such as classic k-means over an entire 1,536-dimensional space) fails due to the curse of dimensionality. To achieve acceptable reconstruction error across billions of distinct text embeddings, a standard k-means quantizer would require millions or billions of cluster centroids (`k = 2^64`), making codebook training computationally intractable.

Product Quantization overcomes this through **orthogonal Cartesian space decomposition**:

### Step 1: Sub-Space Splitting

Let an embedding vector `x ∈ ℝᴰ` have dimension `D = 1,536`. We split `x` into `m` orthogonal sub-vectors `u₁, u₂, ..., uₘ`, each having dimension `d* = D / m`:

```math
x = [u₁, u₂, ..., uₘ]  where  uᵢ ∈ ℝ^(d*)
```

If we select `m = 64` sub-spaces:

```math
d* = 1,536 / 64 = 24 dimensions per sub-vector
```

```
Raw Vector x (1,536 Dimensions, float32, 6,144 Bytes):
┌───────────┬───────────┬───────────┬───┬───────────┐
│ u_1 (24D) │ u_2 (24D) │ u_3 (24D) │...│u_64 (24D) │
└─────┬─────┴─────┬─────┴─────┬─────┴───┴─────┬─────┘
      │           │           │               │
   K-Means     K-Means     K-Means         K-Means
 (Codebook 1)(Codebook 2)(Codebook 3)    (Codebook 64)
      │           │           │               │
      ▼           ▼           ▼               ▼
┌───────────┬───────────┬───────────┬───┬───────────┐
│  Index c  │  Index c  │  Index c  │...│  Index c  │  --> 64 Bytes Total!
│  (1 Byte) │  (1 Byte) │  (1 Byte) │   │  (1 Byte) │      (uint8 array)
└───────────┴───────────┴───────────┴───┴───────────┘
```

### Step 2: Independent Codebook Generation

For each of the `m` sub-spaces independently, we execute k-means clustering over a training corpus of embeddings to learn a set of `k*` cluster centroids:

```math
Cᵢ = { c_{i,1}, c_{i,2}, ..., c_{i,k*} }  where  c_{i,j} ∈ ℝ^(d*)
```

In modern production engines (Faiss, Qdrant, Milvus), `k*` is typically set to `256`. Because `log₂(256) = 8 bits = 1 byte`, every centroid in the codebook can be referenced by a standard **`uint8` index**.

### Step 3: Quantization Encoding

For any vector `x`, each sub-vector `uᵢ` is mapped to the index of its nearest centroid under Euclidean distance:

```math
qᵢ(uᵢ) = argmin_{j ∈ {0, ..., k*-1}} ||uᵢ - c_{i,j}||₂
```

The vector `x` is stored in memory as an array of `m` unsigned 8-bit integers:

```math
x̃ = [q₁(u₁), q₂(u₂), ..., qₘ(uₘ)] ∈ {0, ..., 255}^m
```

For `m = 64`, the stored vector consumes **exactly 64 bytes**.

---

## 2. Asymmetric Distance Computation (ADC): Search Without Dequantization

The most ingenious feature of Product Quantization is that **database vectors never need to be unpacked or dequantized during query search**.

Suppose an incoming user query vector `y ∈ ℝᴰ` is submitted to the vector database. Computing distance using **Symmetric Distance Computation (SDC)**—where both query and database vectors are quantized—accumulates significant quantization noise.

Instead, production vector engines employ **Asymmetric Distance Computation (ADC)**:

```math
d_ADC(y, x̃)² = Σ_{i=1}^m ||yᵢ - c_{i, qᵢ(uᵢ)}||₂²
```

```
Incoming Query y (1,536-D float32)
      │
      ├─► Split into 64 sub-vectors: y_1, y_2, ..., y_64
      │
      ▼
Precompute Distance Table (Look-Up Table / LUT):
Size = m × k* = 64 × 256 entries (float32, 64 KB total, fits in L2 CPU cache!)
┌───────────┬───────────────┬───────────────┬───┬─────────────────┐
│ Subspace  │ Dist to c_0   │ Dist to c_1   │...│ Dist to c_255   │
├───────────┼───────────────┼───────────────┼───┼─────────────────┤
│ Subspace 1│ ||y_1 - c_1,0||²||y_1 - c_1,1||²│...│ ||y_1 - c_1,255||²│
│ Subspace 2│ ||y_2 - c_2,0||²||y_2 - c_2,1||²│...│ ||y_2 - c_2,255||²│
│ ...       │ ...           │ ...           │...│ ...             │
│ Subspace 64||y_64 - c_64,0||²||y_64 - c_64,1||²│...│ ||y_64 - c_64,255||²
└───────────┴───────────────┴───────────────┴───┴─────────────────┘

Evaluating Candidate Vector [14, 88, 3, ..., 201]:
Distance = LUT[1][14] + LUT[2][88] + LUT[3][3] + ... + LUT[64][201]
--> 64 L1-cache table lookups and additions! Zero dot products!
```

### Why ADC is 20x to 50x Faster:
1. **L2 Cache Saturation**: The entire 64 × 256 float32 table is only **65,536 bytes (64 KB)**, meaning it stays pinned inside the CPU core's private L1/L2 cache throughout the search loop.
2. **Zero Floating-Point Vector Multiplication**: Evaluating 100,000 candidate vectors requires zero 1,536-dimensional matrix multiplications. It consists solely of pointer offsets into the precomputed LUT and scalar accumulator additions.
3. **SIMD Vectorization**: Lookups can be grouped and accumulated using AVX2 `_mm256_i32gather_ps` or ARM NEON table vector instructions (`vtbl`).

---

## 3. Python & NumPy Implementation of Product Quantization

Below is a complete, standalone Python implementation demonstrating codebook generation, vector quantization, and Asymmetric Distance Computation without external C++ bindings:

```python
import numpy as np

class ProductQuantizer:
    def __init__(self, d: int = 1536, m: int = 64, k: int = 256):
        assert d % m == 0, "Dimension d must be divisible by m"
        self.d = d
        self.m = m
        self.k = k
        self.d_star = d // m
        # Codebooks shape: [m, k, d_star]
        self.codebooks = np.zeros((m, k, self.d_star), dtype=np.float32)

    def fit(self, training_data: np.ndarray, iterations: int = 20):
        """Train k-means centroids independently for each subspace."""
        N, D = training_data.shape
        assert D == self.d
        
        for i in range(self.m):
            sub_slice = training_data[:, i * self.d_star : (i + 1) * self.d_star]
            # Initialize random centroids
            indices = np.random.choice(N, self.k, replace=False)
            centroids = sub_slice[indices].copy()
            
            # Simple K-Means iteration
            for _ in range(iterations):
                # Distances: [N, k]
                dists = np.sum((sub_slice[:, None, :] - centroids[None, :, :]) ** 2, axis=2)
                labels = np.argmin(dists, axis=1)
                for c_idx in range(self.k):
                    mask = (labels == c_idx)
                    if np.any(mask):
                        centroids[c_idx] = np.mean(sub_slice[mask], axis=0)
            self.codebooks[i] = centroids

    def encode(self, vectors: np.ndarray) -> np.ndarray:
        """Quantize vectors into uint8 codebook indices: [N, m]."""
        N = vectors.shape[0]
        codes = np.zeros((N, self.m), dtype=np.uint8)
        for i in range(self.m):
            sub_slice = vectors[:, i * self.d_star : (i + 1) * self.d_star]
            centroids = self.codebooks[i]
            # Pairwise squared Euclidean distance
            dists = np.sum((sub_slice[:, None, :] - centroids[None, :, :]) ** 2, axis=2)
            codes[:, i] = np.argmin(dists, axis=1).astype(np.uint8)
        return codes

    def compute_query_lut(self, query: np.ndarray) -> np.ndarray:
        """Precompute distance table: [m, k]."""
        lut = np.zeros((self.m, self.k), dtype=np.float32)
        for i in range(self.m):
            q_sub = query[i * self.d_star : (i + 1) * self.d_star]
            centroids = self.codebooks[i]
            lut[i] = np.sum((q_sub - centroids) ** 2, axis=1)
        return lut

    def search_adc(self, query: np.ndarray, codes: np.ndarray, top_k: int = 10):
        """Asymmetric Distance Computation over quantized dataset."""
        lut = self.compute_query_lut(query)
        # Fast table gathering: sum across all m subspaces
        distances = np.zeros(codes.shape[0], dtype=np.float32)
        for i in range(self.m):
            distances += lut[i, codes[:, i]]
        
        nearest_indices = np.argsort(distances)[:top_k]
        return nearest_indices, distances[nearest_indices]
```

---

## 4. Comparing Quantization Strategies: Flat vs SQ8 vs PQ

When configuring production databases such as Qdrant or Milvus, engineers must choose between Scalar Quantization, Product Quantization, and Flat storage:

| Metric | Flat Index (float32) | Scalar Quantization (SQ8) | Product Quantization (PQ-64) |
| :--- | :--- | :--- | :--- |
| **Vector Storage (1,536D)** | 6,144 bytes / vector | 1,536 bytes / vector | **64 bytes / vector** |
| **10M Vectors RAM** | 61.44 GB | 15.36 GB | **0.64 GB (640 MB)** |
| **Memory Reduction** | 0% (Baseline) | 75.0% | **98.96%** |
| **1-Recall@10 Accuracy** | 100% | 98.2% – 99.1% | **92.5% – 96.8%** |
| **Search Speed (QPS)** | Moderate (SIMD f32) | High (SIMD int8) | **Extremely High (L2 Cache ADC)** |
| **Codebook Training** | None | Min/Max range scan | K-Means clustering (100k sample) |
| **Re-ranking Recommended?**| No | Optional | **Yes (Over-fetch & f32 Re-rank)** |

### The Two-Stage Re-Ranking Best Practice

In production search pipelines, the standard industry pattern is **Over-Fetch and Re-Rank**:
1. **Stage 1 (ADC Scan)**: Query the PQ index to retrieve candidate items with an over-fetch multiplier of `3×` to `5×` (e.g., fetch top 50 candidates using 64-byte ADC).
2. **Stage 2 (Exact Re-Ranking)**: Read the original uncompressed vectors for only those 50 candidates from disk (`mmap` NVMe SSD) and compute exact float32 cosine similarity.

This hybrid approach delivers **98%+ final top-10 recall** while maintaining a sub-gigabyte memory footprint in RAM.

---

## 5. Summary & Key Takeaways

1. **Sub-Space Factoring**: Product Quantization circumvents the curse of dimensionality by partitioning high-dimensional vectors into `m` orthogonal slices and clustering each slice independently.
2. **Exponential Representation with Linear Centroids**: Using `m=64` subspaces with `k*=256` centroids can represent `(256)^64 = 2^512` distinct virtual vector coordinates using only `64 × 256 = 16,384` total stored floating-point centroid numbers.
3. **Zero Dequantization Overhead**: Asymmetric Distance Computation (ADC) pre-computes distances from query sub-vectors into an `m × 256` table, transforming vector distance evaluation into simple table index lookups.
4. **Ideal Production Fit**: For vector collections exceeding 5 million embeddings, PQ with disk-backed two-stage re-ranking represents the premier architectural design for cost-effective, high-throughput semantic search.
