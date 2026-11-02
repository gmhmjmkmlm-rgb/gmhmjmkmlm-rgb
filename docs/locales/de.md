| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [BR Português](./pt-BR.md) | [SA العربية](./ar.md) |

---

# Hallo, ich bin Simon 👋

Ich entwickle latenzarme Systemsoftware, verteilte Speicher-Engines und performante Netzwerk-Primitive. Mein technischer Schwerpunkt liegt an der Schnittstelle von Linux-Kernel-Schnittstellen, sperrfreier Nebenläufigkeit (lock-free concurrency) und hardwarenaher Systemarchitektur (Mechanical Sympathy). Wenn ich nicht gerade Speicherlayouts optimiere oder Paketverluste mit eBPF analysiere, baue ich analoge Synthesizer-Schaltungen und ergonomische mechanische Tastaturen.

- 🔭 **Aktueller Fokus**: Entwurf einer Zero-Copy-Replikationsschicht für verteilte Append-Only-Ereignisspeicher.
- ⚡ **Ingenieurgrundsatz**: Vorhersehbare p99-Latenz schlägt Spitzen-Durchsatz. Immer zuerst mit Hardware-Performance-Countern messen, statt zu raten.
- 💬 **Themen**: Rust, Zig, Linux-Systemprogrammierung, LSM-Trees, DPDK, eBPF-Telemetrie und Audio-Signalverarbeitung (DSP).
- 📍 **Standort**: Stockholm, Schweden (UTC+1 / UTC+2)
- 📫 **Kontakt**: `simon.vance.dev@gmail.com`

---

## 🛠️ Fachbereiche & Technologiestack

Ich lege höchsten Wert auf Software, die Arbeitsspeicher, CPU-Cache-Zeilen und Festplattensektoren mit physischem Respekt behandelt. Dies sind die Werkzeuge, die ich täglich einsetze:

| Domäne | Kerntechnologien & Sprachen | Schwerpunkte & Praktiken |
| :--- | :--- | :--- |
| **Systeme & Core** | Rust, Zig, Modernes C (C11/C23), Go | Sperrfreie Datenstrukturen, Zero-Allocation-Pfade, SIMD-Vektorisierung |
| **Netzwerk & Kernel** | eBPF / XDP, `io_uring`, epoll, QUIC | Raw-Socket-Parsing, Kernel-Bypass, maßgeschneiderte Paket-Pipelines |
| **Speicher & Daten** | RocksDB, eigene LSM-Engines, SQLite, DuckDB | Write-Ahead-Logging (WAL), Cache-optimierte B-Bäume, Zero-Copy-Serialisierung |
| **Infrastruktur & Observability** | Linux (Arch / Debian), Docker, perf, bpftrace, Prometheus | Speicherprofiling (valgrind, dhat), Flamegraphs, Hardware-PMU-Zähler |
| **Arbeitsumgebung** | Neovim, WezTerm, Git, Bash/Zsh, Make, CMake | Tastaturzentrierter Workflow, Terminal-Debugging, reproduzierbare Builds |

---

## 🚀 Ausgewählte Open-Source-Projekte

Eine Auswahl an Infrastrukturprojekten, die ich konzipiert habe und aktiv pflege:

### 1. `vortex-kv`
> Extrem performante, eingebettete Key-Value-Speicher-Engine in Rust.
- **Architektur**: Append-Only Log-Structured Merge-Tree (LSM-Tree), angebunden über `io_uring` Direct-I/O.
- **Highlights**: Null Heap-Allokationen bei Cache-Treffern, fraktionierte kaskadierende Bloom-Filter und parallele Verdichtungs-Pipelines.
- **Leistungsdaten**: Bewältigt über 420.000 wahlfreie Schreibzugriffe pro Sekunde auf NVMe-Medien bei deterministischer Latenz im Sub-Millisekundenbereich (p99).

### 2. `meshpipe`
> Modularer UDP/QUIC-Paketmultiplexer und latenzarmer Telemetriefühler in Zig.
- **Architektur**: Ereignisgesteuerter Worker-Pool auf Basis von Arena-Allokatoren und an Cache-Zeilen ausgerichteten Ringpuffern.
- **Highlights**: Frühes Paketfiltern im Kernel per eBPF-XDP-Hook mit SIMD-Prüfsummenberechnung im Userspace.
- **Einsatzbereich**: Zustandssynchronisation zwischen Edge-Cluster-Knoten über verlustbehaftete Netzwerkverbindungen in Echtzeit.

