import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * WorkoutRecord에 userId 추가 및 Member email optional 변경
 * - workout_records 테이블에 user_id 컬럼 추가 (필수)
 * - workout_records 테이블의 member_id 컬럼을 nullable로 변경
 * - members 테이블의 email 컬럼을 nullable로 변경
 * - members 테이블에 user_id 컬럼 추가 (nullable)
 * - 기존 데이터 마이그레이션: memberId → userId 변환
 */
export class AddUserIdToWorkoutRecords1769158159000 implements MigrationInterface {
	name = 'AddUserIdToWorkoutRecords1769158159000';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// 1. members 테이블에 user_id 컬럼 추가 (nullable)
		await queryRunner.query(`
			ALTER TABLE "members"
			ADD COLUMN "user_id" UUID
		`);

		// 2. members 테이블의 email 컬럼을 nullable로 변경
		await queryRunner.query(`
			ALTER TABLE "members"
			ALTER COLUMN "email" DROP NOT NULL
		`);

		// 3. members 테이블에 user_id 외래키 추가
		await queryRunner.query(`
			ALTER TABLE "members"
			ADD CONSTRAINT "FK_members_user_id"
			FOREIGN KEY ("user_id") REFERENCES "users"("id")
			ON DELETE SET NULL
		`);

		// 4. members 테이블에 user_id 인덱스 추가
		await queryRunner.query(`
			CREATE INDEX "idx_members_user_id" ON "members"("user_id")
		`);

		// 5. workout_records 테이블에 user_id 컬럼 추가 (임시로 nullable)
		await queryRunner.query(`
			ALTER TABLE "workout_records"
			ADD COLUMN "user_id" UUID
		`);

		// 6. 기존 데이터 마이그레이션: memberId → userId 변환
		// Member의 userId가 있으면 사용, 없으면 임시로 첫 번째 User 사용
		await queryRunner.query(`
			UPDATE "workout_records" wr
			SET "user_id" = (
				SELECT COALESCE(
					(SELECT m."user_id" FROM "members" m WHERE m."id" = wr."member_id" AND m."user_id" IS NOT NULL),
					(SELECT "id" FROM "users" LIMIT 1)
				)
			)
			WHERE wr."user_id" IS NULL
			AND EXISTS (SELECT 1 FROM "users")
		`);

		// 7. workout_records 테이블의 member_id 컬럼을 nullable로 변경
		await queryRunner.query(`
			ALTER TABLE "workout_records"
			ALTER COLUMN "member_id" DROP NOT NULL
		`);

		// 8. workout_records 테이블에 user_id 외래키 추가
		await queryRunner.query(`
			ALTER TABLE "workout_records"
			ADD CONSTRAINT "FK_workout_records_user_id"
			FOREIGN KEY ("user_id") REFERENCES "users"("id")
			ON DELETE CASCADE
		`);

		// 9. workout_records 테이블의 user_id를 NOT NULL로 변경
		await queryRunner.query(`
			ALTER TABLE "workout_records"
			ALTER COLUMN "user_id" SET NOT NULL
		`);

		// 10. workout_records 테이블에 user_id 인덱스 추가
		await queryRunner.query(`
			CREATE INDEX "idx_workout_records_user_id" ON "workout_records"("user_id")
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// 1. workout_records 테이블의 user_id 인덱스 삭제
		await queryRunner.query(`
			DROP INDEX IF EXISTS "idx_workout_records_user_id"
		`);

		// 2. workout_records 테이블의 user_id 외래키 삭제
		await queryRunner.query(`
			ALTER TABLE "workout_records"
			DROP CONSTRAINT IF EXISTS "FK_workout_records_user_id"
		`);

		// 3. workout_records 테이블의 user_id 컬럼 삭제
		await queryRunner.query(`
			ALTER TABLE "workout_records"
			DROP COLUMN IF EXISTS "user_id"
		`);

		// 4. workout_records 테이블의 member_id를 NOT NULL로 복원
		await queryRunner.query(`
			UPDATE "workout_records"
			SET "member_id" = (
				SELECT "id" FROM "members" LIMIT 1
			)
			WHERE "member_id" IS NULL
			AND EXISTS (SELECT 1 FROM "members")
		`);

		await queryRunner.query(`
			ALTER TABLE "workout_records"
			ALTER COLUMN "member_id" SET NOT NULL
		`);

		// 5. members 테이블의 user_id 인덱스 삭제
		await queryRunner.query(`
			DROP INDEX IF EXISTS "idx_members_user_id"
		`);

		// 6. members 테이블의 user_id 외래키 삭제
		await queryRunner.query(`
			ALTER TABLE "members"
			DROP CONSTRAINT IF EXISTS "FK_members_user_id"
		`);

		// 7. members 테이블의 user_id 컬럼 삭제
		await queryRunner.query(`
			ALTER TABLE "members"
			DROP COLUMN IF EXISTS "user_id"
		`);

		// 8. members 테이블의 email 컬럼을 NOT NULL로 복원
		await queryRunner.query(`
			UPDATE "members"
			SET "email" = 'temp@example.com'
			WHERE "email" IS NULL
		`);

		await queryRunner.query(`
			ALTER TABLE "members"
			ALTER COLUMN "email" SET NOT NULL
		`);
	}
}
