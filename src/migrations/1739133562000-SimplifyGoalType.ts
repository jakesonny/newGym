import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * GoalType enum을 4개로 간소화
 * 제거: MUSCLE_GAIN, BODY_FAT_LOSS, CUSTOM
 * 유지: WEIGHT_LOSS, STRENGTH_UP, ENDURANCE, MAINTENANCE
 */
export class SimplifyGoalType1739133562000 implements MigrationInterface {
	name = 'SimplifyGoalType1739133562000';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// 1. 기존 데이터 마이그레이션
		// MUSCLE_GAIN, BODY_FAT_LOSS는 WEIGHT_LOSS로 통합
		// CUSTOM은 MAINTENANCE로 통합
		await queryRunner.query(`
			UPDATE "memberships"
			SET "main_goal_type" = 'WEIGHT_LOSS'
			WHERE "main_goal_type" IN ('MUSCLE_GAIN', 'BODY_FAT_LOSS')
		`);

		await queryRunner.query(`
			UPDATE "memberships"
			SET "main_goal_type" = 'MAINTENANCE'
			WHERE "main_goal_type" = 'CUSTOM'
		`);

		// 2. 새로운 enum 타입 생성 (4개만 포함)
		await queryRunner.query(`
			CREATE TYPE "goal_type_enum_new" AS ENUM (
				'WEIGHT_LOSS',
				'STRENGTH_UP',
				'ENDURANCE',
				'MAINTENANCE'
			)
		`);

		// 3. 컬럼 타입 변경
		await queryRunner.query(`
			ALTER TABLE "memberships"
			ALTER COLUMN "main_goal_type" TYPE "goal_type_enum_new"
			USING "main_goal_type"::text::"goal_type_enum_new"
		`);

		// 4. 기존 enum 타입 삭제 및 새 타입으로 이름 변경
		await queryRunner.query(`
			DROP TYPE IF EXISTS "goal_type_enum"
		`);

		await queryRunner.query(`
			ALTER TYPE "goal_type_enum_new" RENAME TO "goal_type_enum"
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// 롤백: 기존 enum 타입 복원 (모든 값 포함)
		await queryRunner.query(`
			CREATE TYPE "goal_type_enum_old" AS ENUM (
				'WEIGHT_LOSS',
				'MUSCLE_GAIN',
				'STRENGTH_UP',
				'ENDURANCE',
				'BODY_FAT_LOSS',
				'MAINTENANCE',
				'CUSTOM'
			)
		`);

		await queryRunner.query(`
			ALTER TABLE "memberships"
			ALTER COLUMN "main_goal_type" TYPE "goal_type_enum_old"
			USING "main_goal_type"::text::"goal_type_enum_old"
		`);

		await queryRunner.query(`
			DROP TYPE IF EXISTS "goal_type_enum"
		`);

		await queryRunner.query(`
			ALTER TYPE "goal_type_enum_old" RENAME TO "goal_type_enum"
		`);
	}
}
