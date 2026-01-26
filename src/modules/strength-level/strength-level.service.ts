import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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

		// 1. 운동 정보 조회 - 부분 매칭으로 검색 (DB의 name_en이 "Bench Press - Powerlifting" 형태일 수 있음)
		const exerciseNameEn = ExerciseTypeEnglishNames[exerciseType];
		const exerciseNameKo = ExerciseTypeNames[exerciseType];
		
		// 먼저 정확한 매칭 시도
		let exercise = await this.exerciseRepository.findOne({
			where: { nameEn: exerciseNameEn },
		});

		// 정확한 매칭이 없으면 부분 매칭 시도 (LIKE 검색)
		if (!exercise) {
			this.logger.debug(`정확한 매칭 실패: ${exerciseNameEn}, 부분 매칭 시도`);
			
			// 영문명으로 부분 매칭 시도
			const exercisesByEn = await this.exerciseRepository.find({
				where: { nameEn: Like(`%${exerciseNameEn}%`) },
			});

			// 한글명으로도 검색 시도
			const exercisesByKo = exerciseNameKo 
				? await this.exerciseRepository.find({
						where: { name: Like(`%${exerciseNameKo}%`) },
					})
				: [];

			// 모든 후보 수집
			const allCandidates = [...exercisesByEn, ...exercisesByKo];
			
			// 중복 제거 (id 기준)
			const uniqueExercises = Array.from(
				new Map(allCandidates.map(ex => [ex.id, ex])).values()
			);

			// 가장 적합한 운동 선택
			// 1순위: 영문명에 정확한 키워드가 포함되고, 변형 운동이 아닌 것
			exercise = uniqueExercises.find(
				(ex) => {
					const nameEnLower = ex.nameEn?.toLowerCase() || '';
					const nameKoLower = ex.name?.toLowerCase() || '';
					const searchKeyLower = exerciseNameEn.toLowerCase();
					
					return (
						nameEnLower.includes(searchKeyLower) || 
						nameKoLower.includes(exerciseNameKo.toLowerCase())
					) && 
					!nameEnLower.includes('romanian') &&
					!nameEnLower.includes('sumo') &&
					!nameEnLower.includes('split') &&
					!nameEnLower.includes('leg press') &&
					!nameKoLower.includes('루마니안') &&
					!nameKoLower.includes('스모') &&
					!nameKoLower.includes('스플릿') &&
					!nameKoLower.includes('레그프레스');
				}
			) || uniqueExercises[0];
		}

		if (!exercise) {
			throw new NotFoundException(
				`운동을 찾을 수 없습니다: ${exerciseNameEn} (${exerciseNameKo}). DB에 해당 운동이 등록되어 있는지 확인해주세요.`
			);
		}

		this.logger.debug(`운동 조회 성공: ${exercise.nameEn || exercise.name} (id: ${exercise.id})`);

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
					nameEnglish: exercise.nameEn || exercise.name || exerciseNameEn,
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
		const allStandards = await this.strengthStandardRepository
			.createQueryBuilder('ss')
			.where('ss.exercise_id = :exerciseId', { exerciseId })
			.andWhere('ss.gender = :gender', { gender })
			.andWhere('ss.standard_type = :standardType', { standardType: 'BODYWEIGHT' })
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

		if (allStandards.length === 0) {
			return [];
		}

		// 체중이 범위 내에 있는 기준 찾기
		const matchingStandards = allStandards.filter(
			(s) => s.bodyweightMin <= bodyWeight && s.bodyweightMax >= bodyWeight,
		);

		if (matchingStandards.length > 0) {
			return matchingStandards;
		}

		// 범위 내에 없으면 가장 가까운 범위 선택
		const closestStandards = allStandards.reduce((closest, current) => {
			const currentDistance = Math.min(
				Math.abs(current.bodyweightMin - bodyWeight),
				Math.abs(current.bodyweightMax - bodyWeight),
			);
			const closestDistance = Math.min(
				Math.abs(closest[0]?.bodyweightMin - bodyWeight || Infinity),
				Math.abs(closest[0]?.bodyweightMax - bodyWeight || Infinity),
			);

			return currentDistance < closestDistance ? [current] : closest;
		}, [allStandards[0]]);

		return closestStandards;
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
		const currentLevel = allLevels.find((level) => level.isCurrent);
		const nextLevel = allLevels.find((level) => level.isNext);

		if (!currentLevel) {
			// 현재 레벨이 없으면 가장 낮은 레벨을 다음 목표로 설정
			const firstLevel = allLevels[0];
			return {
				level: firstLevel.level,
				levelKorean: firstLevel.levelKorean,
				weight: currentWeight,
				weightToNextLevel: firstLevel.weight - currentWeight,
				nextLevel: firstLevel.level,
				nextLevelKorean: firstLevel.levelKorean,
			};
		}

		return {
			level: currentLevel.level,
			levelKorean: currentLevel.levelKorean,
			weight: currentWeight,
			weightToNextLevel: nextLevel ? nextLevel.weight - currentWeight : 0,
			nextLevel: nextLevel?.level,
			nextLevelKorean: nextLevel?.levelKorean,
		};
	}
}
