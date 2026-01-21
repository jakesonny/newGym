# Phase 2 최종 개발 플랜

> "시간 대비 계획 달성률"이 아닌 **"최근 추세와 변동 안정성"** 기반으로  
> 회원 상태를 자동 판정하는 트레이너 보조 시스템

---

## 1. 핵심 변경 사항 요약

| 항목 | 기존 | 변경 |
|------|------|------|
| riskStatus 판정 | 시간 대비 진행률 | **추세 기반** (측정값 변화) |
| 초기 회원 상태 | GREEN | **FOUNDATION** |
| 마일스톤 | 매주 생성 | **4주 블록 단위** |
| 마지막 블록 | 일반 블록 | **CONSOLIDATION** (정착) |
| ENDURANCE 방향 | 증가 목표 | **감소 목표** (stepTestTime) |
| CUSTOM 목표 | 증가 가정 | **goalDirection 명시** |
| 진행률 100% 초과 | 허용 | **0-100% 캡** |
| 급격한 순방향 변화 | GREEN | **GREEN + rapid_progress 플래그** |

---

## 2. 새로운 Enum/상수

### 2.1 RiskStatus (수정)
```typescript
export enum RiskStatus {
  FOUNDATION = 'FOUNDATION',  // 신규: 기초 단계 (측정 0~1회)
  GREEN = 'GREEN',            // 정상 진행
  YELLOW = 'YELLOW',          // 주의 필요 (정체)
  RED = 'RED',                // 위험 (역행)
}
```

### 2.2 GoalDirection (신규)
```typescript
export enum GoalDirection {
  INCREASE = 'INCREASE',  // 증가 목표
  DECREASE = 'DECREASE',  // 감소 목표
}
```

### 2.3 GoalType (수정)
```typescript
export enum GoalType {
  WEIGHT_LOSS = 'WEIGHT_LOSS',
  MUSCLE_GAIN = 'MUSCLE_GAIN',
  STRENGTH_UP = 'STRENGTH_UP',
  ENDURANCE = 'ENDURANCE',
  BODY_FAT_LOSS = 'BODY_FAT_LOSS',
  MAINTENANCE = 'MAINTENANCE',  // 신규: 유지 목표
  CUSTOM = 'CUSTOM',
}
```

### 2.4 GoalTypeDirections (신규)
```typescript
export const GoalTypeDirections: Record<GoalType, GoalDirection> = {
  [GoalType.WEIGHT_LOSS]: GoalDirection.DECREASE,
  [GoalType.BODY_FAT_LOSS]: GoalDirection.DECREASE,
  [GoalType.ENDURANCE]: GoalDirection.DECREASE,     // stepTestTime 낮을수록 좋음
  [GoalType.MUSCLE_GAIN]: GoalDirection.INCREASE,
  [GoalType.STRENGTH_UP]: GoalDirection.INCREASE,
  [GoalType.MAINTENANCE]: GoalDirection.INCREASE,   // 기본값 (실제론 변화 없음이 정상)
  [GoalType.CUSTOM]: GoalDirection.INCREASE,        // 기본값, goalDirection으로 오버라이드
};
```

### 2.5 BlockPurpose (신규)
```typescript
export enum BlockPurpose {
  ADAPTATION = 'ADAPTATION',        // 적응
  INTENSITY = 'INTENSITY',          // 볼륨/강도
  CONSOLIDATION = 'CONSOLIDATION',  // 정착/습관화
}
```

---

## 3. 판정 기준 상수 (데이터 기반)

### 3.1 정체(FLAT) 임계값
```typescript
// 이 범위 내 변화 = "정체" (YELLOW)
export const FLAT_THRESHOLDS: Record<GoalType, number> = {
  [GoalType.WEIGHT_LOSS]: 0.5,      // kg
  [GoalType.BODY_FAT_LOSS]: 0.3,    // %
  [GoalType.MUSCLE_GAIN]: 0.1,      // kg
  [GoalType.STRENGTH_UP]: 2.5,      // kg
  [GoalType.ENDURANCE]: 5,          // 초
  [GoalType.MAINTENANCE]: 0.5,      // kg (체중 기준)
  [GoalType.CUSTOM]: 0,             // 사용 안 함
};
```

### 3.2 급변(RAPID) 임계값
```typescript
// 이 이상 변화 = "급변" (rapid_progress 플래그)
export const RAPID_THRESHOLDS: Record<GoalType, number> = {
  [GoalType.WEIGHT_LOSS]: 1.5,      // kg/주
  [GoalType.BODY_FAT_LOSS]: 1.0,    // %/주
  [GoalType.MUSCLE_GAIN]: 0.3,      // kg/주
  [GoalType.STRENGTH_UP]: 7.5,      // kg/주
  [GoalType.ENDURANCE]: 20,         // 초/주
  [GoalType.MAINTENANCE]: 1.0,      // kg/주
  [GoalType.CUSTOM]: 0,             // 사용 안 함
};
```

