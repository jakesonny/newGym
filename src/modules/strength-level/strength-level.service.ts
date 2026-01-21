import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../../entities/exercise.entity';
import { StrengthStandard } from '../../entities/strength-standard.entity';
import { StrengthLevel, StrengthLevelOrder } from '../../common/enums';
import {
	CalculateStrengthLevelDto,
	ExerciseType,
	ExerciseTypeNames,
	ExerciseTypeEnglishNames,
} from './dto/calculate-strength-level.dto';
import {
	StrengthLevelResponse,
	StrengthLevelFriendlyNames,
	StrengthLevelDescriptions,
	LevelInfo,
	CurrentLevelInfo,
} from './dto/strength-level-response.dto';

@Injectable()
export class StrengthLevelService {
	private readonly logger = new Logger(StrengthLevelService.name);

	constructor(
		@InjectRepository(Exercise)
		private exerciseRepository: Repository<Exercise>,
		@InjectRepository(StrengthStandard)
		private strengthStandardRepository: Repository<StrengthStandard>,
	) {}

	/**
	 * Strength Level 계산
	 * 체중/나이/성별 기반으로 5단계 레벨별 기준 무게 조회
	 */
	async calculate(dto: CalculateStrengthLevelDto): Promise<StrengthLevelResponse> {
		const { exerciseType, age, bodyWeight, gender, currentWeight } = dto;

		// 1. 운동 정보 조회
		const exerciseNameEn = ExerciseTypeEnglishNames[exerciseType];
		const exercise = await this.exerciseRepository.findOne({
			where: { nameEn: exerciseNameEn },
		});

		if (!exercise) {
			throw new NotFoundException(`운동을 찾을 수 없습니다: ${exerciseNameEn}`);
		}

		// 2. 해당 운동의 strength_standards 조회 (체중 기준)
		const standards = await this.strengthStandardRepository
			.createQueryBuilder('ss')
			.where('ss.exercise_id = :exerciseId', { exerciseId: exercise.id })
			.andWhere('ss.gender = :gender', { gender })
			.andWhere('ss.standard_type = :standardType', { standardType: 'BODYWEIGHT' })
			.andWhere('ss.bodyweight_min <= :bodyWeight', { bodyWeight })
			.andWhere('ss.bodyweight_max >= :bodyWeight', { bodyWeight })
			.orderBy(
				`CASE ss.level 
					WHEN 'BEGINNER' THEN 1 
					WHEN 'NOVICE' THEN 2 
					WHEN 'INTERMEDIATE' THEN 3 
					WHEN 'ADVANCED' THEN 4 
					WHEN 'ELITE' THEN 5 
				END`,
				'ASC',
			)
			.getMany();

		// 체중 범위에 맞는 데이터가 없으면 가장 가까운 범위 조회
		let finalStandards = standards;
		if (standards.length === 0) {
			this.logger.warn(
				`체중 범위에 맞는 데이터 없음. 가장 가까운 범위 조회: ${bodyWeight}kg`,
			);
			finalStandards = await this.findClosestBodyweightStandards(
				exercise.id,
				gender,
				bodyWeight,
			);
		}

		// 3. 레벨별 정보 구성
		const allLevels = this.buildAllLevels(finalStandards, currentWeight);

		// 4. 현재 레벨 정보 (currentWeight 입력시)
		let currentLevelInfo: CurrentLevelInfo | undefined;
		if (currentWeight !== undefined) {
			currentLevelInfo = this.calculateCurrentLevel(allLevels, currentWeight);
		}

		return {
			success: true,
			data: {
				exercise: {
					type: exerciseType,
					nameKorean: ExerciseTypeNames[exerciseType],
					nameEnglish: exerciseNameEn,
				},
				input: {
					age,
					bodyWeight,
					gender,
					currentWeight,
				},
				currentLevel: currentLevelInfo,
				allLevels,
			},
		};
	}

