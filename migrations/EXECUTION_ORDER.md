# SQL 마이그레이션 실행 순서 가이드

## 📋 실행 전 확인사항

1. **데이터베이스 백업 필수!**
   ```bash
   pg_dump -U your_username -d your_database > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **현재 상태 확인**
   - `verify_all_tables.sql` 실행하여 현재 DB 상태 확인 (권장)
   - 또는 `check_migration_status.sql` 실행 (간단 확인)

---

## 🚀 실행 순서

### **0단계: 상태 확인 (권장) ⭐**
**파일**: `migrations/verify_all_tables.sql`

**목적**: 전체 테이블과 마이그레이션 상태를 안전하게 확인

**실행 방법**:
```bash
psql -U your_username -d your_database -f migrations/verify_all_tables.sql
```

**결과**: 실행해야 할 마이그레이션 파일 목록이 자동으로 표시됩니다.

---

### **1단계: Phase 1 - UserId 추가 (필수) ⭐⭐⭐**
**파일**: `migrations/add_user_id_to_workout_records.sql`

**목적**: 
- `members` 테이블에 `user_id` 컬럼 추가 (nullable)
- `members.email` 컬럼을 nullable로 변경
- `workout_records` 테이블에 `user_id` 컬럼 추가 (NOT NULL)
- `workout_records.member_id` 컬럼을 nullable로 변경

**이 파일이 가장 중요합니다!** 500 에러 해결에 필요합니다.

**실행 방법**:
```bash
psql -U your_username -d your_database -f migrations/add_user_id_to_workout_records.sql
```

**또는 psql에서**:
```sql
\i migrations/add_user_id_to_workout_records.sql
```

**확인 쿼리**:
```sql
-- members 테이블에 user_id 컬럼이 있는지 확인
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'members' AND column_name = 'user_id';

-- workout_records 테이블에 user_id 컬럼이 있는지 확인
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'workout_records' AND column_name = 'user_id';
```

**성공 메시지**:
```
✅ Phase 1 마이그레이션 완료!
   - members.user_id 컬럼 추가됨
   - members.email nullable로 변경됨
   - workout_records.user_id 컬럼 추가됨
   - workout_records.member_id nullable로 변경됨
```

---

### **2단계: GoalType 간소화 (이미 실행했으면 스킵)**
**파일**: `migrations/simplify_goal_type.sql`

**목적**: GoalType enum을 7개에서 4개로 간소화
- 제거: `MUSCLE_GAIN`, `BODY_FAT_LOSS`, `CUSTOM`
- 유지: `WEIGHT_LOSS`, `STRENGTH_UP`, `ENDURANCE`, `MAINTENANCE`

**실행 전 확인**:
```sql
-- 현재 GoalType enum 값 확인
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = 'goal_type_enum'::regtype
ORDER BY enumsortorder;
```

**이미 4개만 있으면 스킵!**

**실행 방법**:
```bash
psql -U your_username -d your_database -f migrations/simplify_goal_type.sql
```

**성공 메시지**:
- 이미 간소화되어 있으면: `✅ GoalType enum이 이미 간소화되어 있습니다. (4개 값)`
- 간소화 완료 시: `✅ GoalType 간소화 마이그레이션 완료!`

---

### **3단계: Phase 2 - 추세 필드 추가 (이미 실행했으면 스킵)**
**파일**: `sql/phase2_trend_fields.sql`

**목적**: 
- `memberships` 테이블에 프로그램/추세 필드 추가
- `pt_sessions` 테이블에 측정값 필드 추가
- `program_milestones` 테이블 생성

**실행 전 확인**:
```sql
-- memberships 테이블에 duration_weeks 컬럼이 있는지 확인
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'memberships' AND column_name = 'duration_weeks';

-- program_milestones 테이블이 있는지 확인
SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'program_milestones'
);
```

**이미 있으면 스킵!**

**실행 방법**:
```bash
psql -U your_username -d your_database -f sql/phase2_trend_fields.sql
```

**성공 메시지**:
```
✅ Phase 2 스키마 업데이트 완료!
   - memberships 테이블에 프로그램/추세 필드 추가됨
   - pt_sessions 테이블에 측정값 필드 추가됨
   - program_milestones 테이블 생성됨
```

---

## ✅ 실행 후 확인

모든 마이그레이션 실행 후 다음 쿼리로 확인:

```sql
-- 1. members 테이블 구조 확인
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'members' 
ORDER BY ordinal_position;

-- 2. workout_records 테이블 구조 확인
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'workout_records' 
ORDER BY ordinal_position;

-- 3. GoalType enum 확인 (4개만 있어야 함)
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = 'goal_type_enum'::regtype
ORDER BY enumsortorder;

-- 4. 외래키 제약조건 확인
SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND (tc.table_name = 'members' OR tc.table_name = 'workout_records')
  AND kcu.column_name LIKE '%user_id%';
```

---

## ⚠️ 문제 발생 시

1. **트랜잭션 롤백**: 각 SQL 파일은 `DO $$ ... END $$;` 블록으로 감싸져 있으므로, 에러 발생 시 자동 롤백됩니다.

2. **수동 롤백**: 백업 파일에서 복원
   ```bash
   psql -U your_username -d your_database < backup_YYYYMMDD_HHMMSS.sql
   ```

3. **GoalType 롤백**: `simplify_goal_type.sql` 파일 하단의 롤백 스크립트 참고

---

## 📝 체크리스트

- [ ] 데이터베이스 백업 완료
- [ ] 0단계: `verify_all_tables.sql` 실행 (상태 확인)
- [ ] 1단계: `add_user_id_to_workout_records.sql` 실행 (필수)
- [ ] 1단계 확인 쿼리 실행 및 결과 확인
- [ ] 2단계: GoalType 상태 확인 후 필요시 `simplify_goal_type.sql` 실행
- [ ] 3단계: Phase 2 상태 확인 후 필요시 `phase2_trend_fields.sql` 실행
- [ ] 최종 확인 쿼리 실행
- [ ] 백엔드 서버 재시작 및 테스트

---

## 🎯 빠른 참조

### 가장 중요한 파일
1. **`add_user_id_to_workout_records.sql`** - 필수! 500 에러 해결

### 선택적 파일
2. **`simplify_goal_type.sql`** - 이미 간소화되어 있으면 스킵
3. **`phase2_trend_fields.sql`** - 이미 실행했으면 스킵

### 검증 파일
- **`verify_all_tables.sql`** - 전체 상태 확인 (권장)
- **`check_migration_status.sql`** - 간단한 상태 확인
