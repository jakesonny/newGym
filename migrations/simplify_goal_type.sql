-- ============================================================
-- GoalType 간소화 마이그레이션 SQL 스크립트
-- ============================================================
-- 목적: GoalType enum을 7개에서 4개로 간소화
-- 제거: MUSCLE_GAIN, BODY_FAT_LOSS, CUSTOM
-- 유지: WEIGHT_LOSS, STRENGTH_UP, ENDURANCE, MAINTENANCE
-- ============================================================

-- 주의: 실행 전 데이터베이스 백업 필수!
-- pg_dump -U your_username -d your_database > backup_before_goaltype_migration.sql

DO $$
DECLARE
    enum_exists BOOLEAN;
    enum_count INTEGER;
    has_old_values BOOLEAN;
    table_exists BOOLEAN;
BEGIN
    -- enum 타입 존재 여부 확인
    SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'goal_type_enum'
    ) INTO enum_exists;

    IF NOT enum_exists THEN
        RAISE NOTICE '❌ goal_type_enum이 존재하지 않습니다.';
        RAISE NOTICE '   phase2_trend_fields.sql 또는 all_migrations.sql을 먼저 실행하세요.';
        RETURN;
    END IF;

    -- memberships 테이블 존재 여부 확인
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_name = 'memberships'
    ) INTO table_exists;

    IF NOT table_exists THEN
        RAISE NOTICE '⚠️  memberships 테이블이 존재하지 않습니다.';
        RAISE NOTICE '   enum만 간소화합니다.';
    END IF;

    -- 현재 enum 값 개수 확인
    SELECT COUNT(*) INTO enum_count
    FROM pg_enum 
    WHERE enumtypid = 'goal_type_enum'::regtype;

    -- 이미 간소화되어 있는지 확인 (4개만 있으면 이미 완료)
    IF enum_count = 4 THEN
        RAISE NOTICE '✅ GoalType enum이 이미 간소화되어 있습니다. (4개 값)';
        RAISE NOTICE '   현재 값: WEIGHT_LOSS, STRENGTH_UP, ENDURANCE, MAINTENANCE';
        RETURN;
    END IF;

    RAISE NOTICE '🔄 GoalType 간소화 마이그레이션 시작... (현재 %개 값)', enum_count;

    -- 기존 데이터에 제거될 값이 있는지 확인 (테이블이 있을 때만)
    IF table_exists THEN
        SELECT EXISTS (
            SELECT 1 FROM "memberships"
            WHERE "main_goal_type" IN ('MUSCLE_GAIN', 'BODY_FAT_LOSS', 'CUSTOM')
        ) INTO has_old_values;

        -- 1. 기존 데이터 마이그레이션 (제거될 값이 있는 경우에만)
        IF has_old_values THEN
            RAISE NOTICE '   데이터 마이그레이션 중...';
            
            BEGIN
                -- MUSCLE_GAIN, BODY_FAT_LOSS는 WEIGHT_LOSS로 통합
                UPDATE "memberships"
                SET "main_goal_type" = 'WEIGHT_LOSS'
                WHERE "main_goal_type" IN ('MUSCLE_GAIN', 'BODY_FAT_LOSS');

                -- CUSTOM은 MAINTENANCE로 통합
                UPDATE "memberships"
                SET "main_goal_type" = 'MAINTENANCE'
                WHERE "main_goal_type" = 'CUSTOM';

                RAISE NOTICE '   ✅ 데이터 마이그레이션 완료';
            EXCEPTION
                WHEN OTHERS THEN
                    RAISE NOTICE '   ⚠️  데이터 마이그레이션 중 오류: %', SQLERRM;
            END;
        ELSE
            RAISE NOTICE '   ℹ️  마이그레이션할 데이터가 없습니다.';
        END IF;
    END IF;

    -- 2. 새로운 enum 타입 생성 (4개만 포함)
    RAISE NOTICE '   새로운 enum 타입 생성 중...';
    BEGIN
        CREATE TYPE "goal_type_enum_new" AS ENUM (
            'WEIGHT_LOSS',
            'STRENGTH_UP',
            'ENDURANCE',
            'MAINTENANCE'
        );
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE '      ℹ️  goal_type_enum_new가 이미 존재합니다.';
        WHEN OTHERS THEN
            RAISE EXCEPTION 'enum 타입 생성 실패: %', SQLERRM;
    END;

    -- 3. 컬럼 타입 변경 (테이블이 있을 때만)
    IF table_exists THEN
        RAISE NOTICE '   컬럼 타입 변경 중...';
        BEGIN
            ALTER TABLE "memberships"
            ALTER COLUMN "main_goal_type" TYPE "goal_type_enum_new"
            USING "main_goal_type"::text::"goal_type_enum_new";
        EXCEPTION
            WHEN OTHERS THEN
                RAISE EXCEPTION '컬럼 타입 변경 실패: %', SQLERRM;
        END;
    END IF;

    -- 4. 기존 enum 타입 삭제
    RAISE NOTICE '   기존 enum 타입 삭제 중...';
    DROP TYPE IF EXISTS "goal_type_enum";

    -- 5. 새 enum 타입 이름을 기존 이름으로 변경
    RAISE NOTICE '   enum 타입 이름 변경 중...';
    ALTER TYPE "goal_type_enum_new" RENAME TO "goal_type_enum";

    RAISE NOTICE '✅ GoalType 간소화 마이그레이션 완료!';
    RAISE NOTICE '   최종 값: WEIGHT_LOSS, STRENGTH_UP, ENDURANCE, MAINTENANCE';

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION '마이그레이션 실패: %', SQLERRM;
END $$;
