-- ============================================================
-- 전체 테이블 및 마이그레이션 상태 종합 검증 스크립트
-- ============================================================
-- 이 스크립트는 모든 테이블과 마이그레이션 상태를 안전하게 확인합니다.
-- 오류가 발생해도 계속 진행됩니다.
-- ============================================================


-- ============================================================
-- 1. 핵심 테이블 존재 여부 확인
-- ============================================================

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') 
        THEN '✅ users 테이블 존재'
        ELSE '❌ users 테이블 없음'
    END as "users 테이블",
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'members') 
        THEN '✅ members 테이블 존재'
        ELSE '❌ members 테이블 없음'
    END as "members 테이블",
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'memberships') 
        THEN '✅ memberships 테이블 존재'
        ELSE '❌ memberships 테이블 없음'
    END as "memberships 테이블",
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'workout_records') 
        THEN '✅ workout_records 테이블 존재'
        ELSE '❌ workout_records 테이블 없음'
    END as "workout_records 테이블";


-- ============================================================
-- 2. Phase 1: UserId 관련 컬럼 확인
-- ============================================================

-- members 테이블의 user_id 컬럼 확인
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'members' AND column_name = 'user_id'
        ) 
        THEN '✅ members.user_id 컬럼 존재'
        ELSE '❌ members.user_id 컬럼 없음 (add_user_id_to_workout_records.sql 실행 필요)'
    END as "members.user_id",
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'members' AND column_name = 'email'
        ) 
        THEN (
            SELECT CASE 
                WHEN is_nullable = 'YES' 
                THEN '✅ members.email nullable (정상)'
                ELSE '⚠️  members.email NOT NULL (nullable로 변경 필요)'
            END
            FROM information_schema.columns 
            WHERE table_name = 'members' AND column_name = 'email'
        )
        ELSE '❌ members.email 컬럼 없음'
    END as "members.email";

-- workout_records 테이블의 user_id 컬럼 확인
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'workout_records' AND column_name = 'user_id'
        ) 
        THEN (
            SELECT CASE 
                WHEN is_nullable = 'NO' 
                THEN '✅ workout_records.user_id NOT NULL (정상)'
                ELSE '⚠️  workout_records.user_id nullable (NOT NULL로 변경 필요)'
            END
            FROM information_schema.columns 
            WHERE table_name = 'workout_records' AND column_name = 'user_id'
        )
        ELSE '❌ workout_records.user_id 컬럼 없음 (add_user_id_to_workout_records.sql 실행 필요)'
    END as "workout_records.user_id",
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'workout_records' AND column_name = 'member_id'
        ) 
        THEN (
            SELECT CASE 
                WHEN is_nullable = 'YES' 
                THEN '✅ workout_records.member_id nullable (정상)'
                ELSE '⚠️  workout_records.member_id NOT NULL (nullable로 변경 필요)'
            END
            FROM information_schema.columns 
            WHERE table_name = 'workout_records' AND column_name = 'member_id'
        )
        ELSE '❌ workout_records.member_id 컬럼 없음'
    END as "workout_records.member_id";


-- ============================================================
-- 3. 외래키 제약조건 확인
-- ============================================================

SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'FK_members_user_id'
        ) 
        THEN '✅ FK_members_user_id 외래키 존재'
        ELSE '❌ FK_members_user_id 외래키 없음'
    END as "members.user_id FK",
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'FK_workout_records_user_id'
        ) 
        THEN '✅ FK_workout_records_user_id 외래키 존재'
        ELSE '❌ FK_workout_records_user_id 외래키 없음'
    END as "workout_records.user_id FK";


-- ============================================================
-- 4. 인덱스 확인
-- ============================================================

SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_indexes 
            WHERE indexname = 'idx_members_user_id'
        ) 
        THEN '✅ idx_members_user_id 인덱스 존재'
        ELSE '❌ idx_members_user_id 인덱스 없음'
    END as "members.user_id 인덱스",
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_indexes 
            WHERE indexname = 'idx_workout_records_user_id'
        ) 
        THEN '✅ idx_workout_records_user_id 인덱스 존재'
        ELSE '❌ idx_workout_records_user_id 인덱스 없음'
    END as "workout_records.user_id 인덱스";


-- ============================================================
-- 5. GoalType enum 확인 (안전하게)
-- ============================================================

DO $$
DECLARE
    enum_label TEXT;
    enum_exists BOOLEAN;
    enum_count INTEGER;
BEGIN
    -- enum 타입 존재 여부 확인
    SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'goal_type_enum'
    ) INTO enum_exists;

    IF enum_exists THEN
        -- enum 값 개수 확인
        SELECT COUNT(*) INTO enum_count
        FROM pg_enum 
        WHERE enumtypid = 'goal_type_enum'::regtype;

        RAISE NOTICE '✅ goal_type_enum 존재 (값 개수: %)', enum_count;
        
        -- enum 값 목록 출력
        RAISE NOTICE '   현재 값:';
        FOR enum_label IN 
            SELECT enumlabel 
            FROM pg_enum 
            WHERE enumtypid = 'goal_type_enum'::regtype
            ORDER BY enumsortorder
        LOOP
            RAISE NOTICE '     - %', enum_label;
        END LOOP;

        -- 간소화 여부 확인
        IF enum_count = 4 THEN
            RAISE NOTICE '✅ GoalType이 이미 간소화되어 있습니다. (4개 값)';
        ELSIF enum_count = 7 THEN
            RAISE NOTICE '⚠️  GoalType이 아직 간소화되지 않았습니다. (7개 값)';
            RAISE NOTICE '   simplify_goal_type.sql 실행 필요';
        ELSE
            RAISE NOTICE '⚠️  GoalType 값 개수가 예상과 다릅니다. (현재: %개)', enum_count;
        END IF;
    ELSE
        RAISE NOTICE '❌ goal_type_enum이 존재하지 않습니다.';
        RAISE NOTICE '   phase2_trend_fields.sql 또는 all_migrations.sql 실행 필요';
    END IF;
