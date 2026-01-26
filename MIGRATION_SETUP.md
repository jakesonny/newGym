# TypeORM 마이그레이션 설정 가이드

## 📋 필요한 환경 변수

TypeORM 마이그레이션을 실행하려면 다음 환경 변수들이 필요합니다.

### 방법 1: DATABASE_URL 사용 (권장)

`.env` 파일에 다음을 추가:

```env
DATABASE_URL=postgresql://사용자명:비밀번호@호스트:포트/데이터베이스명
```

**예시:**
```env
# 로컬 개발 환경
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gym_membership_db

# Render 등 외부 DB
DATABASE_URL=postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/dbname
```

### 방법 2: 개별 설정 사용

`.env` 파일에 다음을 추가:

```env
# 데이터베이스 설정
DB_HOST=localhost          # 데이터베이스 호스트 주소
DB_PORT=5432              # PostgreSQL 포트 (기본값: 5432)
DB_USERNAME=postgres      # 데이터베이스 사용자명
DB_PASSWORD=postgres      # 데이터베이스 비밀번호
DB_NAME=gym_membership_db # 데이터베이스 이름

# 선택 사항
DB_LOGGING=true           # SQL 쿼리 로그 출력 (개발 환경)
NODE_ENV=development      # 환경 설정
```

## 🔧 .env 파일 생성 방법

1. **백엔드 폴더로 이동:**
   ```bash
   cd gym-membership-backend
   ```

2. **.env.example을 복사하여 .env 생성:**
   ```bash
   # macOS/Linux
   cp .env.example .env
   
   # Windows
   copy .env.example .env
   ```

3. **.env 파일 편집:**
   - 실제 데이터베이스 정보로 수정
   - 비밀번호 등 민감한 정보는 절대 Git에 커밋하지 않기

## ✅ 마이그레이션 실행 전 확인사항

### 1. PostgreSQL 서버 실행 확인

```bash
# PostgreSQL 서버 상태 확인
pg_isready

# 또는 (macOS Homebrew)
brew services list | grep postgresql
```

**서버가 실행되지 않았다면:**
```bash
# macOS (Homebrew)
brew services start postgresql@14
# 또는
brew services start postgresql@15

# Linux
sudo systemctl start postgresql

# Windows
# 서비스 관리자에서 PostgreSQL 서비스 시작
```

### 2. 데이터베이스 생성 확인

```bash
# PostgreSQL에 접속
psql -U postgres

# 데이터베이스 목록 확인
\l

# 데이터베이스가 없으면 생성
CREATE DATABASE gym_membership_db;

# 종료
\q
```

### 3. .env 파일 확인

백엔드 폴더의 `.env` 파일이 존재하고 올바른 값이 설정되어 있는지 확인:

```bash
# .env 파일 확인 (비밀번호는 마스킹됨)
cat .env | grep -E "DB_|DATABASE_URL"
```

## 🚀 마이그레이션 실행

### 1. 마이그레이션 실행

```bash
npm run migration:run
```

### 2. 마이그레이션 상태 확인

```bash
# PostgreSQL에 접속
psql -U postgres -d gym_membership_db

# migrations 테이블 확인
SELECT * FROM migrations ORDER BY timestamp DESC;

# 종료
\q
```

### 3. 마이그레이션 롤백 (필요시)

```bash
npm run migration:revert
```

## 🔍 문제 해결

### 오류: `ECONNREFUSED`

**원인:** PostgreSQL 서버가 실행되지 않음

**해결:**
1. PostgreSQL 서버 시작
2. `.env` 파일의 `DB_HOST`, `DB_PORT` 확인

### 오류: `password authentication failed`

**원인:** 잘못된 사용자명 또는 비밀번호

**해결:**
1. `.env` 파일의 `DB_USERNAME`, `DB_PASSWORD` 확인
2. PostgreSQL 사용자 비밀번호 재설정:
   ```bash
   psql -U postgres
   ALTER USER postgres WITH PASSWORD '새비밀번호';
   ```

### 오류: `database "gym_membership_db" does not exist`

**원인:** 데이터베이스가 생성되지 않음

**해결:**
```bash
psql -U postgres
CREATE DATABASE gym_membership_db;
\q
```

### 오류: `relation "migrations" does not exist`

**원인:** 마이그레이션 테이블이 없음 (첫 실행)

**해결:** 정상입니다. TypeORM이 자동으로 생성합니다.

## 📝 환경 변수 우선순위

TypeORM은 다음 순서로 환경 변수를 읽습니다:

1. **DATABASE_URL** (최우선)
   - 전체 연결 문자열 사용
   - 예: `postgresql://user:pass@host:port/dbname`

2. **개별 설정** (DATABASE_URL이 없을 때)
   - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`

## 💡 팁

### 로컬 개발 환경

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=gym_membership_db
DB_LOGGING=true
```

### Render 배포 환경

```env
DATABASE_URL=postgresql://user:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/dbname
# 또는
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=dbname
```

### .env 파일 보안

- `.env` 파일은 절대 Git에 커밋하지 않기
- `.gitignore`에 `.env` 추가 확인
- 프로덕션 환경에서는 환경 변수를 서비스 제공자(Render, Vercel 등)에서 직접 설정
