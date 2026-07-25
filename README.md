# 헬스장 회원관리 시스템 — 백엔드

헬스장 회원의 신체 능력을 **수치화·평균화·시각화**하고, 시간에 따른 변화를 추적하는 데이터 기반 PT 관리 시스템의 백엔드입니다.
단순 회원 CRUD가 아니라, 트레이너가 입력한 등급(A/B/C…)을 내부 점수로 환산해 6영역 종합 점수를 산출하고, 목표 대비 진행률의 "정체/급변"을 판정하는 도메인 로직이 핵심입니다.

## 핵심 기능

- **회원/회원권 관리**: 3단계 위저드 통합 등록(회원 + 회원권 + 초기 측정값), PT 횟수 관리
- **체력평가 시스템**: 하체 근력·심폐지구력·근지구력·유연성·체성분·안정성 6영역 평가 → 등급→점수 환산 → 가중 평균 종합 점수
- **운동 기록 & 근력 분석**: 1RM 추정(Epley/Brzycki/Lombardi), 체중 대비 상대 강도, StrengthLevel.com 기준 레벨 판정
- **프로그램 진행률 추적**: 목표 유형별 진행률 계산, 최근 2회 측정값 기반 "정체/급변" 추세 판정(위험도 GREEN/YELLOW/RED)
- **인사이트 대시보드**: 센터 전체 평균, 위험 회원 목록, 주간 요약 (관리자/트레이너 전용)
- **인증/인가**: JWT 기반 인증 + 카카오 소셜 로그인, 역할(ADMIN/TRAINER/MEMBER) 기반 접근 제어

## 기술 스택

| 구분      | 기술                                |
| --------- | ----------------------------------- |
| Framework | NestJS (TypeScript)                 |
| ORM       | TypeORM                             |
| Database  | PostgreSQL                          |
| 인증      | JWT (passport-jwt) + Kakao OAuth    |
| 검증      | class-validator / class-transformer |
| API 문서  | Swagger (@nestjs/swagger)           |
| 테스트    | Jest                                |
| 배포      | Docker (멀티스테이지 빌드)          |

## 아키텍처

```mermaid
flowchart LR
    subgraph Client
        FE[React SPA]
    end

    subgraph NestJS["NestJS Backend"]
        Guard["JwtRolesGuard / RolesGuard"]
        Auth[auth]
        Members[members]
        Assessments[assessments]
        Analytics[analytics]
        Insights[insights]
        StrengthLevel[strength-level]
        Exercises[exercises]
    end

    DB[(PostgreSQL)]

    FE -->|REST + JWT| Guard --> Auth
    Guard --> Members
    Guard --> Assessments
    Guard --> Analytics
    Guard --> Insights
    Guard --> StrengthLevel
    Guard --> Exercises

    Members --> DB
    Assessments --> DB
    Analytics --> DB
    Insights --> DB
    StrengthLevel --> DB
    Exercises --> DB
```

### 도메인 엔티티 관계 (요약)

```mermaid
erDiagram
    Member ||--o{ Membership : has
    Member ||--o{ Assessment : "receives"
    Member ||--o{ WorkoutRecord : logs
    Member ||--o{ InjuryHistory : has
    Membership ||--o{ ProgramMilestone : "4주 블록"
    Assessment ||--o{ AssessmentItem : contains
    Assessment ||--|| AbilitySnapshot : produces
    InjuryHistory ||--o{ InjuryRestriction : restricts
    WorkoutRecord }o--|| Exercise : references
```

## 도메인 로직

### 1) 체력평가 6영역 → 종합 점수

| 영역                | 가중치 |
| ------------------- | :----: |
| 안정성(Stability)   |  20%   |
| 심폐지구력(Cardio)  |  20%   |
| 근지구력(Endurance) |  20%   |
| 하체 근력(Strength) |  15%   |
| 체성분(Body)        |  15%   |
| 유연성(Flexibility) |  10%   |

- 트레이너가 입력한 등급(A/B/C/D-1/D-2 등)을 `GradeScoreConverter`가 0~100점 내부 점수로 환산한다.
- `ScoreCalculator`가 영역별 내부 점수를 위 가중치로 합산해 종합 점수를 계산한다. 측정하지 않았거나 부상으로 제외된 영역은 가중치를 재정규화(남은 가중치 기준으로 나눔)해 계산에서 빠진다.
- 부상 회복 중(`RECOVERING`)/만성(`CHRONIC`) 상태인 신체 부위는 해당 평가 영역 점수를 자동으로 제외한다.

(`src/common/utils/score-calculator.ts`, `grade-score-converter.ts`)

### 2) 프로그램 진행률 — "정체/급변" 추세 판정

