# 프론트엔드 개발자를 위한 API 가이드

> 이 문서는 백엔드 개발 진행 상황과 프론트엔드에서 사용할 API 정보를 정리합니다.
> 완성된 항목은 주석 처리됩니다.

---

## Phase 1: 빅3 Strength Level 측정기 (완료)

### API 엔드포인트

```
POST /api/strength-level/calculate
```

### 특징
- **비로그인 사용 가능** (Public API) - JWT 토큰 불필요
- 빅3 운동(벤치프레스, 스쿼트, 데드리프트) 지원
- 체중/나이/성별 기반 5단계 레벨 기준 무게 제공
- 현재 무게 입력시 현재 레벨 자동 판정

### Request

```typescript
// POST /api/strength-level/calculate
// Content-Type: application/json

interface CalculateStrengthLevelRequest {
  // 운동 종류 (필수)
  exerciseType: "BENCH_PRESS" | "SQUAT" | "DEADLIFT";
  
  // 나이 - 만 나이 (필수, 15-90)
  age: number;
  
  // 체중 kg (필수, 40-200)
  bodyWeight: number;
  
  // 성별 (필수)
  gender: "MALE" | "FEMALE";
  
  // 현재 1RM 무게 kg (선택, 0-500)
  // 입력시 현재 레벨 판정
  currentWeight?: number;
}
```

### Response

```typescript
interface StrengthLevelResponse {
  success: boolean;
  data: {
    // 운동 정보
    exercise: {
      type: string;        // "BENCH_PRESS"
      nameKorean: string;  // "벤치프레스"
      nameEnglish: string; // "Bench Press"
    };
    
    // 입력 정보 (echo back)
    input: {
      age: number;
      bodyWeight: number;
      gender: string;
      currentWeight?: number;
    };
    
    // 현재 레벨 정보 (currentWeight 입력시에만 존재)
    currentLevel?: {
      level: string;           // "INTERMEDIATE"
      levelKorean: string;     // "중급자"
      weight: number;          // 입력한 무게
      weightToNextLevel: number; // 다음 레벨까지 필요한 무게
      nextLevel?: string;      // "ADVANCED"
      nextLevelKorean?: string; // "고수"
    };
    
    // 전체 레벨 목록 (5개)
    allLevels: Array<{
      level: string;       // "BEGINNER" | "NOVICE" | "INTERMEDIATE" | "ADVANCED" | "ELITE"
      levelKorean: string; // "헬스 입문" | "초보자" | "중급자" | "고수" | "신"
      weight: number;      // 해당 레벨 기준 무게 (kg)
      description: string; // 레벨 설명
      isCurrent: boolean;  // 현재 레벨 여부 (currentWeight 입력시)
      isNext: boolean;     // 다음 목표 레벨 여부 (currentWeight 입력시)
    }>;
  };
}
```

### 레벨 정보

| Level | 한글명 | 설명 |
|-------|--------|------|
| BEGINNER | 헬스 입문 | 운동을 시작한 지 얼마 되지 않은 단계 |
| NOVICE | 초보자 | 기본 동작을 익히고 꾸준히 운동하는 단계 |
| INTERMEDIATE | 중급자 | 일반적인 피트니스 수준을 가진 사람들보다 강함 |
| ADVANCED | 고수 | 상당한 수준의 근력을 보유 |
| ELITE | 신 | 최상위 수준의 근력, 상위 5% 이내 |

### 사용 예시

#### 1. 레벨 기준만 조회 (currentWeight 없이)

```typescript
// Request
const response = await fetch('/api/strength-level/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    exerciseType: 'BENCH_PRESS',
    age: 25,
    bodyWeight: 70,
    gender: 'MALE'
  })
});

// Response 예시
{
  "success": true,
  "data": {
    "exercise": {
      "type": "BENCH_PRESS",
      "nameKorean": "벤치프레스",
      "nameEnglish": "Bench Press"
    },
    "input": {
      "age": 25,
      "bodyWeight": 70,
      "gender": "MALE"
    },
    "allLevels": [
      { "level": "BEGINNER", "levelKorean": "헬스 입문", "weight": 45, "description": "...", "isCurrent": false, "isNext": false },
      { "level": "NOVICE", "levelKorean": "초보자", "weight": 57, "description": "...", "isCurrent": false, "isNext": false },
      { "level": "INTERMEDIATE", "levelKorean": "중급자", "weight": 72, "description": "...", "isCurrent": false, "isNext": false },
      { "level": "ADVANCED", "levelKorean": "고수", "weight": 91, "description": "...", "isCurrent": false, "isNext": false },
      { "level": "ELITE", "levelKorean": "신", "weight": 113, "description": "...", "isCurrent": false, "isNext": false }
    ]
  }
}
```

