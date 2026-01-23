import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	Query,
	UseGuards,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiParam,
} from "@nestjs/swagger";
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateMemberFullDto } from './dto/create-member-full.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { JwtAuthGuard } from '../../common/guards';
import { Role } from '../../common/enums';
import { ApiResponseHelper } from '../../common/utils/api-response';
import { AdminTrainerRoles, AdminOnly } from '../../common/decorators';
import { parsePagination } from '../../common/utils/pagination-helper';

@ApiTags("members")
@ApiBearerAuth("JWT-auth")
@Controller('api/members')
@UseGuards(JwtAuthGuard)
export class MembersController {
	constructor(
		private readonly membersService: MembersService,
	) {}

  @Get()
  @AdminTrainerRoles()
  @ApiOperation({ summary: '회원 목록 조회', description: '회원 목록을 페이지네이션과 함께 조회합니다. (ADMIN, TRAINER 권한 필요)' })
  @ApiResponse({ status: 200, description: '회원 목록 조회 성공' })
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    const { page: pageNum, pageSize: pageSizeNum } = parsePagination(page, pageSize);
    const result = await this.membersService.findAll(pageNum, pageSizeNum);
    return ApiResponseHelper.success(result, '회원 목록 조회 성공');
  }

  @Get(':memberId')
  @ApiParam({ name: 'memberId', description: '회원 ID (UUID)' })
  @ApiOperation({ summary: '회원 정보 조회', description: '특정 회원의 상세 정보를 조회합니다.' })
  @ApiResponse({ status: 200, description: '회원 정보 조회 성공' })
  @ApiResponse({ status: 404, description: '회원을 찾을 수 없습니다' })
  async findOne(@Param('memberId') memberId: string) {
    const member = await this.membersService.findOne(memberId);
    return ApiResponseHelper.success(member, '회원 정보 조회 성공');
  }

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@AdminTrainerRoles()
	@ApiOperation({ summary: '회원 등록 (기본)', description: '기본 정보만으로 회원을 등록합니다.' })
	@ApiResponse({ status: 201, description: '회원 등록 성공' })
	async create(@Body() createMemberDto: CreateMemberDto) {
		const member = await this.membersService.create(createMemberDto);
		return ApiResponseHelper.success(member, "회원 등록 성공");
	}

	@Post('full')
	@HttpCode(HttpStatus.CREATED)
	@AdminTrainerRoles()
	@ApiOperation({
		summary: '회원 등록 (3단계 위저드)',
		description: '기본 정보 + 회원권/프로그램 + 초기 측정값을 한 번에 등록합니다.',
	})
	@ApiResponse({ status: 201, description: '회원 등록 성공' })
	@ApiResponse({ status: 400, description: '유효성 검사 실패' })
	@ApiResponse({ status: 409, description: '이미 등록된 이메일' })
	async createFull(@Body() createMemberFullDto: CreateMemberFullDto) {
		const result = await this.membersService.createFull(createMemberFullDto);
		return ApiResponseHelper.success(result, '회원 등록 성공');
	}

	@Put(':memberId')
	@ApiParam({ name: 'memberId', description: '회원 ID (UUID)' })
	@AdminTrainerRoles()
	@ApiOperation({ summary: '회원 정보 수정', description: '회원 정보를 수정합니다. (ADMIN, TRAINER 권한 필요)' })
	@ApiResponse({ status: 200, description: '회원 정보 수정 성공' })
	@ApiResponse({ status: 404, description: '회원을 찾을 수 없습니다' })
	async update(
		@Param('memberId') memberId: string,
		@Body() updateMemberDto: UpdateMemberDto,
	) {
		const member = await this.membersService.update(memberId, updateMemberDto);
		return ApiResponseHelper.success(member, '회원 정보 수정 성공');
	}

  @Delete(':memberId')
  @ApiParam({ name: 'memberId', description: '회원 ID (UUID)' })
  @AdminOnly()
  @ApiOperation({ summary: '회원 삭제', description: '회원을 삭제합니다. (ADMIN 권한 필요)' })
  @ApiResponse({ status: 200, description: '회원 삭제 성공' })
  @ApiResponse({ status: 404, description: '회원을 찾을 수 없습니다' })
  async remove(@Param('memberId') memberId: string) {
    await this.membersService.remove(memberId);
    return ApiResponseHelper.success(null, '회원 삭제 성공');
  }

	// Phase 4: Goal Analyst API
	@Get(':memberId/goal-analyst')
	@ApiParam({ name: 'memberId', description: '회원 ID (UUID)' })
	@ApiOperation({
		summary: 'Goal Analyst 조회',
		description: '회원의 목표 진행 상황, 추세, 다음 목표 등을 분석합니다.',
	})
	@ApiResponse({ status: 200, description: 'Goal Analyst 조회 성공' })
	@ApiResponse({ status: 404, description: '회원을 찾을 수 없습니다' })
	async getGoalAnalyst(@Param('memberId') memberId: string) {
		const goalAnalyst = await this.membersService.getGoalAnalyst(memberId);
		return ApiResponseHelper.success(goalAnalyst, 'Goal Analyst 조회 성공');
	}

	// 대시보드 통합
	@Get(':memberId/dashboard')
	@ApiParam({ name: 'memberId', description: '회원 ID (UUID)' })
	@ApiOperation({
		summary: '대시보드 통합 데이터 조회',
		description: '회원의 목표, 수업 진행률, 운동 캘린더, 운동 기록 분석을 통합하여 조회합니다.',
	})
	@ApiResponse({
		status: 200,
		description: '대시보드 데이터 조회 성공',
		type: DashboardResponseDto,
	})
	async getDashboard(@Param('memberId') memberId: string) {
		const dashboard = await this.membersService.getDashboard(memberId);
		return ApiResponseHelper.success(dashboard, '대시보드 데이터 조회 성공');
	}
}