### 3. `chronos-probe`
> Schlanker Kernel-Telemetrie-Daemon, implementiert in Go und C (eBPF).
- **Architektur**: Koppelt Tracepoints und kprobes an die Festplatten-Blockschicht sowie den TCP-Stack, ohne laufende Binärdateien zu verändern.
- **Highlights**: Erzeugt ohne messbaren Overhead Prometheus-Histogramme für Page-Fault-Latenzen und Scheduler-Warteschlangenzeiten.
- **Einsatzbereich**: Aufspüren unerwarteter Tail-Latency-Spitzen in produktionskritischen verteilten Systemen.

### 4. `poly-dsp`
> Leichtgewichtige polyphone Wavetable-Synthesizer-Engine in modernem C.
- **Architektur**: Sperrfreier Audio-Ringpuffer mit SSE/AVX2-vektorisierten Oszillatoren und bandbegrenzter BLEP-Signalgenerierung.
- **Highlights**: Berechnet 96kHz / 32-Bit-Float-Audio in Echtzeit bei unter 1,2% Single-Core-CPU-Auslastung auf x86_64.

---

## 📊 Systemarchitektur & Denkweise

```
 [ Client-Ebene ]
        │  (QUIC / Proprietäres Binärprotokoll)
        ▼
 [ eBPF XDP-Filter ] ─── (Frühes Verwerfen / Fast-Path)
        │
        ▼ (Linux-Kernel io_uring Completion-Queue)
 [ Ringpuffer / SPSC-Queues ] ── Cache-Zeilen-Padding
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ Speicher-Arena / Off-Heap ]   [ WAL-Festplatten-Persistenz ]
   │ (SIMD-Index-Abtastung)        │ (Direct-I/O O_DIRECT)
   └───────────────┬───────────────┘
                   ▼
         [ Konsistente Zustandsabfrage ]
```

- **Mechanical Sympathy**: Bevorzugung von Structure-of-Arrays (SoA) gegenüber Array-of-Structures (AoS) zur Maximierung der L1/L2-Cache-Trefferquote.
- **Strikte Allokationsdisziplin**: Verwendung von Speicher-Arenen und vorallokierten Ringpuffern in Hot-Loops verhindert unvorhersehbare Pausen.
- **Fehlertransparenz**: Explizite Fehlerbehandlung, deterministische Wiederherstellung nach Abstürzen via WAL und lückenlose eigenschaftsbasierte Tests (Property-Based Testing).

---

## 💻 Arbeitsplatz & Setup

- **Betriebssystem**: Arch Linux (Kernel `linux-zen`) mit Sway (Wayland-Compositor)
- **Editor**: Neovim (individuelle Konfiguration in reinem Lua, Treesitter, nativer LSP)
- **Terminal**: WezTerm mit Tmux-Sitzungsverwaltung
- **Tastatur**: Ergonomische geteilte Tastatur Corne (Colemak-DH-Belegung, 42 Tasten, maßgeschneiderte QMK-Firmware)
- **Audiogeräte**: Arturia KeyStep Pro, Eurorack Modularsystem, Beyerdynamic DT 1990 Pro

---

## 🤝 Austausch & Zusammenarbeit

Ich freue mich stets über fundierte Diskussionen zu Speicher-Engines, Kernel-Telemetrie, Zero-Copy-Netzwerkprotokollen und Open-Source-Systemarchitektur.

```text
E-Mail:      simon.vance.dev@gmail.com
Matrix:      @simonvance:matrix.org
PGP-Key:     8F4B 2C91 E0D3 7A88 41F2  990C 5E3A 1204 D91A B7C2
GitHub:      https://github.com/gmhmjmkmlm-rgb
Austausch:   Erstelle ein Issue oder starte eine GitHub Discussion
```

---

*„Einfachheit ist die absolute Voraussetzung für Zuverlässigkeit.“ — Edsger W. Dijkstra*