#### 2. 현재 레벨 판정 포함 (currentWeight 입력)

```typescript
// Request
const response = await fetch('/api/strength-level/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    exerciseType: 'BENCH_PRESS',
    age: 25,
    bodyWeight: 70,
    gender: 'MALE',
    currentWeight: 80  // 현재 1RM
  })
});

// Response 예시
{
  "success": true,
  "data": {
    "exercise": { ... },
    "input": { ..., "currentWeight": 80 },
    "currentLevel": {
      "level": "INTERMEDIATE",
      "levelKorean": "중급자",
      "weight": 80,
      "weightToNextLevel": 11,  // 91kg(고수) - 80kg = 11kg 더 필요
      "nextLevel": "ADVANCED",
      "nextLevelKorean": "고수"
    },
    "allLevels": [
      { "level": "BEGINNER", ..., "isCurrent": false, "isNext": false },
      { "level": "NOVICE", ..., "isCurrent": false, "isNext": false },
      { "level": "INTERMEDIATE", ..., "isCurrent": true, "isNext": false },  // 현재 레벨
      { "level": "ADVANCED", ..., "isCurrent": false, "isNext": true },      // 다음 목표
      { "level": "ELITE", ..., "isCurrent": false, "isNext": false }
    ]
  }
}
```

### 에러 응답

```typescript
// 400 Bad Request - 유효성 검사 실패
{
  "statusCode": 400,
  "message": ["age must not be less than 15", "bodyWeight must not be greater than 200"],
  "error": "Bad Request"
}

// 404 Not Found - 운동 정보 없음
{
  "statusCode": 404,
  "message": "운동을 찾을 수 없습니다: Bench Press",
  "error": "Not Found"
}
```

### UI 구현 가이드

스크린샷 6번 참고하여 다음과 같은 UI 구현 권장:

1. **입력 영역 (좌측)**
   - 운동 종류 선택 (탭 또는 드롭다운)
   - 나이 슬라이더 (15-90)
   - 체중 슬라이더 (40-200kg)
   - 성별 선택
   - 현재 무게 입력 (선택)

2. **결과 영역 (우측)**
   - 5단계 계단형 레벨 표시
   - 현재 레벨 하이라이트
   - 각 레벨별 목표 무게 표시
   - 다음 레벨까지 필요한 무게 표시

---

## Phase 2: 프로그램 관리 시스템 (엔티티 완료, API 진행중)

### 변경 사항 요약

기존 `Membership` 엔티티를 확장하여 프로그램 기능을 통합했습니다.
- **Membership** = 회원권 + 프로그램 정보
- **PTSession** = PT 세션 + 측정값 기록
- **ProgramMilestone** = 주차별 마일스톤 (PT 세션 후 자동 생성)

### 새로운 Enum 타입

```typescript
// 목표 유형
type GoalType = 
  | "WEIGHT_LOSS"    // 체중 감량
  | "MUSCLE_GAIN"    // 근육량 증가
  | "STRENGTH_UP"    // 근력 상승
  | "ENDURANCE"      // 체력 증진
  | "BODY_FAT_LOSS"  // 체지방 감량
  | "CUSTOM";        // 기타

// 위험 상태
type RiskStatus = 
  | "GREEN"   // 정상 진행 (70% 이상)
  | "YELLOW"  // 주의 필요 (30-70%)
  | "RED";    // 위험 (30% 미만)
```

### 회원권 생성 API 확장

**기존 API**: `POST /api/members/:id/membership`

**확장된 Request**:

```typescript
interface CreateMembershipRequest {
  // 기존 필드
  membershipType: "MONTHLY" | "QUARTERLY" | "YEARLY" | "LIFETIME";
  purchaseDate: string;  // "YYYY-MM-DD"
  expiryDate: string;    // "YYYY-MM-DD"
  status?: "ACTIVE" | "EXPIRED" | "SUSPENDED";
  price: number;
  
  // 새로 추가 - 프로그램 정보 (선택)
  program?: {
    durationWeeks: 4 | 8 | 12;           // 프로그램 기간
    mainGoalType: GoalType;               // 목표 유형
    mainGoalLabel?: string;               // 목표 라벨 (미입력시 자동 생성)
    targetValue?: number;                 // 목표 수치 (예: 10)
    targetUnit?: string;                  // 목표 단위 (예: "kg")
    startValue?: number;                  // 시작 수치 (예: 85)
  };
}
```

