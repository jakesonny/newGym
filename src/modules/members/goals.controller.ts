import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
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
import { MembersService } from "./members.service";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import { GoalResponseDto } from "./dto/goal-response.dto";
import { JwtAuthGuard } from "../../common/guards";
import { ApiResponseHelper } from "../../common/utils/api-response";
import { MemberIdParam, AdminTrainerRoles } from "../../common/decorators";

@ApiTags("goals")
@ApiBearerAuth("JWT-auth")
@Controller("api/members/:memberId/goals")
@UseGuards(JwtAuthGuard)
export class GoalsController {
	constructor(private readonly membersService: MembersService) {}

	@Get()
	@MemberIdParam()
	@ApiOperation({
		summary: "회원 목표 조회",
		description: "회원의 목표, 진행률, 트레이너 코멘트, 수업 진행률을 조회합니다.",
	})
	@ApiResponse({
		status: 200,
		description: "목표 조회 성공",
		type: GoalResponseDto,
	})
	@ApiResponse({ status: 404, description: "목표를 찾을 수 없습니다" })
	async getGoal(@Param("memberId") memberId: string) {
		const goal = await this.membersService.getGoal(memberId);
		return ApiResponseHelper.success(goal, "목표 조회 성공");
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "회원 목표 생성",
		description: "회원의 목표를 생성합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({
		status: 201,
		description: "목표 생성 성공",
		type: GoalResponseDto,
	})
	@ApiResponse({ status: 404, description: "회원을 찾을 수 없습니다" })
	@ApiResponse({ status: 400, description: "잘못된 요청 (이미 목표가 존재하는 경우)" })
	async createGoal(
		@Param("memberId") memberId: string,
		@Body() createGoalDto: CreateGoalDto,
	) {
		const member = await this.membersService.createGoal(memberId, createGoalDto);
		return ApiResponseHelper.success(GoalResponseDto.fromMember(member), "목표 생성 성공");
	}

	@Put()
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "회원 목표 수정",
		description: "회원의 목표, 진행률, 트레이너 코멘트, 수업 회차를 수정합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({
		status: 200,
		description: "목표 수정 성공",
		type: GoalResponseDto,
	})
	@ApiResponse({ status: 404, description: "회원을 찾을 수 없습니다" })
	@ApiResponse({ status: 400, description: "잘못된 요청 (진행률 범위 초과, 완료 회차 초과 등)" })
	async updateGoal(
		@Param("memberId") memberId: string,
		@Body() updateGoalDto: UpdateGoalDto,
	) {
		const member = await this.membersService.updateGoal(memberId, updateGoalDto);
		return ApiResponseHelper.success(GoalResponseDto.fromMember(member), "목표 수정 성공");
	}

	@Delete()
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "회원 목표 삭제",
		description: "회원의 목표를 삭제합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({ status: 200, description: "목표 삭제 성공" })
	@ApiResponse({ status: 404, description: "목표를 찾을 수 없습니다" })
	async deleteGoal(@Param("memberId") memberId: string) {
		await this.membersService.deleteGoal(memberId);
		return ApiResponseHelper.success(null, "목표 삭제 성공");
	}
}
