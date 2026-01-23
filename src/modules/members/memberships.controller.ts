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
import { CreateMembershipDto } from "./dto/create-membership.dto";
import { UpdateMembershipDto } from "./dto/update-membership.dto";
import { UpdatePTUsageDto } from "./dto/update-pt-usage.dto";
import { JwtAuthGuard } from "../../common/guards";
import { Role } from "../../common/enums";
import { ApiResponseHelper } from "../../common/utils/api-response";
import { MemberIdParam, AdminTrainerRoles, AdminOnly } from "../../common/decorators";

@ApiTags("memberships")
@ApiBearerAuth("JWT-auth")
@Controller("api/members/:memberId/memberships")
@UseGuards(JwtAuthGuard)
export class MembershipsController {
	constructor(private readonly membersService: MembersService) {}

	@Get()
	@MemberIdParam()
	@ApiOperation({
		summary: "회원권 조회",
		description: "회원의 회원권 정보를 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "회원권 조회 성공" })
	async getMembership(@Param("memberId") memberId: string) {
		const membership = await this.membersService.getMembership(memberId);
		return ApiResponseHelper.success(membership, "회원권 조회 성공");
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "회원권 등록",
		description: "새로운 회원권을 등록합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({ status: 201, description: "회원권 등록 성공" })
	async createMembership(
		@Param("memberId") memberId: string,
		@Body() createMembershipDto: CreateMembershipDto,
	) {
		const membership = await this.membersService.createMembership(memberId, createMembershipDto);
		return ApiResponseHelper.success(membership, "회원권 등록 성공");
	}

	@Put(":membershipId")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "회원권 수정",
		description: "기존 회원권을 수정합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiParam({ name: "membershipId", description: "회원권 ID (UUID)" })
	@ApiResponse({ status: 200, description: "회원권 수정 성공" })
	async updateMembership(
		@Param("memberId") memberId: string,
		@Param("membershipId") membershipId: string,
		@Body() updateData: UpdateMembershipDto,
	) {
		const membership = await this.membersService.updateMembership(
			memberId,
			membershipId,
			updateData,
		);
		return ApiResponseHelper.success(membership, "회원권 수정 성공");
	}

	@Delete(":membershipId")
	@MemberIdParam()
	@AdminOnly()
	@ApiOperation({
		summary: "회원권 삭제",
		description: "회원권을 삭제합니다. (ADMIN 권한 필요)",
	})
	@ApiParam({ name: "membershipId", description: "회원권 ID (UUID)" })
	@ApiResponse({ status: 200, description: "회원권 삭제 성공" })
	async deleteMembership(
		@Param("memberId") memberId: string,
		@Param("membershipId") membershipId: string,
	) {
		await this.membersService.deleteMembership(memberId, membershipId);
		return ApiResponseHelper.success(null, "회원권 삭제 성공");
	}

	@Get("pt-count")
	@MemberIdParam()
	@ApiOperation({
		summary: "PT 횟수 조회",
		description: "회원의 PT 횟수 정보를 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "PT 횟수 조회 성공" })
	async getPTUsage(@Param("memberId") memberId: string) {
		const ptUsage = await this.membersService.getPTUsage(memberId);
		return ApiResponseHelper.success(ptUsage, "PT 횟수 조회 성공");
	}

	@Post("pt-count")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "PT 횟수 생성/업데이트",
		description: "PT 횟수를 생성하거나 업데이트합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({ status: 200, description: "PT 횟수 업데이트 성공" })
	async createOrUpdatePTUsage(
		@Param("memberId") memberId: string,
		@Body() updatePTUsageDto: UpdatePTUsageDto,
	) {
		const ptUsage = await this.membersService.createOrUpdatePTUsage(memberId, updatePTUsageDto);
		return ApiResponseHelper.success(ptUsage, "PT 횟수 업데이트 성공");
	}

	@Put("pt-count")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "PT 횟수 수정",
		description: "PT 횟수를 수정합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({ status: 200, description: "PT 횟수 수정 성공" })
	async updatePTUsage(
		@Param("memberId") memberId: string,
		@Body() updatePTUsageDto: UpdatePTUsageDto,
	) {
		const ptUsage = await this.membersService.createOrUpdatePTUsage(memberId, updatePTUsageDto);
		return ApiResponseHelper.success(ptUsage, "PT 횟수 수정 성공");
	}
}
