-- ============================================================
-- WorkoutRecord에 userId 추가 및 Member email optional 변경
-- ============================================================

DO $$
BEGIN
    -- 테이블 존재 여부 확인
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'members') THEN
        RAISE EXCEPTION 'members 테이블이 존재하지 않습니다.';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'workout_records') THEN
        RAISE EXCEPTION 'workout_records 테이블이 존재하지 않습니다.';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') THEN
        RAISE EXCEPTION 'users 테이블이 존재하지 않습니다.';
    END IF;

    RAISE NOTICE '🔄 Phase 1 마이그레이션 시작: UserId 추가...';

    -- 1. members 테이블에 user_id 컬럼 추가 (nullable)
    RAISE NOTICE '   1/10: members 테이블에 user_id 컬럼 추가 중...';
    ALTER TABLE "members"
    ADD COLUMN IF NOT EXISTS "user_id" UUID;

    -- 2. members 테이블의 email 컬럼을 nullable로 변경
    RAISE NOTICE '   2/10: members.email 컬럼을 nullable로 변경 중...';
    BEGIN
        ALTER TABLE "members"
        ALTER COLUMN "email" DROP NOT NULL;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE '      ℹ️  email 컬럼이 이미 nullable이거나 오류 발생: %', SQLERRM;
    END;

    -- 3. members 테이블에 user_id 외래키 추가
    RAISE NOTICE '   3/10: members 테이블에 user_id 외래키 추가 중...';
    BEGIN
        ALTER TABLE "members"
        ADD CONSTRAINT "FK_members_user_id"
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
        ON DELETE SET NULL;
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE '      ℹ️  외래키가 이미 존재합니다.';
        WHEN OTHERS THEN
            RAISE NOTICE '      ⚠️  외래키 추가 중 오류: %', SQLERRM;
    END;

    -- 4. members 테이블에 user_id 인덱스 추가
    RAISE NOTICE '   4/10: members 테이블에 user_id 인덱스 추가 중...';
    CREATE INDEX IF NOT EXISTS "idx_members_user_id" ON "members"("user_id");

    -- 5. workout_records 테이블에 user_id 컬럼 추가 (임시로 nullable)
    RAISE NOTICE '   5/10: workout_records 테이블에 user_id 컬럼 추가 중...';
    ALTER TABLE "workout_records"
    ADD COLUMN IF NOT EXISTS "user_id" UUID;

    -- 6. 기존 데이터 마이그레이션: memberId → userId 변환
    RAISE NOTICE '   6/10: 기존 데이터 마이그레이션 중 (memberId → userId)...';
    BEGIN
        UPDATE "workout_records" wr
        SET "user_id" = (
            SELECT COALESCE(
                (SELECT m."user_id" FROM "members" m WHERE m."id" = wr."member_id" AND m."user_id" IS NOT NULL),
                (SELECT "id" FROM "users" LIMIT 1)
            )
        )
        WHERE wr."user_id" IS NULL
        AND EXISTS (SELECT 1 FROM "users");
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE '      ⚠️  데이터 마이그레이션 중 오류: %', SQLERRM;
    END;

    -- 7. workout_records 테이블의 member_id 컬럼을 nullable로 변경
    RAISE NOTICE '   7/10: workout_records.member_id 컬럼을 nullable로 변경 중...';
    BEGIN
        ALTER TABLE "workout_records"
        ALTER COLUMN "member_id" DROP NOT NULL;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE '      ℹ️  member_id 컬럼이 이미 nullable이거나 오류 발생: %', SQLERRM;
    END;

    -- 8. workout_records 테이블에 user_id 외래키 추가
    RAISE NOTICE '   8/10: workout_records 테이블에 user_id 외래키 추가 중...';
    BEGIN
        ALTER TABLE "workout_records"
        ADD CONSTRAINT "FK_workout_records_user_id"
        FOREIGN KEY ("user_id") REFERENCES "users"("id")
        ON DELETE CASCADE;
    EXCEPTION
        WHEN duplicate_object THEN
            RAISE NOTICE '      ℹ️  외래키가 이미 존재합니다.';
        WHEN OTHERS THEN
            RAISE NOTICE '      ⚠️  외래키 추가 중 오류: %', SQLERRM;
    END;

    -- 9. workout_records 테이블의 user_id를 NOT NULL로 변경
    RAISE NOTICE '   9/10: workout_records.user_id를 NOT NULL로 변경 중...';
    BEGIN
        -- 먼저 NULL 값이 있는지 확인
        IF EXISTS (SELECT 1 FROM "workout_records" WHERE "user_id" IS NULL) THEN
            RAISE NOTICE '      ⚠️  user_id가 NULL인 레코드가 있습니다. 먼저 데이터를 마이그레이션하세요.';
        ELSE
            ALTER TABLE "workout_records"
            ALTER COLUMN "user_id" SET NOT NULL;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE NOTICE '      ⚠️  NOT NULL 변경 중 오류: %', SQLERRM;
    END;

    -- 10. workout_records 테이블에 user_id 인덱스 추가
    RAISE NOTICE '   10/10: workout_records 테이블에 user_id 인덱스 추가 중...';
    CREATE INDEX IF NOT EXISTS "idx_workout_records_user_id" ON "workout_records"("user_id");

    RAISE NOTICE '✅ Phase 1 마이그레이션 완료!';
    RAISE NOTICE '   - members.user_id 컬럼 추가됨';
    RAISE NOTICE '   - members.email nullable로 변경됨';
    RAISE NOTICE '   - workout_records.user_id 컬럼 추가됨';
    RAISE NOTICE '   - workout_records.member_id nullable로 변경됨';

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION '마이그레이션 실패: %', SQLERRM;
END $$;
