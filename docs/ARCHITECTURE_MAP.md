# Architecture Map

## 1. Directory Structure
```
c:\github_gmhmjmkmlm\
├── .env                     # API 토큰 환경 변수 파일
├── tokens.json              # 구조화된 토큰 메타데이터 (에이전트/도구용)
├── README.md                # GitHub 프로필 메인 (English)
├── GUIDE.md                 # 프로젝트 가이드
├── config\
│   └── env_loader.js        # 토큰 로더 모듈
├── docs\
│   ├── ARCHITECTURE_MAP.md  # 아키텍처 매핑 문서
│   ├── locales\             # 9개 언어별 프로필 문서 (ko, ja, zh-CN, es, fr, de, ru, pt-BR, ar)
│   └── profiles\            # 타 플랫폼 프로필 설정 (GitLab, Hugging Face)
├── memory\
│   └── tasks.md             # 통합 작업 인덱스
└── chrome_profile\          # 로컬 브라우저 프로필 디렉토리
```

## 2. Platform Profile Sync
- **GitHub**: Simon Vance (@gmhmjmkmlm) - Systems, Storage, Linux Kernel, eBPF, DSP
- **GitLab**: Simon Vance (@gmhmjmkmlm) - Benchmark runners, CI/CD kernels, storage regression pipelines
- **Hugging Face**: Simon Vance (@gmhmjmkmlm) - Edge audio inference, 4-bit quantization, SIMD tensor kernels