### 3.3 기타 상수
```typescript
export const MEASUREMENT_OVERDUE_DAYS = 14;  // 측정 미실시 경고 (2주)
export const MIN_MEASUREMENTS_FOR_TREND = 2; // 추세 판정 최소 측정 횟수
```

---

## 4. 엔티티 수정

### 4.1 Membership (수정)
```typescript
// 추가 필드
@Column({ type: 'enum', enum: GoalDirection, nullable: true })
goalDirection?: GoalDirection;  // CUSTOM 목표용

@Column({ type: 'boolean', default: false })
isRapidProgress?: boolean;      // rapid_progress 플래그

@Column({ type: 'boolean', default: false })
isMeasurementOverdue?: boolean; // 측정 미실시 플래그
```

### 4.2 PTSession (수정)
```typescript
// 추가 필드
@Column({ type: 'int', name: 'step_test_time', nullable: true, comment: '스텝테스트 시간 (초)' })
stepTestTime?: number;
```

### 4.3 ProgramMilestone (수정)
```typescript
// 추가 필드
@Column({ type: 'int', name: 'block_number', comment: '블록 번호 (1, 2, 3...)' })
blockNumber: number;

@Column({ type: 'enum', enum: BlockPurpose, comment: '블록 목적' })
blockPurpose: BlockPurpose;
```

---

## 5. 추세 판정 로직

### 5.1 전체 흐름
```
PTSession 생성 (측정값 포함)
  → 해당 회원의 최근 측정값 조회
  → 측정 횟수 확인
    → 0~1회: FOUNDATION
    → 2회 이상: 추세 계산
  → 단기 추세 (최근 2회) 계산
  → 장기 추세 (전체) 계산
  → riskStatus 판정
  → rapid_progress 플래그 판정
  → Membership 업데이트
```

### 5.2 riskStatus 판정 로직
```typescript
function calculateRiskStatus(
  measurements: number[],
  goalType: GoalType,
  goalDirection?: GoalDirection
): { status: RiskStatus; flags: string[] } {
  
  const flags: string[] = [];
  
  // 1. 측정 횟수 확인
  if (measurements.length < 2) {
    return { status: RiskStatus.FOUNDATION, flags };
  }
  
  // 2. 방향 결정
  const direction = goalType === GoalType.CUSTOM && goalDirection
    ? goalDirection
    : GoalTypeDirections[goalType];
  
  // 3. 최근 변화량 계산
  const recent = measurements.slice(-2);
  const delta = recent[1] - recent[0];
  const absDelta = Math.abs(delta);
  
  // 4. MAINTENANCE 특수 처리
  if (goalType === GoalType.MAINTENANCE) {
    if (absDelta <= FLAT_THRESHOLDS[goalType]) {
      return { status: RiskStatus.GREEN, flags };  // 변화 없음 = 정상
    }
    if (absDelta >= RAPID_THRESHOLDS[goalType]) {
      flags.push('rapid_change');
      return { status: RiskStatus.YELLOW, flags };  // 급변 = 체크 필요
    }
    return { status: RiskStatus.YELLOW, flags };
  }
  
  // 5. 방향성 판단
  const isImproving = direction === GoalDirection.DECREASE 
    ? delta < 0  // 감소 목표: 줄어들면 개선
    : delta > 0; // 증가 목표: 늘어나면 개선
  
  // 6. 급변 체크
  if (absDelta >= RAPID_THRESHOLDS[goalType]) {
    flags.push(isImproving ? 'rapid_progress' : 'rapid_decline');
  }
  
  // 7. 정체 체크
  if (absDelta <= FLAT_THRESHOLDS[goalType]) {
    return { status: RiskStatus.YELLOW, flags };  // 정체
  }
  
  // 8. 방향 기반 판정
  if (isImproving) {
    return { status: RiskStatus.GREEN, flags };
  } else {
    // 장기 추세도 확인 (전체 측정값)
    if (measurements.length >= 3) {
      const longTermDelta = measurements[measurements.length - 1] - measurements[0];
      const longTermImproving = direction === GoalDirection.DECREASE 
        ? longTermDelta < 0 
        : longTermDelta > 0;
      
      if (longTermImproving) {
        return { status: RiskStatus.YELLOW, flags };  // 단기 역행, 장기 개선
      }
    }
    return { status: RiskStatus.RED, flags };  // 역행
  }
}
```

---

## 6. 4주 블록 마일스톤

