-- ============================================================
-- GoalType 간소화 마이그레이션 SQL 스크립트
-- ============================================================
-- 목적: GoalType enum을 7개에서 4개로 간소화
-- 제거: MUSCLE_GAIN, BODY_FAT_LOSS, CUSTOM
-- 유지: WEIGHT_LOSS, STRENGTH_UP, ENDURANCE, MAINTENANCE
-- ============================================================

-- 주의: 실행 전 데이터베이스 백업 필수!
-- pg_dump -U your_username -d your_database > backup_before_goaltype_migration.sql

BEGIN;

-- 1. 기존 데이터 마이그레이션
-- MUSCLE_GAIN, BODY_FAT_LOSS는 WEIGHT_LOSS로 통합
UPDATE "memberships"
SET "main_goal_type" = 'WEIGHT_LOSS'
WHERE "main_goal_type" IN ('MUSCLE_GAIN', 'BODY_FAT_LOSS');

-- CUSTOM은 MAINTENANCE로 통합
UPDATE "memberships"
SET "main_goal_type" = 'MAINTENANCE'
WHERE "main_goal_type" = 'CUSTOM';

-- 2. 마이그레이션 결과 확인 (선택사항)
-- SELECT "main_goal_type", COUNT(*) 
-- FROM "memberships" 
-- GROUP BY "main_goal_type";

-- 3. 새로운 enum 타입 생성 (4개만 포함)
CREATE TYPE "goal_type_enum_new" AS ENUM (
    'WEIGHT_LOSS',
    'STRENGTH_UP',
    'ENDURANCE',
    'MAINTENANCE'
);

-- 4. 컬럼 타입 변경
ALTER TABLE "memberships"
ALTER COLUMN "main_goal_type" TYPE "goal_type_enum_new"
USING "main_goal_type"::text::"goal_type_enum_new";

-- 5. 기존 enum 타입 삭제
DROP TYPE IF EXISTS "goal_type_enum";

-- 6. 새 enum 타입 이름을 기존 이름으로 변경
ALTER TYPE "goal_type_enum_new" RENAME TO "goal_type_enum";

-- 7. 마이그레이션 기록 (선택사항 - TypeORM이 자동으로 관리하지만 수동으로도 가능)
-- INSERT INTO "migrations" ("timestamp", "name") 
-- VALUES (1739133562000, 'SimplifyGoalType1739133562000')
-- ON CONFLICT DO NOTHING;

COMMIT;

-- ============================================================
-- 롤백 스크립트 (문제 발생 시 실행)
-- ============================================================
/*
BEGIN;

-- 1. 기존 enum 타입 복원 (모든 값 포함)
CREATE TYPE "goal_type_enum_old" AS ENUM (
    'WEIGHT_LOSS',
    'MUSCLE_GAIN',
    'STRENGTH_UP',
    'ENDURANCE',
    'BODY_FAT_LOSS',
    'MAINTENANCE',
    'CUSTOM'
);

-- 2. 컬럼 타입 변경
ALTER TABLE "memberships"
ALTER COLUMN "main_goal_type" TYPE "goal_type_enum_old"
USING "main_goal_type"::text::"goal_type_enum_old";

-- 3. 기존 enum 타입 삭제
DROP TYPE IF EXISTS "goal_type_enum";

-- 4. 새 enum 타입 이름을 기존 이름으로 변경
ALTER TYPE "goal_type_enum_old" RENAME TO "goal_type_enum";

COMMIT;
*/
