# 백엔드 에러 수정 내역 (2026-01-22)

## 에러 설명

### 1. TypeScript 컴파일 에러 (이전)
- **에러**: `Public` 데코레이터가 export되지 않음
- **원인**: `src/common/decorators/index.ts`에서 `Public` 데코레이터를 export하지 않음
- **해결**: `export * from './public.decorator'` 추가

### 2. TypeScript 타입 에러 (이전)
- **에러**: `WorkoutVolumeQueryDto`에 `startDate`, `endDate` 속성이 없음
- **원인**: DTO와 서비스 메서드 시그니처 불일치
- **해결**: 컨트롤러에서 `VolumePeriod`를 올바르게 변환하고, 날짜는 서비스에서 자동 계산하도록 수정

### 3. 데이터베이스 마이그레이션 에러 (현재)
- **에러**: `cannot drop type category_old because other objects depend on it`
- **원인**: 
  - TypeORM의 `synchronize: true`가 enum 타입을 변경하려고 할 때 발생
  - PostgreSQL에서 enum 타입을 변경하려면:
    1. 기존 enum 타입을 `category_old`로 이름 변경
    2. 새로운 enum 타입 생성
    3. 모든 컬럼을 새 enum 타입으로 변경
    4. `category_old` 타입 삭제
  - 하지만 다른 테이블들이 여전히 `category_old`를 사용 중이면 삭제할 수 없음
- **해결**: `synchronize: false`로 설정하고 마이그레이션 파일 사용

## 수정 사항

### 1. Public 데코레이터 Export 추가
**파일**: `src/common/decorators/index.ts`
```typescript
export * from './public.decorator';
```

### 2. WorkoutVolumeQueryDto 타입 변환 수정
**파일**: `src/modules/members/workout-records.controller.ts`
```typescript
// VolumePeriod를 'WEEKLY' | 'MONTHLY'로 변환
const period = query.period === 'month' ? 'MONTHLY' : 'WEEKLY';
const analysis = await this.workoutRecordsService.getVolumeAnalysis(
  memberId,
  period,
  undefined, // 서비스에서 자동 계산
  undefined, // 서비스에서 자동 계산
);
```

### 3. TypeORM Synchronize 비활성화
**파일**: 
- `src/config/database.config.ts`
- `src/common/data-source.ts`

```typescript
synchronize: false, // enum 타입 변경 시 마이그레이션 에러 방지
```

## 주의사항

### Enum 타입 변경 시
다음 enum 타입들을 변경할 때는 반드시 마이그레이션 파일을 사용해야 합니다:

1. **Category** (`assessment.enum.ts`)
   - 사용 테이블: `assessment_items`, `assessment_category_scores`, `exercises`, `injury_restrictions`

2. **MemberStatus** (`member-status.enum.ts`)
   - 사용 테이블: `members`, `memberships`

3. **Gender** (`gender.enum.ts`)
   - 사용 테이블: `members`, `strength_standards`

4. **MembershipType** (`membership.enum.ts`)
   - 사용 테이블: `memberships`

5. **GoalType** (`program.enum.ts`)
   - 사용 테이블: `memberships`

6. **RiskStatus** (`program.enum.ts`)
   - 사용 테이블: `memberships`

7. **AssessmentType**, **EvaluationType**, **Condition** (`assessment.enum.ts`)
   - 사용 테이블: `assessments`

8. **Severity**, **RecoveryStatus** (`injury.enum.ts`)
   - 사용 테이블: `injury_histories`

9. **UserRole** (`user-role.enum.ts`)
   - 사용 테이블: `users`

10. **StrengthLevel** (`strength-level.enum.ts`)
    - 사용 테이블: `workout_records`, `strength_standards`

### 마이그레이션 사용 방법

```bash
# 1. 마이그레이션 생성
npm run migration:generate -- -n MigrationName

# 2. 마이그레이션 실행
npm run migration:run

# 3. 마이그레이션 되돌리기 (필요시)
npm run migration:revert
```

### 개발 환경에서 주의사항

1. **로컬 개발 시**:
   - `synchronize: false`이므로 스키마 변경 후 반드시 마이그레이션 실행
   - 또는 개발용 데이터베이스를 새로 생성하여 초기 마이그레이션 실행

2. **프로덕션 환경**:
   - 절대 `synchronize: true` 사용 금지
   - 모든 스키마 변경은 마이그레이션 파일로 관리

## 영향 범위

- **프론트엔드**: 영향 없음 (API 동작 동일)
- **백엔드 개발자**: 마이그레이션 파일 사용 필요
- **데이터베이스**: 기존 데이터 유지, 안전한 스키마 변경

---

**수정 완료일**: 2026-01-22
