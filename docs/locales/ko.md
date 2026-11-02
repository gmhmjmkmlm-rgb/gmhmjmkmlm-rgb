| [KR 한국어](./ko.md) | [US English](../../README.md) | [JP 日本語](./ja.md) | [CN 简体中文](./zh-CN.md) | [ES Español](./es.md) |
| :---: | :---: | :---: | :---: | :---: |
| [FR Français](./fr.md) | [DE Deutsch](./de.md) | [RU Русский](./ru.md) | [BR Português](./pt-BR.md) | [SA العربية](./ar.md) |

---

# 안녕하세요, 시스템 엔지니어 사이먼(Simon)입니다 👋

저는 초저지연 시스템 소프트웨어, 분산 스토리지 엔진, 고성능 네트워크 코어를 설계하고 구현합니다. 주요 연구 및 개발 영역은 리눅스 커널 인터페이스, 락프리(Lock-free) 동시성 제어, 그리고 하드웨어 친화적 아키텍처(Mechanical Sympathy)에 집중되어 있습니다. 메모리 레이아웃 최적화나 eBPF를 통한 패킷 드롭 추적을 하지 않을 때는 아날로그 신시사이저 회로와 커스텀 기계식 키보드를 만듭니다.

- 🔭 **현재 집중 과제**: 추가 전용(Append-only) 분산 이벤트 저장소를 위한 제로카피 비동기 복제 계층 설계
- ⚡ **엔지니어링 철학**: 최대 처리량(Peak Throughput)보다 예측 가능한 p99 지연 시간이 훨씬 중요합니다. 추측하기 전에 항상 하드웨어 성능 카운터로 실측합니다.
- 💬 **주요 관심사/문답**: Rust, Zig, Linux 시스템 프로그래밍, LSM-Tree, DPDK, eBPF 텔레메트리, 오디오 DSP
- 📍 **활동 거점**: 스웨덴 스톡홀름 (UTC+1 / UTC+2)
- 📫 **연락처**: `simon.vance.dev@gmail.com`

---

## 🛠️ 전문 엔지니어링 영역 및 기술 스택

시스템 메모리, CPU 캐시 라인, 디스크 블록을 물리적 수준에서 깊이 이해하고 존중하는 소프트웨어를 지향합니다. 주로 사용하는 도구와 기술은 다음과 같습니다:

| 영역 | 핵심 도구 및 기술 | 중점 개발 프랙티스 |
| :--- | :--- | :--- |
| **시스템 & 코어** | Rust, Zig, Modern C (C11/C23), Go | 락프리 자료구조, 제로 할당(Zero-allocation), SIMD 벡터화 연산 |
| **네트워크 & 커널** | eBPF / XDP, `io_uring`, epoll, QUIC | 로우 소켓 파싱, 커널 바이패스, 전용 고속 패킷 파이프라인 |
| **스토리지 & 데이터** | RocksDB, 자체 제작 LSM 엔진, SQLite, DuckDB | WAL(Write-Ahead Logging), 캐시 최적화 B-Tree, 제로카피 직렬화 |
| **인프라 & 관측성** | Linux (Arch / Debian), Docker, perf, bpftrace, Prometheus | 메모리 프로파일링(valgrind, dhat), 플레임그래프, 하드웨어 PMU 카운터 |
| **환경 & 툴체인** | Neovim, WezTerm, Git, Bash/Zsh, Make, CMake | 키보드 중심 워크플로우, 터미널 네이티브 디버깅, 재현 가능한 빌드 |

---

## 🚀 대표 오픈소스 프로젝트

직접 아키텍처를 설계하고 운영 중인 주요 인프라 프로젝트들입니다:

### 1. `vortex-kv`
> Rust 기반 초고성능 임베디드 키-값(Key-Value) 스토리지 엔진.
- **아키텍처**: `io_uring` Direct I/O 기반 추가 전용 로그 구조 병합 트리(LSM-Tree).
- **특징**: 읽기 캐시 적중 시 힙 메모리 할당 0건, 분수 계단식 블룸 필터(Fractional Cascading Bloom Filters), 병렬 컴팩션 파이프라인.
- **성능 지표**: NVMe 디바이스 환경에서 p99 서브밀리초 지연 시간 유지 및 초당 42만 회 이상의 무작위 쓰기 연산 처리.

