-- ============================================================
-- 초기 테스트용 회원 데이터 생성 (5명)
-- ============================================================
-- 설명: 평균적인 신체 수치를 가진 테스트 회원 5명 생성
-- GoalType: WEIGHT_LOSS, STRENGTH_UP, ENDURANCE, MAINTENANCE (4개 중 하나만 선택)
-- 
-- 사용 방법:
--   1. DBeaver 또는 다른 PostgreSQL 클라이언트에서 열기
--   2. 데이터베이스에 연결
--   3. 전체 스크립트 실행 (F5 또는 실행 버튼)
--
-- 실행 전 확인사항:
--   1. members 테이블이 존재하는지 확인
--   2. gender_enum, memberstatus enum이 존재하는지 확인
-- ============================================================

DO $$
DECLARE
    table_exists BOOLEAN;
    gender_enum_exists BOOLEAN;
    status_enum_exists BOOLEAN;
    member_count INTEGER;
BEGIN
    -- 테이블 존재 여부 확인
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables WHERE table_name = 'members'
    ) INTO table_exists;

    IF NOT table_exists THEN
        RAISE EXCEPTION 'members 테이블이 존재하지 않습니다.';
    END IF;

    -- enum 타입 존재 여부 확인
    SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'gender_enum'
    ) INTO gender_enum_exists;

    IF NOT gender_enum_exists THEN
        RAISE EXCEPTION 'gender_enum이 존재하지 않습니다.';
    END IF;

    SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'memberstatus'
    ) INTO status_enum_exists;

    IF NOT status_enum_exists THEN
        RAISE EXCEPTION 'memberstatus enum이 존재하지 않습니다.';
    END IF;

    -- 기존 테스트 데이터 개수 확인
    SELECT COUNT(*) INTO member_count
    FROM members
    WHERE name IN ('김철수', '이영희', '박민수', '최지은', '정대현');

    IF member_count > 0 THEN
        RAISE NOTICE '⚠️  이미 테스트 회원 데이터가 존재합니다. (기존: %명)', member_count;
        RAISE NOTICE '   기존 데이터를 삭제하고 새로 생성합니다.';
        DELETE FROM members WHERE name IN ('김철수', '이영희', '박민수', '최지은', '정대현');
    END IF;

    RAISE NOTICE '🔄 테스트 회원 데이터 생성 시작...';

    -- 회원 1: 김철수 (남성, 32세) - 체중 감량
    INSERT INTO members (
        id, name, phone, email, join_date, status,
        height, weight, birth_date, age, gender,
        goal, goal_progress, total_sessions, completed_sessions,
        created_at, updated_at
    ) VALUES (
        gen_random_uuid(),
        '김철수',
        '010-1234-5678',
        'kim.chulsoo@example.com',
        CURRENT_DATE - INTERVAL '3 months',
        'ACTIVE'::memberstatus,
        175.5,  -- 키 (cm)
        72.3,   -- 몸무게 (kg)
        DATE '1992-05-15',
        32,
        'MALE'::gender_enum,
        '체중 감량',
        45,
        20,
        18,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

    -- 회원 2: 이영희 (여성, 28세) - 체력 증진
    INSERT INTO members (
        id, name, phone, email, join_date, status,
        height, weight, birth_date, age, gender,
        goal, goal_progress, total_sessions, completed_sessions,
        created_at, updated_at
    ) VALUES (
        gen_random_uuid(),
        '이영희',
        '010-2345-6789',
        'lee.younghee@example.com',
        CURRENT_DATE - INTERVAL '2 months',
        'ACTIVE'::memberstatus,
        162.0,  -- 키 (cm)
        58.5,   -- 몸무게 (kg)
        DATE '1996-08-22',
        28,
        'FEMALE'::gender_enum,
        '체력 증진',
        60,
        15,
        12,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

    -- 회원 3: 박민수 (남성, 35세) - 근력 상승
    INSERT INTO members (
        id, name, phone, email, join_date, status,
        height, weight, birth_date, age, gender,
        goal, goal_progress, total_sessions, completed_sessions,
        created_at, updated_at
    ) VALUES (
        gen_random_uuid(),
        '박민수',
        '010-3456-7890',
        'park.minsu@example.com',
        CURRENT_DATE - INTERVAL '5 months',
        'ACTIVE'::memberstatus,
        178.2,  -- 키 (cm)
        78.0,   -- 몸무게 (kg)
        DATE '1989-11-03',
        35,
        'MALE'::gender_enum,
        '근력 상승',
        70,
        30,
        25,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

    -- 회원 4: 최지은 (여성, 30세) - 체중 감량
    INSERT INTO members (
        id, name, phone, email, join_date, status,
        height, weight, birth_date, age, gender,
        goal, goal_progress, total_sessions, completed_sessions,
        created_at, updated_at
    ) VALUES (
        gen_random_uuid(),
        '최지은',
        '010-4567-8901',
        'choi.jieun@example.com',
        CURRENT_DATE - INTERVAL '1 month',
        'ACTIVE'::memberstatus,
        165.8,  -- 키 (cm)
        61.2,   -- 몸무게 (kg)
        DATE '1994-02-14',
        30,
        'FEMALE'::gender_enum,
        '체중 감량',
        35,
        10,
        8,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

    -- 회원 5: 정대현 (남성, 38세) - 유지
    INSERT INTO members (
        id, name, phone, email, join_date, status,
        height, weight, birth_date, age, gender,
        goal, goal_progress, total_sessions, completed_sessions,
        created_at, updated_at
    ) VALUES (
        gen_random_uuid(),
        '정대현',
        '010-5678-9012',
        'jung.daehyun@example.com',
        CURRENT_DATE - INTERVAL '4 months',
        'ACTIVE'::memberstatus,
        172.0,  -- 키 (cm)
        75.5,   -- 몸무게 (kg)
        DATE '1986-07-28',
        38,
        'MALE'::gender_enum,
        '유지',
        55,
        25,
        20,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

    RAISE NOTICE '✅ 테스트 회원 데이터 생성 완료! (5명)';
    RAISE NOTICE '';
    RAISE NOTICE '생성된 회원 목록:';
    RAISE NOTICE '  1. 김철수 (남, 32세, 175.5cm, 72.3kg) - 체중 감량';
    RAISE NOTICE '  2. 이영희 (여, 28세, 162.0cm, 58.5kg) - 체력 증진';
    RAISE NOTICE '  3. 박민수 (남, 35세, 178.2cm, 78.0kg) - 근력 상승';
    RAISE NOTICE '  4. 최지은 (여, 30세, 165.8cm, 61.2kg) - 체중 감량';
    RAISE NOTICE '  5. 정대현 (남, 38세, 172.0cm, 75.5kg) - 유지';
    RAISE NOTICE '';
    RAISE NOTICE '📌 참고: email 필드는 nullable이므로 선택적으로 포함했습니다.';

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION '테스트 회원 데이터 생성 실패: %', SQLERRM;
END $$;

-- ============================================================
-- 생성된 데이터 확인 쿼리
-- ============================================================
SELECT 
    name AS "이름",
    phone AS "전화번호",
    email AS "이메일",
    join_date AS "가입일",
    status AS "상태",
    height AS "키(cm)",
    weight AS "몸무게(kg)",
    age AS "나이",
    gender AS "성별",
    goal AS "목표",
    goal_progress AS "진행률(%)",
    total_sessions AS "총 세션",
    completed_sessions AS "완료 세션",
    created_at AS "생성일시"
FROM members
WHERE name IN ('김철수', '이영희', '박민수', '최지은', '정대현')
ORDER BY created_at DESC;
