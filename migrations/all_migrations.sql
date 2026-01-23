-- ============================================================
-- 전체 마이그레이션 SQL 스크립트
-- ============================================================
-- 이 파일은 TypeORM 마이그레이션 파일들을 SQL로 변환한 것입니다.
-- 데이터베이스에 직접 접속하여 실행할 수 있습니다.
-- ============================================================

-- 주의: 실행 전 데이터베이스 백업 필수!
-- pg_dump -U your_username -d your_database > backup_before_migrations.sql

-- ============================================================
-- 마이그레이션 1: AddProgramFields (1737331200000)
-- ============================================================

BEGIN;

-- GoalType enum 생성
DO $$ BEGIN
    CREATE TYPE "goal_type_enum" AS ENUM (
        'WEIGHT_LOSS',
        'MUSCLE_GAIN',
        'STRENGTH_UP',
        'ENDURANCE',
        'BODY_FAT_LOSS',
        'MAINTENANCE',
        'CUSTOM'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- memberships 테이블에 프로그램 필드 추가
ALTER TABLE "memberships"
ADD COLUMN IF NOT EXISTS "main_goal_type" "goal_type_enum",
ADD COLUMN IF NOT EXISTS "start_value" numeric,
ADD COLUMN IF NOT EXISTS "current_value" numeric,
ADD COLUMN IF NOT EXISTS "target_value" numeric,
ADD COLUMN IF NOT EXISTS "target_unit" varchar(10),
ADD COLUMN IF NOT EXISTS "current_progress" numeric DEFAULT 0;

COMMIT;

-- ============================================================
-- 마이그레이션 2: AddPhase2TrendFields (1737417600000)
-- ============================================================

BEGIN;

-- GoalDirection enum 생성
DO $$ BEGIN
    CREATE TYPE "goal_direction_enum" AS ENUM (
        'INCREASE',
        'DECREASE'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- BlockPurpose enum 생성
DO $$ BEGIN
    CREATE TYPE "block_purpose_enum" AS ENUM (
        'ADAPTATION',
        'INTENSITY',
        'CONSOLIDATION'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- GoalType enum에 MAINTENANCE 추가 (이미 있으면 무시)
DO $$ BEGIN
    ALTER TYPE "goal_type_enum" ADD VALUE IF NOT EXISTS 'MAINTENANCE';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- RiskStatus enum에 FOUNDATION 추가
DO $$ BEGIN
    ALTER TYPE "risk_status_enum" ADD VALUE IF NOT EXISTS 'FOUNDATION' BEFORE 'GREEN';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- memberships 테이블에 Phase 2 필드 추가
ALTER TABLE "memberships"
ADD COLUMN IF NOT EXISTS "goal_direction" "goal_direction_enum",
ADD COLUMN IF NOT EXISTS "is_rapid_progress" boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS "is_measurement_overdue" boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS "last_measurement_at" timestamp;

-- memberships의 기존 데이터 기본값 업데이트 (FOUNDATION으로)
UPDATE "memberships" 
SET "risk_status" = 'FOUNDATION' 
WHERE "risk_status" IS NULL OR "current_progress" = 0;

-- pt_sessions 테이블에 stepTestTime 추가
ALTER TABLE "pt_sessions"
ADD COLUMN IF NOT EXISTS "step_test_time" integer;

-- program_milestones 테이블에 블록 관련 필드 추가
ALTER TABLE "program_milestones"
ADD COLUMN IF NOT EXISTS "block_number" integer,
ADD COLUMN IF NOT EXISTS "block_purpose" "block_purpose_enum",
ADD COLUMN IF NOT EXISTS "block_start_week" integer,
ADD COLUMN IF NOT EXISTS "block_end_week" integer;

COMMIT;

-- ============================================================
-- 마이그레이션 3: SimplifyGoalType (1739133562000)
-- ============================================================

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

-- 2. 새로운 enum 타입 생성 (4개만 포함)
CREATE TYPE "goal_type_enum_new" AS ENUM (
    'WEIGHT_LOSS',
    'STRENGTH_UP',
    'ENDURANCE',
    'MAINTENANCE'
);

-- 3. 컬럼 타입 변경
ALTER TABLE "memberships"
ALTER COLUMN "main_goal_type" TYPE "goal_type_enum_new"
USING "main_goal_type"::text::"goal_type_enum_new";

-- 4. 기존 enum 타입 삭제
DROP TYPE IF EXISTS "goal_type_enum";

-- 5. 새 enum 타입 이름을 기존 이름으로 변경
ALTER TYPE "goal_type_enum_new" RENAME TO "goal_type_enum";

COMMIT;

-- ============================================================
-- 마이그레이션 실행 확인 쿼리
-- ============================================================

-- GoalType enum 값 확인
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = 'goal_type_enum'::regtype
ORDER BY enumsortorder;

-- memberships 테이블의 main_goal_type 분포 확인
SELECT "main_goal_type", COUNT(*) as count
FROM "memberships"
GROUP BY "main_goal_type"
ORDER BY count DESC;
