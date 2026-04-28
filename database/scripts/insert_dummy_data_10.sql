-- ============================================================
-- 더미 데이터 생성 스크립트 (10명의 Member + 관련 테이블 전체)
-- ============================================================
-- 목적: 개발/테스트를 위한 완전한 더미 데이터 생성
-- 조건: 모든 필드 null 값 없이 채움
-- 분포: GoalType 균등 분포, 성별 균형, 다양한 상태
-- ============================================================

-- ============================================================
-- 1단계: PT_PACKAGE enum 값 추가 (별도 트랜잭션으로 먼저 커밋)
-- ============================================================
-- PostgreSQL의 enum 특성상, enum 값을 추가한 후에는 
-- 별도 트랜잭션으로 커밋해야 같은 세션에서 사용 가능합니다.
DO $$
DECLARE
    pt_package_exists BOOLEAN;
BEGIN
    -- PT_PACKAGE가 membershiptype enum에 있는지 확인
    SELECT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'PT_PACKAGE' 
        AND enumtypid = 'membershiptype'::regtype
    ) INTO pt_package_exists;
    
    IF NOT pt_package_exists THEN
        RAISE NOTICE 'PT_PACKAGE를 membershiptype enum에 추가 중...';
        ALTER TYPE membershiptype ADD VALUE IF NOT EXISTS 'PT_PACKAGE';
        RAISE NOTICE 'PT_PACKAGE 추가 완료';
    ELSE
        RAISE NOTICE 'PT_PACKAGE가 이미 membershiptype enum에 존재합니다.';
    END IF;
END $$;

-- ============================================================
-- 2단계: 더미 데이터 생성
-- ============================================================
DO $$
DECLARE
    -- Member 변수
    v_member_id UUID;
    v_user_id UUID;
    v_membership_id UUID;
    v_pt_usage_id UUID;
    v_assessment_id UUID;
    v_ability_snapshot_id UUID;
    v_pt_session_id UUID;
    v_milestone_id UUID;
    v_injury_id UUID;
    v_workout_record_id UUID;
    v_assessment_item_id UUID;
    
    -- 카운터
    v_member_idx INT := 0;
    v_goal_type_idx INT := 0;
    v_assessment_idx INT;
    v_workout_idx INT;
    v_session_idx INT;
    v_week_idx INT;
    
    -- 데이터 배열
    v_goal_types TEXT[] := ARRAY['WEIGHT_LOSS', 'WEIGHT_LOSS', 'WEIGHT_LOSS', 
                                  'STRENGTH_UP', 'STRENGTH_UP', 'STRENGTH_UP',
                                  'ENDURANCE', 'ENDURANCE',
                                  'MAINTENANCE', 'MAINTENANCE'];
    v_genders TEXT[] := ARRAY['MALE', 'FEMALE', 'MALE', 'FEMALE', 'MALE', 
                               'FEMALE', 'MALE', 'FEMALE', 'MALE', 'FEMALE'];
    v_statuses TEXT[] := ARRAY['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE',
                               'ACTIVE', 'INACTIVE', 'ACTIVE', 'SUSPENDED', 'ACTIVE'];
    v_membership_types TEXT[] := ARRAY['PT_PACKAGE', 'PT_PACKAGE', 'PT_PACKAGE',
                                        'PT_PACKAGE', 'PT_PACKAGE', 'PT_PACKAGE',
                                        'MONTHLY', 'QUARTERLY', 'YEARLY', 'MONTHLY'];
    
    -- 임시 변수
    v_name TEXT;
    v_phone TEXT;
    v_email TEXT;
    v_join_date DATE;
    v_birth_date DATE;
    v_age INT;
    v_height FLOAT;
    v_weight FLOAT;
    v_goal TEXT;
    v_goal_progress INT;
    v_purchase_date DATE;
    v_expiry_date DATE;
    v_price DECIMAL(10,2);
    v_duration_weeks INT;
    v_target_value FLOAT;
    v_start_value FLOAT;
    v_current_value FLOAT;
    v_current_progress INT;
    v_risk_status TEXT;
    v_total_count INT;
    v_remaining_count INT;
    v_used_count INT;
    v_assessed_at DATE;
    v_body_weight FLOAT;
    v_condition TEXT;
    v_session_date DATE;
    v_session_number INT;
    v_workout_date DATE;
    v_exercise_name TEXT;
    v_body_part TEXT;
    v_exercise_weight FLOAT;
    v_reps INT;
    v_sets INT;
    v_volume FLOAT;
    v_one_rep_max FLOAT;
    v_target_date DATE;
    v_week_number INT;
    v_block_number INT;
    v_block_purpose TEXT;
    v_injury_date DATE;
    
    -- 점수 변수
    v_strength_score FLOAT;
    v_cardio_score FLOAT;
    v_endurance_score FLOAT;
    v_flexibility_score FLOAT;
    v_body_score FLOAT;
    v_stability_score FLOAT;
    v_total_score FLOAT;
    
