# 마이그레이션 가이드 (Migration Guide)

## 마이그레이션이란?

**마이그레이션(Migration)**은 데이터베이스 스키마(테이블 구조, 컬럼, 타입 등)를 버전별로 관리하고 변경사항을 추적하는 방법입니다.

### 왜 필요한가?

1. **스키마 버전 관리**: 데이터베이스 구조 변경 이력을 코드로 관리
2. **팀 협업**: 모든 개발자가 동일한 데이터베이스 구조를 유지
3. **배포 안정성**: 프로덕션 환경에 안전하게 스키마 변경 적용
4. **롤백 가능**: 문제 발생 시 이전 상태로 되돌리기 가능

### TypeORM 마이그레이션 작동 방식

1. **마이그레이션 파일 생성**: `src/migrations/` 폴더에 타임스탬프와 함께 생성
2. **마이그레이션 실행**: `npm run migration:run` 명령으로 실행
3. **마이그레이션 추적**: `migrations` 테이블에 실행된 마이그레이션 기록 저장
4. **중복 실행 방지**: 이미 실행된 마이그레이션은 다시 실행되지 않음

## 현재 프로젝트의 마이그레이션

### 마이그레이션 파일 위치
```
src/migrations/
├── 1737331200000-AddProgramFields.ts      # 프로그램 필드 추가
├── 1737417600000-AddPhase2TrendFields.ts  # Phase 2 추세 필드 추가
└── 1739133562000-SimplifyGoalType.ts      # GoalType 간소화 (4개로 축소)
```

### 마이그레이션 실행 방법

#### 방법 1: TypeORM CLI 사용 (권장)
```bash
# 마이그레이션 실행
npm run migration:run

# 마이그레이션 롤백 (최신 마이그레이션 취소)
npm run migration:revert

# 마이그레이션 생성 (새 마이그레이션 파일 자동 생성)
npm run migration:generate -- -n MigrationName

# 마이그레이션 생성 (스키마 변경사항 자동 감지)
npm run migration:create -- -n MigrationName
```

#### 방법 2: SQL 직접 실행 (데이터베이스 연결 문제 시)
데이터베이스에 직접 접속하여 SQL을 실행할 수 있습니다.
- PostgreSQL 클라이언트 (psql, pgAdmin, DBeaver 등) 사용
- 아래 SQL 스크립트를 직접 실행

## GoalType 간소화 마이그레이션

### 목적
GoalType enum을 7개에서 4개로 간소화:
- **유지**: `WEIGHT_LOSS`, `STRENGTH_UP`, `ENDURANCE`, `MAINTENANCE`
- **제거**: `MUSCLE_GAIN`, `BODY_FAT_LOSS`, `CUSTOM`

### 데이터 마이그레이션 전략
- `MUSCLE_GAIN`, `BODY_FAT_LOSS` → `WEIGHT_LOSS`로 통합
- `CUSTOM` → `MAINTENANCE`로 통합

### 주의사항
⚠️ **마이그레이션 실행 전 백업 필수!**
```bash
# PostgreSQL 백업 예시
pg_dump -U your_username -d your_database > backup_before_goaltype_migration.sql
```

## 마이그레이션 실행 전 체크리스트

- [ ] 데이터베이스 백업 완료
- [ ] 데이터베이스 서버 실행 중 (PostgreSQL)
- [ ] `.env` 파일의 데이터베이스 연결 정보 확인
- [ ] 기존 데이터 확인 (특히 `main_goal_type` 컬럼 값)

## 문제 해결

### 1. 데이터베이스 연결 오류 (ECONNREFUSED)
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**해결 방법**:
1. PostgreSQL 서버가 실행 중인지 확인
   ```bash
   # macOS
   brew services list
   # 또는
   pg_isready
   ```

2. `.env` 파일의 데이터베이스 연결 정보 확인
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database
   ```

3. PostgreSQL 서버 시작
   ```bash
   # macOS (Homebrew)
   brew services start postgresql@14
   # 또는
   pg_ctl -D /usr/local/var/postgres start
   ```

### 2. 마이그레이션 중복 실행 오류
이미 실행된 마이그레이션은 다시 실행되지 않습니다. `migrations` 테이블을 확인하세요.

### 3. enum 타입 변경 오류
PostgreSQL에서 enum 타입을 직접 수정하는 것은 제한적입니다. 
새로운 enum 타입을 생성하고 컬럼을 변경한 후 기존 enum을 삭제하는 방식을 사용합니다.

## 참고 자료

- [TypeORM 마이그레이션 공식 문서](https://typeorm.io/migrations)
- [PostgreSQL ALTER TYPE 문서](https://www.postgresql.org/docs/current/sql-altertype.html)
