| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [BR Português](./pt-BR.md) | [SA العربية](./ar.md) |

---

# 你好，我是 Simon 👋

我专注于低延迟系统软件、分布式存储引擎和高性能网络原语的研发。我的核心技术领域集中在 Linux 内核接口、无锁并发（Lock-free concurrency）以及面向底层硬件的机械同理心（Mechanical Sympathy）。在不优化内存布局或使用 eBPF 跟踪丢包的闲暇时间，我喜欢研究模拟音频合成器电路和客制化分体机械键盘。

- 🔭 **当前工作重心**: 为仅追加（Append-only）分布式事件存储设计零拷贝异步复制层。
- ⚡ **工程理念**: 可预测的 p99 延迟远优于峰值吞吐量。在提出猜想之前，始终先用硬件性能计数器（PMU）进行基准实测。
- 💬 **探讨主题**: Rust, Zig, Linux 系统级编程, LSM 树, DPDK, eBPF 遥测, 音频数字信号处理 (DSP)
- 📍 **坐标**: 瑞典斯德哥尔摩 (UTC+1 / UTC+2)
- 📫 **联系方式**: `simon.vance.dev@gmail.com`

---

## 🛠️ 工程领域与技术栈

我热衷于在物理层面上尊重内存排布、CPU 缓存行与磁盘块特性的软件设计。以下是我日常依赖的核心工具链：

| 领域 | 核心语言与技术 | 关注重点与实践 |
| :--- | :--- | :--- |
| **系统与核心层** | Rust, Zig, Modern C (C11/C23), Go | 无锁数据结构、热路径零堆分配、SIMD 向量化计算 |
| **网络与内核** | eBPF / XDP, `io_uring`, epoll, QUIC | 原始套接字解析、内核旁路、定制高性能数据包流水线 |
| **存储与数据** | RocksDB, 自研 LSM 引擎, SQLite, DuckDB | 预写日志 (WAL)、缓存无关 B 树、零拷贝序列化 |
| **基础设施与可观测性** | Linux (Arch / Debian), Docker, perf, bpftrace, Prometheus | 内存剖析 (valgrind, dhat)、火焰图、硬件性能监控计数器 |
| **开发环境与工具** | Neovim, WezTerm, Git, Bash/Zsh, Make, CMake | 键盘流高效操作、终端原生调试、环境可复现构建 |

---

## 🚀 精选开源项目

以下是我独立设计并持续维护的底层基础设施项目：

### 1. `vortex-kv`
> 基于 Rust 构建的高性能嵌入式键值 (Key-Value) 存储引擎。
- **架构设计**: 基于 `io_uring` Direct I/O 的仅追加日志结构合并树（LSM-Tree）。
- **技术亮点**: 读缓存命中时零堆内存分配、分数级联布隆过滤器（Fractional Cascading Bloom Filters）、并发合并压缩流水线。
- **基准表现**: 在 NVMe 设备上可维持每秒 42 万次以上的随机写入，同时保持确定性的亚毫秒级 p99 延迟。

### 2. `meshpipe`
> 采用 Zig 开发的模块化 UDP/QUIC 数据包复用器与低开销遥测探测器。
- **架构设计**: 结合内存池（Arena Allocator）与缓存行对齐环形缓冲区的事件驱动型工作线程池。
- **技术亮点**: 通过 eBPF XDP 钩子在内核早期实现数据包预过滤，并在用户态通过 SIMD 进行快速校验和计算。
- **应用场景**: 弱网环境或高丢包链路下边缘计算集群节点间的实时状态同步。

### 3. `chronos-probe`
> 采用 Go 与 C 语言 (eBPF) 实现的极轻量级内核遥测守护进程。
- **架构设计**: 无需重新编译目标二进制文件，直接将 tracepoint 和 kprobe 挂载至磁盘块设备层和 TCP 协议栈。
- **技术亮点**: 以接近零的系统开销输出缺页中断耗时与调度器运行队列排队时延的 Prometheus 直方图。
- **应用场景**: 精确排查延迟敏感型分布式生产微服务中的长尾延迟（Tail Latency）突增问题。

### 4. `poly-dsp`
> 基于现代 C 语言开发的轻量级复音波表音频合成引擎。
- **架构设计**: 无锁音频环形缓冲管道、SSE/AVX2 向量化振荡器以及带限阶跃（BLEP）波形合成算法。
- **技术亮点**: 在 x86_64 单核心上以低于 1.2% 的 CPU 占用率实时渲染 96kHz / 32-bit 浮点音频。

---

## 📊 系统架构设计思维

```
 [ 客户端层 ]
        │  (QUIC / 定制二进制协议)
        ▼
 [ eBPF XDP 过滤器 ] ─── (快速丢弃 / 快速路径)
        │
        ▼ (Linux 内核 io_uring 完成队列)
 [ 环形缓冲区 / SPSC 队列 ] ── 缓存行填充 (Cache-line Padded)
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ 内存池 / 堆外内存 ]         [ WAL 磁盘持久化 ]
   │ (SIMD 索引扫描)               │ (Direct I/O O_DIRECT)
   └───────────────┬───────────────┘
                   ▼
         [ 一致性状态查询引擎 ]
```

- **机械同理心 (Mechanical Sympathy)**: 采用结构体数组 (SoA) 替代数组结构体 (AoS)，最大化提升 L1/L2 数据缓存命中率。
- **内存分配纪律**: 核心循环内严格使用内存区域（Arena）与预分配环形缓冲，杜绝垃圾回收或动态分配导致的延迟毛刺。
- **故障透明性**: 显式错误传递，依靠 WAL 实现确定性崩溃恢复，配合全覆盖基于属性的测试（Property-based testing）。

---

## 💻 个人工作站与工作环境

- **操作系统**: Arch Linux（内核 `linux-zen`） + Sway (Wayland 合成器)
- **编辑器**: Neovim（原生 Lua 深度定制配置、Treesitter、内置 LSP）
- **终端**: WezTerm + Tmux（会话复用）
- **键盘**: Corne 分体式人体工学键盘（Colemak-DH 布局、42 键、自定义 QMK 固件）
- **音频硬件**: Arturia KeyStep Pro、Eurorack 模块化合成器、Beyerdynamic DT 1990 Pro

---

## 🤝 交流与合作

欢迎随时交流存储引擎、内核级遥测、零拷贝网络协议以及底层系统架构设计。

```text
邮箱:        simon.vance.dev@gmail.com
Matrix:      @simonvance:matrix.org
PGP 公钥:    8F4B 2C91 E0D3 7A88 41F2  990C 5E3A 1204 D91A B7C2
GitHub:      https://github.com/gmhmjmkmlm-rgb
交流渠道:    欢迎提交 Issue 或在 GitHub Discussions 留言
```

---

*“简单是可靠性的绝对先决条件。” — 艾兹格·迪杰斯特拉 (Edsger W. Dijkstra)*
