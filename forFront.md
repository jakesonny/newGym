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

## 코드 리팩토링 완료 (배포 준비)

### 1차 리팩토링 (2026-01-19)

| 항목 | 변경 내용 |
|------|----------|
| 삭제 | `src/entities-generated/` 폴더 (미사용 9개 파일) |
| 추출 | `WorkoutHelper.aggregateByBodyPart()` - 볼륨 집계 로직 |
| 추출 | `WorkoutHelper.volumeMapToResults()` - 결과 변환 로직 |
| 추출 | `GoalResponseDto.fromMember()` - DTO 팩토리 메서드 |
| 정리 | `assessments.service.ts` - 미사용 import/코드 제거 |

### 2차 리팩토링 (2026-01-19)

| 항목 | 변경 내용 |
|------|----------|
| 신규 | `WorkoutRecordHelper` - 1RM 기록 처리 유틸리티 |
| 확장 | `DateRangeHelper.toDateString()` - 날짜 포맷팅 통합 |
| 확장 | `AnalyticsHelper.toHexagonIndicators()` - 헥사곤 데이터 생성 |
| 리팩토링 | `workout-records.service.ts` - 1065줄 → 890줄 (-175줄) |

### 새로운 유틸리티 함수

```typescript
// WorkoutRecordHelper - 1RM 기록 처리
WorkoutRecordHelper.filterRecordsWithOneRM(records)   // 1RM 기록 필터링
WorkoutRecordHelper.buildHistory(records)              // 히스토리 배열 생성
WorkoutRecordHelper.getLatestRecord(records)           // 최근 기록
WorkoutRecordHelper.getBestRecord(records)             // 최고 기록
WorkoutRecordHelper.groupByDateWithMaxOneRM(records)   // 날짜별 최고 1RM
WorkoutRecordHelper.groupByDateWithVolume(records)     // 날짜별 볼륨 합계

// DateRangeHelper - 날짜 처리
DateRangeHelper.toDateString(date)     // Date/string → "YYYY-MM-DD"
DateRangeHelper.getDaysAgoRange(days)  // N일 전 범위

// AnalyticsHelper - 헥사곤 데이터
AnalyticsHelper.toHexagonIndicators(snapshot)          // 스냅샷 → 헥사곤 지표
AnalyticsHelper.averagesToHexagonIndicators(averages)  // 평균 → 헥사곤 지표
AnalyticsHelper.emptyHexagonIndicators()               // 빈 헥사곤 지표
```

---

## Phase 3: 회원 등록 API 확장 (완료)

### 새 엔드포인트

```
POST /api/members/full
```

### 특징
- **3단계 위저드 통합**: 기본 정보 + 회원권/프로그램 + 초기 측정값을 한 번에 등록
- **트랜잭션 처리**: 모든 데이터가 원자적으로 저장됨
- **기존 API 유지**: `POST /api/members`는 그대로 사용 가능

### Request

```typescript
// POST /api/members/full
// Content-Type: application/json
// Authorization: Bearer {token}

interface CreateMemberFullRequest {
  // ========== Step 1: 기본 정보 (필수) ==========
  name: string;           // 회원 이름
  phone: string;          // 전화번호 (010-1234-5678)
  email: string;          // 이메일
  joinDate: string;       // 가입일 (YYYY-MM-DD)
  birthDate?: string;     // 생년월일 (YYYY-MM-DD)
  gender?: "MALE" | "FEMALE";
  height?: number;        // 키 (cm)
  weight?: number;        // 몸무게 (kg)
  status?: "ACTIVE" | "INACTIVE" | "SUSPENDED";

  // ========== Step 2: 회원권 + 프로그램 (선택) ==========
  membership?: {
    membershipType: "MONTHLY" | "QUARTERLY" | "YEARLY" | "LIFETIME";
    purchaseDate: string;   // YYYY-MM-DD
    expiryDate: string;     // YYYY-MM-DD
    status?: "ACTIVE" | "EXPIRED" | "SUSPENDED";
    price: number;
    
    // 프로그램 정보 (선택)
    durationWeeks?: 4 | 8 | 12;
    mainGoalType?: "WEIGHT_LOSS" | "MUSCLE_GAIN" | "STRENGTH_UP" | "ENDURANCE" | "BODY_FAT_LOSS" | "CUSTOM";
    mainGoalLabel?: string;   // 미입력시 GoalType에서 자동 생성
    targetValue?: number;     // 목표 수치
    targetUnit?: string;      // 미입력시 GoalType에서 자동 설정
    startValue?: number;      // 시작 수치
    
    // PT 횟수
    ptTotalCount?: number;    // PT 총 횟수
  };

  // ========== Step 3: 초기 측정값 (선택) ==========
  initialMeasurement?: {
    weight?: number;          // 체중 (kg)
    muscleMass?: number;      // 골격근량 (kg)
    bodyFat?: number;         // 체지방률 (%)
    benchPress1RM?: number;   // 벤치프레스 1RM (kg)
    squat1RM?: number;        // 스쿼트 1RM (kg)
    deadlift1RM?: number;     // 데드리프트 1RM (kg)
  };
}
```

