| [KR 한국어](./docs/locales/ko.md) | [US English](./README.md) | [JP 日本語](./docs/locales/ja.md) | [CN 简体中文](./docs/locales/zh-CN.md) | [ES Español](./docs/locales/es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./docs/locales/fr.md) | [DE Deutsch](./docs/locales/de.md) | [RU Русский](./docs/locales/ru.md) | [SA العربية](./docs/locales/ar.md) | [HI हिन्दी](./docs/locales/hi.md) |

---

# Hey there, I'm Simon 👋

I build low-latency systems, distributed storage engines, and network primitives. Most of my work sits around the intersection of the Linux kernel, lock-free concurrency, and mechanical sympathy. When I am not optimizing memory layouts or tracing packet drops with eBPF, I tinker with analog audio synthesizers and mechanical keyboards.

- 🔭 **Current Focus**: Designing a zero-copy asynchronous replication layer for append-only distributed event stores.
- ⚡ **Engineering Principle**: Predictable p99 latency beats peak throughput. Always measure with hardware performance counters before guessing.
- 💬 **Ask me about**: Rust, Zig, Linux systems programming, LSM-trees, DPDK, eBPF telemetry, and audio DSP.
- 📍 **Location**: Stockholm, Sweden (UTC+1 / UTC+2)
- 📫 **Reach out**: `simon.vance.dev@gmail.com`

---

## 🛠️ Engineering Disciplines & Technical Stack

I care deeply about software that treats system memory, CPU cache lines, and disk pages with respect. Here is the toolkit I rely on daily:

| Domain | Primary Tools & Technologies | Focus & Practices |
| :--- | :--- | :--- |
| **Systems & Core** | Rust, Zig, Modern C (C11/C23), Go | Lock-free data structures, zero-allocation paths, SIMD vectorization |
| **Networking & Kernel** | eBPF / XDP, `io_uring`, epoll, QUIC | Raw socket parsing, kernel bypass, custom packet pipelines |
| **Storage & Data** | RocksDB, custom LSM engines, SQLite, DuckDB | Write-ahead logging (WAL), cache-oblivious B-trees, zero-copy serialization |
| **Infra & Observability** | Linux (Arch / Debian), Docker, perf, bpftrace, Prometheus | Memory profiling (valgrind, dhat), flamegraphs, hardware PMU counters |
| **Tooling & Shell** | Neovim, WezTerm, Git, Bash/Zsh, Make, CMake | Keyboard-driven workflow, terminal-centric debugging, reproducible toolchains |

---

## 🚀 Highlighted Open Source Projects

Here are a few infrastructure projects and experiments I've designed and maintain:

### 1. `vortex-kv`
> High-performance embedded key-value storage engine engineered in Rust.
- **Architecture**: Append-only log-structured merge tree (LSM-Tree) backed by `io_uring` direct I/O.
- **Highlights**: Zero heap allocations on read hits, fractional cascading Bloom filters, and concurrent compaction pipelines.
- **Key Metrics**: Sustains 420,000+ random writes/sec on NVMe storage with deterministic sub-millisecond p99 latency.

### 2. `meshpipe`
> Modular UDP/QUIC packet multiplexer and telemetry probe written in Zig.
- **Architecture**: Event-driven worker pool utilizing arena allocators and cacheline-aligned ring buffers.
- **Highlights**: In-kernel packet filtering via eBPF XDP hook with fallback to user-space SIMD checksumming.
- **Use Case**: Real-time distributed state synchronization across edge cluster nodes over lossy networks.

### 3. `chronos-probe`
> Minimalist kernel telemetry daemon written in Go and C (eBPF).
- **Architecture**: Attaches tracepoints and kprobes to disk block layer and TCP stack without altering running binaries.
- **Highlights**: Emits zero-overhead Prometheus histograms for page fault latency and scheduler runqueue delays.
- **Use Case**: Diagnosing silent tail latency spikes in latency-critical production microservices.

### 4. `poly-dsp`
> Lightweight polyphonic wavetable sound synthesizer engine in modern C.
- **Architecture**: Lock-free audio buffer ring with SSE/AVX2 vectorized audio oscillators and bandlimited BLEP synthesis.
- **Highlights**: Runs at 96kHz / 32-bit float with less than 1.2% single-core CPU utilization on x86_64.

---

## 📊 System Architecture Mindset

```
 [ Client Layer ]
        │  (QUIC / Custom Binary Protocol)
        ▼
 [ eBPF XDP Filter ] ─── (Early Drop / Fast Path)
        │
        ▼ (Kernel io_uring Completion Queue)
 [ Ring Buffer / SPSC Queues ] ── Cache-line Padded
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ Memory Arena / Off-Heap ]   [ WAL Disk Persistence ]
   │ (SIMD Index Scanning)         │ (Direct I/O O_DIRECT)
   └───────────────┬───────────────┘
                   ▼
         [ Stable State Query ]
```

- **Mechanical Sympathy**: Structure-of-Arrays (SoA) layout over Array-of-Structures (AoS) to maximize L1/L2 data cache residency.
- **Allocation Discipline**: Memory arenas and pre-allocated ring buffers in hot loops; zero garbage collector latency spikes.
- **Failure Transparency**: Explicit error handling, deterministic crash recovery via write-ahead logging, and exhaustive property testing.

---

## 💻 Personal Rig & Workspace Setup

- **Operating System**: Arch Linux (Kernel `linux-zen`) with Sway Wayland compositor
- **Editor**: Neovim (custom Lua configuration, Treesitter, native LSP)
- **Terminal**: WezTerm with Tmux session management
- **Keyboard**: Corne Split Ergonomic Keyboard (Colemak-DH layout, 42 keys, custom QMK firmware)
- **Audio Gear**: Arturia KeyStep Pro, Eurorack modular rig, Beyerdynamic DT 1990 Pro

---

## 🤝 Let's Collaborate & Connect

I am always interested in discussing storage engines, kernel telemetry, zero-copy networks, and open-source systems architecture.

```text
Email:       simon.vance.dev@gmail.com
Matrix:      @simonvance:matrix.org
PGP Key:     8F4B 2C91 E0D3 7A88 41F2  990C 5E3A 1204 D91A B7C2
GitHub:      https://github.com/gmhmjmkmlm-rgb
Discussions: Open an issue or drop a line in GitHub Discussions
```

---

*“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra*