목표(체중 감량/근력 상승/체력 증진/유지) 유형별로 최근 측정값의 변화량을 임계값과 비교해 위험도를 판정한다.

| 목표              | 정체 기준(YELLOW) | 급변 기준(플래그) |
| ----------------- | :---------------: | :---------------: |
| 체중 감량         |      ±0.5kg       |    1.5kg 이상     |
| 근력 상승         |      ±2.5kg       |    7.5kg 이상     |
| 체력 증진         |       ±5초        |     20초 이상     |
| 유지(MAINTENANCE) |      ±0.5kg       |    1.0kg 이상     |

- 측정 2회 미만이면 `FOUNDATION`(기초 단계)으로 판정하고 추세 판정은 하지 않는다.
- 최근 변화량이 정체 기준 이내면 `YELLOW`, 목표 방향으로 개선 중이면 `GREEN`, 단기적으로 역행해도 측정 3회 이상이고 장기 추세가 개선 중이면 `YELLOW`, 그렇지 않으면 `RED`로 판정한다.
- 급변 기준 이상 변화가 있으면 방향에 따라 `rapid_progress`/`rapid_decline` 플래그가 함께 표시된다.
- 위 임계값은 의학/피트니스 연구 자료를 근거로 초안을 설정했으며, 실제 현장 트레이너 피드백을 받아 검증하는 과정을 거쳤다.

(`src/common/utils/progress-calculator.ts`, `src/common/enums/program.enum.ts`)

### 3) 1RM / 상대 강도 / Strength Level

- 1RM은 Epley 공식(`weight × (1 + reps/30)`)을 기본으로 사용하며 Brzycki·Lombardi 공식도 지원한다.
- 상대 강도(%) = `(1RM / 체중) × 100`
- StrengthLevel.com 기준 데이터(`strength_standards`)와 회원의 체중·성별을 비교해 BEGINNER~ELITE 5단계로 판정한다.

(`src/common/utils/one-rep-max-calculator.ts`, `relative-strength-calculator.ts`, `strength-level-evaluator.ts`)

## 로컬 실행

### 사전 요구사항

- Node.js 20+, PostgreSQL 14+

### 1. 의존성 설치 및 환경 변수 설정

```bash
npm install
cp .env.example .env
# .env에서 DATABASE_URL, JWT_SECRET 등을 채워 넣는다
```

### 2. 데이터베이스 마이그레이션

```bash
npm run migration:run
```

### 3. 개발 서버 실행

```bash
npm run start:dev
# http://localhost:3001
```

## API 문서

서버 실행 후 Swagger UI에서 전체 엔드포인트, 요청/응답 스키마, JWT 인증 테스트를 확인할 수 있다.

```
http://localhost:3001/api
```

헬스체크: `GET /health`

추가 API 가이드: [`docs/EXERCISE_DETAIL_GUIDE.md`](docs/EXERCISE_DETAIL_GUIDE.md), [`docs/STRENGTH_LEVEL_API_GUIDE.md`](docs/STRENGTH_LEVEL_API_GUIDE.md)

## 테스트

핵심 도메인 계산 로직(점수 산정, 정체/급변 판정, 1RM·상대강도 계산)과 역할 기반 인가 가드를 Jest로 검증한다.

```bash
npm test          # 전체 단위 테스트
npm run test:cov  # 커버리지 리포트
```

## Docker로 실행

```bash
docker build -t gym-membership-backend .
docker run --rm -p 3001:3001 \
  -e DATABASE_URL="postgresql://user:password@host:5432/db" \
  -e JWT_SECRET="change-me" \
  gym-membership-backend
```

컨테이너 기동 시 `npm run migration:run` 실행 후 앱이 시작된다.

## 프로젝트 구조

```
src/
├── common/
│   ├── enums/          # 목표·평가·상태 등 도메인 Enum
│   ├── guards/          # JWT 인증 / 역할 기반 인가 가드
│   └── utils/           # 점수 계산·진행률 판정 등 순수 도메인 로직
├── config/              # DB, CORS 설정
├── entities/             # TypeORM 엔티티
├── migrations/           # TypeORM 마이그레이션
├── modules/
│   ├── auth/            # JWT / 카카오 로그인
│   ├── members/         # 회원·회원권·PT·운동기록 (핵심)
│   ├── assessments/     # 체력평가
│   ├── analytics/       # 평균/비교 분석
│   ├── insights/        # 센터 대시보드
│   ├── exercises/       # 운동 정보
│   └── strength-level/  # 근력 레벨 계산
└── main.ts
```

## 에러 응답 형식

```typescript
// 성공
{ success: true, data: {...}, message?: string }

// 실패
{ success: false, error: { code: string, message: string, details?: unknown } }
```