### Response

```typescript
interface CreateMemberFullResponse {
  success: boolean;
  data: {
    member: Member;           // 생성된 회원 정보
    membership?: Membership;  // 생성된 회원권 (Step 2 입력시)
    ptUsage?: PTUsage;        // 생성된 PT 횟수 (ptTotalCount 입력시)
  };
  message: string;
}
```

### 사용 예시

```typescript
// 전체 정보 등록 (3단계 모두)
const response = await fetch('/api/members/full', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    // Step 1: 기본 정보
    name: '홍길동',
    phone: '010-1234-5678',
    email: 'hong@example.com',
    joinDate: '2024-01-15',
    birthDate: '1990-05-20',
    gender: 'MALE',
    height: 175,
    weight: 80,
    
    // Step 2: 회원권 + 프로그램
    membership: {
      membershipType: 'QUARTERLY',
      purchaseDate: '2024-01-15',
      expiryDate: '2024-04-15',
      price: 500000,
      durationWeeks: 12,
      mainGoalType: 'WEIGHT_LOSS',
      targetValue: 10,
      startValue: 80,
      ptTotalCount: 24
    },
    
    // Step 3: 초기 측정값
    initialMeasurement: {
      weight: 80,
      muscleMass: 32,
      bodyFat: 22,
      benchPress1RM: 60,
      squat1RM: 80,
      deadlift1RM: 100
    }
  })
});
```

### 자동 처리 로직

| 항목 | 자동 처리 |
|------|----------|
| `mainGoalLabel` | 미입력시 `mainGoalType`에서 한글명 자동 생성 |
| `targetUnit` | 미입력시 `mainGoalType`에서 자동 설정 (kg, % 등) |
| `startValue` | 미입력시 `initialMeasurement.weight` 사용 |
| `currentValue` | `initialMeasurement.weight` 자동 설정 |
| `currentProgress` | 0으로 초기화 |
| `riskStatus` | GREEN으로 초기화 |
| `totalSessions` | `ptTotalCount` 값 사용 |

### 기존 API와 비교

| 항목 | `POST /api/members` | `POST /api/members/full` |
|------|---------------------|--------------------------|
| 기본 정보 | ✅ | ✅ |
| 회원권 | ❌ (별도 API 필요) | ✅ (선택) |
| 프로그램 | ❌ | ✅ (선택) |
| PT 횟수 | ❌ (별도 API 필요) | ✅ (선택) |
| 초기 측정값 | ❌ | ✅ (선택) |
| 트랜잭션 | 단일 | 통합 |

---

## Phase 4: 회원 상세/대시보드 API 확장 (완료)