**확장된 Response** (Membership):

```typescript
interface MembershipResponse {
  id: string;
  memberId: string;
  membershipType: string;
  purchaseDate: string;
  expiryDate: string;
  status: string;
  price: number;
  
  // 프로그램 관련 필드 (새로 추가)
  durationWeeks?: number;
  mainGoalType?: GoalType;
  mainGoalLabel?: string;
  targetValue?: number;
  targetUnit?: string;
  startValue?: number;
  currentValue?: number;
  currentProgress: number;      // 0-100
  riskStatus: RiskStatus;       // "GREEN" | "YELLOW" | "RED"
  
  // 마일스톤 목록
  milestones?: ProgramMilestone[];
}
```

### PT 세션 API 확장

**기존 API**: `POST /api/members/:id/pt-sessions`

**확장된 Request**:

```typescript
interface CreatePTSessionRequest {
  // 기존 필드
  sessionDate: string;      // "YYYY-MM-DD"
  mainContent: string;      // 수업 내용
  trainerComment?: string;  // 트레이너 코멘트
  
  // 새로 추가 - 프로그램 연동 및 측정값
  membershipId?: string;    // 연결할 회원권/프로그램 ID
  
  // 측정값 (선택)
  measuredWeight?: number;      // 체중 (kg)
  measuredMuscleMass?: number;  // 골격근량 (kg)
  measuredBodyFat?: number;     // 체지방률 (%)
  benchPress1RM?: number;       // 벤치프레스 1RM (kg)
  squat1RM?: number;            // 스쿼트 1RM (kg)
  deadlift1RM?: number;         // 데드리프트 1RM (kg)
  
  createMilestone?: boolean;    // 마일스톤 자동 생성 여부 (기본: true)
}
```

### 마일스톤 구조

```typescript
interface ProgramMilestone {
  id: string;
  membershipId: string;
  ptSessionId?: string;       // 연결된 PT 세션
  weekNumber: number;         // 주차 (1, 2, 3...)
  targetDate: string;         // 목표 달성 예정일
  
  // 측정값
  measuredWeight?: number;
  measuredMuscleMass?: number;
  measuredBodyFat?: number;
  measuredValue?: number;     // 목표 관련 측정값
  
  // 진행 상태
  progressAtMilestone?: number;  // 마일스톤 시점 진행률
  isAchieved: boolean;
  achievedAt?: string;
  
  // 피드백
  trainerFeedback?: string;
}
```

### 진행률 계산 로직

```typescript
// 감소 목표 (체중 감량, 체지방 감량)
progress = (startValue - currentValue) / (startValue - targetValue) * 100

// 증가 목표 (근육량 증가, 근력 상승)
progress = (currentValue - startValue) / (targetValue - startValue) * 100
```

### 위험 상태 판정 기준

| 상태 | 기준 | 설명 |
|------|------|------|
| GREEN | 예상 진행률의 70% 이상 | 정상 진행 |
| YELLOW | 예상 진행률의 30-70% | 주의 필요 |
| RED | 예상 진행률의 30% 미만 | 위험 |

---

## Phase 3: 회원 등록 API 확장 (예정)

> 개발 예정 - 3단계 위저드 지원을 위한 API 확장

---

## Phase 4: 회원 상세/대시보드 API 확장 (예정)

### 예정 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/members/:id/goal-analyst` | Goal Analyst 데이터 |
| GET | `/api/insights/center-dashboard` | 센터 대시보드 |

---

## 협의 필요 사항 (Phase 4 진행 전)

Phase 4 개발 전에 다음 사항들의 결정이 필요합니다:

1. **3개 영역 카드 정의**: BODY/STRENGTH/CONDITIONING - 기존 6개 평가 영역과 별개로 새로 정의 필요
2. **티어 기준**: Elite/Average/Under 판정 기준 - 지표 조사 완료, 최종 결정 필요

---

*마지막 업데이트: 2026-01-19*
*Phase 1 완료, Phase 2 엔티티 완료*