BEGIN
    RAISE NOTICE '=== 더미 데이터 생성 시작 ===';
    
    -- 기존 테스트 데이터 삭제 (선택사항 - 주석 해제하여 사용)
    -- DELETE FROM workout_records WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%');
    -- DELETE FROM pt_sessions WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%');
    -- DELETE FROM program_milestones WHERE membership_id IN (SELECT id FROM memberships WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%'));
    -- DELETE FROM assessment_items WHERE assessment_id IN (SELECT id FROM assessments WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%'));
    -- DELETE FROM ability_snapshots WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%');
    -- DELETE FROM assessments WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%');
    -- DELETE FROM injury_histories WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%');
    -- DELETE FROM pt_usages WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%');
    -- DELETE FROM memberships WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%');
    -- DELETE FROM members WHERE name LIKE '더미회원%';
    -- DELETE FROM users WHERE email LIKE 'dummy%';
    
    -- 10명의 Member 생성
    FOR v_member_idx IN 1..10 LOOP
        -- 기본 정보 생성
        v_name := '더미회원' || v_member_idx;
        v_phone := '010' || LPAD((1000 + v_member_idx * 111)::TEXT, 8, '0');
        v_email := 'dummy' || v_member_idx || '@test.com';
        v_join_date := CURRENT_DATE - (v_member_idx * 15 + (RANDOM() * 30)::INT);
        v_birth_date := DATE '1990-01-01' + (v_member_idx * 365 + (RANDOM() * 365)::INT);
        v_age := EXTRACT(YEAR FROM AGE(v_birth_date))::INT;
        v_height := 160.0 + (v_member_idx * 2.5) + (RANDOM() * 10);
        v_weight := 60.0 + (v_member_idx * 2.0) + (RANDOM() * 15);
        
        -- GoalType에 따른 목표 설정
        CASE v_goal_types[v_member_idx]
            WHEN 'WEIGHT_LOSS' THEN
                v_goal := (v_weight - 5 - (RANDOM() * 5))::INT || 'kg 감량';
                v_goal_progress := 20 + (RANDOM() * 50)::INT;
            WHEN 'STRENGTH_UP' THEN
                v_goal := '벤치프레스 ' || (80 + (RANDOM() * 40))::INT || 'kg 달성';
                v_goal_progress := 30 + (RANDOM() * 50)::INT;
            WHEN 'ENDURANCE' THEN
                v_goal := '스텝테스트 ' || (300 - (RANDOM() * 60))::INT || '초 달성';
                v_goal_progress := 25 + (RANDOM() * 55)::INT;
            WHEN 'MAINTENANCE' THEN
                v_goal := '현재 체중 유지';
                v_goal_progress := 50 + (RANDOM() * 40)::INT;
        END CASE;
        
        -- User 생성 (WorkoutRecord를 위해 필요)
        v_user_id := gen_random_uuid();
        INSERT INTO users (id, email, password, name, provider, role, is_approved, created_at, updated_at)
        VALUES (
            v_user_id,
            v_email,
            '$2b$10$dummyhashedpassword' || v_member_idx, -- 더미 해시
            v_name,
            'LOCAL',
            'MEMBER',
            true,
            v_join_date,
            v_join_date
        );
        
        -- Member 생성
        v_member_id := gen_random_uuid();
        INSERT INTO members (
            id, name, phone, email, user_id, join_date, status,
            height, weight, birth_date, age, gender,
            goal, goal_progress, goal_trainer_comment,
            total_sessions, completed_sessions,
            created_at, updated_at
        )
        VALUES (
            v_member_id,
            v_name,
            v_phone,
            v_email,
            v_user_id,
            v_join_date,
            v_statuses[v_member_idx]::memberstatus,
            v_height,
            v_weight,
            v_birth_date,
            v_age,
            v_genders[v_member_idx]::gender_enum,
            v_goal,
            v_goal_progress,
            CASE WHEN v_goal_progress > 50 THEN '잘하고 있습니다! 계속 화이팅!' 
                 WHEN v_goal_progress > 30 THEN '조금만 더 노력하면 목표 달성 가능합니다.'
                 ELSE '초기 단계입니다. 꾸준히 진행해봅시다.' END,
            CASE WHEN v_membership_types[v_member_idx] = 'PT_PACKAGE' THEN 10 + (RANDOM() * 20)::INT ELSE 0 END,
            CASE WHEN v_membership_types[v_member_idx] = 'PT_PACKAGE' THEN (RANDOM() * 10)::INT ELSE 0 END,
            v_join_date,
            v_join_date
        );
        
        -- Membership 생성
        v_membership_id := gen_random_uuid();
        v_purchase_date := v_join_date;
        
        -- MembershipType에 따른 만료일 계산
        CASE v_membership_types[v_member_idx]
            WHEN 'MONTHLY' THEN
                v_expiry_date := v_purchase_date + INTERVAL '1 month';
                v_price := 50000.00;
                v_duration_weeks := NULL;
            WHEN 'QUARTERLY' THEN
                v_expiry_date := v_purchase_date + INTERVAL '3 months';
                v_price := 140000.00;
                v_duration_weeks := NULL;
            WHEN 'YEARLY' THEN
                v_expiry_date := v_purchase_date + INTERVAL '1 year';
                v_price := 500000.00;
                v_duration_weeks := NULL;
            WHEN 'LIFETIME' THEN
                v_expiry_date := v_purchase_date + INTERVAL '100 years';
                v_price := 2000000.00;
                v_duration_weeks := NULL;
            WHEN 'PT_PACKAGE' THEN
                -- PT 회원권은 만료일 없음 (스키마가 NOT NULL이면 먼 미래 날짜로 설정)
                -- 엔티티에서는 nullable이지만, 스키마가 NOT NULL일 수 있으므로 먼 미래 날짜 사용
                v_expiry_date := v_purchase_date + INTERVAL '100 years';
                v_price := 1000000.00;
                v_duration_weeks := 12;
        END CASE;
        
        -- GoalType에 따른 목표 수치 설정
        CASE v_goal_types[v_member_idx]
            WHEN 'WEIGHT_LOSS' THEN
                v_start_value := v_weight;
                v_target_value := v_weight - 5 - (RANDOM() * 5);
                v_current_value := v_weight - (v_goal_progress / 100.0 * (v_weight - v_target_value));
                v_current_progress := v_goal_progress;
            WHEN 'STRENGTH_UP' THEN
                v_start_value := 60.0 + (RANDOM() * 20);
                v_target_value := v_start_value + 20 + (RANDOM() * 20);
                v_current_value := v_start_value + (v_goal_progress / 100.0 * (v_target_value - v_start_value));
                v_current_progress := v_goal_progress;
            WHEN 'ENDURANCE' THEN
                v_start_value := 350.0 + (RANDOM() * 50);
                v_target_value := v_start_value - 30 - (RANDOM() * 30);
                v_current_value := v_start_value - (v_goal_progress / 100.0 * (v_start_value - v_target_value));
                v_current_progress := v_goal_progress;
            WHEN 'MAINTENANCE' THEN
                v_start_value := v_weight;
                v_target_value := v_weight;
                v_current_value := v_weight + (RANDOM() * 2 - 1);
                v_current_progress := v_goal_progress;
        END CASE;
        
        -- RiskStatus 설정
        IF v_current_progress > 70 THEN
            v_risk_status := 'GREEN';
        ELSIF v_current_progress > 40 THEN
            v_risk_status := 'YELLOW';
        ELSIF v_current_progress > 0 THEN
            v_risk_status := 'FOUNDATION';
        ELSE
            v_risk_status := 'RED';
        END IF;
        
        INSERT INTO memberships (
            id, member_id, membership_type, purchase_date, expiry_date,
            status, price, duration_weeks, main_goal_type, main_goal_label,
            target_value, target_unit, start_value, current_value, current_progress,
            risk_status, created_at, updated_at
        )
        VALUES (
            v_membership_id,
            v_member_id,
            v_membership_types[v_member_idx]::membershiptype,
            v_purchase_date,
            v_expiry_date,
            'ACTIVE'::membershipstatus,
            v_price,
            v_duration_weeks,
            v_goal_types[v_member_idx]::goal_type_enum,
            CASE v_goal_types[v_member_idx]
                WHEN 'WEIGHT_LOSS' THEN '체중 감량'
                WHEN 'STRENGTH_UP' THEN '근력 상승'
                WHEN 'ENDURANCE' THEN '체력 증진'
                WHEN 'MAINTENANCE' THEN '유지'
            END,
            v_target_value,
            CASE v_goal_types[v_member_idx]
                WHEN 'WEIGHT_LOSS' THEN 'kg'
                WHEN 'STRENGTH_UP' THEN 'kg'
                WHEN 'ENDURANCE' THEN '초'
                WHEN 'MAINTENANCE' THEN 'kg'
            END,
            v_start_value,
            v_current_value,
            v_current_progress,
            v_risk_status::risk_status_enum,
            v_purchase_date,
            v_purchase_date
        );
        
        -- PT 회원권인 경우 PTUsage 생성
        IF v_membership_types[v_member_idx] = 'PT_PACKAGE' THEN
            v_pt_usage_id := gen_random_uuid();
            v_total_count := 20 + (RANDOM() * 30)::INT;
            v_used_count := (RANDOM() * v_total_count * 0.5)::INT;
            v_remaining_count := v_total_count - v_used_count;
            
            INSERT INTO pt_usages (
                id, member_id, total_count, remaining_count, used_count,
                last_used_date, created_at, updated_at
            )
            VALUES (
                v_pt_usage_id,
                v_member_id,
                v_total_count,
                v_remaining_count,
                v_used_count,
                CASE WHEN v_used_count > 0 THEN CURRENT_DATE - (RANDOM() * 7)::INT ELSE NULL END,
                v_purchase_date,
                v_purchase_date
            );
        END IF;
        
        -- Assessment 생성 (1-2개)
        FOR v_assessment_idx IN 1..(1 + (RANDOM() * 1)::INT) LOOP
            v_assessment_id := gen_random_uuid();
            v_assessed_at := v_join_date + (v_assessment_idx * 30 + (RANDOM() * 15))::INT;
            v_body_weight := v_weight + (RANDOM() * 3 - 1.5);
            v_condition := CASE (RANDOM() * 4)::INT
                WHEN 0 THEN 'EXCELLENT'
                WHEN 1 THEN 'GOOD'
                WHEN 2 THEN 'NORMAL'
                ELSE 'POOR'
            END;
            
            INSERT INTO assessments (
                id, member_id, assessment_type, evaluation_type, is_initial,
                assessed_at, body_weight, condition, trainer_comment,
                static_evaluation, dynamic_evaluation, created_at, updated_at
            )
            VALUES (
                v_assessment_id,
                v_member_id,
                CASE WHEN v_assessment_idx = 1 THEN 'INITIAL'::assessmenttype ELSE 'PERIODIC'::assessmenttype END,
                CASE WHEN (RANDOM() * 2)::INT = 0 THEN 'STATIC'::evaluationtype ELSE 'DYNAMIC'::evaluationtype END,
                v_assessment_idx = 1,
                v_assessed_at,
                v_body_weight,
                v_condition::condition,
                '평가 완료. ' || v_condition || ' 상태입니다.',
                jsonb_build_object(
                    'survey', jsonb_build_object(),
                    'bodyComposition', jsonb_build_object(
                        'muscleMass', ROUND((v_body_weight * 0.4)::numeric, 2),
                        'bodyFatPercentage', ROUND((15 + RANDOM() * 10)::numeric, 2)
                    ),
                    'visualAssessment', jsonb_build_object()
                ),
                jsonb_build_object(
                    'flexibility', jsonb_build_object(),
                    'strength', jsonb_build_object(),
                    'balance', jsonb_build_object(),
                    'cardio', jsonb_build_object()
                ),
                v_assessed_at,
                v_assessed_at
            );
            
            -- AbilitySnapshot 생성
            v_ability_snapshot_id := gen_random_uuid();
            v_strength_score := 60 + (RANDOM() * 30);
            v_cardio_score := 55 + (RANDOM() * 35);
            v_endurance_score := 50 + (RANDOM() * 40);
            v_flexibility_score := 45 + (RANDOM() * 45);
            v_body_score := 50 + (RANDOM() * 40);
            v_stability_score := 55 + (RANDOM() * 35);
            v_total_score := (v_strength_score + v_cardio_score + v_endurance_score + 
                             v_flexibility_score + v_body_score + v_stability_score) / 6.0;
            
            INSERT INTO ability_snapshots (
                id, assessment_id, member_id, assessed_at, version,
                strength_score, cardio_score, endurance_score,
                flexibility_score, body_score, stability_score, total_score,
                created_at
            )
            VALUES (
                v_ability_snapshot_id,
                v_assessment_id,
                v_member_id,
                v_assessed_at,
                'v1',
                v_strength_score,
                v_cardio_score,
                v_endurance_score,
                v_flexibility_score,
                v_body_score,
                v_stability_score,
                v_total_score,
                v_assessed_at
            );
            
            -- AssessmentItem 생성 (카테고리별)
            INSERT INTO assessment_items (id, assessment_id, category, name, value, unit, score, details, created_at)
            VALUES
                (gen_random_uuid(), v_assessment_id, 'STRENGTH'::category, '벤치프레스 1RM', 70 + (RANDOM() * 40), 'kg', v_strength_score * 0.3, jsonb_build_object('grade', 'B'), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'STRENGTH'::category, '스쿼트 1RM', 100 + (RANDOM() * 50), 'kg', v_strength_score * 0.3, jsonb_build_object('grade', 'B'), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'STRENGTH'::category, '데드리프트 1RM', 120 + (RANDOM() * 60), 'kg', v_strength_score * 0.4, jsonb_build_object('grade', 'A'), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'CARDIO'::category, '심박수 회복속도', 120 + (RANDOM() * 30), 'bpm', v_cardio_score, jsonb_build_object('recoverySpeed', ARRAY['fast']::text[]), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'ENDURANCE'::category, '스텝테스트', 300 + (RANDOM() * 100), '초', v_endurance_score, '{}'::jsonb, v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'FLEXIBILITY'::category, '앉아서 앞으로 굽히기', 20 + (RANDOM() * 20), 'cm', v_flexibility_score * 0.25, jsonb_build_object('flexibilityItems', jsonb_build_object('sitAndReach', 'B')), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'FLEXIBILITY'::category, '어깨 유연성', 15 + (RANDOM() * 15), 'cm', v_flexibility_score * 0.25, jsonb_build_object('flexibilityItems', jsonb_build_object('shoulder', 'B')), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'FLEXIBILITY'::category, '고관절 유연성', 10 + (RANDOM() * 20), 'cm', v_flexibility_score * 0.25, jsonb_build_object('flexibilityItems', jsonb_build_object('hip', 'C')), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'FLEXIBILITY'::category, '햄스트링 유연성', 12 + (RANDOM() * 18), 'cm', v_flexibility_score * 0.25, jsonb_build_object('flexibilityItems', jsonb_build_object('hamstring', 'B')), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'BODY'::category, '체지방률', 15 + (RANDOM() * 10), '%', v_body_score, jsonb_build_object('bodyFatPercentage', ROUND((15 + RANDOM() * 10)::numeric, 2)), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'BODY'::category, '근육량', v_body_weight * 0.4, 'kg', v_body_score * 0.5, jsonb_build_object('muscleMass', ROUND((v_body_weight * 0.4)::numeric, 2)), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'STABILITY'::category, 'OHSA 테스트', 8 + (RANDOM() * 4), '점', v_stability_score * 0.5, jsonb_build_object('ohsa', 'B', 'pain', 'none'), v_assessed_at),
                (gen_random_uuid(), v_assessment_id, 'STABILITY'::category, '균형 테스트', 7 + (RANDOM() * 5), '점', v_stability_score * 0.5, jsonb_build_object('ohsa', 'B'), v_assessed_at);
        END LOOP;
        
        -- WorkoutRecord 생성 (5-10개)
        FOR v_workout_idx IN 1..(5 + (RANDOM() * 5)::INT) LOOP
            v_workout_record_id := gen_random_uuid();
            v_workout_date := v_join_date + (v_workout_idx * 3 + (RANDOM() * 2))::INT;
            
            -- 운동 종류 랜덤 선택
            CASE (RANDOM() * 5)::INT
                WHEN 0 THEN
                    v_exercise_name := '벤치프레스';
                    v_body_part := '가슴';
                    v_exercise_weight := 60 + (RANDOM() * 40);
                WHEN 1 THEN
                    v_exercise_name := '스쿼트';
                    v_body_part := '하체';
                    v_exercise_weight := 80 + (RANDOM() * 50);
                WHEN 2 THEN
                    v_exercise_name := '데드리프트';
                    v_body_part := '등';
                    v_exercise_weight := 100 + (RANDOM() * 60);
                WHEN 3 THEN
                    v_exercise_name := '오버헤드프레스';
                    v_body_part := '어깨';
                    v_exercise_weight := 40 + (RANDOM() * 30);
                ELSE
                    v_exercise_name := '랫풀다운';
                    v_body_part := '등';
                    v_exercise_weight := 50 + (RANDOM() * 30);
            END CASE;
            
            v_reps := 8 + (RANDOM() * 5)::INT;
            v_sets := 3 + (RANDOM() * 2)::INT;
            v_volume := v_exercise_weight * v_reps * v_sets;
            v_one_rep_max := v_exercise_weight * (1 + v_reps / 30.0);
            
            INSERT INTO workout_records (
                id, user_id, member_id, workout_date, body_part, exercise_name,
                weight, reps, sets, volume, duration, workout_type,
                one_rep_max, relative_strength, created_at, updated_at
            )
            VALUES (
                v_workout_record_id,
                v_user_id,
                v_member_id,
                v_workout_date,
                v_body_part,
                v_exercise_name,
                v_exercise_weight,
                v_reps,
                v_sets,
                v_volume,
                60 + (RANDOM() * 60)::INT,
                'PERSONAL',
                v_one_rep_max,
                (v_exercise_weight / v_weight * 100),
                v_workout_date,
                v_workout_date
            );
        END LOOP;
        
        -- PT 회원권인 경우 PTSession 생성 (3-5개)
        IF v_membership_types[v_member_idx] = 'PT_PACKAGE' THEN
            FOR v_session_idx IN 1..(3 + (RANDOM() * 2)::INT) LOOP
                v_pt_session_id := gen_random_uuid();
                v_session_date := v_join_date + (v_session_idx * 7 + (RANDOM() * 3))::INT;
                v_session_number := v_session_idx;
                
                INSERT INTO pt_sessions (
                    id, member_id, membership_id, session_number, session_date,
                    main_content, trainer_comment,
                    measured_weight, measured_muscle_mass, measured_body_fat,
                    bench_press_1rm, squat_1rm, deadlift_1rm,
                    step_test_time, milestone_created, created_at, updated_at
                )
                VALUES (
                    v_pt_session_id,
                    v_member_id,
                    v_membership_id,
                    v_session_number,
                    v_session_date,
                    '하체 운동 중심으로 진행. 스쿼트, 레그프레스, 런지 등',
                    '회원님의 자세가 많이 개선되었습니다.',
                    v_weight - (v_session_idx * 0.3) + (RANDOM() * 0.5 - 0.25),
                    v_weight * 0.4 + (RANDOM() * 2 - 1),
                    15 + (RANDOM() * 5),
                    70 + (RANDOM() * 20) + (v_session_idx * 2),
                    100 + (RANDOM() * 30) + (v_session_idx * 3),
                    120 + (RANDOM() * 40) + (v_session_idx * 4),
                    CASE WHEN v_goal_types[v_member_idx] = 'ENDURANCE' THEN 300 + (RANDOM() * 50) - (v_session_idx * 5) ELSE NULL END,
                    false,
                    v_session_date,
                    v_session_date
                );
            END LOOP;
            
            -- ProgramMilestone 생성 (12주 프로그램 기준)
            FOR v_week_idx IN 1..12 LOOP
                v_milestone_id := gen_random_uuid();
                v_target_date := v_join_date + (v_week_idx * 7);
                v_block_number := ((v_week_idx - 1) / 4)::INT + 1;
                v_block_purpose := CASE v_block_number
                    WHEN 1 THEN 'ADAPTATION'
                    WHEN 2 THEN 'INTENSITY'
                    WHEN 3 THEN 'CONSOLIDATION'
                    ELSE 'INTENSITY'
                END;
                
                INSERT INTO program_milestones (
                    id, membership_id, pt_session_id, week_number,
                    block_number, block_purpose, block_start_week, block_end_week,
                    target_date, measured_weight, measured_muscle_mass, measured_body_fat,
                    measured_value, progress_at_milestone, is_achieved, achieved_at,
                    trainer_feedback, created_at, updated_at
                )
                VALUES (
                    v_milestone_id,
                    v_membership_id,
                    CASE WHEN v_week_idx <= 5 THEN (SELECT id FROM pt_sessions WHERE member_id = v_member_id AND session_number = LEAST(v_week_idx, 5) LIMIT 1) ELSE NULL END,
                    v_week_idx,
                    v_block_number,
                    v_block_purpose::block_purpose_enum,
                    ((v_block_number - 1) * 4) + 1,
                    v_block_number * 4,
                    v_target_date,
                    v_weight - (v_week_idx * 0.2) + (RANDOM() * 0.5 - 0.25),
                    v_weight * 0.4 + (RANDOM() * 1 - 0.5),
                    15 + (RANDOM() * 3),
                    v_current_value - (v_week_idx * (v_start_value - v_target_value) / 12.0) + (RANDOM() * 1 - 0.5),
                    LEAST(100, (v_week_idx * 100 / 12) + (RANDOM() * 10 - 5)::INT),
                    v_week_idx <= 8, -- 8주차까지 달성으로 설정
                    CASE WHEN v_week_idx <= 8 THEN v_target_date ELSE NULL END,
                    CASE WHEN v_week_idx <= 8 THEN '목표 달성!' ELSE NULL END,
                    v_join_date + (v_week_idx * 7),
                    v_join_date + (v_week_idx * 7)
                );
            END LOOP;
        END IF;
        
        -- 일부 Member에 InjuryHistory 생성 (30% 확률)
        IF (RANDOM() * 10)::INT < 3 THEN
            v_injury_id := gen_random_uuid();
            v_injury_date := v_join_date - (30 + (RANDOM() * 180))::INT;
            
            INSERT INTO injury_histories (
                id, member_id, injury_type, body_part, date,
                severity, description, recovery_status, created_at, updated_at
            )
            VALUES (
                v_injury_id,
                v_member_id,
                CASE (RANDOM() * 3)::INT
                    WHEN 0 THEN '어깨 인대 손상'
                    WHEN 1 THEN '무릎 연골 손상'
                    ELSE '허리 디스크'
                END,
                CASE (RANDOM() * 3)::INT
                    WHEN 0 THEN '어깨'
                    WHEN 1 THEN '무릎'
                    ELSE '허리'
                END,
                v_injury_date,
                CASE (RANDOM() * 3)::INT
                    WHEN 0 THEN 'MILD'::severity
                    WHEN 1 THEN 'MODERATE'::severity
                    ELSE 'SEVERE'::severity
                END,
                '과거 부상 이력이 있습니다. 운동 시 주의가 필요합니다.',
                CASE (RANDOM() * 3)::INT
                    WHEN 0 THEN 'RECOVERED'::recoverystatus
                    WHEN 1 THEN 'RECOVERING'::recoverystatus
                    ELSE 'CHRONIC'::recoverystatus
                END,
                v_injury_date,
                v_injury_date
            );
        END IF;
        
        RAISE NOTICE 'Member % 생성 완료: %', v_member_idx, v_name;
    END LOOP;
    
    RAISE NOTICE '=== 더미 데이터 생성 완료 ===';
    RAISE NOTICE '생성된 Member 수: 10';
    RAISE NOTICE '생성된 User 수: 10';
    RAISE NOTICE '생성된 Membership 수: 10';
    RAISE NOTICE '생성된 PTUsage 수: 6 (PT_PACKAGE 회원만)';
    RAISE NOTICE '생성된 Assessment 수: 약 15-20개';
    RAISE NOTICE '생성된 WorkoutRecord 수: 약 50-100개';
    RAISE NOTICE '생성된 PTSession 수: 약 18-30개 (PT 회원만)';
    RAISE NOTICE '생성된 ProgramMilestone 수: 72개 (PT 회원만, 12주 * 6명)';
    
END $$;

-- 생성된 데이터 확인 쿼리
SELECT 
    (SELECT COUNT(*) FROM members WHERE name LIKE '더미회원%') as member_count,
    (SELECT COUNT(*) FROM users WHERE email LIKE 'dummy%@test.com') as user_count,
    (SELECT COUNT(*) FROM memberships WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as membership_count,
    (SELECT COUNT(*) FROM pt_usages WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as pt_usage_count,
    (SELECT COUNT(*) FROM assessments WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as assessment_count,
    (SELECT COUNT(*) FROM ability_snapshots WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as ability_snapshot_count,
    (SELECT COUNT(*) FROM assessment_items WHERE assessment_id IN (SELECT id FROM assessments WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%'))) as assessment_item_count,
    (SELECT COUNT(*) FROM workout_records WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as workout_record_count,
    (SELECT COUNT(*) FROM pt_sessions WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as pt_session_count,
    (SELECT COUNT(*) FROM program_milestones WHERE membership_id IN (SELECT id FROM memberships WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%'))) as milestone_count,
    (SELECT COUNT(*) FROM injury_histories WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as injury_count;
