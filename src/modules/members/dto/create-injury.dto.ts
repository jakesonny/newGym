import { IsString, IsDateString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Severity, RecoveryStatus } from '../../../common/enums';

export class CreateInjuryDto {
	@ApiProperty({
		description: '부상 타입',
		example: '골절',
		maxLength: 255,
	})
	@IsString({ message: '부상 타입은 문자열이어야 합니다.' })
	@MaxLength(255, { message: '부상 타입은 255자 이하여야 합니다.' })
	injuryType: string;

	@ApiProperty({
		description: '부위',
		example: '어깨',
		maxLength: 255,
	})
	@IsString({ message: '부위는 문자열이어야 합니다.' })
	@MaxLength(255, { message: '부위는 255자 이하여야 합니다.' })
	bodyPart: string;

	@ApiProperty({
		description: '부상 발생일 (YYYY-MM-DD 형식)',
		example: '2024-01-01',
	})
	@IsDateString({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' })
	date: string;

	@ApiProperty({
		description: '심각도',
		enum: Severity,
		example: Severity.MODERATE,
	})
	@IsEnum(Severity, { message: '올바른 심각도가 아닙니다.' })
	severity: Severity;

	@ApiPropertyOptional({
		description: '설명',
		example: '운동 중 발생한 부상',
	})
	@IsOptional()
	@IsString({ message: '설명은 문자열이어야 합니다.' })
	description?: string;

	@ApiProperty({
		description: '회복 상태',
		enum: RecoveryStatus,
		example: RecoveryStatus.RECOVERING,
	})
	@IsEnum(RecoveryStatus, { message: '올바른 회복 상태가 아닙니다.' })
	recoveryStatus: RecoveryStatus;
}

