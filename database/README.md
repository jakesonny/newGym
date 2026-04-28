# Database Structure Guide

이 프로젝트의 DB 구조 기준은 아래 두 가지입니다.

1. `src/migrations/*.ts`: 스키마 변경의 단일 진실 소스
2. `database/seeds/free_exercise_db_seed.sql`: 운동 대용량 시드

## 폴더 구조

- `database/docs`: DB 구조/운영 문서
- `database/seeds`: 대용량 시드 데이터
- `database/scripts`: 수동 실행 SQL
- `database/newgym_bootstrap.sql`: newgym 스키마 초기화 SQL

## newgym 스키마 고정

- 기본 스키마: `newgym`
- 환경 변수: `DB_SCHEMA=newgym`
- 초기화 SQL: `database/newgym_bootstrap.sql`

## 권장 실행 순서

```bash
npm run db:bootstrap:newgym
```

위 명령은 다음을 순서대로 실행합니다.

1. `newgym` 스키마 생성 및 권한 부여
2. TypeORM 마이그레이션 적용
3. 운동 대용량 시드 입력
