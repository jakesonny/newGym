# Gym Membership Backend - 프로젝트 개요

> 헬스장 회원 관리 및 PT 프로그램 관리 시스템 백엔드

---

## 1. 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | NestJS (TypeScript) |
| Database | PostgreSQL |
| ORM | TypeORM |
| Authentication | JWT + Kakao OAuth |
| API Docs | Swagger |

---

## 2. DB 구조 (Entity 관계도)

```
┌─────────────────────────────────────────────────────────────────┐
│                           Member                                 │
│  (회원 기본 정보: 이름, 연락처, 신체정보, 목표 등)               │
└─────────────────────────────────────────────────────────────────┘
         │
         ├──< Membership (회원권 + 프로그램)
         │         └──< ProgramMilestone (주차별 마일스톤)
         │
         ├──< PTSession (PT 수업 기록 + 측정값)
         │
         ├──< PTUsage (PT 횟수 관리)
         │
         ├──< Assessment (초기/정기 평가)
         │         └──○ AbilitySnapshot (6영역 점수)
         │
         ├──< WorkoutRecord (운동 기록)
         │
         ├──< WorkoutRoutine (추천 운동 루틴)
         │
         └──< InjuryHistory (부상 이력)
                   └──< InjuryRestriction (제한 운동)
```

### 2.1 핵심 엔티티

| Entity | 설명 |
|--------|------|
| **Member** | 회원 기본 정보 (이름, 연락처, 신체정보, 목표, 진행률) |
| **Membership** | 회원권 + 프로그램 정보 (기간, 목표, 진행률, 위험상태) |
| **PTSession** | PT 수업 기록 (내용, 측정값, 트레이너 코멘트) |
| **PTUsage** | PT 횟수 관리 (총/잔여/사용) |
| **Assessment** | 회원 평가 (정적/동적 평가 데이터) |
| **AbilitySnapshot** | 6영역 능력 점수 (레이더 차트용) |
| **WorkoutRecord** | 운동 기록 (무게, 횟수, 세트, 볼륨, 1RM) |
| **ProgramMilestone** | 프로그램 주차별 목표/달성 기록 |
| **InjuryHistory** | 부상 이력 및 제한 운동 |

---

## 3. 주요 Enum 타입

### 3.1 회원/회원권 상태
```typescript
MemberStatus: ACTIVE | INACTIVE | SUSPENDED
MembershipStatus: ACTIVE | EXPIRED | SUSPENDED
MembershipType: MONTHLY | QUARTERLY | YEARLY | LIFETIME
```

### 3.2 프로그램 관련
```typescript
GoalType: WEIGHT_LOSS | MUSCLE_GAIN | STRENGTH_UP | ENDURANCE | BODY_FAT_LOSS | CUSTOM
RiskStatus: GREEN (정상) | YELLOW (주의) | RED (위험)
ProgramDuration: 4 | 8 | 12 (주)
```

### 3.3 운동/평가 관련
```typescript
StrengthLevel: BEGINNER | NOVICE | INTERMEDIATE | ADVANCED | ELITE
Gender: MALE | FEMALE
AssessmentType: INITIAL | REGULAR
EvaluationType: STATIC | DYNAMIC
```

---

## 4. 핵심 기능 및 API

### 4.1 회원 관리
| API | 설명 |
|-----|------|
| `POST /api/members` | 기본 회원 등록 |
| `POST /api/members/full` | 3단계 위저드 통합 등록 (회원+회원권+측정값) |
| `GET /api/members/:id` | 회원 상세 조회 |
| `GET /api/members/:id/dashboard` | 회원 대시보드 |
| `GET /api/members/:id/goal-analyst` | 목표 분석 데이터 |

### 4.2 PT 세션
| API | 설명 |
|-----|------|
| `GET /api/members/:id/pt-sessions` | PT 세션 목록 |
| `POST /api/members/:id/pt-sessions` | PT 세션 생성 (측정값 포함) |

### 4.3 운동 기록
| API | 설명 |
|-----|------|
| `GET /api/members/:id/workout-records` | 운동 기록 목록 |
| `GET /api/members/:id/one-rep-max-estimate` | 1RM 추정치 |
| `GET /api/members/:id/workout-records/volume-trend` | 볼륨 추세 |
| `GET /api/members/:id/strength-progress` | 근력 진행 상황 |

### 4.4 평가 시스템
| API | 설명 |
|-----|------|
| `POST /api/assessments` | 평가 생성 |
| `GET /api/members/:id/abilities/hexagon` | 6영역 레이더 차트 데이터 |
| `GET /api/members/:id/abilities/history` | 평가 히스토리 |
| `GET /api/members/:id/abilities/compare` | 평가 비교 |

### 4.5 Strength Level (비로그인 가능)
| API | 설명 |
|-----|------|
| `POST /api/strength-level/calculate` | 빅3 운동 레벨 계산 |