### 6.1 블록 생성 로직
```typescript
function generateMilestoneBlocks(
  startDate: Date,
  durationWeeks: 4 | 8 | 12
): MilestoneBlock[] {
  const blocks: MilestoneBlock[] = [];
  
  // 4주: 1블록 (ADAPTATION)
  // 8주: 2블록 (ADAPTATION → CONSOLIDATION)
  // 12주: 3블록 (ADAPTATION → INTENSITY → CONSOLIDATION)
  
  const blockCount = durationWeeks / 4;
  
  for (let i = 0; i < blockCount; i++) {
    const startWeek = i * 4 + 1;
    const endWeek = (i + 1) * 4;
    
    let purpose: BlockPurpose;
    if (i === 0) {
      purpose = BlockPurpose.ADAPTATION;
    } else if (i === blockCount - 1) {
      purpose = BlockPurpose.CONSOLIDATION;
    } else {
      purpose = BlockPurpose.INTENSITY;
    }
    
    blocks.push({
      blockNumber: i + 1,
      startWeek,
      endWeek,
      purpose,
      targetDate: addWeeks(startDate, endWeek),
    });
  }
  
  return blocks;
}
```

### 6.2 블록 구조 예시

**4주 프로그램:**
```
[Block 1: ADAPTATION] Week 1-4
```

**8주 프로그램:**
```
[Block 1: ADAPTATION] Week 1-4
[Block 2: CONSOLIDATION] Week 5-8
```

**12주 프로그램:**
```
[Block 1: ADAPTATION] Week 1-4
[Block 2: INTENSITY] Week 5-8
[Block 3: CONSOLIDATION] Week 9-12
```

---

## 7. 자동 업데이트 트리거

### 7.1 PTSession 생성 시
```typescript
async createPTSession(dto: CreatePTSessionDto) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.startTransaction();
  
  try {
    // 1. PTSession 저장
    const session = await queryRunner.manager.save(PTSession, sessionData);
    
    // 2. 측정값이 있고 Membership이 연결된 경우
    if (dto.membershipId && hasMeasurement(dto)) {
      // 3. 최근 측정값 조회
      const measurements = await this.getMeasurementHistory(
        dto.memberId,
        membership.mainGoalType
      );
      
      // 4. 추세 판정
      const { status, flags } = calculateRiskStatus(
        measurements,
        membership.mainGoalType,
        membership.goalDirection
      );
      
      // 5. 진행률 계산
      const progress = calculateProgress(
        membership.mainGoalType,
        membership.startValue,
        measurements[measurements.length - 1],
        membership.targetValue
      );
      
      // 6. Membership 업데이트
      await queryRunner.manager.update(Membership, dto.membershipId, {
        currentValue: measurements[measurements.length - 1],
        currentProgress: Math.min(100, Math.max(0, progress)),
        riskStatus: status,
        isRapidProgress: flags.includes('rapid_progress'),
      });
    }
    
    await queryRunner.commitTransaction();
    return session;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  }
}
```

---

## 8. 구현 순서

### Step 1: Enum/상수 추가
- [ ] `RiskStatus`에 `FOUNDATION` 추가
- [ ] `GoalDirection` enum 생성
- [ ] `GoalType`에 `MAINTENANCE` 추가
- [ ] `BlockPurpose` enum 생성
- [ ] `GoalTypeDirections`, `FLAT_THRESHOLDS`, `RAPID_THRESHOLDS` 상수 추가

### Step 2: 엔티티 수정
- [ ] `Membership`에 `goalDirection`, `isRapidProgress`, `isMeasurementOverdue` 추가
- [ ] `PTSession`에 `stepTestTime` 추가
- [ ] `ProgramMilestone`에 `blockNumber`, `blockPurpose` 추가

### Step 3: ProgressCalculator 리팩토링
- [ ] `calculateProgress()` - 방향 기반으로 수정
- [ ] `calculateRiskStatus()` - 추세 기반으로 완전 교체
- [ ] `generateMilestoneBlocks()` - 4주 블록으로 변경

### Step 4: 서비스 로직 수정
- [ ] `PTSessionsService.create()` - 자동 업데이트 트리거 추가
- [ ] `MembersService.createFull()` - FOUNDATION 상태로 시작
- [ ] `InsightsService.getCenterDashboard()` - FOUNDATION 카운트 추가

### Step 5: API 응답 수정
- [ ] Goal Analyst API - flags 반환 추가
- [ ] Center Dashboard - FOUNDATION 회원 수 추가

---

## 9. 현업 피드백 대기 항목

> `feedback.md` 참고

- 정체(FLAT) 임계값 수치 조정
- 급변(RAPID) 임계값 수치 조정
- MAINTENANCE 회원 판정 로직
- 측정 미실시 경고 기준 (2주)

---

*작성일: 2026-01-21*
*Phase 2 개발 시작*
