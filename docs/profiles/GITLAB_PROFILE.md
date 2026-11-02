# GitLab Profile Settings & Profile README for @gmhmjmkmlm

---

## 1. GitLab Profile Settings (Settings -> Profile)

```yaml
Full Name: Simon Vance
Job Title: Low-Latency Systems & Distributed Storage Engineer
Bio: Systems engineer building low-latency storage engines, deterministic concurrency & eBPF telemetry. Mechanical sympathy, robust architecture, and clean code principles.
Location: Stockholm, Sweden
Website URL: https://github.com/gmhmjmkmlm-rgb
```

---

## 2. GitLab Profile README.md (gmhmjmkmlm/gmhmjmkmlm repository)

```markdown
| [KR 한국어](./docs/locales/ko.md) | [US English](./README.md) | [JP 日本語](./docs/locales/ja.md) | [CN 简体中文](./docs/locales/zh-CN.md) | [ES Español](./docs/locales/es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./docs/locales/fr.md) | [DE Deutsch](./docs/locales/de.md) | [RU Русский](./docs/locales/ru.md) | [SA العربية](./docs/locales/ar.md) | [HI हिन्दी](./docs/locales/hi.md) |

---

# Simon Vance (@gmhmjmkmlm)

Systems architect and infrastructure engineer based in Stockholm, Sweden. I specialize in deterministic low-latency runtimes, custom kernel runners, and high-throughput distributed pipelines. On GitLab, I maintain core CI/CD infrastructure templates, benchmark harnesses for storage engines, and self-hosted build runners.

- **Focus**: High-concurrency systems, `io_uring` direct disk operations, and reproducible continuous benchmarking.
- **Rule of Thumb**: Flaky performance tests are broken tests. Isolate CPU cores, disable hyper-threading on benchmark runners, and measure tail latency.
- **Primary Base**: [GitHub (@gmhmjmkmlm-rgb)](https://github.com/gmhmjmkmlm-rgb)
- **Direct Mail**: `simon.vance.dev@gmail.com`

---

## 🛠️ Systems & Tooling Stack

| Domain | Primary Technologies | Core Practices |
| :--- | :--- | :--- |
| **Languages** | Rust, Zig, C11/C23, Go | Zero-allocation loops, lock-free queues, explicit memory management |
| **Kernel & Network** | Linux (zen/rt), eBPF, `io_uring`, epoll | Custom packet filters, bare-metal telemetry, network stack tuning |
| **CI/CD & Runners** | GitLab CI, Docker, QEMU, Nix | Reproducible pipeline definitions, isolated benchmark runner nodes |
| **Data & Storage** | RocksDB, custom LSM engines, SQLite | Write-ahead logging (WAL), sequential I/O guarantees |

---

## 📦 GitLab Hosted Workspaces & Pipelines

- **`storage-bench-runner`**: Dedicated benchmark test harness measuring p99/p999 disk and memory latency regressions across kernel upgrades.
- **`custom-executor-ebpf`**: Lightweight custom runner executor for Linux using eBPF to profile build and test step I/O bottlenecks without overhead.
- **`audio-dsp-ci`**: Cross-compilation pipeline targeting x86_64 and aarch64 with rigorous audio artifact verification and SIMD instruction checks.

---

## 🤝 Contact & PGP

```text
Email:       simon.vance.dev@gmail.com
Matrix:      @simonvance:matrix.org
PGP Key:     8F4B 2C91 E0D3 7A88 41F2  990C 5E3A 1204 D91A B7C2
GitHub:      https://github.com/gmhmjmkmlm-rgb
```

---

*“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra*
```