### 4.6 센터 대시보드
| API | 설명 |
|-----|------|
| `GET /api/insights/center-dashboard` | 센터 전체 통계 |
| `GET /api/insights/risk-members` | 위험 회원 목록 |

---

## 5. 주요 계산 로직

### 5.1 1RM (One Rep Max) 계산
```typescript
// Brzycki 공식
1RM = weight × (36 / (37 - reps))

// 적용: reps가 1~10 범위일 때 가장 정확
```

### 5.2 볼륨 계산
```typescript
volume = weight × reps × sets
```

### 5.3 진행률 계산
```typescript
// 감소 목표 (체중 감량, 체지방 감량)
progress = (startValue - currentValue) / (startValue - targetValue) × 100

// 증가 목표 (근육량 증가, 근력 상승)
progress = (currentValue - startValue) / (targetValue - startValue) × 100
```

### 5.4 위험 상태 판정
```typescript
// 예상 진행률 대비 실제 진행률 비교
GREEN:  실제 >= 예상의 70%
YELLOW: 실제 30~70%
RED:    실제 < 30%
```

### 5.5 6영역 능력 점수 (AbilitySnapshot)
| 영역 | 설명 |
|------|------|
| strengthScore | 근력 점수 |
| cardioScore | 심폐 점수 |
| enduranceScore | 지구력 점수 |
| flexibilityScore | 유연성 점수 |
| bodyScore | 체형 점수 |
| stabilityScore | 안정성 점수 |
| **totalScore** | 종합 점수 |

---

## 6. 유틸리티 함수

| 유틸리티 | 용도 |
|----------|------|
| `OneRepMaxCalculator` | 1RM 계산 |
| `WorkoutRecordHelper` | 운동 기록 필터링/그룹핑 |
| `DateRangeHelper` | 날짜 범위 계산 |
| `AnalyticsHelper` | 헥사곤 차트 데이터 변환 |
| `ProgressCalculator` | 진행률 계산 |
| `StrengthLevelEvaluator` | 근력 레벨 판정 |
| `ApiResponseHelper` | API 응답 포맷 통일 |
| `MemberHelper` | 회원 관련 헬퍼 |

---

## 7. 인증/권한

### 7.1 역할 (Role)
```typescript
Role: ADMIN | TRAINER | MEMBER
```

### 7.2 인증 방식
- **JWT**: Access Token + Refresh Token
- **Kakao OAuth**: 소셜 로그인 지원

### 7.3 권한 가드
```typescript
@UseGuards(JwtRolesGuard)
@Roles(Role.ADMIN, Role.TRAINER)
```

---

## 8. 프로젝트 흐름

### 8.1 회원 등록 → PT 진행 흐름
```
1. 회원 등록 (POST /api/members/full)
   └─ Member + Membership + PTUsage 생성

2. 초기 평가 (POST /api/assessments)
   └─ Assessment + AbilitySnapshot 생성

3. PT 세션 진행 (POST /api/members/:id/pt-sessions)
   └─ PTSession 생성 + 측정값 기록
   └─ ProgramMilestone 자동 생성 (선택)

4. 운동 기록 (POST /api/members/:id/workout-records)
   └─ WorkoutRecord 생성 + 1RM 자동 계산

5. 정기 평가 (POST /api/assessments)
   └─ 새 AbilitySnapshot으로 진행 상황 비교
```

### 8.2 데이터 흐름
```
입력 데이터 → 자동 계산 → 저장 → 분석/시각화

예시:
- 운동 기록 입력 → 1RM/볼륨 자동 계산 → WorkoutRecord 저장
- PT 세션 측정값 → 진행률 계산 → Membership.currentProgress 업데이트
- 평가 점수 입력 → 6영역 점수 계산 → AbilitySnapshot 저장
```

---

## 9. 디렉토리 구조

```
src/
├── common/
│   ├── enums/          # Enum 타입 정의
│   └── utils/          # 유틸리티 함수
├── config/             # DB, CORS 설정
├── entities/           # TypeORM 엔티티 (20개)
├── modules/
│   ├── auth/           # 인증/인가
│   ├── members/        # 회원 관리 (핵심)
│   ├── assessments/    # 평가 시스템
│   ├── analytics/      # 분석 기능
│   ├── insights/       # 대시보드/인사이트
│   ├── exercises/      # 운동 정보
│   └── strength-level/ # 근력 레벨 계산
└── main.ts
```

---

## 10. 개발 상태 요약

| Phase | 내용 | 상태 |
|-------|------|------|
| 1 | 빅3 Strength Level 측정기 | ✅ 완료 |
| 2 | 프로그램 관리 시스템 (엔티티) | ✅ 완료 |
| 3 | 회원 등록 API 확장 (3단계 위저드) | ✅ 완료 |
| 4 | 회원 상세/대시보드 API 확장 | ✅ 완료 |
| 5 | 3영역 카드 + 티어 시스템 | 📋 협의 필요 |

---

*마지막 업데이트: 2026-01-21*
