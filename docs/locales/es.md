| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [BR Português](./pt-BR.md) | [SA العربية](./ar.md) |

---

# Hola, soy Simon 👋

Desarrollo software de sistemas de baja latencia, motores de almacenamiento distribuido y primitivas de red de alto rendimiento. Mi trabajo se centra en la intersección entre el kernel de Linux, la concurrencia sin bloqueos (lock-free) y la simpatía mecánica con el hardware (Mechanical Sympathy). Cuando no estoy optimizando la disposición de memoria o rastreando pérdidas de paquetes con eBPF, diseño circuitos de sintetizadores analógicos y teclados mecánicos ergonómicos.

- 🔭 **Enfoque actual**: Diseñando una capa de replicación asíncrona de copia cero (zero-copy) para almacenes de eventos distribuidos de solo anexado (append-only).
- ⚡ **Principio de ingeniería**: La latencia p99 predecible supera con creces el rendimiento pico. Siempre mido con contadores de hardware (PMU) antes de especular.
- 💬 **Hablemos de**: Rust, Zig, programación de sistemas en Linux, árboles LSM, DPDK, telemetría eBPF y procesamiento digital de audio (DSP).
- 📍 **Ubicación**: Estocolmo, Suecia (UTC+1 / UTC+2)
- 📫 **Contacto**: `simon.vance.dev@gmail.com`

---

## 🛠️ Disciplinas de Ingeniería y Stack Técnico

Me apasiona el software que respeta la memoria del sistema, las líneas de caché de la CPU y los bloques de disco en su nivel físico. Este es el conjunto de herramientas que utilizo a diario:

| Dominio | Herramientas y Lenguajes | Prácticas y Enfoques |
| :--- | :--- | :--- |
| **Sistemas y Núcleo** | Rust, Zig, C Moderno (C11/C23), Go | Estructuras lock-free, rutas sin asignación en heap, vectorización SIMD |
| **Redes y Kernel** | eBPF / XDP, `io_uring`, epoll, QUIC | Análisis de sockets crudos, bypass de kernel, canalizaciones de paquetes dedicadas |
| **Almacenamiento y Datos** | RocksDB, motores LSM propios, SQLite, DuckDB | Write-ahead logging (WAL), árboles B cache-oblivious, serialización zero-copy |
| **Infraestructura y Observabilidad** | Linux (Arch / Debian), Docker, perf, bpftrace, Prometheus | Perfilado de memoria (valgrind, dhat), flamegraphs, contadores PMU |
| **Entorno de Trabajo** | Neovim, WezTerm, Git, Bash/Zsh, Make, CMake | Flujo guiado por teclado, depuración nativa en terminal, compilación reproducible |

---

## 🚀 Proyectos Destacados de Código Abierto

Algunos de los proyectos de infraestructura que he diseñado y mantengo activamente:

### 1. `vortex-kv`
> Motor de almacenamiento clave-valor embebido de ultra alto rendimiento desarrollado en Rust.
- **Arquitectura**: Árbol de mezcla estructurado por registros (LSM-Tree) de solo anexado respaldado por `io_uring` Direct I/O.
- **Aspectos Destacados**: Cero asignaciones en heap durante aciertos de lectura en caché, filtros de Bloom fraccionarios en cascada y compactación concurrente.
- **Rendimiento**: Soporta más de 420.000 escrituras aleatorias por segundo en unidades NVMe manteniendo una latencia p99 determinista sub-milisegundo.

### 2. `meshpipe`
> Multiplexor de paquetes UDP/QUIC modular y sonda de telemetría de baja sobrecarga escrito en Zig.
- **Arquitectura**: Pool de trabajadores orientado a eventos basado en asignadores de arena y buffers circulares alineados a líneas de caché.
- **Aspectos Destacados**: Filtrado de paquetes en espacio de kernel con ganchos eBPF XDP y cálculo de sumas de verificación con SIMD en espacio de usuario.
- **Caso de Uso**: Sincronización de estado distribuido en tiempo real entre nodos de borde en redes con pérdida de paquetes.

### 3. `chronos-probe`
> Demonio ligero de telemetría de kernel implementado en Go y C (eBPF).
- **Arquitectura**: Conecta tracepoints y kprobes a la capa de bloques de disco y a la pila TCP sin necesidad de recompilar aplicaciones en ejecución.
- **Aspectos Destacados**: Emite histogramas de Prometheus sin sobrecarga del sistema para monitorear la latencia de fallos de página y retrasos del planificador.
- **Caso de Uso**: Diagnóstico preciso de picos de latencia de cola (Tail Latency) en microservicios críticos en producción.

### 4. `poly-dsp`
> Motor sintetizador polifónico de tablas de ondas en C moderno.
- **Arquitectura**: Ring buffer de audio sin bloqueos con osciladores vectorizados SSE/AVX2 y síntesis BLEP con limitación de banda.
- **Aspectos Destacados**: Procesa audio en tiempo real a 96kHz / 32-bit float con un consumo inferior al 1.2% de CPU en un solo núcleo x86_64.

---

## 📊 Filosofía de Arquitectura de Sistemas

```
 [ Capa de Clientes ]
        │  (QUIC / Protocolo Binario Propio)
        ▼
 [ Filtro eBPF XDP ] ─── (Descarte Temprano / Ruta Rápida)
        │
        ▼ (Cola de Finalización io_uring de Linux)
 [ Ring Buffer / Colas SPSC ] ── Relleno de Línea de Caché
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ Arena de Memoria / Off-Heap ] [ Persistencia en Disco WAL ]
   │ (Escaneo de Índices SIMD)     │ (Direct I/O O_DIRECT)
   └───────────────┬───────────────┘
                   ▼
       [ Motor de Consulta de Estado ]
```

- **Simpatía Mecánica (Mechanical Sympathy)**: Preferencia por estructuras de arrays (SoA) frente a arrays de estructuras (AoS) para maximizar la tasa de aciertos en caché L1/L2.
- **Disciplina de Memoria**: Uso estricto de arenas de memoria y ring buffers preasignados en bucles críticos para erradicar pausas por recolección de basura.
- **Transparencia ante Fallos**: Manejo explícito de errores, recuperación determinista ante caídas mediante WAL y pruebas exhaustivas basadas en propiedades.

---

## 💻 Configuración de Estación de Trabajo

- **Sistema Operativo**: Arch Linux (Kernel `linux-zen`) con compositor Wayland Sway
- **Editor de Código**: Neovim (configuración personalizada en Lua puro, Treesitter, LSP nativo)
- **Terminal**: WezTerm con gestión de sesiones en Tmux
- **Teclado**: Teclado ergonómico dividido Corne (distribución Colemak-DH, 42 teclas, firmware QMK)
- **Equipo de Audio**: Arturia KeyStep Pro, sintetizador modular Eurorack, Beyerdynamic DT 1990 Pro

---

## 🤝 Conectemos y Colaboremos

Siempre estoy disponible para debatir sobre motores de almacenamiento, telemetría a nivel de kernel, protocolos de red zero-copy y arquitectura de sistemas de código abierto.

```text
Correo:      simon.vance.dev@gmail.com
Matrix:      @simonvance:matrix.org
Clave PGP:   8F4B 2C91 E0D3 7A88 41F2  990C 5E3A 1204 D91A B7C2
GitHub:      https://github.com/gmhmjmkmlm-rgb
Debates:     Abre un Issue o escribe en GitHub Discussions
```

---

*“La simplicidad es un prerrequisito para la fiabilidad.” — Edsger W. Dijkstra*
