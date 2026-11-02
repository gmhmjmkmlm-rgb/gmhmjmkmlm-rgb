| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [BR Português](./pt-BR.md) | [SA العربية](./ar.md) |

---

# Olá, sou o Simon 👋

Desenvolvo software de sistemas de baixa latência, mecanismos de armazenamento distribuído e primitivas de rede de alto desempenho. Minha atuação concentra-se na interseção entre as interfaces do kernel Linux, concorrência sem travas (lock-free) e simpatia mecânica com o hardware (Mechanical Sympathy). Quando não estou otimizando layouts de memória ou rastreando perdas de pacotes com eBPF, projeto circuitos de sintetizadores analógicos e teclados mecânicos ergonômicos.

- 🔭 **Foco Atual**: Projetando uma camada de replicação assíncrona de cópia zero (zero-copy) para repositórios de eventos distribuídos do tipo append-only.
- ⚡ **Princípio de Engenharia**: Latência p99 previsível supera com folga vazão de pico. Sempre meça com contadores de hardware (PMU) antes de especular.
- 💬 **Assuntos de Interesse**: Rust, Zig, programação de sistemas em Linux, árvores LSM, DPDK, telemetria com eBPF e processamento de áudio digital (DSP).
- 📍 **Localização**: Estocolmo, Suécia (UTC+1 / UTC+2)
- 📫 **Contato**: `simon.vance.dev@gmail.com`

---

## 🛠️ Disciplinas de Engenharia & Stack Técnico

Tenho enorme apreço por softwares que tratam a memória do sistema, as linhas de cache da CPU e as páginas de disco com rigor e respeito ao hardware. Estas são as ferramentas que utilizo no dia a dia:

| Domínio | Linguagens e Ferramentas | Práticas e Foco |
| :--- | :--- | :--- |
| **Sistemas & Núcleo** | Rust, Zig, C Moderno (C11/C23), Go | Estruturas lock-free, caminhos sem alocação em heap, vetorização SIMD |
| **Redes & Kernel** | eBPF / XDP, `io_uring`, epoll, QUIC | Análise de sockets brutos, kernel bypass, pipelines de pacotes dedicados |
| **Armazenamento & Dados** | RocksDB, motores LSM próprios, SQLite, DuckDB | Write-ahead logging (WAL), árvores B cache-oblivious, serialização zero-copy |
| **Infra & Observabilidade** | Linux (Arch / Debian), Docker, perf, bpftrace, Prometheus | Profiling de memória (valgrind, dhat), flamegraphs, contadores de desempenho PMU |
| **Ambiente de Trabalho** | Neovim, WezTerm, Git, Bash/Zsh, Make, CMake | Fluxo orientado a teclado, depuração nativa no terminal, builds reproduzíveis |

---

## 🚀 Projetos Open Source em Destaque

Alguns projetos de infraestrutura e subsistemas que projetei e mantenho ativamente:

### 1. `vortex-kv`
> Mecanismo embarcado de armazenamento chave-valor de altíssimo desempenho desenvolvido em Rust.
- **Arquitetura**: Árvore LSM (Log-Structured Merge-Tree) append-only com E/S direta via `io_uring`.
- **Destaques**: Zero alocações na heap em acertos de leitura em cache, filtros de Bloom fracionários em cascata e compactação concorrente.
- **Métricas**: Sustenta mais de 420.000 gravações aleatórias por segundo em unidades NVMe mantendo latência p99 determinística sub-milissegundo.

### 2. `meshpipe`
> Multiplexador de pacotes UDP/QUIC modular e sonda de telemetria de rede de baixo overhead em Zig.
- **Arquitetura**: Pool de workers orientado a eventos com alocadores de arena e ring buffers alinhados à linha de cache.
- **Destaques**: Filtragem precoce de pacotes no kernel via eBPF XDP hook e cálculo de checksum com SIMD em espaço de usuário.
- **Caso de Uso**: Sincronização de estado distribuído em tempo real entre nós de borda (edge clusters) sob redes instáveis.

### 3. `chronos-probe`
> Daemon leve de telemetria de kernel implementado em Go e C (eBPF).
- **Arquitetura**: Vincula tracepoints e kprobes à camada de blocos de disco e à pilha TCP sem recompilar binários em produção.
- **Destaques**: Emite histogramas do Prometheus com custo nulo para analisar latência de page faults e atrasos da fila do escalonador.
- **Caso de Uso**: Diagnóstico detalhado de picos de latência de cauda (Tail Latency) em microsserviços críticos.

### 4. `poly-dsp`
> Motor de síntese de áudio polifônico por tabela de ondas em C moderno.
- **Arquitetura**: Ring buffer de áudio lock-free com osciladores vetorizados SSE/AVX2 e síntese com limitação de banda BLEP.
- **Destaques**: Processa áudio em tempo real a 96kHz / 32-bit float com menos de 1,2% de uso de CPU em um único núcleo x86_64.

---

## 📊 Arquitetura de Sistemas & Princípios de Projeto

```
 [ Camada de Clientes ]
        │  (QUIC / Protocolo Binário Proprietário)
        ▼
 [ Filtro eBPF XDP ] ─── (Descarte Rápido / Caminho Crítico)
        │
        ▼ (Fila de Conclusão io_uring do Kernel Linux)
 [ Ring Buffer / Filas SPSC ] ── Preenchimento de Cache-line
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ Arena de Memória / Off-Heap ] [ Persistência em Disco WAL ]
   │ (Varredura de Índices SIMD)   │ (Direct I/O O_DIRECT)
   └───────────────┬───────────────┘
                   ▼
       [ Motor de Consulta de Estado ]
```

- **Simpatia Mecânica**: Adoção de Structure-of-Arrays (SoA) em vez de Array-of-Structures (AoS) para maximizar o aproveitamento dos caches L1/L2.
- **Disciplina de Alocação**: Uso estrito de arenas de memória e ring buffers pré-alocados em hot loops; eliminação total de atrasos de garbage collection.
- **Transparência a Falhas**: Tratamento explícito de erros, recuperação determinística pós-falha com WAL e testes rigorosos baseados em propriedades.

---

## 💻 Estação de Trabalho & Equipamentos

- **Sistema Operacional**: Arch Linux (Kernel `linux-zen`) com compositor Wayland Sway
- **Editor**: Neovim (configuração personalizada em Lua puro, Treesitter, LSP nativo)
- **Terminal**: WezTerm com multiplexador de sessões Tmux
- **Teclado**: Teclado ergonômico dividido Corne (layout Colemak-DH, 42 teclas, firmware QMK customizado)
- **Equipamentos de Áudio**: Arturia KeyStep Pro, sintetizador modular Eurorack, fones Beyerdynamic DT 1990 Pro

---

## 🤝 Vamos Conversar & Colaborar

Estou sempre aberto a debates aprofundados sobre bancos de dados embarcados, telemetria de kernel, protocolos zero-copy e arquitetura de sistemas abertos.

```text
E-mail:      simon.vance.dev@gmail.com
Matrix:      @simonvance:matrix.org
Chave PGP:   8F4B 2C91 E0D3 7A88 41F2  990C 5E3A 1204 D91A B7C2
GitHub:      https://github.com/gmhmjmkmlm-rgb
Discussões:  Abra uma Issue ou participe no GitHub Discussions
```

---

*“A simplicidade é o pré-requisito indispensável para a confiabilidade.” — Edsger W. Dijkstra*
