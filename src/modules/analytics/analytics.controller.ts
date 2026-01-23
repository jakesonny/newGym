import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
	ApiTags,
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards';
import { ApiResponseHelper } from '../../common/utils/api-response';
import { AbilitySnapshot } from '../../entities/ability-snapshot.entity';
import { SnapshotNormalizer } from '../../common/utils/snapshot-normalizer';
import { AnalyticsHelper } from '../../common/utils/analytics-helper';

@ApiTags("analytics")
@ApiBearerAuth("JWT-auth")
@Controller('api/analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
    @InjectRepository(AbilitySnapshot)
    private abilitySnapshotRepository: Repository<AbilitySnapshot>,
  ) {}

  @Get('averages')
  @ApiOperation({ summary: '전체 평균 데이터 조회', description: '모든 회원의 능력치 평균 데이터를 조회합니다.' })
  async getAverages() {
    const averages = await this.analyticsService.getAverages();
    return ApiResponseHelper.success(averages, '전체 평균 조회 성공');
  }

	@Get("comparison/:memberId")
	@ApiOperation({ summary: '개별 vs 평균 비교', description: '특정 회원의 능력치와 전체 평균을 비교합니다.' })
	@ApiParam({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' })
	async compareWithAverage(@Param("memberId") memberId: string) {
		const comparison = await this.analyticsService.compareWithAverage(memberId);
		return ApiResponseHelper.success(comparison, "평균 비교 조회 성공");
	}
}

@ApiTags("member-analytics")
@ApiBearerAuth("JWT-auth")
@Controller('api/members/:memberId/analytics')
@UseGuards(JwtAuthGuard)
export class MemberAnalyticsController {
	constructor(
		@InjectRepository(AbilitySnapshot)
		private abilitySnapshotRepository: Repository<AbilitySnapshot>,
	) {}

	@Get()
	@ApiOperation({ summary: '회원 능력치 데이터 조회', description: '특정 회원의 모든 능력치 스냅샷 데이터를 조회합니다.' })
	@ApiParam({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' })
	async getMemberAnalytics(@Param("memberId") memberId: string) {
		const snapshots = await this.abilitySnapshotRepository.find({
			where: { memberId },
			order: { assessedAt: "DESC" },
			relations: ["assessment"],
		});

		const normalizedSnapshots = SnapshotNormalizer.normalizeArray(snapshots);
		const latestSnapshot = SnapshotNormalizer.normalize(normalizedSnapshots[0], memberId);

		// 전체 평균 계산
		const allSnapshots = await this.abilitySnapshotRepository
			.createQueryBuilder('snapshot')
			.where('snapshot.totalScore IS NOT NULL')
			.getMany();
		const averages = AnalyticsHelper.calculateAverages(allSnapshots);

		// 백분위 및 평균 스냅샷 계산
		const percentile = AnalyticsHelper.calculatePercentiles(latestSnapshot, averages);
		const averageSnapshot = SnapshotNormalizer.createAverageSnapshot(averages);

		return ApiResponseHelper.success(
			{
				memberId,
				latestSnapshot,
				averageSnapshot,
				percentile,
				snapshots: normalizedSnapshots,
				total: normalizedSnapshots.length,
				latest: latestSnapshot, // 하위 호환성
			},
			"회원 능력치 데이터 조회 성공",
		);
	}
}

