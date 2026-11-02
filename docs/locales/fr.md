| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [BR Português](./pt-BR.md) | [SA العربية](./ar.md) |

---

# Bonjour, moi c'est Simon 👋

Je conçois et développe des logiciels système à très faible latence, des moteurs de stockage distribués et des composants réseau haute performance. Mon travail se situe au carrefour du noyau Linux, de la concurrence sans verrou (lock-free) et de la sympathie mécanique avec le matériel (Mechanical Sympathy). Quand je ne suis pas en train d'optimiser l'agencement mémoire ou d'analyser des pertes de paquets avec eBPF, je conçois des circuits de synthétiseurs audio analogiques et des claviers mécaniques ergonomiques.

- 🔭 **Sujet actuel** : Conception d'une couche de réplication asynchrone zéro-copie (zero-copy) pour magasins d'événements distribués en écriture seule (append-only).
- ⚡ **Philosophie d'ingénierie** : Une latence p99 prévisible surpasse toujours un débit de pointe théorique. Mesurer avec les compteurs matériels (PMU) avant toute spéculation.
- 💬 **Sujets d'échange** : Rust, Zig, programmation système sous Linux, arbres LSM, DPDK, télémétrie eBPF et traitement du signal audio (DSP).
- 📍 **Localisation** : Stockholm, Suède (UTC+1 / UTC+2)
- 📫 **Me joindre** : `simon.vance.dev@gmail.com`

---

## 🛠️ Disciplines d'Ingénierie & Stack Technique

J'accorde une importance primordiale aux logiciels qui exploitent la mémoire système, les lignes de cache processeur et les blocs de stockage avec une rigueur absolue. Voici ma boîte à outils quotidienne :

| Domaine | Outils & Langages Principaux | Pratiques & Approches |
| :--- | :--- | :--- |
| **Systèmes & Cœur** | Rust, Zig, C Moderne (C11/C23), Go | Structures de données sans verrou, chemins zéro-allocation, vectorisation SIMD |
| **Réseau & Noyau** | eBPF / XDP, `io_uring`, epoll, QUIC | Analyse de paquets bruts, contournement du noyau (kernel bypass), pipelines réseau dédiés |
| **Stockage & Données** | RocksDB, moteurs LSM sur mesure, SQLite, DuckDB | Journalisation WAL (Write-Ahead Logging), arbres B cache-oblivious, sérialisation zéro-copie |
| **Infrastructure & Observabilité** | Linux (Arch / Debian), Docker, perf, bpftrace, Prometheus | Profilage mémoire (valgrind, dhat), flamegraphs, compteurs de performance matérielle |
| **Environnement & Outils** | Neovim, WezTerm, Git, Bash/Zsh, Make, CMake | Ergonomie tout-clavier, débogage natif en terminal, chaînes de compilation reproductibles |

---

## 🚀 Projets Open Source Phares

Voici quelques projets d'infrastructure système que j'ai conçus et que je maintiens :

### 1. `vortex-kv`
> Moteur de stockage clé-valeur embarqué haute performance développé en Rust.
- **Architecture** : Arbre LSM (Log-Structured Merge-Tree) en ajout seul, interfacé avec les entrées-sorties directes via `io_uring`.
- **Points forts** : Aucune allocation sur le tas lors d'un accès en cache mémoire, filtres de Bloom en cascade fractionnée et compactage parallèle.
- **Performances** : Soutient plus de 420 000 écritures aléatoires par seconde sur disques NVMe avec une latence p99 déterministe sous la milliseconde.

### 2. `meshpipe`
> Multiplexeur de paquets UDP/QUIC modulaire et sonde de télémétrie réseau écrit en Zig.
- **Architecture** : File d'attente d'événements alimentée par des allocateurs d'arène et des tampons circulaires alignés sur les lignes de cache.
- **Points forts** : Pré-filtrage des paquets au niveau du noyau via un crochet eBPF XDP, calcul de sommes de contrôle SIMD en espace utilisateur.
- **Cas d'usage** : Synchronisation d'état distribué en temps réel entre nœuds de grappes en périphérie (edge) sur réseaux instables.

### 3. `chronos-probe`
> Démon de télémétrie noyau léger implémenté en Go et C (eBPF).
- **Architecture** : Attache des tracepoints et des kprobes à la couche des blocs disque et à la pile TCP sans interrompre ni recompiler les binaires applicatifs.
- **Points forts** : Génère des histogrammes Prometheus à coût système nul pour mesurer la latence des fautes de page et la rétention de file d'ordonnancement.
- **Cas d'usage** : Diagnostic précis des hausses subites de latence de queue (Tail Latency) dans les microservices critiques.

### 4. `poly-dsp`
> Moteur de synthèse sonore polyphonique à tables d'ondes en C moderne.
- **Architecture** : Tampon circulaire audio sans verrou, oscillateurs vectorisés SSE/AVX2 et synthèse par étapes à bande limitée (BLEP).
- **Points forts** : Traite de l'audio en temps réel à 96kHz / 32-bit flottant avec moins de 1,2% de charge sur un seul cœur processeur x86_64.

---

## 📊 Vision Architecturale des Systèmes

```
 [ Couche Client ]
        │  (QUIC / Protocole Binaire Dédié)
        ▼
 [ Filtre eBPF XDP ] ─── (Rejet Précoce / Traitement Rapide)
        │
        ▼ (File d'Achèvement io_uring du Noyau Linux)
 [ Tampon Circulaire / Files SPSC ] ── Alignement Cache-line
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ Arène Mémoire / Hors Tas ]   [ Persistance Disque WAL ]
   │ (Scan d'Index SIMD)           │ (Direct I/O O_DIRECT)
   └───────────────┬───────────────┘
                   ▼
       [ Moteur de Requête d'État ]
```

- **Sympathie Mécanique** : Priorité à l'agencement en structure de tableaux (SoA) plutôt qu'en tableau de structures (AoS) pour optimiser la rétention en cache L1/L2.
- **Discipline d'Allocation** : Utilisation stricte d'arènes mémoire et de tampons circulaires préalloués dans les boucles critiques ; élimination totale des pauses imprévues.
- **Transparence face aux Pannes** : Gestion explicite des erreurs, rétablissement prévisible après incident via le journal WAL et couverture complète par tests de propriétés.

---

## 💻 Environnement de Travail & Matériel

- **Système d'Exploitation** : Arch Linux (Noyau `linux-zen`) sous compositeur Wayland Sway
- **Éditeur de Code** : Neovim (configuration sur mesure en Lua pur, Treesitter, LSP natif)
- **Émulateur de Terminal** : WezTerm avec gestionnaire de sessions Tmux
- **Clavier** : Clavier ergonomique scindé Corne (disposition Colemak-DH, 42 touches, firmware QMK personnalisé)
- **Équipement Audio** : Arturia KeyStep Pro, système modulaire Eurorack, casque Beyerdynamic DT 1990 Pro

---

## 🤝 Échangeons & Collaborons

Je suis toujours partant pour discuter de moteurs de stockage, de télémétrie au niveau du noyau, de réseaux zéro-copie ou d'architecture logicielle open source.

```text
E-mail :     simon.vance.dev@gmail.com
Matrix :     @simonvance:matrix.org
Clé PGP :    8F4B 2C91 E0D3 7A88 41F2  990C 5E3A 1204 D91A B7C2
GitHub :     https://github.com/gmhmjmkmlm-rgb
Échanges :   Ouvrez un ticket (Issue) ou démarrez un fil sur GitHub Discussions
```

---

*« La simplicité est la condition préalable absolue à la fiabilité. » — Edsger W. Dijkstra*