	/**
	 * 가장 가까운 체중 범위의 기준 데이터 조회
	 */
	private async findClosestBodyweightStandards(
		exerciseId: string,
		gender: string,
		bodyWeight: number,
	): Promise<StrengthStandard[]> {
		// 모든 체중 범위 조회
		const allRanges = await this.strengthStandardRepository
			.createQueryBuilder('ss')
			.select('DISTINCT ss.bodyweight_min', 'bodyweightMin')
			.addSelect('ss.bodyweight_max', 'bodyweightMax')
			.where('ss.exercise_id = :exerciseId', { exerciseId })
			.andWhere('ss.gender = :gender', { gender })
			.andWhere('ss.standard_type = :standardType', { standardType: 'BODYWEIGHT' })
			.getRawMany();

		if (allRanges.length === 0) {
			return [];
		}

		// 가장 가까운 범위 찾기
		let closestRange = allRanges[0];
		let minDistance = Math.abs(
			bodyWeight - (closestRange.bodyweightMin + closestRange.bodyweightMax) / 2,
		);

		for (const range of allRanges) {
			const midPoint = (range.bodyweightMin + range.bodyweightMax) / 2;
			const distance = Math.abs(bodyWeight - midPoint);
			if (distance < minDistance) {
				minDistance = distance;
				closestRange = range;
			}
		}

		// 해당 범위의 데이터 조회
		return this.strengthStandardRepository
			.createQueryBuilder('ss')
			.where('ss.exercise_id = :exerciseId', { exerciseId })
			.andWhere('ss.gender = :gender', { gender })
			.andWhere('ss.standard_type = :standardType', { standardType: 'BODYWEIGHT' })
			.andWhere('ss.bodyweight_min = :min', { min: closestRange.bodyweightMin })
			.andWhere('ss.bodyweight_max = :max', { max: closestRange.bodyweightMax })
			.orderBy(
				`CASE ss.level 
					WHEN 'BEGINNER' THEN 1 
					WHEN 'NOVICE' THEN 2 
					WHEN 'INTERMEDIATE' THEN 3 
					WHEN 'ADVANCED' THEN 4 
					WHEN 'ELITE' THEN 5 
				END`,
				'ASC',
			)
			.getMany();
	}

	/**
	 * 전체 레벨 정보 구성
	 */
	private buildAllLevels(
		standards: StrengthStandard[],
		currentWeight?: number,
	): LevelInfo[] {
		// 레벨 순서대로 정렬된 맵 생성
		const standardMap = new Map<StrengthLevel, StrengthStandard>();
		for (const standard of standards) {
			standardMap.set(standard.level, standard);
		}

		// 현재 레벨 및 다음 레벨 판정
		let currentLevelIndex = -1;
		if (currentWeight !== undefined) {
			for (let i = StrengthLevelOrder.length - 1; i >= 0; i--) {
				const level = StrengthLevelOrder[i];
				const standard = standardMap.get(level);
				if (standard && currentWeight >= standard.weightKg) {
					currentLevelIndex = i;
					break;
				}
			}
		}

		// 레벨 정보 배열 생성
		return StrengthLevelOrder.map((level, index) => {
			const standard = standardMap.get(level);
			const weight = standard?.weightKg ?? 0;

			return {
				level,
				levelKorean: StrengthLevelFriendlyNames[level],
				weight,
				description: StrengthLevelDescriptions[level],
				isCurrent: currentWeight !== undefined && index === currentLevelIndex,
				isNext: currentWeight !== undefined && index === currentLevelIndex + 1,
			};
		});
	}

	/**
	 * 현재 레벨 정보 계산
	 */
	private calculateCurrentLevel(
		allLevels: LevelInfo[],
		currentWeight: number,
	): CurrentLevelInfo {
		// 현재 레벨 찾기 (가장 높은 달성 레벨)
		let currentLevelIndex = -1;
		for (let i = allLevels.length - 1; i >= 0; i--) {
			if (currentWeight >= allLevels[i].weight) {
				currentLevelIndex = i;
				break;
			}
		}

		// 아직 BEGINNER도 달성하지 못한 경우
		if (currentLevelIndex === -1) {
			const beginnerLevel = allLevels[0];
			return {
				level: StrengthLevel.BEGINNER,
				levelKorean: '미달성',
				weight: currentWeight,
				weightToNextLevel: Math.round((beginnerLevel.weight - currentWeight) * 10) / 10,
				nextLevel: StrengthLevel.BEGINNER,
				nextLevelKorean: StrengthLevelFriendlyNames[StrengthLevel.BEGINNER],
			};
		}

		const currentLevel = allLevels[currentLevelIndex];
		const nextLevel = allLevels[currentLevelIndex + 1];

		return {
			level: currentLevel.level,
			levelKorean: currentLevel.levelKorean,
			weight: currentWeight,
			weightToNextLevel: nextLevel
				? Math.round((nextLevel.weight - currentWeight) * 10) / 10
				: 0,
			nextLevel: nextLevel?.level,
			nextLevelKorean: nextLevel?.levelKorean,
		};
	}
}
