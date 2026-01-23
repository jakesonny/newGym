-- ============================================================
-- 마이그레이션 상태 확인 쿼리
-- ============================================================
-- 이 쿼리를 먼저 실행하여 현재 데이터베이스 상태를 확인하세요
-- ============================================================

-- 1. GoalType enum 현재 값 확인
SELECT 
    enumlabel as "현재 GoalType 값",
    enumsortorder as "순서"
FROM pg_enum 
WHERE enumtypid = 'goal_type_enum'::regtype
ORDER BY enumsortorder;

-- 2. memberships 테이블의 main_goal_type 분포 확인
SELECT 
    "main_goal_type" as "목표 유형",
    COUNT(*) as "회원 수"
FROM "memberships"
GROUP BY "main_goal_type"
ORDER BY COUNT(*) DESC;

-- 3. 제거될 GoalType이 있는지 확인
SELECT 
    "main_goal_type" as "제거될 목표 유형",
    COUNT(*) as "회원 수"
FROM "memberships"
WHERE "main_goal_type" IN ('MUSCLE_GAIN', 'BODY_FAT_LOSS', 'CUSTOM')
GROUP BY "main_goal_type";

-- 4. TypeORM migrations 테이블 확인 (있는 경우)
SELECT 
    "timestamp",
    "name"
FROM "migrations"
ORDER BY "timestamp" DESC;

-- 5. goal_type_enum 타입이 존재하는지 확인
SELECT EXISTS (
    SELECT 1 
    FROM pg_type 
    WHERE typname = 'goal_type_enum'
) as "goal_type_enum 존재 여부";
