# SQL 마이그레이션 최종 실행 가이드

## ⚠️ 실행 전 필수 사항

1. **데이터베이스 백업 필수!**
   ```bash
   pg_dump -U your_username -d your_database > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **모든 SQL 파일이 안전하게 수정되었습니다:**
   - 테이블/컬럼 존재 여부 확인
   - enum 타입 존재 여부 확인
   - 오류 발생 시에도 계속 진행
   - 중복 실행 가능 (이미 완료된 작업은 스킵)

---

## 🚀 실행 순서 (반드시 이 순서대로!)

### **0단계: 상태 확인 (먼저 실행!) ⭐**
**파일**: `migrations/verify_all_tables.sql`

**목적**: 현재 데이터베이스 상태를 안전하게 확인

**실행 방법**:
```sql
\i migrations/verify_all_tables.sql
```

**결과 확인**:
- 실행해야 할 마이그레이션 파일 목록이 자동으로 표시됩니다
- 각 테이블/컬럼의 상태를 확인할 수 있습니다

---

### **1단계: Phase 1 - UserId 추가 (필수!) ⭐⭐⭐**
**파일**: `migrations/add_user_id_to_workout_records.sql`

**목적**: 
- `members` 테이블에 `user_id` 컬럼 추가 (nullable)
- `members.email` 컬럼을 nullable로 변경
- `workout_records` 테이블에 `user_id` 컬럼 추가 (NOT NULL)
- `workout_records.member_id` 컬럼을 nullable로 변경

**⚠️ 이 파일이 가장 중요합니다! 500 에러 해결에 필요합니다.**

**실행 방법**:
```sql
\i migrations/add_user_id_to_workout_records.sql
```

**성공 메시지**:
```
✅ Phase 1 마이그레이션 완료!
   - members.user_id 컬럼 추가됨
   - members.email nullable로 변경됨
   - workout_records.user_id 컬럼 추가됨
   - workout_records.member_id nullable로 변경됨
```

**오류 발생 시**:
- 테이블이 없으면: "테이블이 존재하지 않습니다" 메시지 표시
- 이미 실행했으면: 자동으로 스킵 (IF NOT EXISTS 사용)

---

### **2단계: GoalType 간소화 (선택)**
**파일**: `migrations/simplify_goal_type.sql`

**목적**: GoalType enum을 7개에서 4개로 간소화
- 제거: `MUSCLE_GAIN`, `BODY_FAT_LOSS`, `CUSTOM`
- 유지: `WEIGHT_LOSS`, `STRENGTH_UP`, `ENDURANCE`, `MAINTENANCE`

**실행 방법**:
```sql
\i migrations/simplify_goal_type.sql
```

**성공 메시지**:
- 이미 간소화되어 있으면: `✅ GoalType enum이 이미 간소화되어 있습니다. (4개 값)`
- 간소화 완료 시: `✅ GoalType 간소화 마이그레이션 완료!`

**오류 발생 시**:
- enum이 없으면: "goal_type_enum이 존재하지 않습니다" 메시지 표시 후 RETURN (오류 없음)
- memberships 테이블이 없으면: enum만 간소화하고 계속 진행

---

### **3단계: Phase 2 - 추세 필드 추가 (선택)**
**파일**: `sql/phase2_trend_fields.sql`

**목적**: 
- `memberships` 테이블에 프로그램/추세 필드 추가
- `pt_sessions` 테이블에 측정값 필드 추가
- `program_milestones` 테이블 생성

**실행 방법**:
```sql
\i sql/phase2_trend_fields.sql
```

**성공 메시지**:
```
✅ Phase 2 스키마 업데이트 완료!
   - memberships 테이블에 프로그램/추세 필드 추가됨
   - pt_sessions 테이블에 측정값 필드 추가됨
   - program_milestones 테이블 생성됨
```

**오류 발생 시**:
- 이미 실행했으면: `IF NOT EXISTS`로 인해 자동 스킵

---

## ✅ 실행 후 확인

모든 마이그레이션 실행 후:

1. **백엔드 서버 재시작**
   ```bash
   npm run start:dev
   ```

2. **회원관리 페이지 테스트**
   - 500 에러가 해결되었는지 확인
   - 회원 목록이 정상적으로 표시되는지 확인

3. **최종 검증 (선택)**
   ```sql
   \i migrations/verify_all_tables.sql
   ```

---

## 📋 체크리스트

- [ ] 데이터베이스 백업 완료
- [ ] 0단계: `verify_all_tables.sql` 실행 (상태 확인)
- [ ] 1단계: `add_user_id_to_workout_records.sql` 실행 (필수)
- [ ] 1단계 성공 메시지 확인
- [ ] 2단계: `simplify_goal_type.sql` 실행 (선택, 이미 간소화되어 있으면 자동 스킵)
- [ ] 3단계: `phase2_trend_fields.sql` 실행 (선택, 이미 실행했으면 자동 스킵)
- [ ] 백엔드 서버 재시작
- [ ] 회원관리 페이지 테스트 (500 에러 해결 확인)

---

## 🎯 빠른 참조

### 필수 파일 (반드시 실행)
1. **`verify_all_tables.sql`** - 상태 확인
2. **`add_user_id_to_workout_records.sql`** - 필수! 500 에러 해결

### 선택 파일 (이미 실행했으면 자동 스킵)
3. **`simplify_goal_type.sql`** - GoalType 간소화
4. **`phase2_trend_fields.sql`** - Phase 2 필드 추가

---

## ⚠️ 문제 발생 시

1. **오류 메시지 확인**: 각 SQL 파일은 상세한 오류 메시지를 표시합니다
2. **백업에서 복원**: 문제 발생 시 백업 파일로 복원
   ```bash
   psql -U your_username -d your_database < backup_YYYYMMDD_HHMMSS.sql
   ```
3. **중복 실행 안전**: 모든 파일은 중복 실행해도 안전합니다 (IF NOT EXISTS 사용)

---

## 📝 수정된 내용 (오류 방지)

모든 SQL 파일에 다음 안전 장치가 추가되었습니다:

1. ✅ 테이블 존재 여부 확인
2. ✅ 컬럼 존재 여부 확인
3. ✅ enum 타입 존재 여부 확인
4. ✅ 중복 실행 방지 (IF NOT EXISTS)
5. ✅ 오류 발생 시에도 계속 진행 (EXCEPTION 처리)
6. ✅ 상세한 성공/오류 메시지