### 2. `meshpipe`
> Zig로 작성된 모듈식 UDP/QUIC 패킷 멀티플렉서 및 실시간 텔레메트리 프로브.
- **아키텍처**: 아레나 메모리 할당기와 캐시라인 정렬 링 버퍼를 활용한 이벤트 기반 워커 풀.
- **특징**: eBPF XDP 훅을 통한 커널 레벨 패킷 사전 필터링 및 유저 영역 SIMD 체크섬 연산.
- **적용 사례**: 불안정한 네트워크 환경에서 엣지 클러스터 노드 간 실시간 분산 상태 동기화.

### 3. `chronos-probe`
> Go와 C(eBPF)로 구현된 초경량 커널 레벨 텔레메트리 데몬.
- **아키텍처**: 바이너리 재컴파일 없이 디스크 블록 계층과 TCP 스택에 tracepoint 및 kprobe 부착.
- **특징**: 페이지 폴트 지연 시간 및 OS 스케줄러 런큐 지연을 오버헤드 없이 프로메테우스 히스토그램으로 출력.
- **적용 사례**: 레이턴시에 민감한 프로덕션 분산 서비스의 꼬리 지연 시간(Tail Latency) 스파이크 근본 원인 추적.

### 4. `poly-dsp`
> 모던 C 기반 경량 다성음(Polyphonic) 웨이브테이블 오디오 신시사이저 엔진.
- **아키텍처**: 락프리 오디오 링 버퍼, SSE/AVX2 벡터화 오실레이터, 대역제한 BLEP(Bandlimited Step) 파형 합성.
- **특징**: x86_64 단일 코어 기준 CPU 점유율 1.2% 미만으로 96kHz / 32-bit 부동소수점 실시간 오디오 렌더링.

---

## 📊 시스템 설계 철학 및 아키텍처

```
 [ 클라이언트 계층 ]
        │  (QUIC / 고유 바이너리 프로토콜)
        ▼
 [ eBPF XDP 필터 ] ─── (고속 조기 드롭 / 빠른 경로)
        │
        ▼ (리눅스 커널 io_uring 완료 큐)
 [ 링 버퍼 / SPSC 큐 ] ── 캐시라인 패딩(Cache-line Padded)
        │
   ┌────┴──────────────────────────┐
   ▼                               ▼
[ 메모리 아레나 / 오프힙 ]    [ WAL 디스크 영속화 ]
   │ (SIMD 인덱스 스캔)            │ (Direct I/O O_DIRECT)
   └───────────────┬───────────────┘
                   ▼
         [ 정합 상태 쿼리 엔진 ]
```

- **하드웨어 친화성(Mechanical Sympathy)**: L1/L2 데이터 캐시 적중률 극대화를 위해 AoS(Array of Structures) 대신 SoA(Structure of Arrays) 레이아웃 채택.
- **엄격한 메모리 할당 규율**: 핫 패스 루프 내 메모리 아레나 및 사전 할당 링 버퍼 적용으로 가비지 컬렉터성 지연 급증 0% 유지.
- **장애 투명성**: 명시적 에러 전파, WAL을 통한 결정론적 크래시 복구, 전수 속성 기반 테스팅(Property-based testing).

---

## 💻 작업 환경 및 워크스테이션 구성

- **운영체제**: Arch Linux (커널 `linux-zen`), Sway Wayland 컴포지터
- **코드 에디터**: Neovim (순수 Lua 커스텀 구성, Treesitter, 내장 LSP)
- **터미널**: WezTerm + Tmux 다중 세션 관리
- **키보드**: Corne 스플릿 인체공학 키보드 (Colemak-DH 자판, 42키, 커스텀 QMK 펌웨어)
- **오디오 장비**: Arturia KeyStep Pro, 유로랙(Eurorack) 모듈러 시스템, Beyerdynamic DT 1990 Pro

---

## 🤝 협업 및 기술 교류

분산 스토리지, 커널 레벨 텔레메트리, 제로카피 네트워킹, 시스템 아키텍처에 관한 기술적인 토론을 언제나 환영합니다.

```text
이메일:       simon.vance.dev@gmail.com
매트릭스:     @simonvance:matrix.org
PGP 키:      8F4B 2C91 E0D3 7A88 41F2  990C 5E3A 1204 D91A B7C2
깃허브:       https://github.com/gmhmjmkmlm-rgb
토론방:       GitHub Discussions 또는 이슈 생성
```

---

*“단순함은 신뢰성을 보장하기 위한 절대적인 전제조건이다.” — 에츠허르 데이크스트라(Edsger W. Dijkstra)*
