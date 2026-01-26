-- ============================================================
-- 마이그레이션 상태 확인 쿼리 (안전 버전)
-- ============================================================
-- 이 쿼리를 먼저 실행하여 현재 데이터베이스 상태를 확인하세요
-- 오류가 발생해도 계속 진행됩니다.
-- ============================================================

-- 1. goal_type_enum 타입이 존재하는지 확인
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'goal_type_enum')
        THEN '✅ goal_type_enum 존재'
        ELSE '❌ goal_type_enum 없음 (phase2_trend_fields.sql 또는 all_migrations.sql 실행 필요)'
    END as "goal_type_enum 존재 여부";

-- 2. GoalType enum 현재 값 확인 (enum이 존재할 때만)
DO $$
DECLARE
    enum_exists BOOLEAN;
BEGIN
    SELECT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'goal_type_enum') INTO enum_exists;
    
    IF enum_exists THEN
        RAISE NOTICE '현재 GoalType 값:';
    ELSE
        RAISE NOTICE 'goal_type_enum이 존재하지 않습니다.';
    END IF;
END $$;

SELECT 
    enumlabel as "현재 GoalType 값",
    enumsortorder as "순서"
FROM pg_enum 
WHERE enumtypid = 'goal_type_enum'::regtype
ORDER BY enumsortorder;

-- 3. memberships 테이블의 main_goal_type 분포 확인 (테이블이 존재할 때만)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'memberships') THEN
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'memberships' AND column_name = 'main_goal_type'
        ) THEN
            RAISE NOTICE 'memberships.main_goal_type 분포:';
        ELSE
            RAISE NOTICE 'memberships.main_goal_type 컬럼이 없습니다.';
        END IF;
    ELSE
        RAISE NOTICE 'memberships 테이블이 존재하지 않습니다.';
    END IF;
END $$;

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

-- 4. 제거될 GoalType이 있는지 확인 (enum이 존재하고 테이블이 있을 때만)
SELECT 
    "main_goal_type" as "제거될 목표 유형",
    COUNT(*) as "회원 수"
FROM "memberships"
WHERE EXISTS (SELECT 1 FROM pg_type WHERE typname = 'goal_type_enum')
  AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'memberships')
  AND EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'memberships' AND column_name = 'main_goal_type'
  )
  AND "main_goal_type" IN ('MUSCLE_GAIN', 'BODY_FAT_LOSS', 'CUSTOM')
GROUP BY "main_goal_type";

-- 5. TypeORM migrations 테이블 확인 (있는 경우)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'migrations') THEN
        RAISE NOTICE 'TypeORM migrations 테이블:';
    ELSE
        RAISE NOTICE 'migrations 테이블이 존재하지 않습니다. (TypeORM 마이그레이션 미사용 또는 초기 상태)';
    END IF;
END $$;

SELECT 
    "timestamp",
    "name"
FROM "migrations"
WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'migrations')
ORDER BY "timestamp" DESC;