END $$;


-- ============================================================
-- 6. memberships 테이블의 main_goal_type 분포 확인 (안전하게)
-- ============================================================

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'memberships') THEN
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'memberships' AND column_name = 'main_goal_type'
        ) THEN
            RAISE NOTICE '✅ memberships.main_goal_type 컬럼 존재';
            RAISE NOTICE '   데이터 분포:';
        ELSE
            RAISE NOTICE '❌ memberships.main_goal_type 컬럼 없음';
        END IF;
    ELSE
        RAISE NOTICE '❌ memberships 테이블이 존재하지 않습니다.';
    END IF;
END $$;

-- 실제 데이터 확인 (테이블이 있을 때만)
SELECT 
    "main_goal_type" as "목표 유형",
    COUNT(*) as "회원 수"
FROM "memberships"
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'memberships')
  AND EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'memberships' AND column_name = 'main_goal_type'
  )
GROUP BY "main_goal_type"
ORDER BY COUNT(*) DESC;


-- ============================================================
-- 7. Phase 2 필드 확인
-- ============================================================

SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'memberships' AND column_name = 'duration_weeks'
        ) 
        THEN '✅ memberships.duration_weeks 존재'
        ELSE '❌ memberships.duration_weeks 없음 (phase2_trend_fields.sql 실행 필요)'
    END as "memberships.duration_weeks",
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'memberships' AND column_name = 'is_rapid_progress'
        ) 
        THEN '✅ memberships.is_rapid_progress 존재'
        ELSE '❌ memberships.is_rapid_progress 없음 (phase2_trend_fields.sql 실행 필요)'
    END as "memberships.is_rapid_progress",
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'program_milestones'
        ) 
        THEN '✅ program_milestones 테이블 존재'
        ELSE '❌ program_milestones 테이블 없음 (phase2_trend_fields.sql 실행 필요)'
    END as "program_milestones 테이블";


-- ============================================================
-- 8. TypeORM migrations 테이블 확인 (안전하게)
-- ============================================================

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'migrations') THEN
        RAISE NOTICE '✅ migrations 테이블 존재';
        RAISE NOTICE '   실행된 마이그레이션:';
    ELSE
        RAISE NOTICE '⚠️  migrations 테이블 없음 (TypeORM 마이그레이션 미사용 또는 초기 상태)';
    END IF;
END $$;

-- 마이그레이션 목록 (테이블이 있을 때만)
DO $$
DECLARE
    migration_record RECORD;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'migrations') THEN
        RAISE NOTICE '실행된 마이그레이션 목록:';
        FOR migration_record IN 
            SELECT "timestamp", "name"
            FROM "migrations"
            ORDER BY "timestamp" DESC
            LIMIT 10
        LOOP
            RAISE NOTICE '  - %: %', migration_record.timestamp, migration_record.name;
        END LOOP;
    ELSE
        RAISE NOTICE '⚠️  migrations 테이블이 없어 마이그레이션 목록을 조회할 수 없습니다.';
    END IF;
END $$;


-- ============================================================
-- 9. 실행 권장 순서 요약
-- ============================================================

DO $$
DECLARE
    needs_phase1 BOOLEAN := FALSE;
    needs_goaltype BOOLEAN := FALSE;
    needs_phase2 BOOLEAN := FALSE;
BEGIN
    -- Phase 1 확인
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'members' AND column_name = 'user_id'
    ) OR NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'workout_records' AND column_name = 'user_id'
    ) THEN
        needs_phase1 := TRUE;
    END IF;

    -- GoalType 확인
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'goal_type_enum') THEN
        IF (SELECT COUNT(*) FROM pg_enum WHERE enumtypid = 'goal_type_enum'::regtype) != 4 THEN
            needs_goaltype := TRUE;
        END IF;
    END IF;

    -- Phase 2 확인
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'memberships' AND column_name = 'duration_weeks'
    ) THEN
        needs_phase2 := TRUE;
    END IF;

    RAISE NOTICE '';
    RAISE NOTICE '실행 권장 순서:';
    RAISE NOTICE '';
    
    IF needs_phase1 THEN
        RAISE NOTICE '1️⃣  [필수] add_user_id_to_workout_records.sql 실행';
    ELSE
        RAISE NOTICE '1️⃣  ✅ Phase 1 완료 (스킵 가능)';
    END IF;

    IF needs_goaltype THEN
        RAISE NOTICE '2️⃣  [선택] simplify_goal_type.sql 실행';
    ELSE
        RAISE NOTICE '2️⃣  ✅ GoalType 간소화 완료 (스킵 가능)';
    END IF;

    IF needs_phase2 THEN
        RAISE NOTICE '3️⃣  [선택] phase2_trend_fields.sql 실행';
    ELSE
        RAISE NOTICE '3️⃣  ✅ Phase 2 완료 (스킵 가능)';
    END IF;

    RAISE NOTICE '';
    IF NOT needs_phase1 AND NOT needs_goaltype AND NOT needs_phase2 THEN
        RAISE NOTICE '✅ 모든 마이그레이션이 완료되었습니다!';
    END IF;
END $$;