### 새 엔드포인트

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/members/:id/goal-analyst` | Goal Analyst 데이터 |
| GET | `/api/insights/center-dashboard` | 센터 대시보드 |

---

### Goal Analyst API

```
GET /api/members/:id/goal-analyst
Authorization: Bearer {token}
```

#### Response

```typescript
interface GoalAnalystResponse {
  success: boolean;
  data: {
    // 프로그램 정보
    program: {
      mainGoal: string | null;        // "체중 감량"
      mainGoalType: string | null;    // "WEIGHT_LOSS"
      durationWeeks: number | null;   // 12
      startValue: number | null;      // 85
      currentValue: number | null;    // 80
      targetValue: number | null;     // 75
      targetUnit: string | null;      // "kg"
      currentProgress: number;        // 50 (%)
      riskStatus: string;             // "GREEN" | "YELLOW" | "RED"
      startDate: string | null;       // "2024-01-15"
      endDate: string | null;         // "2024-04-15"
    };
    
    // Progress Roadmap (시작 → 현재 → 목표)
    progressRoadmap: {
      start: { value: number; date: string } | null;
      current: { value: number; date: string } | null;
      goal: { value: number; date: string } | null;
    };
    
    // 추세 분석
    trend: {
      direction: "UP" | "DOWN" | "STABLE";
      recentValues: Array<{ date: string; value: number }>;
      averageChange: number;  // 평균 변화량
    };
    
    // 다음 목표
    nextTarget: {
      value: number | null;       // 79.5
      description: string | null; // "다음 주 목표: 0.5kg 감량"
    };
    
    // 수업 진행률
    sessionProgress: {
      totalSessions: number;
      completedSessions: number;
      progressPercentage: number;
    };
  };
  message: string;
}
```

#### 사용 예시

```typescript
const response = await fetch(`/api/members/${memberId}/goal-analyst`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

const { data } = await response.json();

// Progress Roadmap 표시
console.log(`시작: ${data.progressRoadmap.start?.value}kg`);
console.log(`현재: ${data.progressRoadmap.current?.value}kg`);
console.log(`목표: ${data.progressRoadmap.goal?.value}kg`);

// 추세 표시
console.log(`추세: ${data.trend.direction}`);
console.log(`평균 변화: ${data.trend.averageChange}kg/주`);

// 다음 목표
console.log(data.nextTarget.description);
```

---

### 센터 대시보드 API

```
GET /api/insights/center-dashboard
Authorization: Bearer {token}
```

#### Response

```typescript
interface CenterDashboardResponse {
  success: boolean;
  data: {
    // 요약 통계
    summary: {
      totalMembers: number;       // 전체 회원 수
      activeMembers: number;      // 활성 회원 수
      averageProgress: number;    // 평균 진행률 (%)
      riskCounts: {
        green: number;            // 정상 회원 수
        yellow: number;           // 주의 회원 수
        red: number;              // 위험 회원 수
      };
      missingMeasurements: number; // 측정 미입력 회원 수
    };
    
    // 회원 목록
    memberList: Array<{
      id: string;
      name: string;
      phone: string;
      status: string;             // "ACTIVE" | "INACTIVE" | "SUSPENDED"
      riskStatus: string;         // "GREEN" | "YELLOW" | "RED"
      program: {
        mainGoal: string | null;
        currentProgress: number;
        durationWeeks: number | null;
      } | null;
      lastAssessmentDate: string | null;
      completedSessions: number;
      totalSessions: number;
    }>;
  };
  message: string;
}
```

#### 사용 예시

```typescript
const response = await fetch('/api/insights/center-dashboard', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const { data } = await response.json();

// 요약 통계 표시
console.log(`전체 회원: ${data.summary.totalMembers}명`);
console.log(`평균 진행률: ${data.summary.averageProgress}%`);
console.log(`위험 회원: ${data.summary.riskCounts.red}명`);

// 회원 목록 필터링
const riskMembers = data.memberList.filter(m => m.riskStatus === 'RED');
const missingData = data.memberList.filter(m => !m.lastAssessmentDate);
```

---

## 협의 필요 사항 (Phase 5 진행 전)

Phase 5 개발 전에 다음 사항들의 결정이 필요합니다:

1. **3개 영역 카드 정의**: BODY/STRENGTH/CONDITIONING - 기존 6개 평가 영역과 매핑 방법
2. **티어 기준**: Elite/Average/Under 판정 기준 최종 결정

---

*마지막 업데이트: 2026-01-21*
*Phase 1 완료, Phase 2 엔티티 완료, Phase 3 완료, Phase 4 완료, 코드 리팩토링 완료*
