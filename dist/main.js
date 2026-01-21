/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const config_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(7);
const app_service_1 = __webpack_require__(8);
const auth_module_1 = __webpack_require__(10);
const members_module_1 = __webpack_require__(48);
const assessments_module_1 = __webpack_require__(117);
const analytics_module_1 = __webpack_require__(122);
const insights_module_1 = __webpack_require__(125);
const exercises_module_1 = __webpack_require__(128);
const strength_level_module_1 = __webpack_require__(132);
const database_config_1 = __webpack_require__(137);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: database_config_1.getDatabaseConfig,
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            members_module_1.MembersModule,
            assessments_module_1.AssessmentsModule,
            analytics_module_1.AnalyticsModule,
            insights_module_1.InsightsModule,
            exercises_module_1.ExercisesModule,
            strength_level_module_1.StrengthLevelModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(2);
const app_service_1 = __webpack_require__(8);
const date_helper_1 = __webpack_require__(9);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getTest() {
        return {
            message: "Hello World",
        };
    }
    getHealth() {
        return {
            status: "정상",
            timestamp: date_helper_1.DateHelper.getKoreaTimeISOString(),
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)("test"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTest", null);
__decorate([
    (0, common_1.Get)("health"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHealth", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(2);
let AppService = class AppService {
    getHello() {
        return 'Gym Membership Backend API';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateHelper = void 0;
class DateHelper {
    static getKoreaTimeISOString() {
        const now = new Date();
        const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        return koreaTime.toISOString().replace('Z', '+09:00');
    }
    static toKoreaTimeISOString(date) {
        const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
        return koreaTime.toISOString().replace('Z', '+09:00');
    }
    static getKoreaTime() {
        const now = new Date();
        return new Date(now.getTime() + 9 * 60 * 60 * 1000);
    }
    static calculateKoreanAge(birthDate) {
        if (!birthDate) {
            return null;
        }
        const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
        if (isNaN(birth.getTime())) {
            return null;
        }
        const now = new Date();
        const currentYear = now.getFullYear();
        const birthYear = birth.getFullYear();
        return currentYear - birthYear + 1;
    }
}
exports.DateHelper = DateHelper;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(11);
const passport_1 = __webpack_require__(12);
const typeorm_1 = __webpack_require__(6);
const config_1 = __webpack_require__(3);
const auth_controller_1 = __webpack_require__(13);
const auth_service_1 = __webpack_require__(14);
const jwt_strategy_1 = __webpack_require__(44);
const kakao_strategy_1 = __webpack_require__(46);
const user_entity_1 = __webpack_require__(17);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    const expiresIn = configService.get('JWT_EXPIRES_IN') || '15m';
                    return {
                        secret: configService.get('JWT_SECRET') || 'default-secret',
                        signOptions: {
                            expiresIn: expiresIn,
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, kakao_strategy_1.KakaoStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(14);
const login_dto_1 = __webpack_require__(30);
const register_dto_1 = __webpack_require__(33);
const refresh_token_dto_1 = __webpack_require__(34);
const update_user_dto_1 = __webpack_require__(35);
const guards_1 = __webpack_require__(36);
const roles_decorator_1 = __webpack_require__(40);
const enums_1 = __webpack_require__(18);
const decorators_1 = __webpack_require__(41);
const api_response_1 = __webpack_require__(43);
const passport_1 = __webpack_require__(12);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        const result = await this.authService.login(loginDto);
        return api_response_1.ApiResponseHelper.success(result, '로그인 성공');
    }
    async register(registerDto) {
        const result = await this.authService.register(registerDto);
        return api_response_1.ApiResponseHelper.success(result, '회원가입 성공');
    }
    async getSession(req) {
        return api_response_1.ApiResponseHelper.success(req.user, "세션 확인 성공");
    }
    async logout(req) {
        await this.authService.logout(req.user.id);
        return api_response_1.ApiResponseHelper.success(null, "로그아웃 성공");
    }
    async refresh(refreshTokenDto) {
        const result = await this.authService.refreshToken(refreshTokenDto.refreshToken);
        return api_response_1.ApiResponseHelper.success(result, '토큰 갱신 성공');
    }
    async createTestAccount() {
        const result = await this.authService.createTestAccount();
        return api_response_1.ApiResponseHelper.success(result, "테스트 계정 생성 성공");
    }
    async kakaoLogin() {
    }
    async kakaoCallback(req) {
        return api_response_1.ApiResponseHelper.success(req.user, '카카오 로그인 성공');
    }
    async updateProfile(req, updateUserDto) {
        const { role, ...updateData } = updateUserDto;
        const updatedUser = await this.authService.updateUser(req.user.id, updateData, req.user);
        const { password, refreshToken, ...userResponse } = updatedUser;
        return api_response_1.ApiResponseHelper.success(userResponse, '사용자 정보 수정 성공');
    }
    async updateUser(id, req, updateUserDto) {
        const updatedUser = await this.authService.updateUser(id, updateUserDto, req.user);
        const { password, refreshToken, ...userResponse } = updatedUser;
        return api_response_1.ApiResponseHelper.success(userResponse, '사용자 정보 수정 성공');
    }
    async getPendingTrainers() {
        const pendingTrainers = await this.authService.getPendingTrainers();
        const trainers = pendingTrainers.map(({ password, refreshToken, ...trainer }) => trainer);
        return api_response_1.ApiResponseHelper.success({ trainers, total: trainers.length }, '승인 대기 TRAINER 목록 조회 성공');
    }
    async getAllTrainers() {
        const trainers = await this.authService.getAllTrainers();
        const trainerList = trainers.map(({ password, refreshToken, ...trainer }) => trainer);
        return api_response_1.ApiResponseHelper.success({ trainers: trainerList, total: trainerList.length }, '전체 TRAINER 목록 조회 성공');
    }
    async approveTrainer(id, req) {
        const approvedTrainer = await this.authService.approveTrainer(id, req.user.id);
        const { password, refreshToken, ...trainerResponse } = approvedTrainer;
        return api_response_1.ApiResponseHelper.success(trainerResponse, 'TRAINER 승인 성공');
    }
    async disapproveTrainer(id, req) {
        const disapprovedTrainer = await this.authService.disapproveTrainer(id, req.user.id);
        const { password, refreshToken, ...trainerResponse } = disapprovedTrainer;
        return api_response_1.ApiResponseHelper.success(trainerResponse, 'TRAINER 승인 취소 성공');
    }
    async rejectTrainer(id, req) {
        const rejectedTrainer = await this.authService.rejectTrainer(id, req.user.id);
        const { password, refreshToken, ...trainerResponse } = rejectedTrainer;
        return api_response_1.ApiResponseHelper.success(trainerResponse, 'TRAINER 거부 성공');
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '로그인', description: '이메일과 비밀번호로 로그인합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '로그인 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '회원가입', description: '새로운 사용자를 등록합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '회원가입 성공' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '이미 등록된 이메일' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)("session"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: '세션 확인', description: '현재 로그인한 사용자 정보를 조회합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '세션 확인 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getSession", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: '로그아웃', description: '로그아웃합니다. DB에서 refreshToken을 삭제합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '로그아웃 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: '토큰 갱신', description: 'refreshToken으로 새로운 accessToken과 refreshToken을 발급받습니다.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '토큰 갱신 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '유효하지 않은 refreshToken' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof refresh_token_dto_1.RefreshTokenDto !== "undefined" && refresh_token_dto_1.RefreshTokenDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)("create-test-account"),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({
        summary: '테스트 계정 생성',
        description: '테스트용 계정을 생성합니다. (email: test, password: test, 권한: ADMIN) - 개발 환경 전용',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '테스트 계정 생성 성공' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '기존 테스트 계정으로 로그인 성공' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createTestAccount", null);
__decorate([
    (0, common_1.Get)('kakao'),
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    (0, swagger_1.ApiOperation)({ summary: '카카오 로그인 시작', description: '카카오 로그인 페이지로 리다이렉트합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 302, description: '카카오 로그인 페이지로 리다이렉트' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoLogin", null);
__decorate([
    (0, common_1.Get)('kakao/callback'),
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    (0, swagger_1.ApiOperation)({ summary: '카카오 로그인 콜백', description: '카카오 인증 후 콜백을 처리하고 JWT 토큰을 반환합니다.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '카카오 로그인 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 실패' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoCallback", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: '본인 정보 수정', description: '현재 로그인한 사용자의 정보를 수정합니다. (이름, 이메일, 비밀번호)' }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '사용자 정보 수정 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '이미 등록된 이메일 또는 소셜 로그인 사용자의 비밀번호 변경 시도' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Put)('users/:id'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: '사용자 정보 수정 (관리자)', description: '관리자가 다른 사용자의 정보를 수정합니다. (이름, 이메일, 비밀번호, 역할)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '사용자 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '사용자 정보 수정 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요 또는 권한 부족' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '사용자를 찾을 수 없습니다.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '이미 등록된 이메일 또는 소셜 로그인 사용자의 비밀번호 변경 시도' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, typeof (_f = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)('pending-trainers'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: '승인 대기 TRAINER 목록', description: 'ADMIN 승인을 기다리는 TRAINER 목록을 조회합니다. (ADMIN만)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '승인 대기 TRAINER 목록 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음 (ADMIN만 가능)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getPendingTrainers", null);
__decorate([
    (0, common_1.Get)('trainers'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: '전체 TRAINER 목록 조회', description: '모든 TRAINER 목록을 조회합니다. (승인됨, 대기중 모두 포함, ADMIN만)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '전체 TRAINER 목록 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음 (ADMIN만 가능)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllTrainers", null);
__decorate([
    (0, common_1.Post)('approve-trainer/:id'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: 'TRAINER 승인', description: '승인 대기 중인 TRAINER를 승인합니다. (ADMIN만)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'TRAINER ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'TRAINER 승인 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음 (ADMIN만 가능)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'TRAINER를 찾을 수 없습니다.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "approveTrainer", null);
__decorate([
    (0, common_1.Post)('disapprove-trainer/:id'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: 'TRAINER 승인 취소', description: '이미 승인된 TRAINER의 승인을 취소합니다. (ADMIN만)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'TRAINER ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'TRAINER 승인 취소 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음 (ADMIN만 가능)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'TRAINER를 찾을 수 없습니다.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '이미 승인되지 않은 TRAINER입니다.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "disapproveTrainer", null);
__decorate([
    (0, common_1.Delete)('reject-trainer/:id'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: 'TRAINER 거부', description: '승인된 TRAINER를 거부합니다. (isApproved를 false로 변경, 계정은 삭제하지 않음, ADMIN만)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'TRAINER ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'TRAINER 거부 성공' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: '인증 필요' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음 (ADMIN만 가능)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'TRAINER를 찾을 수 없습니다.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '이미 거부된 TRAINER입니다.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "rejectTrainer", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const config_1 = __webpack_require__(3);
const bcrypt = __webpack_require__(16);
const user_entity_1 = __webpack_require__(17);
const enums_1 = __webpack_require__(18);
const exceptions_1 = __webpack_require__(27);
const entity_update_helper_1 = __webpack_require__(29);
let AuthService = AuthService_1 = class AuthService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOne({
            where: { email },
        });
        if (!user || !user.password) {
            return null;
        }
        if (user.provider && user.provider !== 'LOCAL') {
            return null;
        }
        if (await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw exceptions_1.ApiExceptions.unauthorized('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        return await this.generateToken(user);
    }
    async register(registerDto) {
        try {
            this.logger.log(`회원가입 시도 시작: ${registerDto.email}`);
            const existingUser = await this.userRepository.findOne({
                where: { email: registerDto.email },
            });
            if (existingUser) {
                this.logger.warn(`회원가입 실패: 이미 등록된 이메일입니다. Email: ${registerDto.email}`);
                throw exceptions_1.ApiExceptions.memberAlreadyExists("이미 등록된 이메일입니다.");
            }
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const requestedRole = registerDto.role || enums_1.Role.MEMBER;
            const isApproved = requestedRole === enums_1.Role.MEMBER;
            if (requestedRole === enums_1.Role.ADMIN) {
                this.logger.warn(`회원가입 실패: ADMIN 역할은 회원가입으로 생성할 수 없습니다. Email: ${registerDto.email}`);
                throw exceptions_1.ApiExceptions.forbidden("ADMIN 역할은 회원가입으로 생성할 수 없습니다.");
            }
            const user = this.userRepository.create({
                email: registerDto.email,
                password: hashedPassword,
                name: registerDto.name,
                role: requestedRole,
                isApproved: isApproved,
                provider: 'LOCAL',
                providerId: null,
            });
            this.logger.log(`사용자 객체 생성 완료, DB 저장 시도: ${registerDto.email}`);
            let savedUser;
            try {
                savedUser = await this.userRepository.save(user);
                this.logger.log(`DB 저장 성공 - ID: ${savedUser.id}, Email: ${savedUser.email}`);
            }
            catch (saveError) {
                this.logger.error(`DB 저장 실패: ${saveError.message}`, saveError.stack);
                throw exceptions_1.ApiExceptions.internalServerError(`회원가입 처리 중 오류가 발생했습니다: ${saveError.message}`);
            }
            const verifyUser = await this.userRepository.findOne({
                where: { id: savedUser.id },
            });
            if (!verifyUser) {
                this.logger.error(`DB 저장 검증 실패: 저장 후 조회되지 않음. ID: ${savedUser.id}`);
                throw exceptions_1.ApiExceptions.internalServerError('회원가입은 완료되었지만 데이터베이스에 저장되지 않았습니다.');
            }
            if (requestedRole === enums_1.Role.TRAINER) {
                this.logger.log(`TRAINER 회원가입 완료 (승인 대기): ${savedUser.email} - ADMIN 승인 필요`);
            }
            this.logger.log(`회원가입 완료: ${savedUser.email} (ID: ${savedUser.id})`);
            return {
                id: savedUser.id,
                email: savedUser.email,
                name: savedUser.name,
                role: savedUser.role,
                isApproved: savedUser.isApproved,
                message: requestedRole === enums_1.Role.TRAINER
                    ? 'TRAINER 회원가입이 완료되었습니다. ADMIN의 승인을 기다려주세요.'
                    : '회원가입이 완료되었습니다.',
            };
        }
        catch (error) {
            if (error instanceof Error && (error.message.includes('이미 등록된') ||
                error.message.includes('ADMIN 역할'))) {
                throw error;
            }
            this.logger.error(`회원가입 중 예상치 못한 오류 발생: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findById(id) {
        return this.userRepository.findOne({
            where: { id },
        });
    }
    async getPendingTrainers() {
        const pendingTrainers = await this.userRepository.find({
            where: {
                role: enums_1.Role.TRAINER,
                isApproved: false,
            },
            order: {
                createdAt: 'ASC',
            },
        });
        return pendingTrainers;
    }
    async getAllTrainers() {
        const trainers = await this.userRepository.find({
            where: {
                role: enums_1.Role.TRAINER,
            },
            order: {
                createdAt: 'ASC',
            },
        });
        return trainers;
    }
    async approveTrainer(trainerId, adminId) {
        const trainer = await this.userRepository.findOne({
            where: { id: trainerId },
        });
        if (!trainer) {
            throw exceptions_1.ApiExceptions.trainerNotFound();
        }
        if (trainer.role !== enums_1.Role.TRAINER) {
            throw exceptions_1.ApiExceptions.notATrainer();
        }
        if (trainer.isApproved) {
            throw exceptions_1.ApiExceptions.trainerAlreadyApproved();
        }
        trainer.isApproved = true;
        const approvedTrainer = await this.userRepository.save(trainer);
        this.logger.log(`TRAINER 승인 완료: ${approvedTrainer.email} (승인자: ${adminId})`);
        return approvedTrainer;
    }
    async disapproveTrainer(trainerId, adminId) {
        const trainer = await this.userRepository.findOne({
            where: { id: trainerId },
        });
        if (!trainer) {
            throw exceptions_1.ApiExceptions.trainerNotFound();
        }
        if (trainer.role !== enums_1.Role.TRAINER) {
            throw exceptions_1.ApiExceptions.notATrainer();
        }
        if (!trainer.isApproved) {
            throw exceptions_1.ApiExceptions.validationError('이미 승인되지 않은 TRAINER입니다.');
        }
        trainer.isApproved = false;
        const disapprovedTrainer = await this.userRepository.save(trainer);
        this.logger.log(`TRAINER 승인 취소 완료: ${disapprovedTrainer.email} (취소자: ${adminId})`);
        return disapprovedTrainer;
    }
    async rejectTrainer(trainerId, adminId) {
        const trainer = await this.userRepository.findOne({
            where: { id: trainerId },
        });
        if (!trainer) {
            throw exceptions_1.ApiExceptions.trainerNotFound();
        }
        if (trainer.role !== enums_1.Role.TRAINER) {
            throw exceptions_1.ApiExceptions.notATrainer();
        }
        if (!trainer.isApproved) {
            throw exceptions_1.ApiExceptions.validationError('이미 거부된 TRAINER입니다.');
        }
        trainer.isApproved = false;
        const rejectedTrainer = await this.userRepository.save(trainer);
        this.logger.log(`TRAINER 거부 완료: ${rejectedTrainer.email} (거부자: ${adminId})`);
        return rejectedTrainer;
    }
    async updateUser(userId, updateUserDto, currentUser) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw exceptions_1.ApiExceptions.memberNotFound('사용자를 찾을 수 없습니다.');
        }
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.userRepository.findOne({
                where: { email: updateUserDto.email },
            });
            if (existingUser) {
                this.logger.warn(`사용자 수정 실패: 이미 등록된 이메일입니다. Email: ${updateUserDto.email}`);
                throw exceptions_1.ApiExceptions.memberAlreadyExists('이미 등록된 이메일입니다.');
            }
        }
        if (updateUserDto.role && updateUserDto.role !== user.role) {
            if (currentUser.role !== enums_1.Role.ADMIN) {
                this.logger.warn(`사용자 수정 실패: 역할 변경은 ADMIN만 가능합니다. User: ${currentUser.id}`);
                throw exceptions_1.ApiExceptions.forbidden('역할 변경은 ADMIN만 가능합니다.');
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        if (updateUserDto.password && user.provider && user.provider !== 'LOCAL') {
            this.logger.warn(`사용자 수정 실패: 소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다. User: ${userId}`);
            throw exceptions_1.ApiExceptions.forbidden('소셜 로그인 사용자는 비밀번호를 변경할 수 없습니다.');
        }
        entity_update_helper_1.EntityUpdateHelper.updateFields(user, {
            ...(updateUserDto.name && { name: updateUserDto.name }),
            ...(updateUserDto.email && { email: updateUserDto.email }),
            ...(updateUserDto.password && { password: updateUserDto.password }),
            ...(updateUserDto.role && currentUser.role === enums_1.Role.ADMIN && { role: updateUserDto.role }),
        });
        const updatedUser = await this.userRepository.save(user);
        this.logger.log(`사용자 정보 수정 완료: ${userId}`);
        return updatedUser;
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
            });
            if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
                this.logger.warn(`토큰 갱신 실패: 유효하지 않은 refreshToken`);
                throw exceptions_1.ApiExceptions.unauthorized('유효하지 않은 refreshToken입니다.');
            }
            return await this.generateToken(user);
        }
        catch (error) {
            this.logger.error(`토큰 갱신 실패: ${error.message}`);
            throw exceptions_1.ApiExceptions.unauthorized('유효하지 않은 refreshToken입니다.');
        }
    }
    async logout(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (user) {
            user.refreshToken = null;
            await this.userRepository.save(user);
            this.logger.log(`로그아웃: 사용자(${userId})의 refreshToken 삭제됨`);
        }
    }
    async validateOrCreateSocialUser(socialUser) {
        let user = await this.userRepository.findOne({
            where: {
                provider: socialUser.provider,
                providerId: socialUser.providerId,
            },
        });
        if (!user) {
            if (socialUser.email) {
                const existingUser = await this.userRepository.findOne({
                    where: { email: socialUser.email },
                });
                if (existingUser) {
                    existingUser.provider = socialUser.provider;
                    existingUser.providerId = socialUser.providerId;
                    user = await this.userRepository.save(existingUser);
                    this.logger.log(`소셜 로그인 계정 연결: ${socialUser.provider} 계정이 기존 이메일(${socialUser.email})과 연결됨`);
                }
            }
            if (!user) {
                const generatedEmail = socialUser.email || `${socialUser.provider}_${socialUser.providerId}@social.local`;
                if (!socialUser.email) {
                    this.logger.warn(`소셜 로그인 이메일 없음: ${socialUser.provider} 사용자(${socialUser.providerId})의 이메일 정보가 없어 자동 생성: ${generatedEmail}`);
                }
                user = this.userRepository.create({
                    email: generatedEmail,
                    password: null,
                    name: socialUser.name,
                    provider: socialUser.provider,
                    providerId: socialUser.providerId,
                    role: enums_1.Role.MEMBER,
                });
                user = await this.userRepository.save(user);
                this.logger.log(`소셜 로그인 사용자 생성: ${socialUser.provider} 사용자 생성 완료 (Email: ${generatedEmail}, Name: ${socialUser.name})`);
            }
        }
        return await this.generateToken(user);
    }
    async generateToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
        };
        const accessTokenExpiresIn = this.configService.get('JWT_EXPIRES_IN') || '15m';
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: accessTokenExpiresIn,
        });
        const refreshTokenExpiresIn = this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d';
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: refreshTokenExpiresIn,
        });
        if (user.refreshToken) {
            this.logger.log(`기존 refreshToken 무효화: 사용자(${user.id})의 이전 세션이 종료됨 (새 로그인 또는 토큰 갱신)`);
        }
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                provider: user.provider || 'LOCAL',
                isApproved: user.isApproved,
            },
        };
    }
    async createTestAccount() {
        const testEmail = 'test';
        const testPassword = 'test';
        const existingUser = await this.userRepository.findOne({
            where: { email: testEmail },
        });
        if (existingUser) {
            this.logger.warn(`테스트 계정이 이미 존재합니다. 로그인 처리: ${testEmail}`);
            return await this.generateToken(existingUser);
        }
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        const user = this.userRepository.create({
            email: testEmail,
            password: hashedPassword,
            name: '테스트 사용자 (ADMIN)',
            role: enums_1.Role.ADMIN,
            provider: 'LOCAL',
            providerId: null,
        });
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`테스트 계정 생성 완료: ${testEmail} (권한: ADMIN)`);
        return await this.generateToken(savedUser);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(18);
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, default: 'LOCAL' }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provider_id', length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refresh_token', length: 500, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Role,
        default: enums_1.Role.MEMBER,
    }),
    __metadata("design:type", typeof (_a = typeof enums_1.Role !== "undefined" && enums_1.Role) === "function" ? _a : Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_approved', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isApproved", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], User.prototype, "deletedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Index)('idx_users_email', ['email']),
    (0, typeorm_1.Index)('idx_users_provider_providerId', ['provider', 'providerId']),
    (0, typeorm_1.Index)('idx_users_deleted_at', ['deletedAt']),
    (0, typeorm_1.Entity)('users')
], User);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(20), exports);
__exportStar(__webpack_require__(21), exports);
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(23), exports);
__exportStar(__webpack_require__(24), exports);
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(26), exports);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["TRAINER"] = "TRAINER";
    Role["MEMBER"] = "MEMBER";
})(Role || (exports.Role = Role = {}));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemberStatus = void 0;
var MemberStatus;
(function (MemberStatus) {
    MemberStatus["ACTIVE"] = "ACTIVE";
    MemberStatus["INACTIVE"] = "INACTIVE";
    MemberStatus["SUSPENDED"] = "SUSPENDED";
})(MemberStatus || (exports.MemberStatus = MemberStatus = {}));


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembershipStatus = exports.MembershipType = void 0;
var MembershipType;
(function (MembershipType) {
    MembershipType["MONTHLY"] = "MONTHLY";
    MembershipType["QUARTERLY"] = "QUARTERLY";
    MembershipType["YEARLY"] = "YEARLY";
    MembershipType["LIFETIME"] = "LIFETIME";
})(MembershipType || (exports.MembershipType = MembershipType = {}));
var MembershipStatus;
(function (MembershipStatus) {
    MembershipStatus["ACTIVE"] = "ACTIVE";
    MembershipStatus["EXPIRED"] = "EXPIRED";
    MembershipStatus["SUSPENDED"] = "SUSPENDED";
})(MembershipStatus || (exports.MembershipStatus = MembershipStatus = {}));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = exports.Condition = exports.EvaluationType = exports.AssessmentType = void 0;
var AssessmentType;
(function (AssessmentType) {
    AssessmentType["INITIAL"] = "INITIAL";
    AssessmentType["PERIODIC"] = "PERIODIC";
})(AssessmentType || (exports.AssessmentType = AssessmentType = {}));
var EvaluationType;
(function (EvaluationType) {
    EvaluationType["STATIC"] = "STATIC";
    EvaluationType["DYNAMIC"] = "DYNAMIC";
})(EvaluationType || (exports.EvaluationType = EvaluationType = {}));
var Condition;
(function (Condition) {
    Condition["EXCELLENT"] = "EXCELLENT";
    Condition["GOOD"] = "GOOD";
    Condition["NORMAL"] = "NORMAL";
    Condition["POOR"] = "POOR";
})(Condition || (exports.Condition = Condition = {}));
var Category;
(function (Category) {
    Category["STRENGTH"] = "STRENGTH";
    Category["CARDIO"] = "CARDIO";
    Category["ENDURANCE"] = "ENDURANCE";
    Category["FLEXIBILITY"] = "FLEXIBILITY";
    Category["BODY"] = "BODY";
    Category["STABILITY"] = "STABILITY";
})(Category || (exports.Category = Category = {}));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RecoveryStatus = exports.Severity = void 0;
var Severity;
(function (Severity) {
    Severity["MILD"] = "MILD";
    Severity["MODERATE"] = "MODERATE";
    Severity["SEVERE"] = "SEVERE";
})(Severity || (exports.Severity = Severity = {}));
var RecoveryStatus;
(function (RecoveryStatus) {
    RecoveryStatus["RECOVERED"] = "RECOVERED";
    RecoveryStatus["RECOVERING"] = "RECOVERING";
    RecoveryStatus["CHRONIC"] = "CHRONIC";
})(RecoveryStatus || (exports.RecoveryStatus = RecoveryStatus = {}));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StrengthLevelOrder = exports.StrengthLevelNames = exports.StrengthLevel = void 0;
var StrengthLevel;
(function (StrengthLevel) {
    StrengthLevel["BEGINNER"] = "BEGINNER";
    StrengthLevel["NOVICE"] = "NOVICE";
    StrengthLevel["INTERMEDIATE"] = "INTERMEDIATE";
    StrengthLevel["ADVANCED"] = "ADVANCED";
    StrengthLevel["ELITE"] = "ELITE";
})(StrengthLevel || (exports.StrengthLevel = StrengthLevel = {}));
exports.StrengthLevelNames = {
    [StrengthLevel.BEGINNER]: '초보자',
    [StrengthLevel.NOVICE]: '입문자',
    [StrengthLevel.INTERMEDIATE]: '중급자',
    [StrengthLevel.ADVANCED]: '고급자',
    [StrengthLevel.ELITE]: '엘리트',
};
exports.StrengthLevelOrder = [
    StrengthLevel.BEGINNER,
    StrengthLevel.NOVICE,
    StrengthLevel.INTERMEDIATE,
    StrengthLevel.ADVANCED,
    StrengthLevel.ELITE,
];


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RAPID_THRESHOLDS = exports.FLAT_THRESHOLDS = exports.MEASUREMENT_OVERDUE_DAYS = exports.MIN_MEASUREMENTS_FOR_TREND = exports.BlockPurposeNames = exports.BlockPurpose = exports.ProgramDuration = exports.RiskStatusNames = exports.RiskStatus = exports.GoalTypeDirections = exports.GoalDirection = exports.GoalTypeUnits = exports.GoalTypeNames = exports.GoalType = void 0;
var GoalType;
(function (GoalType) {
    GoalType["WEIGHT_LOSS"] = "WEIGHT_LOSS";
    GoalType["MUSCLE_GAIN"] = "MUSCLE_GAIN";
    GoalType["STRENGTH_UP"] = "STRENGTH_UP";
    GoalType["ENDURANCE"] = "ENDURANCE";
    GoalType["BODY_FAT_LOSS"] = "BODY_FAT_LOSS";
    GoalType["MAINTENANCE"] = "MAINTENANCE";
    GoalType["CUSTOM"] = "CUSTOM";
})(GoalType || (exports.GoalType = GoalType = {}));
exports.GoalTypeNames = {
    [GoalType.WEIGHT_LOSS]: '체중 감량',
    [GoalType.MUSCLE_GAIN]: '근육량 증가',
    [GoalType.STRENGTH_UP]: '근력 상승',
    [GoalType.ENDURANCE]: '체력 증진',
    [GoalType.BODY_FAT_LOSS]: '체지방 감량',
    [GoalType.MAINTENANCE]: '건강 유지',
    [GoalType.CUSTOM]: '기타',
};
exports.GoalTypeUnits = {
    [GoalType.WEIGHT_LOSS]: 'kg',
    [GoalType.MUSCLE_GAIN]: 'kg',
    [GoalType.STRENGTH_UP]: 'kg',
    [GoalType.ENDURANCE]: '초',
    [GoalType.BODY_FAT_LOSS]: '%',
    [GoalType.MAINTENANCE]: 'kg',
    [GoalType.CUSTOM]: '',
};
var GoalDirection;
(function (GoalDirection) {
    GoalDirection["INCREASE"] = "INCREASE";
    GoalDirection["DECREASE"] = "DECREASE";
})(GoalDirection || (exports.GoalDirection = GoalDirection = {}));
exports.GoalTypeDirections = {
    [GoalType.WEIGHT_LOSS]: GoalDirection.DECREASE,
    [GoalType.BODY_FAT_LOSS]: GoalDirection.DECREASE,
    [GoalType.ENDURANCE]: GoalDirection.DECREASE,
    [GoalType.MUSCLE_GAIN]: GoalDirection.INCREASE,
    [GoalType.STRENGTH_UP]: GoalDirection.INCREASE,
    [GoalType.MAINTENANCE]: GoalDirection.INCREASE,
    [GoalType.CUSTOM]: GoalDirection.INCREASE,
};
var RiskStatus;
(function (RiskStatus) {
    RiskStatus["FOUNDATION"] = "FOUNDATION";
    RiskStatus["GREEN"] = "GREEN";
    RiskStatus["YELLOW"] = "YELLOW";
    RiskStatus["RED"] = "RED";
})(RiskStatus || (exports.RiskStatus = RiskStatus = {}));
exports.RiskStatusNames = {
    [RiskStatus.FOUNDATION]: '기초 단계',
    [RiskStatus.GREEN]: '정상',
    [RiskStatus.YELLOW]: '주의',
    [RiskStatus.RED]: '위험',
};
var ProgramDuration;
(function (ProgramDuration) {
    ProgramDuration[ProgramDuration["FOUR_WEEKS"] = 4] = "FOUR_WEEKS";
    ProgramDuration[ProgramDuration["EIGHT_WEEKS"] = 8] = "EIGHT_WEEKS";
    ProgramDuration[ProgramDuration["TWELVE_WEEKS"] = 12] = "TWELVE_WEEKS";
})(ProgramDuration || (exports.ProgramDuration = ProgramDuration = {}));
var BlockPurpose;
(function (BlockPurpose) {
    BlockPurpose["ADAPTATION"] = "ADAPTATION";
    BlockPurpose["INTENSITY"] = "INTENSITY";
    BlockPurpose["CONSOLIDATION"] = "CONSOLIDATION";
})(BlockPurpose || (exports.BlockPurpose = BlockPurpose = {}));
exports.BlockPurposeNames = {
    [BlockPurpose.ADAPTATION]: '적응',
    [BlockPurpose.INTENSITY]: '강도 향상',
    [BlockPurpose.CONSOLIDATION]: '정착/습관화',
};
exports.MIN_MEASUREMENTS_FOR_TREND = 2;
exports.MEASUREMENT_OVERDUE_DAYS = 14;
exports.FLAT_THRESHOLDS = {
    [GoalType.WEIGHT_LOSS]: 0.5,
    [GoalType.BODY_FAT_LOSS]: 0.3,
    [GoalType.MUSCLE_GAIN]: 0.1,
    [GoalType.STRENGTH_UP]: 2.5,
    [GoalType.ENDURANCE]: 5,
    [GoalType.MAINTENANCE]: 0.5,
    [GoalType.CUSTOM]: 0,
};
exports.RAPID_THRESHOLDS = {
    [GoalType.WEIGHT_LOSS]: 1.5,
    [GoalType.BODY_FAT_LOSS]: 1.0,
    [GoalType.MUSCLE_GAIN]: 0.3,
    [GoalType.STRENGTH_UP]: 7.5,
    [GoalType.ENDURANCE]: 20,
    [GoalType.MAINTENANCE]: 1.0,
    [GoalType.CUSTOM]: 0,
};


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiExceptions = exports.ApiException = void 0;
const common_1 = __webpack_require__(2);
class ApiException extends common_1.HttpException {
    constructor(errorCode, message, statusCode = common_1.HttpStatus.BAD_REQUEST, details) {
        super({
            errorCode,
            message,
            ...(details && { details }),
        }, statusCode);
        this.errorCode = errorCode;
        this.details = details;
    }
}
exports.ApiException = ApiException;
class ApiExceptions {
    static unauthorized(message = '인증이 필요합니다.') {
        return new ApiException('UNAUTHORIZED', message, common_1.HttpStatus.UNAUTHORIZED);
    }
    static forbidden(message = '권한이 없습니다.') {
        return new ApiException('FORBIDDEN', message, common_1.HttpStatus.FORBIDDEN);
    }
    static memberNotFound(message = '회원을 찾을 수 없습니다.') {
        return new ApiException('MEMBER_NOT_FOUND', message, common_1.HttpStatus.NOT_FOUND);
    }
    static memberAlreadyExists(message = '이미 등록된 이메일입니다.') {
        return new ApiException('MEMBER_ALREADY_EXISTS', message, common_1.HttpStatus.BAD_REQUEST);
    }
    static trainerNotFound(message = 'TRAINER를 찾을 수 없습니다.') {
        return new ApiException('MEMBER_NOT_FOUND', message, common_1.HttpStatus.NOT_FOUND);
    }
    static notATrainer(message = '해당 사용자는 TRAINER가 아닙니다.') {
        return new ApiException('VALIDATION_ERROR', message, common_1.HttpStatus.BAD_REQUEST);
    }
    static trainerAlreadyApproved(message = '이미 승인된 TRAINER입니다.') {
        return new ApiException('VALIDATION_ERROR', message, common_1.HttpStatus.BAD_REQUEST);
    }
    static assessmentNotFound(message = '평가를 찾을 수 없습니다.') {
        return new ApiException('ASSESSMENT_NOT_FOUND', message, common_1.HttpStatus.NOT_FOUND);
    }
    static initialAssessmentAlreadyExists(message = '초기 평가는 이미 존재합니다.', existingAssessment) {
        return new ApiException('INITIAL_ASSESSMENT_ALREADY_EXISTS', message, common_1.HttpStatus.BAD_REQUEST, existingAssessment ? { existingInitialAssessment: existingAssessment } : undefined);
    }
    static injuryNotFound(message = '부상 이력을 찾을 수 없습니다.') {
        return new ApiException('INJURY_NOT_FOUND', message, common_1.HttpStatus.NOT_FOUND);
    }
    static goalNotFound(message = '목표를 찾을 수 없습니다.') {
        return new ApiException('GOAL_NOT_FOUND', message, common_1.HttpStatus.NOT_FOUND);
    }
    static routineNotFound(message = '운동 루틴을 찾을 수 없습니다.') {
        return new ApiException('ROUTINE_NOT_FOUND', message, common_1.HttpStatus.NOT_FOUND);
    }
    static membershipNotFound(message = '회원권을 찾을 수 없습니다.') {
        return new ApiException('MEMBER_NOT_FOUND', message, common_1.HttpStatus.NOT_FOUND);
    }
    static abilitySnapshotNotFound(message = '능력치 스냅샷이 없습니다.') {
        return new ApiException('ASSESSMENT_NOT_FOUND', message, common_1.HttpStatus.NOT_FOUND);
    }
    static validationError(message = '입력 데이터가 유효하지 않습니다.') {
        return new ApiException('VALIDATION_ERROR', message, common_1.HttpStatus.BAD_REQUEST);
    }
    static badRequest(message = '잘못된 요청입니다.') {
        return new ApiException('BAD_REQUEST', message, common_1.HttpStatus.BAD_REQUEST);
    }
    static internalServerError(message = '서버 오류가 발생했습니다.') {
        return new ApiException('INTERNAL_SERVER_ERROR', message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.ApiExceptions = ApiExceptions;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EntityUpdateHelper = void 0;
class EntityUpdateHelper {
    static updateFields(entity, updateDto, fieldMappers) {
        Object.keys(updateDto).forEach((key) => {
            const value = updateDto[key];
            if (value !== undefined) {
                if (fieldMappers && fieldMappers[key]) {
                    entity[key] = fieldMappers[key](value);
                }
                else {
                    entity[key] = value;
                }
            }
        });
        return entity;
    }
    static updateFieldsWithDateConversion(entity, updateDto, dateFields = []) {
        const fieldMappers = {};
        dateFields.forEach((field) => {
            fieldMappers[field] = (value) => {
                if (value === null || value === undefined) {
                    return value;
                }
                return value instanceof Date ? value : new Date(value);
            };
        });
        return this.updateFields(entity, updateDto, fieldMappers);
    }
    static convertDateFields(dto, dateFields = []) {
        const result = { ...dto };
        dateFields.forEach((field) => {
            if (result[field] !== undefined && result[field] !== null) {
                result[field] = result[field] instanceof Date
                    ? result[field]
                    : new Date(result[field]);
            }
        });
        return result;
    }
}
exports.EntityUpdateHelper = EntityUpdateHelper;


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const is_email_or_test_decorator_1 = __webpack_require__(32);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '이메일 주소 (test 계정은 예외)',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsString)({ message: '이메일은 문자열이어야 합니다.' }),
    (0, is_email_or_test_decorator_1.IsEmailOrTest)({ message: '유효한 이메일 형식이어야 합니다. (test 계정은 예외)' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '비밀번호',
        example: 'password123',
    }),
    (0, class_validator_1.IsString)({ message: '비밀번호는 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsEmailOrTestConstraint = void 0;
exports.IsEmailOrTest = IsEmailOrTest;
const class_validator_1 = __webpack_require__(31);
let IsEmailOrTestConstraint = class IsEmailOrTestConstraint {
    validate(value, args) {
        if (value === 'test') {
            return true;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof value === 'string' && emailRegex.test(value);
    }
    defaultMessage(args) {
        return `${args.property}는 유효한 이메일 형식이어야 합니다. (test 계정은 예외)`;
    }
};
exports.IsEmailOrTestConstraint = IsEmailOrTestConstraint;
exports.IsEmailOrTestConstraint = IsEmailOrTestConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isEmailOrTest', async: false })
], IsEmailOrTestConstraint);
function IsEmailOrTest(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailOrTestConstraint,
        });
    };
}


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
const is_email_or_test_decorator_1 = __webpack_require__(32);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "이메일 주소 (test 계정은 예외)",
        example: "user@example.com",
    }),
    (0, class_validator_1.IsString)({ message: "이메일은 문자열이어야 합니다." }),
    (0, is_email_or_test_decorator_1.IsEmailOrTest)({ message: "유효한 이메일 형식이어야 합니다. (test 계정은 예외)" }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "비밀번호",
        example: "password123",
    }),
    (0, class_validator_1.IsString)({ message: "비밀번호는 문자열이어야 합니다." }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "이름",
        example: "홍길동",
    }),
    (0, class_validator_1.IsString)({ message: "이름은 문자열이어야 합니다." }),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "사용자 역할",
        enum: enums_1.Role,
        example: enums_1.Role.MEMBER,
        default: enums_1.Role.MEMBER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Role, { message: "올바른 역할이 아닙니다." }),
    __metadata("design:type", typeof (_a = typeof enums_1.Role !== "undefined" && enums_1.Role) === "function" ? _a : Object)
], RegisterDto.prototype, "role", void 0);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
class RefreshTokenDto {
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Refresh Token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    (0, class_validator_1.IsString)({ message: 'Refresh Token은 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
const is_email_or_test_decorator_1 = __webpack_require__(32);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '이름',
        example: '홍길동',
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '이름은 문자열이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(255, { message: '이름은 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '이메일 주소 (test 계정은 예외)',
        example: 'user@example.com',
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '이메일은 문자열이어야 합니다.' }),
    (0, is_email_or_test_decorator_1.IsEmailOrTest)({ message: '유효한 이메일 형식이어야 합니다. (test 계정은 예외)' }),
    (0, class_validator_1.MaxLength)(255, { message: '이메일은 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '비밀번호 (최소 6자)',
        example: 'newpassword123',
        minLength: 6,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '비밀번호는 문자열이어야 합니다.' }),
    (0, class_validator_1.MinLength)(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사용자 역할 (ADMIN만 변경 가능)',
        enum: enums_1.Role,
        example: enums_1.Role.MEMBER,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Role, { message: '올바른 역할이 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.Role !== "undefined" && enums_1.Role) === "function" ? _a : Object)
], UpdateUserDto.prototype, "role", void 0);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(37), exports);
__exportStar(__webpack_require__(38), exports);
__exportStar(__webpack_require__(39), exports);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtAuthGuard_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(12);
const core_1 = __webpack_require__(1);
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {
    constructor(reflector) {
        super();
        this.reflector = reflector;
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride("isPublic", [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context) {
        const request = context.switchToHttp().getRequest();
        if (err || !user) {
            if (info) {
                this.logger.error(`JWT 인증 실패: ${info.message || '알 수 없는 오류'}`, JSON.stringify({
                    url: request.url,
                    method: request.method,
                    error: info.name || info.constructor?.name,
                    message: info.message,
                    token: request.headers.authorization ?
                        request.headers.authorization.substring(0, 20) + '...' :
                        '토큰 없음',
                }, null, 2));
            }
            if (err) {
                this.logger.error(`JWT 인증 에러: ${err.message}`, err.stack);
            }
            throw err || new common_1.UnauthorizedException(info?.message || '인증에 실패했습니다. 토큰을 확인해주세요.');
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
exports.ROLES_KEY = "roles";
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(exports.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            return false;
        }
        return requiredRoles.some((role) => user.role === role);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRolesGuard = void 0;
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
const jwt_auth_guard_1 = __webpack_require__(37);
const roles_guard_1 = __webpack_require__(38);
let JwtRolesGuard = class JwtRolesGuard extends jwt_auth_guard_1.JwtAuthGuard {
    constructor(reflector) {
        super(reflector);
        this.reflector = reflector;
    }
    async canActivate(context) {
        const isAuthenticated = await super.canActivate(context);
        if (!isAuthenticated) {
            return false;
        }
        const requiredRoles = this.reflector.getAllAndOverride(roles_guard_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            return false;
        }
        return requiredRoles.some((role) => user.role === role);
    }
};
exports.JwtRolesGuard = JwtRolesGuard;
exports.JwtRolesGuard = JwtRolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtRolesGuard);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const common_1 = __webpack_require__(2);
const roles_guard_1 = __webpack_require__(38);
const Roles = (...roles) => (0, common_1.SetMetadata)(roles_guard_1.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(42), exports);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.IS_PUBLIC_KEY = "isPublic";
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResponseHelper = void 0;
class ApiResponseHelper {
    static success(data, message) {
        return {
            success: true,
            data,
            ...(message && { message }),
        };
    }
    static error(code, message, details) {
        return {
            success: false,
            error: {
                code,
                message,
                ...(details && { details }),
            },
        };
    }
}
exports.ApiResponseHelper = ApiResponseHelper;


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtStrategy_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(12);
const passport_jwt_1 = __webpack_require__(45);
const config_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(14);
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, authService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.configService = configService;
        this.authService = authService;
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async validate(payload) {
        this.logger.debug(`JWT 토큰 검증 시작: userId=${payload.sub}, email=${payload.email}`);
        if (payload.exp) {
            const now = Math.floor(Date.now() / 1000);
            const expiresIn = payload.exp - now;
            if (expiresIn <= 0) {
                this.logger.warn(`JWT 토큰 만료: userId=${payload.sub}, 만료 시간=${new Date(payload.exp * 1000).toISOString()}, 현재 시간=${new Date().toISOString()}`);
                throw new common_1.UnauthorizedException('토큰이 만료되었습니다. 다시 로그인해주세요.');
            }
            this.logger.debug(`JWT 토큰 만료까지 ${expiresIn}초 남음`);
        }
        const user = await this.authService.findById(payload.sub);
        if (!user) {
            this.logger.warn(`JWT 인증 실패: 사용자를 찾을 수 없습니다. Payload: ${JSON.stringify(payload)}`);
            throw new common_1.UnauthorizedException('사용자를 찾을 수 없습니다.');
        }
        this.logger.debug(`JWT 토큰 검증 성공: userId=${user.id}, email=${user.email}, role=${user.role}`);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isApproved: user.isApproved,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KakaoStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(12);
const passport_kakao_1 = __webpack_require__(47);
const config_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(14);
let KakaoStrategy = class KakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, 'kakao') {
    constructor(configService, authService) {
        const clientSecret = configService.get('KAKAO_CLIENT_SECRET');
        super({
            clientID: configService.get('KAKAO_CLIENT_ID'),
            ...(clientSecret && { clientSecret }),
            callbackURL: configService.get('KAKAO_REDIRECT_URI'),
        });
        this.configService = configService;
        this.authService = authService;
    }
    async validate(accessToken, refreshToken, profile) {
        const { id, username, _json } = profile;
        const kakaoUser = {
            provider: 'KAKAO',
            providerId: id.toString(),
            email: _json.kakao_account?.email,
            name: username || _json.kakao_account?.profile?.nickname || '카카오 사용자',
        };
        return await this.authService.validateOrCreateSocialUser(kakaoUser);
    }
};
exports.KakaoStrategy = KakaoStrategy;
exports.KakaoStrategy = KakaoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], KakaoStrategy);


/***/ }),
/* 47 */
/***/ ((module) => {

module.exports = require("passport-kakao");

/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const members_controller_1 = __webpack_require__(49);
const members_service_1 = __webpack_require__(50);
const workout_records_service_1 = __webpack_require__(66);
const pt_sessions_service_1 = __webpack_require__(69);
const workout_routines_service_1 = __webpack_require__(79);
const injuries_controller_1 = __webpack_require__(98);
const abilities_controller_1 = __webpack_require__(102);
const analytics_controller_1 = __webpack_require__(115);
const workout_routines_controller_1 = __webpack_require__(116);
const member_entity_1 = __webpack_require__(51);
const membership_entity_1 = __webpack_require__(57);
const pt_usage_entity_1 = __webpack_require__(60);
const injury_history_entity_1 = __webpack_require__(55);
const injury_restriction_entity_1 = __webpack_require__(56);
const ability_snapshot_entity_1 = __webpack_require__(54);
const workout_record_entity_1 = __webpack_require__(61);
const pt_session_entity_1 = __webpack_require__(59);
const workout_routine_entity_1 = __webpack_require__(62);
const exercise_entity_1 = __webpack_require__(67);
const strength_standard_entity_1 = __webpack_require__(68);
const program_milestone_entity_1 = __webpack_require__(58);
const assessments_module_1 = __webpack_require__(117);
const strength_level_evaluator_1 = __webpack_require__(77);
let MembersModule = class MembersModule {
};
exports.MembersModule = MembersModule;
exports.MembersModule = MembersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                member_entity_1.Member,
                membership_entity_1.Membership,
                pt_usage_entity_1.PTUsage,
                injury_history_entity_1.InjuryHistory,
                injury_restriction_entity_1.InjuryRestriction,
                ability_snapshot_entity_1.AbilitySnapshot,
                workout_record_entity_1.WorkoutRecord,
                pt_session_entity_1.PTSession,
                workout_routine_entity_1.WorkoutRoutine,
                exercise_entity_1.Exercise,
                strength_standard_entity_1.StrengthStandard,
                workout_record_entity_1.WorkoutRecord,
                program_milestone_entity_1.ProgramMilestone,
            ]),
            assessments_module_1.AssessmentsModule,
        ],
        controllers: [
            members_controller_1.MembersController,
            injuries_controller_1.InjuriesController,
            abilities_controller_1.AbilitiesController,
            analytics_controller_1.MemberAnalyticsController,
            workout_routines_controller_1.WorkoutRoutinesController,
        ],
        providers: [members_service_1.MembersService, workout_records_service_1.WorkoutRecordsService, pt_sessions_service_1.PTSessionsService, workout_routines_service_1.WorkoutRoutinesService, strength_level_evaluator_1.StrengthLevelEvaluator],
        exports: [members_service_1.MembersService, workout_records_service_1.WorkoutRecordsService, pt_sessions_service_1.PTSessionsService, workout_routines_service_1.WorkoutRoutinesService],
    })
], MembersModule);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const members_service_1 = __webpack_require__(50);
const workout_records_service_1 = __webpack_require__(66);
const pt_sessions_service_1 = __webpack_require__(69);
const workout_routines_service_1 = __webpack_require__(79);
const create_member_dto_1 = __webpack_require__(80);
const create_member_full_dto_1 = __webpack_require__(82);
const update_member_dto_1 = __webpack_require__(84);
const create_membership_dto_1 = __webpack_require__(85);
const update_membership_dto_1 = __webpack_require__(86);
const update_pt_usage_dto_1 = __webpack_require__(87);
const update_goal_dto_1 = __webpack_require__(88);
const create_goal_dto_1 = __webpack_require__(89);
const goal_response_dto_1 = __webpack_require__(90);
const create_workout_record_dto_1 = __webpack_require__(91);
const update_workout_record_dto_1 = __webpack_require__(92);
const workout_volume_query_dto_1 = __webpack_require__(63);
const create_pt_session_dto_1 = __webpack_require__(93);
const update_pt_session_dto_1 = __webpack_require__(94);
const create_workout_routine_dto_1 = __webpack_require__(95);
const update_workout_routine_dto_1 = __webpack_require__(96);
const dashboard_response_dto_1 = __webpack_require__(97);
const guards_1 = __webpack_require__(36);
const roles_decorator_1 = __webpack_require__(40);
const enums_1 = __webpack_require__(18);
const api_response_1 = __webpack_require__(43);
const exceptions_1 = __webpack_require__(27);
let MembersController = class MembersController {
    constructor(membersService, workoutRecordsService, ptSessionsService, workoutRoutinesService) {
        this.membersService = membersService;
        this.workoutRecordsService = workoutRecordsService;
        this.ptSessionsService = ptSessionsService;
        this.workoutRoutinesService = workoutRoutinesService;
    }
    async findAll(page, pageSize) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 10;
        const result = await this.membersService.findAll(pageNum, pageSizeNum);
        return api_response_1.ApiResponseHelper.success(result, '회원 목록 조회 성공');
    }
    async findOne(id) {
        const member = await this.membersService.findOne(id);
        return api_response_1.ApiResponseHelper.success(member, '회원 정보 조회 성공');
    }
    async create(createMemberDto) {
        const member = await this.membersService.create(createMemberDto);
        return api_response_1.ApiResponseHelper.success(member, "회원 등록 성공");
    }
    async createFull(createMemberFullDto) {
        const result = await this.membersService.createFull(createMemberFullDto);
        return api_response_1.ApiResponseHelper.success(result, '회원 등록 성공');
    }
    async update(id, updateMemberDto) {
        const member = await this.membersService.update(id, updateMemberDto);
        return api_response_1.ApiResponseHelper.success(member, '회원 정보 수정 성공');
    }
    async remove(id) {
        await this.membersService.remove(id);
        return api_response_1.ApiResponseHelper.success(null, '회원 삭제 성공');
    }
    async getMembership(id) {
        const membership = await this.membersService.getMembership(id);
        return api_response_1.ApiResponseHelper.success(membership, '회원권 조회 성공');
    }
    async createMembership(id, createMembershipDto) {
        const membership = await this.membersService.createMembership(id, createMembershipDto);
        return api_response_1.ApiResponseHelper.success(membership, "회원권 등록 성공");
    }
    async updateMembership(id, membershipId, updateData) {
        const membership = await this.membersService.updateMembership(id, membershipId, updateData);
        return api_response_1.ApiResponseHelper.success(membership, '회원권 수정 성공');
    }
    async getPTUsage(id) {
        const ptUsage = await this.membersService.getPTUsage(id);
        return api_response_1.ApiResponseHelper.success(ptUsage, 'PT 횟수 조회 성공');
    }
    async createOrUpdatePTUsage(id, updatePTUsageDto) {
        const ptUsage = await this.membersService.createOrUpdatePTUsage(id, updatePTUsageDto);
        return api_response_1.ApiResponseHelper.success(ptUsage, "PT 횟수 업데이트 성공");
    }
    async updatePTUsage(id, updatePTUsageDto) {
        const ptUsage = await this.membersService.createOrUpdatePTUsage(id, updatePTUsageDto);
        return api_response_1.ApiResponseHelper.success(ptUsage, "PT 횟수 수정 성공");
    }
    async deleteMembership(id, membershipId) {
        await this.membersService.deleteMembership(id, membershipId);
        return api_response_1.ApiResponseHelper.success(null, "회원권 삭제 성공");
    }
    async getGoalAnalyst(id) {
        const goalAnalyst = await this.membersService.getGoalAnalyst(id);
        return api_response_1.ApiResponseHelper.success(goalAnalyst, 'Goal Analyst 조회 성공');
    }
    async getGoal(id) {
        const goal = await this.membersService.getGoal(id);
        return api_response_1.ApiResponseHelper.success(goal, '목표 조회 성공');
    }
    async createGoal(id, createGoalDto) {
        const member = await this.membersService.createGoal(id, createGoalDto);
        return api_response_1.ApiResponseHelper.success(goal_response_dto_1.GoalResponseDto.fromMember(member), '목표 생성 성공');
    }
    async updateGoal(id, updateGoalDto) {
        const member = await this.membersService.updateGoal(id, updateGoalDto);
        return api_response_1.ApiResponseHelper.success(goal_response_dto_1.GoalResponseDto.fromMember(member), '목표 수정 성공');
    }
    async deleteGoal(id) {
        await this.membersService.deleteGoal(id);
        return api_response_1.ApiResponseHelper.success(null, '목표 삭제 성공');
    }
    async getWorkoutCalendar(id, startDate, endDate) {
        const calendar = await this.workoutRecordsService.getCalendar(id, startDate, endDate);
        return api_response_1.ApiResponseHelper.success(calendar, '운동 캘린더 조회 성공');
    }
    async getWorkoutVolumeAnalysis(id, period, startDate, endDate) {
        const analysis = await this.workoutRecordsService.getVolumeAnalysis(id, period, startDate, endDate);
        return api_response_1.ApiResponseHelper.success(analysis, '볼륨 분석 조회 성공');
    }
    async getWorkoutVolume(id, query) {
        const volume = await this.workoutRecordsService.getVolumeByBodyPart(id, query);
        return api_response_1.ApiResponseHelper.success(volume, '부위별 볼륨 조회 성공');
    }
    async getWorkoutRecords(id, page, pageSize, startDate, endDate) {
        const pageNum = page ? parseInt(page, 10) : 1;
        const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 10;
        const result = await this.workoutRecordsService.findAll(id, pageNum, pageSizeNum, startDate, endDate);
        return api_response_1.ApiResponseHelper.success(result, '운동 기록 목록 조회 성공');
    }
    async getWorkoutRecord(id, recordId) {
        const record = await this.workoutRecordsService.findOne(recordId, id);
        return api_response_1.ApiResponseHelper.success(record, '운동 기록 상세 조회 성공');
    }
    async createWorkoutRecord(id, createDto) {
        const record = await this.workoutRecordsService.create(id, createDto);
        return api_response_1.ApiResponseHelper.success(record, '운동 기록 생성 성공');
    }
    async updateWorkoutRecord(id, recordId, updateDto) {
        const record = await this.workoutRecordsService.update(recordId, id, updateDto);
        return api_response_1.ApiResponseHelper.success(record, '운동 기록 수정 성공');
    }
    async deleteWorkoutRecord(id, recordId) {
        await this.workoutRecordsService.remove(recordId, id);
        return api_response_1.ApiResponseHelper.success(null, '운동 기록 삭제 성공');
    }
    async getMajorExercisesOneRepMax(id) {
        const result = await this.workoutRecordsService.getMajorExercisesOneRepMax(id);
        return api_response_1.ApiResponseHelper.success(result, '주요 운동 1RM 조회 성공');
    }
    async getOneRepMaxEstimate(id) {
        const result = await this.workoutRecordsService.getOneRepMaxEstimate(id);
        return api_response_1.ApiResponseHelper.success(result, '1RM 추정 조회 성공');
    }
    async getOneRepMaxTrend(id, exerciseName, startDate, endDate) {
        const result = await this.workoutRecordsService.getOneRepMaxTrend(id, exerciseName, startDate, endDate);
        return api_response_1.ApiResponseHelper.success(result, '1RM 추세 데이터 조회 성공');
    }
    async getVolumeTrend(id, startDate, endDate, bodyPart) {
        const result = await this.workoutRecordsService.getVolumeTrend(id, startDate, endDate, bodyPart);
        return api_response_1.ApiResponseHelper.success(result, '볼륨 추세 데이터 조회 성공');
    }
    async getTrends(id, type, exerciseName, startDate, endDate) {
        const result = await this.workoutRecordsService.getTrends(id, type, exerciseName, startDate, endDate);
        return api_response_1.ApiResponseHelper.success(result, '추세 데이터 조회 성공');
    }
    async getStrengthProgress(id, exerciseName) {
        const progress = await this.workoutRecordsService.getStrengthProgress(id, exerciseName);
        return api_response_1.ApiResponseHelper.success(progress, 'Strength Level 변화 추적 조회 성공');
    }
    async suggestWeight(id, exerciseName, reps) {
        const repsNum = parseInt(reps, 10);
        if (isNaN(repsNum) || repsNum <= 0) {
            throw exceptions_1.ApiExceptions.badRequest('유효한 반복 횟수를 입력해주세요.');
        }
        const result = await this.workoutRoutinesService.suggestWeightForExercise(id, exerciseName, repsNum);
        return api_response_1.ApiResponseHelper.success(result, '무게 제안 조회 성공');
    }
    async getPTSessions(id) {
        const result = await this.ptSessionsService.findAll(id);
        return api_response_1.ApiResponseHelper.success(result, 'PT 세션 목록 조회 성공');
    }
    async getPTSession(id, sessionId) {
        const session = await this.ptSessionsService.findOne(sessionId, id);
        return api_response_1.ApiResponseHelper.success(session, 'PT 세션 상세 조회 성공');
    }
    async createPTSession(id, createDto) {
        const session = await this.ptSessionsService.create(id, createDto);
        return api_response_1.ApiResponseHelper.success(session, 'PT 세션 생성 성공');
    }
    async updatePTSession(id, sessionId, updateDto) {
        const session = await this.ptSessionsService.update(sessionId, id, updateDto);
        return api_response_1.ApiResponseHelper.success(session, 'PT 세션 수정 성공');
    }
    async deletePTSession(id, sessionId) {
        await this.ptSessionsService.remove(sessionId, id);
        return api_response_1.ApiResponseHelper.success(null, 'PT 세션 삭제 성공');
    }
    async getTodayRoutine(id) {
        const routine = await this.workoutRoutinesService.findToday(id);
        if (!routine) {
            return api_response_1.ApiResponseHelper.success(null, '오늘의 운동 루틴이 없습니다.');
        }
        return api_response_1.ApiResponseHelper.success(routine, '오늘의 운동 루틴 조회 성공');
    }
    async getWorkoutRoutines(id, startDate, endDate, isCompleted) {
        const isCompletedBool = isCompleted === 'true' ? true : isCompleted === 'false' ? false : undefined;
        const routines = await this.workoutRoutinesService.findAll(id, startDate, endDate, isCompletedBool);
        return api_response_1.ApiResponseHelper.success({ routines, total: routines.length }, '운동 루틴 목록 조회 성공');
    }
    async createWorkoutRoutine(id, createDto) {
        const routine = await this.workoutRoutinesService.create(id, createDto);
        return api_response_1.ApiResponseHelper.success(routine, '운동 루틴 생성 성공');
    }
    async updateWorkoutRoutine(id, routineId, updateDto) {
        const routine = await this.workoutRoutinesService.update(routineId, id, updateDto);
        return api_response_1.ApiResponseHelper.success(routine, '운동 루틴 수정 성공');
    }
    async completeWorkoutRoutine(id, routineId) {
        const routine = await this.workoutRoutinesService.complete(routineId, id);
        return api_response_1.ApiResponseHelper.success(routine, '운동 루틴 완료 처리 성공');
    }
    async deleteWorkoutRoutine(id, routineId) {
        await this.workoutRoutinesService.remove(routineId, id);
        return api_response_1.ApiResponseHelper.success(null, '운동 루틴 삭제 성공');
    }
    async getDashboard(id) {
        const dashboard = await this.membersService.getDashboard(id);
        return api_response_1.ApiResponseHelper.success(dashboard, '대시보드 데이터 조회 성공');
    }
};
exports.MembersController = MembersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({ summary: '회원 목록 조회', description: '회원 목록을 페이지네이션과 함께 조회합니다. (ADMIN, TRAINER 권한 필요)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '회원 목록 조회 성공' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({ summary: '회원 등록 (기본)', description: '기본 정보만으로 회원을 등록합니다.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_member_dto_1.CreateMemberDto !== "undefined" && create_member_dto_1.CreateMemberDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('full'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '회원 등록 (3단계 위저드)',
        description: '기본 정보 + 회원권/프로그램 + 초기 측정값을 한 번에 등록합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '회원 등록 성공' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '유효성 검사 실패' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: '이미 등록된 이메일' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof create_member_full_dto_1.CreateMemberFullDto !== "undefined" && create_member_full_dto_1.CreateMemberFullDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createFull", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({ summary: '회원 정보 수정', description: '회원 정보를 수정합니다. (ADMIN, TRAINER 권한 필요)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '회원 정보 수정 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '회원을 찾을 수 없습니다' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_g = typeof update_member_dto_1.UpdateMemberDto !== "undefined" && update_member_dto_1.UpdateMemberDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/membership'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getMembership", null);
__decorate([
    (0, common_1.Post)(":id/membership"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_h = typeof create_membership_dto_1.CreateMembershipDto !== "undefined" && create_membership_dto_1.CreateMembershipDto) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createMembership", null);
__decorate([
    (0, common_1.Put)(':id/membership/:membershipId'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('membershipId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_j = typeof update_membership_dto_1.UpdateMembershipDto !== "undefined" && update_membership_dto_1.UpdateMembershipDto) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "updateMembership", null);
__decorate([
    (0, common_1.Get)(':id/pt-count'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getPTUsage", null);
__decorate([
    (0, common_1.Post)(":id/pt-count"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof update_pt_usage_dto_1.UpdatePTUsageDto !== "undefined" && update_pt_usage_dto_1.UpdatePTUsageDto) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createOrUpdatePTUsage", null);
__decorate([
    (0, common_1.Put)(":id/pt-count"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_l = typeof update_pt_usage_dto_1.UpdatePTUsageDto !== "undefined" && update_pt_usage_dto_1.UpdatePTUsageDto) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "updatePTUsage", null);
__decorate([
    (0, common_1.Delete)(":id/membership/:membershipId"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("membershipId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "deleteMembership", null);
__decorate([
    (0, common_1.Get)(':id/goal-analyst'),
    (0, swagger_1.ApiOperation)({
        summary: 'Goal Analyst 조회',
        description: '회원의 목표 진행 상황, 추세, 다음 목표 등을 분석합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Goal Analyst 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '회원을 찾을 수 없습니다' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getGoalAnalyst", null);
__decorate([
    (0, common_1.Get)(':id/goals'),
    (0, swagger_1.ApiOperation)({
        summary: '회원 목표 조회',
        description: '회원의 목표, 진행률, 트레이너 코멘트, 수업 진행률을 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '목표 조회 성공',
        type: goal_response_dto_1.GoalResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '목표를 찾을 수 없습니다' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getGoal", null);
__decorate([
    (0, common_1.Post)(':id/goals'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '회원 목표 생성',
        description: '회원의 목표를 생성합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '목표 생성 성공',
        type: goal_response_dto_1.GoalResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '회원을 찾을 수 없습니다' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (이미 목표가 존재하는 경우)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_m = typeof create_goal_dto_1.CreateGoalDto !== "undefined" && create_goal_dto_1.CreateGoalDto) === "function" ? _m : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createGoal", null);
__decorate([
    (0, common_1.Put)(':id/goals'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '회원 목표 수정',
        description: '회원의 목표, 진행률, 트레이너 코멘트, 수업 회차를 수정합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '목표 수정 성공',
        type: goal_response_dto_1.GoalResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '회원을 찾을 수 없습니다' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 (진행률 범위 초과, 완료 회차 초과 등)' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_o = typeof update_goal_dto_1.UpdateGoalDto !== "undefined" && update_goal_dto_1.UpdateGoalDto) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "updateGoal", null);
__decorate([
    (0, common_1.Delete)(':id/goals'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '회원 목표 삭제',
        description: '회원의 목표를 삭제합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '목표 삭제 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '목표를 찾을 수 없습니다' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "deleteGoal", null);
__decorate([
    (0, common_1.Get)(':id/workout-records/calendar'),
    (0, swagger_1.ApiOperation)({
        summary: '운동 캘린더 조회',
        description: '지정된 기간의 운동 캘린더를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 캘린더 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getWorkoutCalendar", null);
__decorate([
    (0, common_1.Get)(':id/workout-records/volume-analysis'),
    (0, swagger_1.ApiOperation)({
        summary: '운동 기록 볼륨 분석',
        description: '회원의 부위별 운동 볼륨을 주간/월간으로 분석합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '볼륨 분석 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('period')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getWorkoutVolumeAnalysis", null);
__decorate([
    (0, common_1.Get)(':id/workout-records/volume'),
    (0, swagger_1.ApiOperation)({
        summary: '부위별 볼륨 조회 (하위 호환성)',
        description: '회원의 부위별 운동 볼륨을 주간/월간으로 조회합니다. (기존 API 유지)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '부위별 볼륨 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_p = typeof workout_volume_query_dto_1.WorkoutVolumeQueryDto !== "undefined" && workout_volume_query_dto_1.WorkoutVolumeQueryDto) === "function" ? _p : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getWorkoutVolume", null);
__decorate([
    (0, common_1.Get)(':id/workout-records'),
    (0, swagger_1.ApiOperation)({
        summary: '운동 기록 목록 조회',
        description: '회원의 운동 기록을 조회합니다. 페이지네이션 및 날짜 필터링 지원.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 기록 목록 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getWorkoutRecords", null);
__decorate([
    (0, common_1.Get)(':id/workout-records/:recordId'),
    (0, swagger_1.ApiOperation)({
        summary: '운동 기록 상세 조회',
        description: '특정 운동 기록의 상세 정보를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 기록 상세 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('recordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getWorkoutRecord", null);
__decorate([
    (0, common_1.Post)(':id/workout-records'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '운동 기록 생성',
        description: '새로운 운동 기록을 생성합니다. 볼륨은 자동 계산됩니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '운동 기록 생성 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_q = typeof create_workout_record_dto_1.CreateWorkoutRecordDto !== "undefined" && create_workout_record_dto_1.CreateWorkoutRecordDto) === "function" ? _q : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createWorkoutRecord", null);
__decorate([
    (0, common_1.Put)(':id/workout-records/:recordId'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '운동 기록 수정',
        description: '기존 운동 기록을 수정합니다. 볼륨은 자동 재계산됩니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 기록 수정 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('recordId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_r = typeof update_workout_record_dto_1.UpdateWorkoutRecordDto !== "undefined" && update_workout_record_dto_1.UpdateWorkoutRecordDto) === "function" ? _r : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "updateWorkoutRecord", null);
__decorate([
    (0, common_1.Delete)(':id/workout-records/:recordId'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '운동 기록 삭제',
        description: '운동 기록을 삭제합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 기록 삭제 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('recordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "deleteWorkoutRecord", null);
__decorate([
    (0, common_1.Get)(':id/one-rep-max/major'),
    (0, swagger_1.ApiOperation)({
        summary: '주요 운동 1RM 조회',
        description: '3대 운동(벤치프레스, 스쿼트, 데드리프트)의 최신/최고 1RM을 조회합니다. 기록이 없으면 대체 운동을 자동 탐색합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '주요 운동 1RM 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getMajorExercisesOneRepMax", null);
__decorate([
    (0, common_1.Get)(':id/one-rep-max-estimate'),
    (0, swagger_1.ApiOperation)({
        summary: '1RM 추정 조회 (플랜 Phase 3)',
        description: '빅3 운동(벤치프레스, 스쿼트, 데드리프트)의 최신/최고 1RM과 히스토리를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '1RM 추정 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getOneRepMaxEstimate", null);
__decorate([
    (0, common_1.Get)(':id/workout-records/one-rep-max-trend'),
    (0, swagger_1.ApiOperation)({
        summary: '1RM 추세 그래프 데이터 조회 (플랜 Phase 4)',
        description: '운동별 1RM 변화 추세 데이터를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '1RM 추세 데이터 조회 성공' }),
    (0, swagger_1.ApiQuery)({ name: 'exerciseName', required: false, description: '운동명 (선택적)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: '시작 날짜 (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: '종료 날짜 (YYYY-MM-DD)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('exerciseName')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getOneRepMaxTrend", null);
__decorate([
    (0, common_1.Get)(':id/workout-records/volume-trend'),
    (0, swagger_1.ApiOperation)({
        summary: '볼륨 추세 그래프 데이터 조회 (플랜 Phase 5)',
        description: '날짜별 볼륨 추세 데이터를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '볼륨 추세 데이터 조회 성공' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: '시작 날짜 (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: '종료 날짜 (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'bodyPart', required: false, description: '부위 필터 (선택적)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('bodyPart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getVolumeTrend", null);
__decorate([
    (0, common_1.Get)(':id/workout-records/trends'),
    (0, swagger_1.ApiOperation)({
        summary: '운동 기록 추세 데이터 조회',
        description: '1RM 추세 또는 볼륨 추세 데이터를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '추세 데이터 조회 성공' }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: true, enum: ['one_rm', 'volume'], description: '추세 타입' }),
    (0, swagger_1.ApiQuery)({ name: 'exerciseName', required: false, description: '운동명 (선택적)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, description: '시작 날짜 (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, description: '종료 날짜 (YYYY-MM-DD)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('exerciseName')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getTrends", null);
__decorate([
    (0, common_1.Get)(':id/strength-progress'),
    (0, swagger_1.ApiOperation)({
        summary: '회원의 운동별 Strength Level 변화 추적',
        description: '회원의 운동별 Strength Level 변화를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Strength Level 변화 추적 조회 성공' }),
    (0, swagger_1.ApiQuery)({ name: 'exerciseName', required: false, description: '운동명 (선택적)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('exerciseName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getStrengthProgress", null);
__decorate([
    (0, common_1.Get)(':id/workout-routines/suggest-weight'),
    (0, swagger_1.ApiOperation)({
        summary: '운동별 무게 제안 (플랜 Phase 7)',
        description: 'Strength Level 기반으로 운동별 권장 무게를 제안합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '무게 제안 조회 성공' }),
    (0, swagger_1.ApiQuery)({ name: 'exerciseName', required: true, description: '운동명' }),
    (0, swagger_1.ApiQuery)({ name: 'reps', required: true, description: '반복 횟수' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('exerciseName')),
    __param(2, (0, common_1.Query)('reps')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "suggestWeight", null);
__decorate([
    (0, common_1.Get)(':id/pt-sessions'),
    (0, swagger_1.ApiOperation)({
        summary: 'PT 세션 목록 조회',
        description: '회원의 모든 PT 세션을 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'PT 세션 목록 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getPTSessions", null);
__decorate([
    (0, common_1.Get)(':id/pt-sessions/:sessionId'),
    (0, swagger_1.ApiOperation)({
        summary: 'PT 세션 상세 조회',
        description: '특정 PT 세션의 상세 정보를 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'PT 세션 상세 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getPTSession", null);
__decorate([
    (0, common_1.Post)(':id/pt-sessions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: 'PT 세션 생성',
        description: '새로운 PT 세션을 생성합니다. 세션 번호는 자동 계산되고, completedSessions가 자동 증가합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'PT 세션 생성 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_s = typeof create_pt_session_dto_1.CreatePTSessionDto !== "undefined" && create_pt_session_dto_1.CreatePTSessionDto) === "function" ? _s : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createPTSession", null);
__decorate([
    (0, common_1.Put)(':id/pt-sessions/:sessionId'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: 'PT 세션 수정',
        description: '기존 PT 세션을 수정합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'PT 세션 수정 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('sessionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_t = typeof update_pt_session_dto_1.UpdatePTSessionDto !== "undefined" && update_pt_session_dto_1.UpdatePTSessionDto) === "function" ? _t : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "updatePTSession", null);
__decorate([
    (0, common_1.Delete)(':id/pt-sessions/:sessionId'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: 'PT 세션 삭제',
        description: 'PT 세션을 삭제합니다. completedSessions가 자동 감소합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'PT 세션 삭제 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "deletePTSession", null);
__decorate([
    (0, common_1.Get)(':id/workout-routines/today'),
    (0, swagger_1.ApiOperation)({
        summary: '오늘의 운동 루틴 조회',
        description: '회원의 오늘 날짜 운동 루틴을 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '오늘의 운동 루틴 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '오늘의 운동 루틴이 없습니다' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getTodayRoutine", null);
__decorate([
    (0, common_1.Get)(':id/workout-routines'),
    (0, swagger_1.ApiOperation)({
        summary: '운동 루틴 목록 조회',
        description: '회원의 모든 운동 루틴을 조회합니다. 날짜 범위 및 완료 여부로 필터링 가능합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 루틴 목록 조회 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('isCompleted')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getWorkoutRoutines", null);
__decorate([
    (0, common_1.Post)(':id/workout-routines'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '운동 루틴 생성',
        description: '새로운 운동 루틴을 생성합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '운동 루틴 생성 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_u = typeof create_workout_routine_dto_1.CreateWorkoutRoutineDto !== "undefined" && create_workout_routine_dto_1.CreateWorkoutRoutineDto) === "function" ? _u : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createWorkoutRoutine", null);
__decorate([
    (0, common_1.Put)(':id/workout-routines/:routineId'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '운동 루틴 수정',
        description: '기존 운동 루틴을 수정합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 루틴 수정 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('routineId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_v = typeof update_workout_routine_dto_1.UpdateWorkoutRoutineDto !== "undefined" && update_workout_routine_dto_1.UpdateWorkoutRoutineDto) === "function" ? _v : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "updateWorkoutRoutine", null);
__decorate([
    (0, common_1.Put)(':id/workout-routines/:routineId/complete'),
    (0, swagger_1.ApiOperation)({
        summary: '운동 루틴 완료 처리',
        description: '운동 루틴을 완료 처리합니다. 모든 인증된 사용자가 가능합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 루틴 완료 처리 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('routineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "completeWorkoutRoutine", null);
__decorate([
    (0, common_1.Delete)(':id/workout-routines/:routineId'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '운동 루틴 삭제',
        description: '운동 루틴을 삭제합니다. (ADMIN, TRAINER 권한 필요)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 루틴 삭제 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('routineId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "deleteWorkoutRoutine", null);
__decorate([
    (0, common_1.Get)(':id/dashboard'),
    (0, swagger_1.ApiOperation)({
        summary: '대시보드 통합 데이터 조회',
        description: '회원의 목표, 수업 진행률, 운동 캘린더, 운동 기록 분석을 통합하여 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '대시보드 데이터 조회 성공',
        type: dashboard_response_dto_1.DashboardResponseDto,
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "getDashboard", null);
exports.MembersController = MembersController = __decorate([
    (0, swagger_1.ApiTags)("members"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)('api/members'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof members_service_1.MembersService !== "undefined" && members_service_1.MembersService) === "function" ? _a : Object, typeof (_b = typeof workout_records_service_1.WorkoutRecordsService !== "undefined" && workout_records_service_1.WorkoutRecordsService) === "function" ? _b : Object, typeof (_c = typeof pt_sessions_service_1.PTSessionsService !== "undefined" && pt_sessions_service_1.PTSessionsService) === "function" ? _c : Object, typeof (_d = typeof workout_routines_service_1.WorkoutRoutinesService !== "undefined" && workout_routines_service_1.WorkoutRoutinesService) === "function" ? _d : Object])
], MembersController);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MembersService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const member_entity_1 = __webpack_require__(51);
const membership_entity_1 = __webpack_require__(57);
const enums_1 = __webpack_require__(18);
const pt_usage_entity_1 = __webpack_require__(60);
const workout_volume_query_dto_1 = __webpack_require__(63);
const exceptions_1 = __webpack_require__(27);
const entity_update_helper_1 = __webpack_require__(29);
const repository_helper_1 = __webpack_require__(64);
const member_helper_1 = __webpack_require__(65);
let MembersService = MembersService_1 = class MembersService {
    constructor(memberRepository, membershipRepository, ptUsageRepository, dataSource) {
        this.memberRepository = memberRepository;
        this.membershipRepository = membershipRepository;
        this.ptUsageRepository = ptUsageRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(MembersService_1.name);
    }
    async findAll(page = 1, pageSize = 10) {
        const skip = (page - 1) * pageSize;
        const [members, total] = await this.memberRepository.findAndCount({
            relations: ['memberships', 'ptUsages'],
            order: { createdAt: 'DESC' },
            skip,
            take: pageSize,
        });
        return { members, total, page, pageSize };
    }
    async findOne(id) {
        const member = await repository_helper_1.RepositoryHelper.findOneOrFail(this.memberRepository, {
            where: { id },
            relations: ['memberships', 'ptUsages', 'assessments', 'injuries'],
        }, this.logger, '회원');
        if (member.birthDate && (!member.age || member.age === null)) {
            member.age = member_helper_1.MemberHelper.calculateAge(member.birthDate);
            await this.memberRepository.save(member);
        }
        return member;
    }
    async create(createMemberDto) {
        const existingMember = await this.memberRepository.findOne({
            where: { email: createMemberDto.email },
        });
        if (existingMember) {
            this.logger.warn(`이미 등록된 이메일입니다. Email: ${createMemberDto.email}`);
            throw exceptions_1.ApiExceptions.memberAlreadyExists();
        }
        const birthDate = createMemberDto.birthDate ? new Date(createMemberDto.birthDate) : undefined;
        const age = member_helper_1.MemberHelper.calculateAge(birthDate);
        const member = this.memberRepository.create({
            ...createMemberDto,
            joinDate: new Date(createMemberDto.joinDate),
            birthDate,
            age,
            status: createMemberDto.status || enums_1.MemberStatus.ACTIVE,
        });
        return this.memberRepository.save(member);
    }
    async createFull(dto) {
        const existingMember = await this.memberRepository.findOne({
            where: { email: dto.email },
        });
        if (existingMember) {
            this.logger.warn(`이미 등록된 이메일입니다. Email: ${dto.email}`);
            throw exceptions_1.ApiExceptions.memberAlreadyExists();
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const birthDate = dto.birthDate ? new Date(dto.birthDate) : undefined;
            const age = member_helper_1.MemberHelper.calculateAge(birthDate);
            const memberWeight = dto.initialMeasurement?.weight ?? dto.weight;
            const member = queryRunner.manager.create(member_entity_1.Member, {
                name: dto.name,
                phone: dto.phone,
                email: dto.email,
                joinDate: new Date(dto.joinDate),
                birthDate,
                age,
                gender: dto.gender,
                height: dto.height,
                weight: memberWeight,
                status: dto.status || enums_1.MemberStatus.ACTIVE,
                totalSessions: dto.membership?.ptTotalCount || 0,
                completedSessions: 0,
                goalProgress: 0,
            });
            const savedMember = await queryRunner.manager.save(member_entity_1.Member, member);
            let savedMembership;
            let savedPTUsage;
            if (dto.membership) {
                const m = dto.membership;
                const mainGoalLabel = m.mainGoalLabel ||
                    (m.mainGoalType ? enums_1.GoalTypeNames[m.mainGoalType] : undefined);
                const targetUnit = m.targetUnit ||
                    (m.mainGoalType ? enums_1.GoalTypeUnits[m.mainGoalType] : undefined);
                const membership = queryRunner.manager.create(membership_entity_1.Membership, {
                    memberId: savedMember.id,
                    membershipType: m.membershipType,
                    purchaseDate: new Date(m.purchaseDate),
                    expiryDate: new Date(m.expiryDate),
                    status: m.status || enums_1.MembershipStatus.ACTIVE,
                    price: m.price,
                    durationWeeks: m.durationWeeks,
                    mainGoalType: m.mainGoalType,
                    mainGoalLabel,
                    targetValue: m.targetValue,
                    targetUnit,
                    startValue: m.startValue ?? dto.initialMeasurement?.weight,
                    currentValue: dto.initialMeasurement?.weight,
                    currentProgress: 0,
                    riskStatus: enums_1.RiskStatus.GREEN,
                });
                savedMembership = await queryRunner.manager.save(membership_entity_1.Membership, membership);
                if (m.ptTotalCount && m.ptTotalCount > 0) {
                    const ptUsage = queryRunner.manager.create(pt_usage_entity_1.PTUsage, {
                        memberId: savedMember.id,
                        totalCount: m.ptTotalCount,
                        remainingCount: m.ptTotalCount,
                        usedCount: 0,
                    });
                    savedPTUsage = await queryRunner.manager.save(pt_usage_entity_1.PTUsage, ptUsage);
                }
            }
            await queryRunner.commitTransaction();
            this.logger.log(`회원 등록 완료: ${savedMember.name} (ID: ${savedMember.id})` +
                (savedMembership ? `, 회원권: ${savedMembership.id}` : '') +
                (savedPTUsage ? `, PT: ${savedPTUsage.totalCount}회` : ''));
            return {
                member: savedMember,
                membership: savedMembership,
                ptUsage: savedPTUsage,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`회원 등록 실패: ${error.message}`);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(id, updateMemberDto) {
        const member = await this.memberRepository.findOne({
            where: { id },
            relations: ['memberships', 'ptUsages', 'assessments', 'injuries'],
        });
        if (!member) {
            this.logger.warn(`회원을 찾을 수 없습니다. ID: ${id}`);
            throw exceptions_1.ApiExceptions.memberNotFound();
        }
        entity_update_helper_1.EntityUpdateHelper.updateFieldsWithDateConversion(member, updateMemberDto, ['birthDate', 'joinDate']);
        if (updateMemberDto.birthDate !== undefined) {
            member.age = member_helper_1.MemberHelper.recalculateAge(member.birthDate, updateMemberDto.birthDate);
            if (updateMemberDto.birthDate === null) {
                member.birthDate = undefined;
            }
        }
        return this.memberRepository.save(member);
    }
    async remove(id) {
        const member = await this.findOne(id);
        await this.memberRepository.softDelete(id);
    }
    async getMembership(memberId) {
        return this.membershipRepository.findOne({
            where: { memberId, status: enums_1.MembershipStatus.ACTIVE },
            order: { createdAt: 'DESC' },
        });
    }
    async createMembership(memberId, createMembershipDto) {
        await this.findOne(memberId);
        const membershipData = entity_update_helper_1.EntityUpdateHelper.convertDateFields({ ...createMembershipDto, memberId }, ['purchaseDate', 'expiryDate']);
        const membership = this.membershipRepository.create(membershipData);
        return this.membershipRepository.save(membership);
    }
    async updateMembership(memberId, membershipId, updateData) {
        const membership = await this.membershipRepository.findOne({
            where: { id: membershipId, memberId },
        });
        if (!membership) {
            this.logger.warn(`회원권을 찾을 수 없습니다. MemberId: ${memberId}, MembershipId: ${membershipId}`);
            throw exceptions_1.ApiExceptions.membershipNotFound();
        }
        entity_update_helper_1.EntityUpdateHelper.updateFieldsWithDateConversion(membership, updateData, ['purchaseDate', 'expiryDate']);
        return this.membershipRepository.save(membership);
    }
    async getPTUsage(memberId) {
        return this.ptUsageRepository.findOne({
            where: { memberId },
            order: { createdAt: 'DESC' },
        });
    }
    async createOrUpdatePTUsage(memberId, updatePTUsageDto) {
        await this.findOne(memberId);
        let ptUsage = await this.getPTUsage(memberId);
        if (!ptUsage) {
            ptUsage = this.ptUsageRepository.create({
                memberId,
                totalCount: updatePTUsageDto.totalCount || 0,
                remainingCount: updatePTUsageDto.remainingCount || 0,
                usedCount: updatePTUsageDto.usedCount || 0,
            });
        }
        else {
            entity_update_helper_1.EntityUpdateHelper.updateFields(ptUsage, updatePTUsageDto);
            if (updatePTUsageDto.usedCount !== undefined) {
                ptUsage.lastUsedDate = new Date();
            }
        }
        return this.ptUsageRepository.save(ptUsage);
    }
    async deleteMembership(memberId, membershipId) {
        const membership = await this.membershipRepository.findOne({
            where: { id: membershipId, memberId },
        });
        if (!membership) {
            this.logger.warn(`회원권을 찾을 수 없습니다. MemberId: ${memberId}, MembershipId: ${membershipId}`);
            throw exceptions_1.ApiExceptions.membershipNotFound();
        }
        await this.membershipRepository.remove(membership);
    }
    async getGoal(memberId) {
        const member = await this.findOne(memberId);
        if (!member.goal && member.goalProgress === 0 && !member.goalTrainerComment) {
            throw exceptions_1.ApiExceptions.goalNotFound();
        }
        return {
            id: member.id,
            memberId: member.id,
            goal: member.goal,
            goalProgress: member.goalProgress,
            goalTrainerComment: member.goalTrainerComment,
            totalSessions: member.totalSessions,
            completedSessions: member.completedSessions,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
        };
    }
    async createGoal(memberId, createGoalDto) {
        const member = await this.findOne(memberId);
        if (member.goal || member.goalProgress > 0 || member.goalTrainerComment) {
            throw exceptions_1.ApiExceptions.validationError('이미 목표가 존재합니다. 수정 API를 사용해주세요.');
        }
        if (createGoalDto.goalProgress !== undefined) {
            if (createGoalDto.goalProgress < 0 || createGoalDto.goalProgress > 100) {
                throw exceptions_1.ApiExceptions.validationError('목표 진행률은 0-100 사이의 값이어야 합니다.');
            }
        }
        entity_update_helper_1.EntityUpdateHelper.updateFields(member, {
            goal: createGoalDto.goal,
            goalProgress: createGoalDto.goalProgress ?? 0,
            goalTrainerComment: createGoalDto.goalTrainerComment,
        });
        return this.memberRepository.save(member);
    }
    async updateGoal(memberId, updateGoalDto) {
        const member = await this.findOne(memberId);
        if (updateGoalDto.goalProgress !== undefined) {
            if (updateGoalDto.goalProgress < 0 || updateGoalDto.goalProgress > 100) {
                throw exceptions_1.ApiExceptions.validationError('목표 진행률은 0-100 사이의 값이어야 합니다.');
            }
        }
        if (updateGoalDto.completedSessions !== undefined &&
            updateGoalDto.totalSessions !== undefined) {
            if (updateGoalDto.completedSessions > updateGoalDto.totalSessions) {
                throw exceptions_1.ApiExceptions.validationError('완료된 수업 회차는 총 수업 회차를 초과할 수 없습니다.');
            }
        }
        else if (updateGoalDto.completedSessions !== undefined) {
            if (updateGoalDto.completedSessions > member.totalSessions) {
                throw exceptions_1.ApiExceptions.validationError('완료된 수업 회차는 총 수업 회차를 초과할 수 없습니다.');
            }
        }
        entity_update_helper_1.EntityUpdateHelper.updateFields(member, updateGoalDto);
        return this.memberRepository.save(member);
    }
    async deleteGoal(memberId) {
        const member = await this.findOne(memberId);
        if (!member.goal && member.goalProgress === 0 && !member.goalTrainerComment) {
            throw exceptions_1.ApiExceptions.goalNotFound();
        }
        member.goal = null;
        member.goalProgress = 0;
        member.goalTrainerComment = null;
        await this.memberRepository.save(member);
    }
    async getDashboard(memberId) {
        const member = await this.findOne(memberId);
        const goal = {
            goal: member.goal,
            goalProgress: member.goalProgress,
            goalTrainerComment: member.goalTrainerComment,
        };
        const progressPercentage = member.totalSessions > 0
            ? Math.round((member.completedSessions / member.totalSessions) * 100)
            : 0;
        const sessionProgress = {
            totalSessions: member.totalSessions,
            completedSessions: member.completedSessions,
            progressPercentage,
        };
        const now = new Date();
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);
        const ptSessions = await this.memberRepository.manager.query(`
			SELECT 
				id,
				session_number as "sessionNumber",
				session_date as "sessionDate",
				main_content as "mainContent"
			FROM pt_sessions
			WHERE member_id = $1
				AND session_date >= $2
				AND session_date <= $3
			ORDER BY session_date DESC
		`, [memberId, thirtyDaysAgo.toISOString().split('T')[0], now.toISOString().split('T')[0]]);
        const workoutRecords = await this.memberRepository.manager.query(`
			SELECT 
				id,
				workout_date as "workoutDate",
				exercise_name as "exerciseName",
				body_part as "bodyPart",
				workout_type as "workoutType"
			FROM workout_records
			WHERE member_id = $1
				AND workout_date >= $2
				AND workout_date <= $3
			ORDER BY workout_date DESC
		`, [memberId, thirtyDaysAgo.toISOString().split('T')[0], now.toISOString().split('T')[0]]);
        const calendarMap = new Map();
        ptSessions.forEach((session) => {
            const date = session.sessionDate;
            if (!calendarMap.has(date)) {
                calendarMap.set(date, {
                    date,
                    ptSessions: [],
                    personalWorkouts: [],
                });
            }
            calendarMap.get(date).ptSessions.push({
                id: session.id,
                sessionNumber: session.sessionNumber,
                mainContent: session.mainContent,
            });
        });
        workoutRecords.forEach((record) => {
            const date = record.workoutDate;
            if (!calendarMap.has(date)) {
                calendarMap.set(date, {
                    date,
                    ptSessions: [],
                    personalWorkouts: [],
                });
            }
            if (record.workoutType === 'PERSONAL') {
                calendarMap.get(date).personalWorkouts.push({
                    id: record.id,
                    exerciseName: record.exerciseName,
                    bodyPart: record.bodyPart,
                });
            }
        });
        const workoutCalendar = Array.from(calendarMap.values())
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const workoutAnalysis = await this.getWorkoutVolumeAnalysis(memberId, workout_volume_query_dto_1.VolumePeriod.WEEK);
        return {
            goal,
            sessionProgress,
            workoutCalendar,
            workoutAnalysis,
        };
    }
    async getWorkoutVolumeAnalysis(memberId, period) {
        const now = new Date();
        let startDate;
        if (period === workout_volume_query_dto_1.VolumePeriod.WEEK) {
            const dayOfWeek = now.getDay();
            const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            startDate = new Date(now);
            startDate.setDate(now.getDate() - diff);
            startDate.setHours(0, 0, 0, 0);
        }
        else {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        }
        const endDate = new Date(now);
        endDate.setHours(23, 59, 59, 999);
        const records = await this.memberRepository.manager.query(`
			SELECT 
				body_part as "bodyPart",
				SUM(volume) as volume
			FROM workout_records
			WHERE member_id = $1
				AND workout_date >= $2
				AND workout_date <= $3
			GROUP BY body_part
			ORDER BY volume DESC
		`, [memberId, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]);
        const bodyPartVolumes = records.map((r) => ({
            bodyPart: r.bodyPart,
            volume: Math.round(parseFloat(r.volume) * 100) / 100,
        }));
        const totalVolume = bodyPartVolumes.reduce((sum, item) => sum + item.volume, 0);
        return {
            period,
            bodyPartVolumes,
            totalVolume: Math.round(totalVolume * 100) / 100,
        };
    }
    async getGoalAnalyst(memberId) {
        const member = await this.findOne(memberId);
        const membership = await this.membershipRepository.findOne({
            where: { memberId, status: 'ACTIVE' },
            order: { createdAt: 'DESC' },
        });
        const program = {
            mainGoal: membership?.mainGoalLabel || null,
            mainGoalType: membership?.mainGoalType || null,
            durationWeeks: membership?.durationWeeks || null,
            startValue: membership?.startValue || null,
            currentValue: membership?.currentValue || null,
            targetValue: membership?.targetValue || null,
            targetUnit: membership?.targetUnit || null,
            currentProgress: membership?.currentProgress || 0,
            riskStatus: membership?.riskStatus || 'GREEN',
            startDate: membership?.purchaseDate ? new Date(membership.purchaseDate).toISOString().split('T')[0] : null,
            endDate: membership?.expiryDate ? new Date(membership.expiryDate).toISOString().split('T')[0] : null,
        };
        const progressRoadmap = {
            start: membership?.startValue && membership?.purchaseDate ? {
                value: membership.startValue,
                date: new Date(membership.purchaseDate).toISOString().split('T')[0],
            } : null,
            current: membership?.currentValue ? {
                value: membership.currentValue,
                date: new Date().toISOString().split('T')[0],
            } : null,
            goal: membership?.targetValue && membership?.expiryDate ? {
                value: membership.targetValue,
                date: new Date(membership.expiryDate).toISOString().split('T')[0],
            } : null,
        };
        const recentMeasurements = await this.memberRepository.manager.query(`
			SELECT 
				session_date as "date",
				measured_weight as "value"
			FROM pt_sessions
			WHERE member_id = $1
				AND measured_weight IS NOT NULL
			ORDER BY session_date DESC
			LIMIT 10
		`, [memberId]);
        let trend;
        if (recentMeasurements.length >= 2) {
            const values = recentMeasurements.map((m) => ({
                date: m.date,
                value: parseFloat(m.value),
            })).reverse();
            let totalChange = 0;
            for (let i = 1; i < values.length; i++) {
                totalChange += values[i].value - values[i - 1].value;
            }
            const averageChange = totalChange / (values.length - 1);
            let direction;
            if (averageChange > 0.5)
                direction = 'UP';
            else if (averageChange < -0.5)
                direction = 'DOWN';
            else
                direction = 'STABLE';
            trend = { direction, recentValues: values, averageChange: Math.round(averageChange * 100) / 100 };
        }
        else {
            trend = { direction: 'STABLE', recentValues: [], averageChange: 0 };
        }
        let nextTarget = { value: null, description: null };
        if (membership?.currentValue && membership?.targetValue && membership?.targetUnit) {
            const isReductionGoal = ['WEIGHT_LOSS', 'BODY_FAT_LOSS'].includes(membership.mainGoalType || '');
            const remaining = isReductionGoal
                ? membership.currentValue - membership.targetValue
                : membership.targetValue - membership.currentValue;
            if (remaining > 0) {
                const weeksRemaining = membership.durationWeeks
                    ? Math.max(1, Math.ceil((new Date(membership.expiryDate).getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1000)))
                    : 4;
                const weeklyTarget = remaining / weeksRemaining;
                nextTarget = {
                    value: Math.round((membership.currentValue + (isReductionGoal ? -weeklyTarget : weeklyTarget)) * 10) / 10,
                    description: `다음 주 목표: ${Math.round(weeklyTarget * 10) / 10}${membership.targetUnit} ${isReductionGoal ? '감량' : '증가'}`,
                };
            }
        }
        const sessionProgress = {
            totalSessions: member.totalSessions,
            completedSessions: member.completedSessions,
            progressPercentage: member.totalSessions > 0
                ? Math.round((member.completedSessions / member.totalSessions) * 100)
                : 0,
        };
        return {
            program,
            progressRoadmap,
            trend,
            nextTarget,
            sessionProgress,
        };
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = MembersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(1, (0, typeorm_1.InjectRepository)(membership_entity_1.Membership)),
    __param(2, (0, typeorm_1.InjectRepository)(pt_usage_entity_1.PTUsage)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _d : Object])
], MembersService);


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Member = void 0;
const typeorm_1 = __webpack_require__(15);
const assessment_entity_1 = __webpack_require__(52);
const injury_history_entity_1 = __webpack_require__(55);
const membership_entity_1 = __webpack_require__(57);
const pt_usage_entity_1 = __webpack_require__(60);
const ability_snapshot_entity_1 = __webpack_require__(54);
const workout_record_entity_1 = __webpack_require__(61);
const pt_session_entity_1 = __webpack_require__(59);
const workout_routine_entity_1 = __webpack_require__(62);
const enums_1 = __webpack_require__(18);
let Member = class Member {
};
exports.Member = Member;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Member.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Member.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Member.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'join_date' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Member.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MemberStatus,
        default: enums_1.MemberStatus.ACTIVE,
    }),
    __metadata("design:type", typeof (_b = typeof enums_1.MemberStatus !== "undefined" && enums_1.MemberStatus) === "function" ? _b : Object)
], Member.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'height', nullable: true, comment: '키 (cm)' }),
    __metadata("design:type", Number)
], Member.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'weight', nullable: true, comment: '몸무게 (kg)' }),
    __metadata("design:type", Number)
], Member.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        name: 'birth_date',
        nullable: true,
        comment: '생년월일',
    }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Member.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'age',
        nullable: true,
        comment: '한국나이 (생년월일로부터 자동 계산)',
    }),
    __metadata("design:type", Number)
], Member.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Gender,
        name: 'gender',
        nullable: true,
        comment: '성별',
    }),
    __metadata("design:type", typeof (_d = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _d : Object)
], Member.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "goal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'goal_progress', default: 0 }),
    __metadata("design:type", Number)
], Member.prototype, "goalProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'goal_trainer_comment', nullable: true }),
    __metadata("design:type", String)
], Member.prototype, "goalTrainerComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_sessions', default: 0 }),
    __metadata("design:type", Number)
], Member.prototype, "totalSessions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'completed_sessions', default: 0 }),
    __metadata("design:type", Number)
], Member.prototype, "completedSessions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => assessment_entity_1.Assessment, (assessment) => assessment.member),
    __metadata("design:type", Array)
], Member.prototype, "assessments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => injury_history_entity_1.InjuryHistory, (injury) => injury.member),
    __metadata("design:type", Array)
], Member.prototype, "injuries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => membership_entity_1.Membership, (membership) => membership.member),
    __metadata("design:type", Array)
], Member.prototype, "memberships", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pt_usage_entity_1.PTUsage, (ptUsage) => ptUsage.member),
    __metadata("design:type", Array)
], Member.prototype, "ptUsages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ability_snapshot_entity_1.AbilitySnapshot, (snapshot) => snapshot.member),
    __metadata("design:type", Array)
], Member.prototype, "abilitySnapshots", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workout_record_entity_1.WorkoutRecord, (workoutRecord) => workoutRecord.member),
    __metadata("design:type", Array)
], Member.prototype, "workoutRecords", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pt_session_entity_1.PTSession, (ptSession) => ptSession.member),
    __metadata("design:type", Array)
], Member.prototype, "ptSessions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workout_routine_entity_1.WorkoutRoutine, (workoutRoutine) => workoutRoutine.member),
    __metadata("design:type", Array)
], Member.prototype, "workoutRoutines", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], Member.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Member.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], Member.prototype, "deletedAt", void 0);
exports.Member = Member = __decorate([
    (0, typeorm_1.Index)('idx_members_email', ['email']),
    (0, typeorm_1.Index)('idx_members_status', ['status']),
    (0, typeorm_1.Index)('idx_members_deleted_at', ['deletedAt']),
    (0, typeorm_1.Entity)('members')
], Member);


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Assessment = void 0;
const typeorm_1 = __webpack_require__(15);
const member_entity_1 = __webpack_require__(51);
const assessment_item_entity_1 = __webpack_require__(53);
const ability_snapshot_entity_1 = __webpack_require__(54);
const enums_1 = __webpack_require__(18);
let Assessment = class Assessment {
};
exports.Assessment = Assessment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Assessment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id' }),
    __metadata("design:type", String)
], Assessment.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, (member) => member.assessments, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", typeof (_a = typeof member_entity_1.Member !== "undefined" && member_entity_1.Member) === "function" ? _a : Object)
], Assessment.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.AssessmentType,
        name: 'assessment_type',
    }),
    __metadata("design:type", typeof (_b = typeof enums_1.AssessmentType !== "undefined" && enums_1.AssessmentType) === "function" ? _b : Object)
], Assessment.prototype, "assessmentType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.EvaluationType,
        name: 'evaluation_type',
        nullable: true,
    }),
    __metadata("design:type", typeof (_c = typeof enums_1.EvaluationType !== "undefined" && enums_1.EvaluationType) === "function" ? _c : Object)
], Assessment.prototype, "evaluationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'static_evaluation', nullable: true }),
    __metadata("design:type", Object)
], Assessment.prototype, "staticEvaluation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'dynamic_evaluation', nullable: true }),
    __metadata("design:type", Object)
], Assessment.prototype, "dynamicEvaluation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_initial', default: false }),
    __metadata("design:type", Boolean)
], Assessment.prototype, "isInitial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'assessed_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Assessment.prototype, "assessedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'trainer_comment', nullable: true }),
    __metadata("design:type", String)
], Assessment.prototype, "trainerComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'body_weight', nullable: true }),
    __metadata("design:type", Number)
], Assessment.prototype, "bodyWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Condition,
        nullable: true,
    }),
    __metadata("design:type", typeof (_e = typeof enums_1.Condition !== "undefined" && enums_1.Condition) === "function" ? _e : Object)
], Assessment.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => assessment_item_entity_1.AssessmentItem, (item) => item.assessment),
    __metadata("design:type", Array)
], Assessment.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ability_snapshot_entity_1.AbilitySnapshot, (snapshot) => snapshot.assessment),
    __metadata("design:type", typeof (_f = typeof ability_snapshot_entity_1.AbilitySnapshot !== "undefined" && ability_snapshot_entity_1.AbilitySnapshot) === "function" ? _f : Object)
], Assessment.prototype, "snapshot", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], Assessment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], Assessment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], Assessment.prototype, "deletedAt", void 0);
exports.Assessment = Assessment = __decorate([
    (0, typeorm_1.Index)('idx_assessments_member_id', ['memberId']),
    (0, typeorm_1.Index)('idx_assessments_assessed_at', ['assessedAt']),
    (0, typeorm_1.Index)('idx_assessments_is_initial', ['isInitial']),
    (0, typeorm_1.Index)('idx_assessments_deleted_at', ['deletedAt']),
    (0, typeorm_1.Entity)('assessments')
], Assessment);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssessmentItem = void 0;
const typeorm_1 = __webpack_require__(15);
const assessment_entity_1 = __webpack_require__(52);
const enums_1 = __webpack_require__(18);
let AssessmentItem = class AssessmentItem {
};
exports.AssessmentItem = AssessmentItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AssessmentItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assessment_id' }),
    __metadata("design:type", String)
], AssessmentItem.prototype, "assessmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assessment_entity_1.Assessment, (assessment) => assessment.items, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'assessment_id' }),
    __metadata("design:type", typeof (_a = typeof assessment_entity_1.Assessment !== "undefined" && assessment_entity_1.Assessment) === "function" ? _a : Object)
], AssessmentItem.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Category,
    }),
    __metadata("design:type", typeof (_b = typeof enums_1.Category !== "undefined" && enums_1.Category) === "function" ? _b : Object)
], AssessmentItem.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], AssessmentItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], AssessmentItem.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], AssessmentItem.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], AssessmentItem.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AssessmentItem.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], AssessmentItem.prototype, "createdAt", void 0);
exports.AssessmentItem = AssessmentItem = __decorate([
    (0, typeorm_1.Index)('idx_assessment_items_assessment_id', ['assessmentId']),
    (0, typeorm_1.Index)('idx_assessment_items_category', ['category']),
    (0, typeorm_1.Entity)('assessment_items')
], AssessmentItem);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbilitySnapshot = void 0;
const typeorm_1 = __webpack_require__(15);
const assessment_entity_1 = __webpack_require__(52);
const member_entity_1 = __webpack_require__(51);
let AbilitySnapshot = class AbilitySnapshot {
};
exports.AbilitySnapshot = AbilitySnapshot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], AbilitySnapshot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "assessment_id", unique: true }),
    __metadata("design:type", String)
], AbilitySnapshot.prototype, "assessmentId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => assessment_entity_1.Assessment, (assessment) => assessment.snapshot, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "assessment_id" }),
    __metadata("design:type", typeof (_a = typeof assessment_entity_1.Assessment !== "undefined" && assessment_entity_1.Assessment) === "function" ? _a : Object)
], AbilitySnapshot.prototype, "assessment", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "member_id" }),
    __metadata("design:type", String)
], AbilitySnapshot.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, (member) => member.abilitySnapshots, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "member_id" }),
    __metadata("design:type", typeof (_b = typeof member_entity_1.Member !== "undefined" && member_entity_1.Member) === "function" ? _b : Object)
], AbilitySnapshot.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", name: "assessed_at" }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], AbilitySnapshot.prototype, "assessedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], AbilitySnapshot.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", name: "strength_score", nullable: true }),
    __metadata("design:type", Number)
], AbilitySnapshot.prototype, "strengthScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", name: "cardio_score", nullable: true }),
    __metadata("design:type", Number)
], AbilitySnapshot.prototype, "cardioScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", name: "endurance_score", nullable: true }),
    __metadata("design:type", Number)
], AbilitySnapshot.prototype, "enduranceScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", name: "flexibility_score", nullable: true }),
    __metadata("design:type", Number)
], AbilitySnapshot.prototype, "flexibilityScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", name: "body_score", nullable: true }),
    __metadata("design:type", Number)
], AbilitySnapshot.prototype, "bodyScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", name: "stability_score", nullable: true }),
    __metadata("design:type", Number)
], AbilitySnapshot.prototype, "stabilityScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", name: "total_score" }),
    __metadata("design:type", Number)
], AbilitySnapshot.prototype, "totalScore", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], AbilitySnapshot.prototype, "createdAt", void 0);
exports.AbilitySnapshot = AbilitySnapshot = __decorate([
    (0, typeorm_1.Index)("idx_ability_snapshots_assessment_id", ["assessmentId"]),
    (0, typeorm_1.Index)("idx_ability_snapshots_member_id", ["memberId"]),
    (0, typeorm_1.Index)("idx_ability_snapshots_assessed_at", ["assessedAt"]),
    (0, typeorm_1.Entity)("ability_snapshots")
], AbilitySnapshot);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InjuryHistory = void 0;
const typeorm_1 = __webpack_require__(15);
const member_entity_1 = __webpack_require__(51);
const injury_restriction_entity_1 = __webpack_require__(56);
const enums_1 = __webpack_require__(18);
let InjuryHistory = class InjuryHistory {
};
exports.InjuryHistory = InjuryHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InjuryHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id' }),
    __metadata("design:type", String)
], InjuryHistory.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, (member) => member.injuries, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", typeof (_a = typeof member_entity_1.Member !== "undefined" && member_entity_1.Member) === "function" ? _a : Object)
], InjuryHistory.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'injury_type', length: 255 }),
    __metadata("design:type", String)
], InjuryHistory.prototype, "injuryType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'body_part', length: 255 }),
    __metadata("design:type", String)
], InjuryHistory.prototype, "bodyPart", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], InjuryHistory.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Severity,
    }),
    __metadata("design:type", typeof (_c = typeof enums_1.Severity !== "undefined" && enums_1.Severity) === "function" ? _c : Object)
], InjuryHistory.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], InjuryHistory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.RecoveryStatus,
        name: 'recovery_status',
    }),
    __metadata("design:type", typeof (_d = typeof enums_1.RecoveryStatus !== "undefined" && enums_1.RecoveryStatus) === "function" ? _d : Object)
], InjuryHistory.prototype, "recoveryStatus", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => injury_restriction_entity_1.InjuryRestriction, (restriction) => restriction.injury),
    __metadata("design:type", Array)
], InjuryHistory.prototype, "restrictions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], InjuryHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], InjuryHistory.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], InjuryHistory.prototype, "deletedAt", void 0);
exports.InjuryHistory = InjuryHistory = __decorate([
    (0, typeorm_1.Index)('idx_injury_histories_member_id', ['memberId']),
    (0, typeorm_1.Index)('idx_injury_histories_recovery_status', ['recoveryStatus']),
    (0, typeorm_1.Index)('idx_injury_histories_deleted_at', ['deletedAt']),
    (0, typeorm_1.Entity)('injury_histories')
], InjuryHistory);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InjuryRestriction = void 0;
const typeorm_1 = __webpack_require__(15);
const injury_history_entity_1 = __webpack_require__(55);
const enums_1 = __webpack_require__(18);
let InjuryRestriction = class InjuryRestriction {
};
exports.InjuryRestriction = InjuryRestriction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InjuryRestriction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'injury_id' }),
    __metadata("design:type", String)
], InjuryRestriction.prototype, "injuryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => injury_history_entity_1.InjuryHistory, (injury) => injury.restrictions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'injury_id' }),
    __metadata("design:type", typeof (_a = typeof injury_history_entity_1.InjuryHistory !== "undefined" && injury_history_entity_1.InjuryHistory) === "function" ? _a : Object)
], InjuryRestriction.prototype, "injury", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Category,
        name: 'restricted_category',
    }),
    __metadata("design:type", typeof (_b = typeof enums_1.Category !== "undefined" && enums_1.Category) === "function" ? _b : Object)
], InjuryRestriction.prototype, "restrictedCategory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], InjuryRestriction.prototype, "createdAt", void 0);
exports.InjuryRestriction = InjuryRestriction = __decorate([
    (0, typeorm_1.Index)('idx_injury_restrictions_injury_id', ['injuryId']),
    (0, typeorm_1.Index)('idx_injury_restrictions_category', ['restrictedCategory']),
    (0, typeorm_1.Entity)('injury_restrictions')
], InjuryRestriction);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Membership = void 0;
const typeorm_1 = __webpack_require__(15);
const member_entity_1 = __webpack_require__(51);
const program_milestone_entity_1 = __webpack_require__(58);
const enums_1 = __webpack_require__(18);
let Membership = class Membership {
};
exports.Membership = Membership;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Membership.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id' }),
    __metadata("design:type", String)
], Membership.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, (member) => member.memberships, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", typeof (_a = typeof member_entity_1.Member !== "undefined" && member_entity_1.Member) === "function" ? _a : Object)
], Membership.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MembershipType,
        name: 'membership_type',
    }),
    __metadata("design:type", typeof (_b = typeof enums_1.MembershipType !== "undefined" && enums_1.MembershipType) === "function" ? _b : Object)
], Membership.prototype, "membershipType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'purchase_date' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Membership.prototype, "purchaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'expiry_date' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Membership.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.MembershipStatus,
        default: enums_1.MembershipStatus.ACTIVE,
    }),
    __metadata("design:type", typeof (_e = typeof enums_1.MembershipStatus !== "undefined" && enums_1.MembershipStatus) === "function" ? _e : Object)
], Membership.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Membership.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'duration_weeks', nullable: true, comment: '프로그램 기간 (4, 8, 12주)' }),
    __metadata("design:type", Number)
], Membership.prototype, "durationWeeks", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.GoalType,
        name: 'main_goal_type',
        nullable: true,
        comment: '메인 목표 유형',
    }),
    __metadata("design:type", typeof (_f = typeof enums_1.GoalType !== "undefined" && enums_1.GoalType) === "function" ? _f : Object)
], Membership.prototype, "mainGoalType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'main_goal_label', nullable: true, comment: '메인 목표 라벨 (예: 체중 감량)' }),
    __metadata("design:type", String)
], Membership.prototype, "mainGoalLabel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'target_value', nullable: true, comment: '목표 수치' }),
    __metadata("design:type", Number)
], Membership.prototype, "targetValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'target_unit', nullable: true, comment: '목표 단위 (kg, %)' }),
    __metadata("design:type", String)
], Membership.prototype, "targetUnit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'start_value', nullable: true, comment: '시작 수치' }),
    __metadata("design:type", Number)
], Membership.prototype, "startValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'current_value', nullable: true, comment: '현재 수치' }),
    __metadata("design:type", Number)
], Membership.prototype, "currentValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'current_progress', default: 0, comment: '현재 진행률 (0-100)' }),
    __metadata("design:type", Number)
], Membership.prototype, "currentProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.RiskStatus,
        name: 'risk_status',
        default: enums_1.RiskStatus.FOUNDATION,
        comment: '위험 상태 (FOUNDATION/GREEN/YELLOW/RED)',
    }),
    __metadata("design:type", typeof (_g = typeof enums_1.RiskStatus !== "undefined" && enums_1.RiskStatus) === "function" ? _g : Object)
], Membership.prototype, "riskStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.GoalDirection,
        name: 'goal_direction',
        nullable: true,
        comment: 'CUSTOM 목표용 방향 (INCREASE/DECREASE)',
    }),
    __metadata("design:type", typeof (_h = typeof enums_1.GoalDirection !== "undefined" && enums_1.GoalDirection) === "function" ? _h : Object)
], Membership.prototype, "goalDirection", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_rapid_progress', default: false, comment: '급변 플래그 (빠른 순방향 변화)' }),
    __metadata("design:type", Boolean)
], Membership.prototype, "isRapidProgress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_measurement_overdue', default: false, comment: '측정 미실시 플래그 (2주 경과)' }),
    __metadata("design:type", Boolean)
], Membership.prototype, "isMeasurementOverdue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'last_measurement_at', nullable: true, comment: '마지막 측정 일시' }),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], Membership.prototype, "lastMeasurementAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => program_milestone_entity_1.ProgramMilestone, (milestone) => milestone.membership),
    __metadata("design:type", Array)
], Membership.prototype, "milestones", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], Membership.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_l = typeof Date !== "undefined" && Date) === "function" ? _l : Object)
], Membership.prototype, "updatedAt", void 0);
exports.Membership = Membership = __decorate([
    (0, typeorm_1.Index)('idx_memberships_member_id', ['memberId']),
    (0, typeorm_1.Index)('idx_memberships_status', ['status']),
    (0, typeorm_1.Index)('idx_memberships_expiry_date', ['expiryDate']),
    (0, typeorm_1.Index)('idx_memberships_risk_status', ['riskStatus']),
    (0, typeorm_1.Entity)('memberships')
], Membership);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgramMilestone = void 0;
const typeorm_1 = __webpack_require__(15);
const membership_entity_1 = __webpack_require__(57);
const pt_session_entity_1 = __webpack_require__(59);
const enums_1 = __webpack_require__(18);
let ProgramMilestone = class ProgramMilestone {
};
exports.ProgramMilestone = ProgramMilestone;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProgramMilestone.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'membership_id' }),
    __metadata("design:type", String)
], ProgramMilestone.prototype, "membershipId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => membership_entity_1.Membership, (membership) => membership.milestones, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'membership_id' }),
    __metadata("design:type", typeof (_a = typeof membership_entity_1.Membership !== "undefined" && membership_entity_1.Membership) === "function" ? _a : Object)
], ProgramMilestone.prototype, "membership", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pt_session_id', nullable: true, comment: '연결된 PT 세션 ID' }),
    __metadata("design:type", String)
], ProgramMilestone.prototype, "ptSessionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pt_session_entity_1.PTSession, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'pt_session_id' }),
    __metadata("design:type", typeof (_b = typeof pt_session_entity_1.PTSession !== "undefined" && pt_session_entity_1.PTSession) === "function" ? _b : Object)
], ProgramMilestone.prototype, "ptSession", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'week_number', comment: '주차 (1, 2, 3...)' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "weekNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'block_number', nullable: true, comment: '블록 번호 (1, 2, 3...)' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "blockNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.BlockPurpose,
        name: 'block_purpose',
        nullable: true,
        comment: '블록 목적 (ADAPTATION/INTENSITY/CONSOLIDATION)',
    }),
    __metadata("design:type", typeof (_c = typeof enums_1.BlockPurpose !== "undefined" && enums_1.BlockPurpose) === "function" ? _c : Object)
], ProgramMilestone.prototype, "blockPurpose", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'block_start_week', nullable: true, comment: '블록 시작 주차' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "blockStartWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'block_end_week', nullable: true, comment: '블록 종료 주차' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "blockEndWeek", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'target_date', comment: '목표 달성 예정일' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ProgramMilestone.prototype, "targetDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'measured_weight', nullable: true, comment: '측정 체중 (kg)' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "measuredWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'measured_muscle_mass', nullable: true, comment: '측정 골격근량 (kg)' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "measuredMuscleMass", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'measured_body_fat', nullable: true, comment: '측정 체지방률 (%)' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "measuredBodyFat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'measured_value', nullable: true, comment: '목표 관련 측정값' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "measuredValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'progress_at_milestone', nullable: true, comment: '마일스톤 시점 진행률' }),
    __metadata("design:type", Number)
], ProgramMilestone.prototype, "progressAtMilestone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_achieved', default: false, comment: '달성 여부' }),
    __metadata("design:type", Boolean)
], ProgramMilestone.prototype, "isAchieved", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'achieved_at', nullable: true, comment: '달성 일시' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ProgramMilestone.prototype, "achievedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'trainer_feedback', nullable: true, comment: '트레이너 피드백' }),
    __metadata("design:type", String)
], ProgramMilestone.prototype, "trainerFeedback", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], ProgramMilestone.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], ProgramMilestone.prototype, "updatedAt", void 0);
exports.ProgramMilestone = ProgramMilestone = __decorate([
    (0, typeorm_1.Index)('idx_program_milestones_membership_id', ['membershipId']),
    (0, typeorm_1.Index)('idx_program_milestones_week_number', ['weekNumber']),
    (0, typeorm_1.Index)('idx_program_milestones_is_achieved', ['isAchieved']),
    (0, typeorm_1.Entity)('program_milestones')
], ProgramMilestone);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PTSession = void 0;
const typeorm_1 = __webpack_require__(15);
const member_entity_1 = __webpack_require__(51);
const membership_entity_1 = __webpack_require__(57);
let PTSession = class PTSession {
};
exports.PTSession = PTSession;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PTSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id' }),
    __metadata("design:type", String)
], PTSession.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, (member) => member.ptSessions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", typeof (_a = typeof member_entity_1.Member !== "undefined" && member_entity_1.Member) === "function" ? _a : Object)
], PTSession.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'membership_id', nullable: true, comment: '연결된 회원권/프로그램 ID' }),
    __metadata("design:type", String)
], PTSession.prototype, "membershipId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => membership_entity_1.Membership, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'membership_id' }),
    __metadata("design:type", typeof (_b = typeof membership_entity_1.Membership !== "undefined" && membership_entity_1.Membership) === "function" ? _b : Object)
], PTSession.prototype, "membership", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'session_number' }),
    __metadata("design:type", Number)
], PTSession.prototype, "sessionNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'session_date' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], PTSession.prototype, "sessionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'main_content' }),
    __metadata("design:type", String)
], PTSession.prototype, "mainContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'trainer_comment', nullable: true }),
    __metadata("design:type", String)
], PTSession.prototype, "trainerComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'measured_weight', nullable: true, comment: '측정 체중 (kg)' }),
    __metadata("design:type", Number)
], PTSession.prototype, "measuredWeight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'measured_muscle_mass', nullable: true, comment: '측정 골격근량 (kg)' }),
    __metadata("design:type", Number)
], PTSession.prototype, "measuredMuscleMass", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'measured_body_fat', nullable: true, comment: '측정 체지방률 (%)' }),
    __metadata("design:type", Number)
], PTSession.prototype, "measuredBodyFat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'bench_press_1rm', nullable: true, comment: '벤치프레스 1RM (kg)' }),
    __metadata("design:type", Number)
], PTSession.prototype, "benchPress1RM", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'squat_1rm', nullable: true, comment: '스쿼트 1RM (kg)' }),
    __metadata("design:type", Number)
], PTSession.prototype, "squat1RM", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'deadlift_1rm', nullable: true, comment: '데드리프트 1RM (kg)' }),
    __metadata("design:type", Number)
], PTSession.prototype, "deadlift1RM", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'milestone_created', default: false, comment: '마일스톤 생성 여부' }),
    __metadata("design:type", Boolean)
], PTSession.prototype, "milestoneCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'step_test_time', nullable: true, comment: '스텝테스트 시간 (초)' }),
    __metadata("design:type", Number)
], PTSession.prototype, "stepTestTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], PTSession.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], PTSession.prototype, "updatedAt", void 0);
exports.PTSession = PTSession = __decorate([
    (0, typeorm_1.Index)('idx_pt_sessions_member_id', ['memberId']),
    (0, typeorm_1.Index)('idx_pt_sessions_session_date', ['sessionDate']),
    (0, typeorm_1.Index)('idx_pt_sessions_session_number', ['memberId', 'sessionNumber']),
    (0, typeorm_1.Index)('idx_pt_sessions_membership_id', ['membershipId']),
    (0, typeorm_1.Entity)('pt_sessions')
], PTSession);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PTUsage = void 0;
const typeorm_1 = __webpack_require__(15);
const member_entity_1 = __webpack_require__(51);
let PTUsage = class PTUsage {
};
exports.PTUsage = PTUsage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PTUsage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id' }),
    __metadata("design:type", String)
], PTUsage.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, (member) => member.ptUsages, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", typeof (_a = typeof member_entity_1.Member !== "undefined" && member_entity_1.Member) === "function" ? _a : Object)
], PTUsage.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_count', default: 0 }),
    __metadata("design:type", Number)
], PTUsage.prototype, "totalCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'remaining_count', default: 0 }),
    __metadata("design:type", Number)
], PTUsage.prototype, "remainingCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'used_count', default: 0 }),
    __metadata("design:type", Number)
], PTUsage.prototype, "usedCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'last_used_date', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PTUsage.prototype, "lastUsedDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], PTUsage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], PTUsage.prototype, "updatedAt", void 0);
exports.PTUsage = PTUsage = __decorate([
    (0, typeorm_1.Index)('idx_pt_usages_member_id', ['memberId']),
    (0, typeorm_1.Entity)('pt_usages')
], PTUsage);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutRecord = exports.WorkoutType = void 0;
const typeorm_1 = __webpack_require__(15);
const member_entity_1 = __webpack_require__(51);
const enums_1 = __webpack_require__(18);
var WorkoutType;
(function (WorkoutType) {
    WorkoutType["PT"] = "PT";
    WorkoutType["PERSONAL"] = "PERSONAL";
})(WorkoutType || (exports.WorkoutType = WorkoutType = {}));
let WorkoutRecord = class WorkoutRecord {
};
exports.WorkoutRecord = WorkoutRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkoutRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id' }),
    __metadata("design:type", String)
], WorkoutRecord.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, (member) => member.workoutRecords, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", typeof (_a = typeof member_entity_1.Member !== "undefined" && member_entity_1.Member) === "function" ? _a : Object)
], WorkoutRecord.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'workout_date' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], WorkoutRecord.prototype, "workoutDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'body_part' }),
    __metadata("design:type", String)
], WorkoutRecord.prototype, "bodyPart", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'exercise_name' }),
    __metadata("design:type", String)
], WorkoutRecord.prototype, "exerciseName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], WorkoutRecord.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], WorkoutRecord.prototype, "reps", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], WorkoutRecord.prototype, "sets", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], WorkoutRecord.prototype, "volume", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], WorkoutRecord.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: WorkoutType,
        default: WorkoutType.PERSONAL,
        name: 'workout_type',
    }),
    __metadata("design:type", String)
], WorkoutRecord.prototype, "workoutType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pt_session_id', nullable: true }),
    __metadata("design:type", String)
], WorkoutRecord.prototype, "ptSessionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'trainer_comment', nullable: true }),
    __metadata("design:type", String)
], WorkoutRecord.prototype, "trainerComment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'one_rep_max', nullable: true }),
    __metadata("design:type", Number)
], WorkoutRecord.prototype, "oneRepMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'relative_strength', nullable: true }),
    __metadata("design:type", Number)
], WorkoutRecord.prototype, "relativeStrength", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.StrengthLevel,
        name: 'strength_level',
        nullable: true,
    }),
    __metadata("design:type", typeof (_c = typeof enums_1.StrengthLevel !== "undefined" && enums_1.StrengthLevel) === "function" ? _c : Object)
], WorkoutRecord.prototype, "strengthLevel", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], WorkoutRecord.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], WorkoutRecord.prototype, "updatedAt", void 0);
exports.WorkoutRecord = WorkoutRecord = __decorate([
    (0, typeorm_1.Index)('idx_workout_records_member_id', ['memberId']),
    (0, typeorm_1.Index)('idx_workout_records_workout_date', ['workoutDate']),
    (0, typeorm_1.Index)('idx_workout_records_workout_type', ['workoutType']),
    (0, typeorm_1.Entity)('workout_records')
], WorkoutRecord);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutRoutine = void 0;
const typeorm_1 = __webpack_require__(15);
const member_entity_1 = __webpack_require__(51);
let WorkoutRoutine = class WorkoutRoutine {
};
exports.WorkoutRoutine = WorkoutRoutine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkoutRoutine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'member_id', nullable: true }),
    __metadata("design:type", String)
], WorkoutRoutine.prototype, "memberId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => member_entity_1.Member, (member) => member.workoutRoutines, {
        onDelete: 'CASCADE',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'member_id' }),
    __metadata("design:type", typeof (_a = typeof member_entity_1.Member !== "undefined" && member_entity_1.Member) === "function" ? _a : Object)
], WorkoutRoutine.prototype, "member", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: 'routine_name' }),
    __metadata("design:type", String)
], WorkoutRoutine.prototype, "routineName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'routine_date', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], WorkoutRoutine.prototype, "routineDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object)
], WorkoutRoutine.prototype, "exercises", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'estimated_duration' }),
    __metadata("design:type", Number)
], WorkoutRoutine.prototype, "estimatedDuration", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['EASY', 'MEDIUM', 'HARD'],
        default: 'MEDIUM',
    }),
    __metadata("design:type", String)
], WorkoutRoutine.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'is_completed', default: false }),
    __metadata("design:type", Boolean)
], WorkoutRoutine.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], WorkoutRoutine.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], WorkoutRoutine.prototype, "updatedAt", void 0);
exports.WorkoutRoutine = WorkoutRoutine = __decorate([
    (0, typeorm_1.Index)('idx_workout_routines_member_id', ['memberId']),
    (0, typeorm_1.Index)('idx_workout_routines_routine_date', ['routineDate']),
    (0, typeorm_1.Index)('idx_workout_routines_member_date', ['memberId', 'routineDate']),
    (0, typeorm_1.Entity)('workout_routines')
], WorkoutRoutine);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutVolumeQueryDto = exports.VolumePeriod = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
var VolumePeriod;
(function (VolumePeriod) {
    VolumePeriod["WEEK"] = "week";
    VolumePeriod["MONTH"] = "month";
})(VolumePeriod || (exports.VolumePeriod = VolumePeriod = {}));
class WorkoutVolumeQueryDto {
}
exports.WorkoutVolumeQueryDto = WorkoutVolumeQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '집계 기간',
        enum: VolumePeriod,
        example: VolumePeriod.WEEK,
        required: false,
        default: VolumePeriod.WEEK,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(VolumePeriod),
    __metadata("design:type", String)
], WorkoutVolumeQueryDto.prototype, "period", void 0);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RepositoryHelper = void 0;
const exceptions_1 = __webpack_require__(27);
class RepositoryHelper {
    static async findOneOrFailByMemberId(repository, id, memberId, logger, entityName, where) {
        const entity = await repository.findOne({
            where: {
                id,
                memberId,
                ...where,
            },
        });
        if (!entity) {
            logger.warn(`${entityName}을 찾을 수 없습니다. ID: ${id}, MemberId: ${memberId}`);
            throw exceptions_1.ApiExceptions.memberNotFound(`${entityName}을 찾을 수 없습니다.`);
        }
        return entity;
    }
    static async ensureMemberExists(repository, memberId, logger) {
        const member = await repository.findOne({
            where: { id: memberId },
        });
        if (!member) {
            logger.warn(`회원을 찾을 수 없습니다. MemberId: ${memberId}`);
            throw exceptions_1.ApiExceptions.memberNotFound();
        }
    }
    static async findOneOrFailSimple(repository, where, logger, entityName = '엔티티') {
        try {
            return await repository.findOneOrFail({ where });
        }
        catch (error) {
            logger.warn(`${entityName}을 찾을 수 없습니다.`);
            throw exceptions_1.ApiExceptions.memberNotFound(`${entityName}을 찾을 수 없습니다.`);
        }
    }
    static async findOneOrFail(repository, options, logger, entityName, errorMessage) {
        const entity = await repository.findOne(options);
        if (!entity) {
            const message = errorMessage || `${entityName}을 찾을 수 없습니다.`;
            logger.warn(message);
            throw exceptions_1.ApiExceptions.memberNotFound(message);
        }
        return entity;
    }
    static async findOneSafe(repository, options) {
        return repository.findOne(options);
    }
}
exports.RepositoryHelper = RepositoryHelper;


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemberHelper = void 0;
const date_helper_1 = __webpack_require__(9);
class MemberHelper {
    static calculateAge(birthDate) {
        if (!birthDate) {
            return null;
        }
        const birth = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
        return date_helper_1.DateHelper.calculateKoreanAge(birth);
    }
    static recalculateAge(currentBirthDate, newBirthDate) {
        if (newBirthDate !== undefined) {
            if (newBirthDate === null) {
                return null;
            }
            return this.calculateAge(newBirthDate);
        }
        return this.calculateAge(currentBirthDate);
    }
}
exports.MemberHelper = MemberHelper;


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WorkoutRecordsService_1;
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutRecordsService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const workout_record_entity_1 = __webpack_require__(61);
const member_entity_1 = __webpack_require__(51);
const pt_usage_entity_1 = __webpack_require__(60);
const exercise_entity_1 = __webpack_require__(67);
const workout_volume_query_dto_1 = __webpack_require__(63);
const exceptions_1 = __webpack_require__(27);
const pt_sessions_service_1 = __webpack_require__(69);
const members_service_1 = __webpack_require__(50);
const workout_helper_1 = __webpack_require__(71);
const pt_usage_helper_1 = __webpack_require__(72);
const query_builder_helper_1 = __webpack_require__(73);
const date_range_helper_1 = __webpack_require__(74);
const entity_update_helper_1 = __webpack_require__(29);
const repository_helper_1 = __webpack_require__(64);
const one_rep_max_calculator_1 = __webpack_require__(75);
const relative_strength_calculator_1 = __webpack_require__(76);
const strength_level_evaluator_1 = __webpack_require__(77);
const workout_record_helper_1 = __webpack_require__(78);
const strength_standard_entity_1 = __webpack_require__(68);
let WorkoutRecordsService = WorkoutRecordsService_1 = class WorkoutRecordsService {
    constructor(workoutRecordRepository, memberRepository, ptUsageRepository, exerciseRepository, strengthStandardRepository, ptSessionsService, membersService, strengthLevelEvaluator) {
        this.workoutRecordRepository = workoutRecordRepository;
        this.memberRepository = memberRepository;
        this.ptUsageRepository = ptUsageRepository;
        this.exerciseRepository = exerciseRepository;
        this.strengthStandardRepository = strengthStandardRepository;
        this.ptSessionsService = ptSessionsService;
        this.membersService = membersService;
        this.strengthLevelEvaluator = strengthLevelEvaluator;
        this.logger = new common_1.Logger(WorkoutRecordsService_1.name);
        this.majorExerciseMapping = {
            벤치프레스: ['벤치프레스', 'Bench Press', '인클라인 벤치프레스', 'Incline Bench Press', '덤벨 프레스', 'Dumbbell Press'],
            스쿼트: ['스쿼트', 'Squat', '레그프레스', 'Leg Press', '스플릿 스쿼트', 'Split Squat'],
            데드리프트: ['데드리프트', 'Deadlift', '루마니안 데드리프트', 'Romanian Deadlift', '스모 데드리프트', 'Sumo Deadlift'],
        };
    }
    async findAll(memberId, page = 1, pageSize = 10, startDate, endDate) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const queryBuilder = this.workoutRecordRepository
            .createQueryBuilder('record');
        query_builder_helper_1.QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
        query_builder_helper_1.QueryBuilderHelper.addOrderBy(queryBuilder, 'record.workoutDate', 'DESC');
        query_builder_helper_1.QueryBuilderHelper.addAdditionalOrderBy(queryBuilder, 'record.createdAt', 'DESC');
        query_builder_helper_1.QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
        const total = await queryBuilder.getCount();
        query_builder_helper_1.QueryBuilderHelper.addPagination(queryBuilder, page, pageSize);
        const records = await queryBuilder.getMany();
        return { records, total };
    }
    async findOne(id, memberId) {
        return repository_helper_1.RepositoryHelper.findOneOrFailByMemberId(this.workoutRecordRepository, id, memberId, this.logger, '운동 기록');
    }
    async create(memberId, createDto) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const workoutType = createDto.workoutType ?? workout_record_entity_1.WorkoutType.PERSONAL;
        const { weight, reps, sets, volume } = workout_helper_1.WorkoutHelper.normalizeWorkoutValues(createDto.weight, createDto.reps, createDto.sets);
        let ptSessionId = createDto.ptSessionId;
        if (workoutType === workout_record_entity_1.WorkoutType.PT && !ptSessionId) {
            const ptUsage = await pt_usage_helper_1.PTUsageHelper.getLatestPTUsage(this.ptUsageRepository, memberId);
            pt_usage_helper_1.PTUsageHelper.validatePTUsage(ptUsage, memberId, this.logger);
            await pt_usage_helper_1.PTUsageHelper.deductPTUsage(this.ptUsageRepository, ptUsage, new Date(createDto.workoutDate), this.logger, memberId);
            try {
                const ptSession = await this.ptSessionsService.create(memberId, {
                    sessionDate: createDto.workoutDate,
                    mainContent: `${createDto.exerciseName} - ${createDto.bodyPart}`,
                    trainerComment: createDto.trainerComment,
                });
                ptSessionId = ptSession.id;
                this.logger.log(`PT 운동 기록 생성 시 자동으로 PT 세션 생성됨: ${ptSessionId} (MemberId: ${memberId})`);
            }
            catch (error) {
                await pt_usage_helper_1.PTUsageHelper.restorePTUsage(this.ptUsageRepository, ptUsage, this.logger, memberId);
                this.logger.error(`PT 세션 자동 생성 실패. PT 횟수 복구됨: ${error.message} (MemberId: ${memberId})`);
                throw exceptions_1.ApiExceptions.badRequest(`PT 세션 생성에 실패했습니다: ${error.message}`);
            }
        }
        const recordData = entity_update_helper_1.EntityUpdateHelper.convertDateFields({
            memberId,
            workoutDate: createDto.workoutDate,
            bodyPart: createDto.bodyPart,
            exerciseName: createDto.exerciseName,
            weight,
            reps,
            sets,
            volume,
            duration: createDto.duration,
            workoutType,
            ptSessionId,
            trainerComment: createDto.trainerComment,
        }, ['workoutDate']);
        const record = this.workoutRecordRepository.create(recordData);
        await this.calculateStrengthLevel(record, memberId);
        return this.workoutRecordRepository.save(record);
    }
    async update(id, memberId, updateDto) {
        const record = await this.findOne(id, memberId);
        entity_update_helper_1.EntityUpdateHelper.updateFieldsWithDateConversion(record, updateDto, ['workoutDate']);
        record.volume = workout_helper_1.WorkoutHelper.calculateVolume(record.weight, record.reps, record.sets);
        await this.calculateStrengthLevel(record, memberId);
        return this.workoutRecordRepository.save(record);
    }
    async remove(id, memberId) {
        const record = await this.findOne(id, memberId);
        if (record.workoutType === workout_record_entity_1.WorkoutType.PT && record.ptSessionId) {
            try {
                await this.ptSessionsService.remove(record.ptSessionId, memberId);
                const ptUsage = await pt_usage_helper_1.PTUsageHelper.getLatestPTUsage(this.ptUsageRepository, memberId);
                await pt_usage_helper_1.PTUsageHelper.restorePTUsage(this.ptUsageRepository, ptUsage, this.logger, memberId);
            }
            catch (error) {
                this.logger.error(`PT 세션 삭제 실패: ${error.message} (MemberId: ${memberId}, SessionId: ${record.ptSessionId})`);
            }
        }
        await this.workoutRecordRepository.remove(record);
    }
    async getVolumeByBodyPart(memberId, query) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const period = query.period || workout_volume_query_dto_1.VolumePeriod.WEEK;
        const { start: startDate, end: endDate } = period === workout_volume_query_dto_1.VolumePeriod.WEEK
            ? date_range_helper_1.DateRangeHelper.getWeekRange()
            : date_range_helper_1.DateRangeHelper.getMonthRange();
        const records = await this.workoutRecordRepository.find({
            where: { memberId, workoutDate: (0, typeorm_2.Between)(startDate, endDate) },
        });
        const volumeMap = workout_helper_1.WorkoutHelper.aggregateByBodyPart(records);
        const bodyPartVolumes = Array.from(volumeMap.entries())
            .map(([bodyPart, data]) => ({
            bodyPart,
            volume: workout_helper_1.WorkoutHelper.roundToTwo(data.volume),
        }))
            .sort((a, b) => b.volume - a.volume);
        const totalVolume = bodyPartVolumes.reduce((sum, item) => sum + item.volume, 0);
        return {
            period,
            bodyPartVolumes,
            totalVolume: workout_helper_1.WorkoutHelper.roundToTwo(totalVolume),
        };
    }
    async getVolumeAnalysis(memberId, period, startDate, endDate) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const result = {};
        if (!period || period === 'WEEKLY') {
            const { start: weekStart, end: weekEnd } = date_range_helper_1.DateRangeHelper.getWeekRange();
            const weeklyRecords = await this.workoutRecordRepository.find({
                where: { memberId, workoutDate: (0, typeorm_2.Between)(weekStart, weekEnd) },
            });
            const weeklyMap = workout_helper_1.WorkoutHelper.aggregateByBodyPart(weeklyRecords);
            result.weekly = {
                period: 'WEEKLY',
                startDate: date_range_helper_1.DateRangeHelper.formatDateString(weekStart),
                endDate: date_range_helper_1.DateRangeHelper.formatDateString(weekEnd),
                bodyPartVolumes: workout_helper_1.WorkoutHelper.volumeMapToResults(weeklyMap),
            };
        }
        if (!period || period === 'MONTHLY') {
            const { start: monthStart, end: monthEnd } = date_range_helper_1.DateRangeHelper.getMonthRange();
            const monthlyRecords = await this.workoutRecordRepository.find({
                where: { memberId, workoutDate: (0, typeorm_2.Between)(monthStart, monthEnd) },
            });
            const monthlyMap = workout_helper_1.WorkoutHelper.aggregateByBodyPart(monthlyRecords);
            result.monthly = {
                period: 'MONTHLY',
                startDate: date_range_helper_1.DateRangeHelper.formatDateString(monthStart),
                endDate: date_range_helper_1.DateRangeHelper.formatDateString(monthEnd),
                bodyPartVolumes: workout_helper_1.WorkoutHelper.volumeMapToResults(monthlyMap),
            };
        }
        return result;
    }
    async getCalendar(memberId, startDate, endDate) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const ptSessions = await this.memberRepository.manager.query(`
			SELECT 
				session_date as "sessionDate",
				COUNT(*) as count
			FROM pt_sessions
			WHERE member_id = $1
				AND session_date >= $2
				AND session_date <= $3
			GROUP BY session_date
		`, [memberId, startDate, endDate]);
        const selfWorkouts = await this.memberRepository.manager.query(`
			SELECT 
				workout_date as "workoutDate",
				COUNT(*) as count
			FROM workout_records
			WHERE member_id = $1
				AND workout_type = 'PERSONAL'
				AND workout_date >= $2
				AND workout_date <= $3
			GROUP BY workout_date
		`, [memberId, startDate, endDate]);
        const dateMap = new Map();
        ptSessions.forEach((item) => {
            const date = item.sessionDate;
            if (!dateMap.has(date)) {
                dateMap.set(date, { ptSessions: 0, selfWorkouts: 0 });
            }
            dateMap.get(date).ptSessions = parseInt(item.count);
        });
        selfWorkouts.forEach((item) => {
            const date = item.workoutDate;
            if (!dateMap.has(date)) {
                dateMap.set(date, { ptSessions: 0, selfWorkouts: 0 });
            }
            dateMap.get(date).selfWorkouts = parseInt(item.count);
        });
        const events = Array.from(dateMap.entries()).map(([date, data]) => ({
            date,
            ptSessions: data.ptSessions,
            selfWorkouts: data.selfWorkouts,
        }));
        return {
            events,
            startDate,
            endDate,
        };
    }
    async calculateStrengthLevel(record, memberId) {
        try {
            const member = await this.memberRepository.findOne({
                where: { id: memberId },
            });
            if (!member) {
                this.logger.warn(`회원을 찾을 수 없습니다: ${memberId}`);
                return;
            }
            if (!member.weight || !member.gender) {
                this.logger.debug(`체중 또는 성별 정보가 없어 Strength Level 계산을 건너뜁니다. (MemberId: ${memberId})`);
                return;
            }
            const exercise = await this.exerciseRepository.findOne({
                where: [
                    { name: record.exerciseName },
                    { nameEn: record.exerciseName },
                ],
            });
            if (!exercise) {
                this.logger.debug(`운동을 찾을 수 없어 Strength Level 계산을 건너뜁니다. (ExerciseName: ${record.exerciseName})`);
                return;
            }
            const oneRepMaxResult = one_rep_max_calculator_1.OneRepMaxCalculator.calculate(record.weight, record.reps, one_rep_max_calculator_1.OneRepMaxFormula.EPLEY);
            const relativeStrengthResult = relative_strength_calculator_1.RelativeStrengthCalculator.calculate(oneRepMaxResult.oneRepMax, member.weight);
            const evaluationResult = await this.strengthLevelEvaluator.evaluate(exercise.id, oneRepMaxResult.oneRepMax, member.weight, member.gender, member.age);
            record.oneRepMax = oneRepMaxResult.oneRepMax;
            record.relativeStrength = relativeStrengthResult.relativeStrength;
            record.strengthLevel = evaluationResult.level || undefined;
            this.logger.debug(`Strength Level 계산 완료: ${record.exerciseName} - 1RM: ${oneRepMaxResult.oneRepMax}kg, 상대적 강도: ${relativeStrengthResult.relativeStrength}%, 레벨: ${evaluationResult.level || 'N/A'}`);
        }
        catch (error) {
            this.logger.error(`Strength Level 계산 중 오류 발생: ${error.message} (MemberId: ${memberId}, ExerciseName: ${record.exerciseName})`);
        }
    }
    async getMajorExercisesOneRepMax(memberId) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const member = await this.memberRepository.findOne({
            where: { id: memberId },
        });
        if (!member || !member.weight) {
            throw exceptions_1.ApiExceptions.badRequest('회원의 체중 정보가 필요합니다.');
        }
        const result = [];
        for (const [majorExerciseName, exerciseNames] of Object.entries(this.majorExerciseMapping)) {
            let matchedExercise = null;
            let isSubstitute = false;
            for (let i = 0; i < exerciseNames.length; i++) {
                const exerciseName = exerciseNames[i];
                const records = await this.workoutRecordRepository.find({
                    where: {
                        memberId,
                        exerciseName,
                    },
                    order: {
                        workoutDate: 'DESC',
                        createdAt: 'DESC',
                    },
                });
                if (records.length > 0) {
                    const exercise = await this.exerciseRepository.findOne({
                        where: [
                            { name: exerciseName },
                            { nameEn: exerciseName },
                        ],
                    });
                    if (exercise) {
                        matchedExercise = {
                            name: exercise.name,
                            nameEn: exercise.nameEn,
                            category: exercise.category,
                        };
                        isSubstitute = i > 0;
                        break;
                    }
                }
            }
            if (!matchedExercise) {
                continue;
            }
            const allRecords = await this.workoutRecordRepository.find({
                where: {
                    memberId,
                    exerciseName: matchedExercise.name,
                },
                order: {
                    workoutDate: 'ASC',
                    createdAt: 'ASC',
                },
            });
            const recordsWith1RM = allRecords.filter((r) => r.oneRepMax !== null && r.oneRepMax !== undefined);
            if (recordsWith1RM.length === 0) {
                continue;
            }
            const history = recordsWith1RM.map((record) => ({
                oneRepMax: record.oneRepMax,
                workoutDate: record.workoutDate.toISOString().split('T')[0],
                strengthLevel: record.strengthLevel || null,
            }));
            const currentRecord = recordsWith1RM[recordsWith1RM.length - 1];
            const current = currentRecord
                ? {
                    oneRepMax: currentRecord.oneRepMax,
                    relativeStrength: currentRecord.relativeStrength || (currentRecord.oneRepMax / member.weight) * 100,
                    strengthLevel: currentRecord.strengthLevel || null,
                    workoutDate: currentRecord.workoutDate.toISOString().split('T')[0],
                }
                : null;
            const bestRecord = recordsWith1RM.reduce((best, record) => {
                if (!best || (record.oneRepMax > best.oneRepMax)) {
                    return record;
                }
                return best;
            }, null);
            const best = bestRecord
                ? {
                    oneRepMax: bestRecord.oneRepMax,
                    relativeStrength: bestRecord.relativeStrength || (bestRecord.oneRepMax / member.weight) * 100,
                    strengthLevel: bestRecord.strengthLevel || null,
                    workoutDate: bestRecord.workoutDate.toISOString().split('T')[0],
                }
                : null;
            result.push({
                exerciseName: matchedExercise.name,
                exerciseNameEn: matchedExercise.nameEn,
                category: matchedExercise.category,
                isSubstitute,
                current,
                best,
                history,
            });
        }
        return { exercises: result };
    }
    async getOneRepMaxEstimate(memberId) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const exerciseNames = [
            ['벤치프레스', 'Bench Press'],
            ['스쿼트', 'Squat'],
            ['데드리프트', 'Deadlift'],
        ];
        const result = await Promise.all(exerciseNames.map(async ([primaryName, englishName]) => {
            const records = await this.workoutRecordRepository.find({
                where: [
                    { memberId, exerciseName: primaryName },
                    { memberId, exerciseName: englishName },
                ],
                order: { workoutDate: 'ASC', createdAt: 'ASC' },
            });
            const recordsWith1RM = workout_record_helper_1.WorkoutRecordHelper.filterRecordsWithOneRM(records);
            if (recordsWith1RM.length === 0) {
                return { exerciseName: primaryName, latest: null, max: null, history: [] };
            }
            const history = workout_record_helper_1.WorkoutRecordHelper.buildHistory(recordsWith1RM);
            const latestRecord = workout_record_helper_1.WorkoutRecordHelper.getLatestRecord(recordsWith1RM);
            const maxRecord = workout_record_helper_1.WorkoutRecordHelper.getBestRecord(recordsWith1RM);
            return {
                exerciseName: primaryName,
                latest: latestRecord ? workout_record_helper_1.WorkoutRecordHelper.toOneRepMaxInfo(latestRecord) : null,
                max: maxRecord ? { oneRepMax: maxRecord.oneRepMax, workoutDate: date_range_helper_1.DateRangeHelper.toDateString(maxRecord.workoutDate) } : null,
                history,
            };
        }));
        return { exercises: result };
    }
    async getOneRepMaxTrend(memberId, exerciseName, startDate, endDate) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
        query_builder_helper_1.QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
        if (exerciseName) {
            queryBuilder.andWhere('(record.exerciseName = :exerciseName OR record.exerciseName = :exerciseNameEn)', { exerciseName, exerciseNameEn: exerciseName });
        }
        query_builder_helper_1.QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
        queryBuilder.orderBy('record.workoutDate', 'ASC').addOrderBy('record.createdAt', 'ASC');
        const records = await queryBuilder.getMany();
        const dateMap = workout_record_helper_1.WorkoutRecordHelper.groupByDateWithMaxOneRM(records);
        const trend = Array.from(dateMap.entries()).map(([date, info]) => ({
            date,
            oneRepMax: info.oneRepMax,
            strengthLevel: info.strengthLevel,
        }));
        return { exerciseName: exerciseName || undefined, trend };
    }
    async getVolumeTrend(memberId, startDate, endDate, bodyPart) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
        query_builder_helper_1.QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
        query_builder_helper_1.QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
        if (bodyPart) {
            queryBuilder.andWhere('record.bodyPart = :bodyPart', { bodyPart });
        }
        queryBuilder.orderBy('record.workoutDate', 'ASC').addOrderBy('record.createdAt', 'ASC');
        const records = await queryBuilder.getMany();
        const dateMap = workout_record_helper_1.WorkoutRecordHelper.groupByDateWithVolume(records);
        const trend = Array.from(dateMap.entries()).map(([date, data]) => {
            const result = {
                date,
                totalVolume: workout_helper_1.WorkoutHelper.roundToTwo(data.totalVolume),
            };
            if (!bodyPart && data.bodyPartMap.size > 0) {
                result.bodyPartVolumes = Array.from(data.bodyPartMap.entries()).map(([bp, volume]) => ({ bodyPart: bp, volume: workout_helper_1.WorkoutHelper.roundToTwo(volume) }));
            }
            return result;
        });
        return { trend };
    }
    async getTrends(memberId, type, exerciseName, startDate, endDate) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
        query_builder_helper_1.QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
        if (exerciseName) {
            queryBuilder.andWhere('record.exerciseName = :exerciseName', { exerciseName });
        }
        query_builder_helper_1.QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
        queryBuilder.orderBy('record.workoutDate', 'ASC').addOrderBy('record.createdAt', 'ASC');
        const records = await queryBuilder.getMany();
        let data;
        if (type === 'one_rm') {
            const dateMap = workout_record_helper_1.WorkoutRecordHelper.groupByDateWithMaxOneRM(records);
            data = Array.from(dateMap.entries()).map(([date, info]) => ({
                date,
                value: info.oneRepMax,
                strengthLevel: info.strengthLevel,
            }));
        }
        else {
            const dateMap = workout_record_helper_1.WorkoutRecordHelper.groupByDateWithVolume(records);
            data = Array.from(dateMap.entries()).map(([date, info]) => ({
                date,
                value: workout_helper_1.WorkoutHelper.roundToTwo(info.totalVolume),
            }));
        }
        return { type, exerciseName: exerciseName || undefined, data };
    }
    async getStrengthProgress(memberId, exerciseName) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const where = { memberId };
        if (exerciseName)
            where.exerciseName = exerciseName;
        const records = await this.workoutRecordRepository.find({
            where,
            order: { workoutDate: 'ASC', createdAt: 'ASC' },
        });
        const history = records.map((record) => ({
            oneRepMax: record.oneRepMax || null,
            relativeStrength: record.relativeStrength || null,
            strengthLevel: record.strengthLevel || null,
            workoutDate: date_range_helper_1.DateRangeHelper.toDateString(record.workoutDate),
        }));
        return {
            exerciseName: exerciseName || undefined,
            history,
            current: history.length > 0 ? history[history.length - 1] : undefined,
        };
    }
};
exports.WorkoutRecordsService = WorkoutRecordsService;
exports.WorkoutRecordsService = WorkoutRecordsService = WorkoutRecordsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workout_record_entity_1.WorkoutRecord)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(pt_usage_entity_1.PTUsage)),
    __param(3, (0, typeorm_1.InjectRepository)(exercise_entity_1.Exercise)),
    __param(4, (0, typeorm_1.InjectRepository)(strength_standard_entity_1.StrengthStandard)),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => pt_sessions_service_1.PTSessionsService))),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => members_service_1.MembersService))),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof pt_sessions_service_1.PTSessionsService !== "undefined" && pt_sessions_service_1.PTSessionsService) === "function" ? _f : Object, typeof (_g = typeof members_service_1.MembersService !== "undefined" && members_service_1.MembersService) === "function" ? _g : Object, typeof (_h = typeof strength_level_evaluator_1.StrengthLevelEvaluator !== "undefined" && strength_level_evaluator_1.StrengthLevelEvaluator) === "function" ? _h : Object])
], WorkoutRecordsService);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Exercise = exports.ExerciseCategory = void 0;
const typeorm_1 = __webpack_require__(15);
const strength_standard_entity_1 = __webpack_require__(68);
var ExerciseCategory;
(function (ExerciseCategory) {
    ExerciseCategory["UPPER"] = "UPPER";
    ExerciseCategory["LOWER"] = "LOWER";
    ExerciseCategory["FULL_BODY"] = "FULL_BODY";
})(ExerciseCategory || (exports.ExerciseCategory = ExerciseCategory = {}));
let Exercise = class Exercise {
};
exports.Exercise = Exercise;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Exercise.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, name: 'name_en' }),
    __metadata("design:type", String)
], Exercise.prototype, "nameEn", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExerciseCategory,
        default: ExerciseCategory.FULL_BODY,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'body_part', nullable: true }),
    __metadata("design:type", String)
], Exercise.prototype, "bodyPart", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'kg' }),
    __metadata("design:type", String)
], Exercise.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], Exercise.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => strength_standard_entity_1.StrengthStandard, (standard) => standard.exercise),
    __metadata("design:type", Array)
], Exercise.prototype, "standards", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Exercise.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Exercise.prototype, "updatedAt", void 0);
exports.Exercise = Exercise = __decorate([
    (0, typeorm_1.Index)('idx_exercises_name', ['name']),
    (0, typeorm_1.Index)('idx_exercises_name_en', ['nameEn']),
    (0, typeorm_1.Index)('idx_exercises_category', ['category']),
    (0, typeorm_1.Index)('idx_exercises_body_part', ['bodyPart']),
    (0, typeorm_1.Index)('idx_exercises_is_active', ['isActive']),
    (0, typeorm_1.Entity)('exercises')
], Exercise);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StrengthStandard = void 0;
const typeorm_1 = __webpack_require__(15);
const exercise_entity_1 = __webpack_require__(67);
const enums_1 = __webpack_require__(18);
let StrengthStandard = class StrengthStandard {
};
exports.StrengthStandard = StrengthStandard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StrengthStandard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'exercise_id' }),
    __metadata("design:type", String)
], StrengthStandard.prototype, "exerciseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exercise_entity_1.Exercise, (exercise) => exercise.standards, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'exercise_id' }),
    __metadata("design:type", typeof (_a = typeof exercise_entity_1.Exercise !== "undefined" && exercise_entity_1.Exercise) === "function" ? _a : Object)
], StrengthStandard.prototype, "exercise", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, name: 'standard_type', default: 'BODYWEIGHT' }),
    __metadata("design:type", String)
], StrengthStandard.prototype, "standardType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'bodyweight_min', nullable: true }),
    __metadata("design:type", Number)
], StrengthStandard.prototype, "bodyweightMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'bodyweight_max', nullable: true }),
    __metadata("design:type", Number)
], StrengthStandard.prototype, "bodyweightMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'age_min', nullable: true }),
    __metadata("design:type", Number)
], StrengthStandard.prototype, "ageMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'age_max', nullable: true }),
    __metadata("design:type", Number)
], StrengthStandard.prototype, "ageMax", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Gender,
    }),
    __metadata("design:type", typeof (_b = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _b : Object)
], StrengthStandard.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.StrengthLevel,
    }),
    __metadata("design:type", typeof (_c = typeof enums_1.StrengthLevel !== "undefined" && enums_1.StrengthLevel) === "function" ? _c : Object)
], StrengthStandard.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', name: 'weight_kg' }),
    __metadata("design:type", Number)
], StrengthStandard.prototype, "weightKg", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], StrengthStandard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], StrengthStandard.prototype, "updatedAt", void 0);
exports.StrengthStandard = StrengthStandard = __decorate([
    (0, typeorm_1.Index)('idx_strength_standards_exercise_id', ['exerciseId']),
    (0, typeorm_1.Index)('idx_strength_standards_gender', ['gender']),
    (0, typeorm_1.Index)('idx_strength_standards_level', ['level']),
    (0, typeorm_1.Index)('idx_strength_standards_bodyweight', ['bodyweightMin', 'bodyweightMax']),
    (0, typeorm_1.Index)('idx_strength_standards_standard_type', ['standardType']),
    (0, typeorm_1.Index)('idx_strength_standards_age', ['ageMin', 'ageMax']),
    (0, typeorm_1.Index)('idx_strength_standards_lookup', ['exerciseId', 'gender', 'level', 'standardType', 'bodyweightMin', 'bodyweightMax', 'ageMin', 'ageMax']),
    (0, typeorm_1.Entity)('strength_standards')
], StrengthStandard);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PTSessionsService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PTSessionsService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const pt_session_entity_1 = __webpack_require__(59);
const member_entity_1 = __webpack_require__(51);
const membership_entity_1 = __webpack_require__(57);
const entity_update_helper_1 = __webpack_require__(29);
const repository_helper_1 = __webpack_require__(64);
const progress_calculator_1 = __webpack_require__(70);
let PTSessionsService = PTSessionsService_1 = class PTSessionsService {
    constructor(ptSessionRepository, memberRepository, membershipRepository, dataSource) {
        this.ptSessionRepository = ptSessionRepository;
        this.memberRepository = memberRepository;
        this.membershipRepository = membershipRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(PTSessionsService_1.name);
    }
    async findAll(memberId) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const member = await this.memberRepository.findOne({ where: { id: memberId } });
        const sessions = await this.ptSessionRepository.find({
            where: { memberId },
            order: { sessionNumber: 'DESC' },
        });
        return {
            sessions,
            total: sessions.length,
            totalSessions: member.totalSessions,
            completedSessions: member.completedSessions,
        };
    }
    async findOne(id, memberId) {
        return repository_helper_1.RepositoryHelper.findOneOrFailByMemberId(this.ptSessionRepository, id, memberId, this.logger, 'PT 세션');
    }
    async getNextSessionNumber(memberId) {
        const lastSession = await this.ptSessionRepository.findOne({
            where: { memberId },
            order: { sessionNumber: 'DESC' },
        });
        return lastSession ? lastSession.sessionNumber + 1 : 1;
    }
    async create(memberId, createDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const member = await queryRunner.manager.findOne(member_entity_1.Member, { where: { id: memberId } });
            if (!member) {
                throw new Error('회원을 찾을 수 없습니다.');
            }
            const sessionNumber = await this.getNextSessionNumber(memberId);
            const sessionData = {
                memberId,
                sessionNumber,
                mainContent: createDto.mainContent,
                trainerComment: createDto.trainerComment,
                sessionDate: new Date(createDto.sessionDate),
                membershipId: createDto.membershipId,
                measuredWeight: createDto.measuredWeight,
                measuredMuscleMass: createDto.measuredMuscleMass,
                measuredBodyFat: createDto.measuredBodyFat,
                benchPress1RM: createDto.benchPress1RM,
                squat1RM: createDto.squat1RM,
                deadlift1RM: createDto.deadlift1RM,
                stepTestTime: createDto.stepTestTime,
            };
            const session = queryRunner.manager.create(pt_session_entity_1.PTSession, sessionData);
            const savedSession = await queryRunner.manager.save(pt_session_entity_1.PTSession, session);
            member.completedSessions += 1;
            if (member.totalSessions > 0) {
                member.goalProgress = Math.round((member.completedSessions / member.totalSessions) * 100);
                if (member.goalProgress > 100) {
                    member.goalProgress = 100;
                }
            }
            await queryRunner.manager.save(member_entity_1.Member, member);
            if (createDto.membershipId && this.hasMeasurement(createDto)) {
                await this.updateMembershipTrend(queryRunner, createDto.membershipId, createDto);
            }
            await queryRunner.commitTransaction();
            return savedSession;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`PT 세션 생성 실패: ${error.message}`);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    hasMeasurement(dto) {
        return !!(dto.measuredWeight ||
            dto.measuredMuscleMass ||
            dto.measuredBodyFat ||
            dto.benchPress1RM ||
            dto.squat1RM ||
            dto.deadlift1RM ||
            dto.stepTestTime);
    }
    async updateMembershipTrend(queryRunner, membershipId, dto) {
        const membership = await queryRunner.manager.findOne(membership_entity_1.Membership, {
            where: { id: membershipId },
        });
        if (!membership || !membership.mainGoalType) {
            return;
        }
        const currentValue = progress_calculator_1.ProgressCalculator.extractMeasurementValue(membership.mainGoalType, {
            weight: dto.measuredWeight,
            muscleMass: dto.measuredMuscleMass,
            bodyFat: dto.measuredBodyFat,
            benchPress1RM: dto.benchPress1RM,
            squat1RM: dto.squat1RM,
            deadlift1RM: dto.deadlift1RM,
            stepTestTime: dto.stepTestTime,
        });
        if (currentValue === null) {
            return;
        }
        const recentSessions = await queryRunner.manager.find(pt_session_entity_1.PTSession, {
            where: { membershipId },
            order: { sessionDate: 'ASC' },
        });
        const measurements = [];
        for (const session of recentSessions) {
            const value = progress_calculator_1.ProgressCalculator.extractMeasurementValue(membership.mainGoalType, {
                weight: session.measuredWeight,
                muscleMass: session.measuredMuscleMass,
                bodyFat: session.measuredBodyFat,
                benchPress1RM: session.benchPress1RM,
                squat1RM: session.squat1RM,
                deadlift1RM: session.deadlift1RM,
                stepTestTime: session.stepTestTime,
            });
            if (value !== null) {
                measurements.push(value);
            }
        }
        measurements.push(currentValue);
        const { status, flags } = progress_calculator_1.ProgressCalculator.calculateRiskStatusByTrend(measurements, membership.mainGoalType, membership.goalDirection);
        let progress = membership.currentProgress;
        if (membership.startValue != null && membership.targetValue != null) {
            progress = progress_calculator_1.ProgressCalculator.calculateProgress(membership.mainGoalType, membership.startValue, currentValue, membership.targetValue, membership.goalDirection);
        }
        await queryRunner.manager.update(membership_entity_1.Membership, membershipId, {
            currentValue,
            currentProgress: progress,
            riskStatus: status,
            isRapidProgress: flags.includes('rapid_progress'),
            lastMeasurementAt: new Date(),
            isMeasurementOverdue: false,
        });
        this.logger.log(`Membership ${membershipId} 업데이트: status=${status}, progress=${progress}%, flags=${flags.join(',')}`);
    }
    async update(id, memberId, updateDto) {
        const session = await this.findOne(id, memberId);
        entity_update_helper_1.EntityUpdateHelper.updateFieldsWithDateConversion(session, updateDto, ['sessionDate']);
        return this.ptSessionRepository.save(session);
    }
    async remove(id, memberId) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const member = await this.memberRepository.findOne({ where: { id: memberId } });
        const session = await this.findOne(id, memberId);
        await this.ptSessionRepository.remove(session);
        if (member.completedSessions > 0) {
            member.completedSessions -= 1;
            if (member.totalSessions > 0) {
                member.goalProgress = Math.round((member.completedSessions / member.totalSessions) * 100);
            }
            else {
                member.goalProgress = 0;
            }
            await this.memberRepository.save(member);
        }
    }
};
exports.PTSessionsService = PTSessionsService;
exports.PTSessionsService = PTSessionsService = PTSessionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pt_session_entity_1.PTSession)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(membership_entity_1.Membership)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _d : Object])
], PTSessionsService);


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProgressCalculator = void 0;
const enums_1 = __webpack_require__(18);
class ProgressCalculator {
    static calculateProgress(goalType, startValue, currentValue, targetValue, goalDirection) {
        if (startValue === targetValue) {
            return currentValue === targetValue ? 100 : 0;
        }
        const direction = goalType === enums_1.GoalType.CUSTOM && goalDirection
            ? goalDirection
            : enums_1.GoalTypeDirections[goalType];
        let progress;
        if (direction === enums_1.GoalDirection.DECREASE) {
            const decrease = startValue - currentValue;
            const targetDecrease = startValue - targetValue;
            progress = targetDecrease !== 0 ? (decrease / targetDecrease) * 100 : 0;
        }
        else {
            const increase = currentValue - startValue;
            const targetIncrease = targetValue - startValue;
            progress = targetIncrease !== 0 ? (increase / targetIncrease) * 100 : 0;
        }
        return Math.min(100, Math.max(0, Math.round(progress * 10) / 10));
    }
    static calculateRiskStatusByTrend(measurements, goalType, goalDirection) {
        const flags = [];
        if (measurements.length < enums_1.MIN_MEASUREMENTS_FOR_TREND) {
            return { status: enums_1.RiskStatus.FOUNDATION, flags };
        }
        const direction = goalType === enums_1.GoalType.CUSTOM && goalDirection
            ? goalDirection
            : enums_1.GoalTypeDirections[goalType];
        const recent = measurements.slice(-2);
        const shortTermDelta = recent[1] - recent[0];
        const absShortTermDelta = Math.abs(shortTermDelta);
        const longTermDelta = measurements[measurements.length - 1] - measurements[0];
        if (goalType === enums_1.GoalType.MAINTENANCE) {
            return this.calculateMaintenanceStatus(absShortTermDelta, shortTermDelta, goalType, flags);
        }
        const isImproving = direction === enums_1.GoalDirection.DECREASE
            ? shortTermDelta < 0
            : shortTermDelta > 0;
        const longTermImproving = direction === enums_1.GoalDirection.DECREASE
            ? longTermDelta < 0
            : longTermDelta > 0;
        const rapidThreshold = enums_1.RAPID_THRESHOLDS[goalType];
        if (absShortTermDelta >= rapidThreshold) {
            if (isImproving) {
                flags.push('rapid_progress');
            }
            else {
                flags.push('rapid_decline');
            }
        }
        const flatThreshold = enums_1.FLAT_THRESHOLDS[goalType];
        if (absShortTermDelta <= flatThreshold) {
            return {
                status: enums_1.RiskStatus.YELLOW,
                flags,
                shortTermDelta,
                longTermDelta,
            };
        }
        if (isImproving) {
            return {
                status: enums_1.RiskStatus.GREEN,
                flags,
                shortTermDelta,
                longTermDelta,
            };
        }
        else {
            if (measurements.length >= 3 && longTermImproving) {
                return {
                    status: enums_1.RiskStatus.YELLOW,
                    flags,
                    shortTermDelta,
                    longTermDelta,
                };
            }
            return {
                status: enums_1.RiskStatus.RED,
                flags,
                shortTermDelta,
                longTermDelta,
            };
        }
    }
    static calculateMaintenanceStatus(absShortTermDelta, shortTermDelta, goalType, flags) {
        const flatThreshold = enums_1.FLAT_THRESHOLDS[goalType];
        const rapidThreshold = enums_1.RAPID_THRESHOLDS[goalType];
        if (absShortTermDelta <= flatThreshold) {
            return { status: enums_1.RiskStatus.GREEN, flags };
        }
        if (absShortTermDelta >= rapidThreshold) {
            flags.push('rapid_change');
            return { status: enums_1.RiskStatus.YELLOW, flags };
        }
        return { status: enums_1.RiskStatus.YELLOW, flags };
    }
    static isMeasurementOverdue(lastMeasurementAt) {
        if (!lastMeasurementAt)
            return false;
        const now = new Date();
        const diffDays = (now.getTime() - lastMeasurementAt.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays >= enums_1.MEASUREMENT_OVERDUE_DAYS;
    }
    static calculateDaysRemaining(endDate) {
        const now = new Date();
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }
    static generateMilestoneBlocks(startDate, durationWeeks) {
        const blocks = [];
        const blockCount = durationWeeks / 4;
        for (let i = 0; i < blockCount; i++) {
            const startWeek = i * 4 + 1;
            const endWeek = (i + 1) * 4;
            let purpose;
            if (i === 0) {
                purpose = enums_1.BlockPurpose.ADAPTATION;
            }
            else if (i === blockCount - 1) {
                purpose = enums_1.BlockPurpose.CONSOLIDATION;
            }
            else {
                purpose = enums_1.BlockPurpose.INTENSITY;
            }
            const targetDate = new Date(startDate);
            targetDate.setDate(targetDate.getDate() + endWeek * 7);
            blocks.push({
                blockNumber: i + 1,
                startWeek,
                endWeek,
                purpose,
                targetDate,
            });
        }
        return blocks;
    }
    static generateMilestoneDates(startDate, durationWeeks) {
        const milestones = [];
        for (let week = 1; week <= durationWeeks; week++) {
            const targetDate = new Date(startDate);
            targetDate.setDate(targetDate.getDate() + week * 7);
            milestones.push({
                weekNumber: week,
                targetDate,
            });
        }
        return milestones;
    }
    static extractMeasurementValue(goalType, measurements) {
        switch (goalType) {
            case enums_1.GoalType.WEIGHT_LOSS:
            case enums_1.GoalType.MAINTENANCE:
                return measurements.weight ?? null;
            case enums_1.GoalType.MUSCLE_GAIN:
                return measurements.muscleMass ?? null;
            case enums_1.GoalType.BODY_FAT_LOSS:
                return measurements.bodyFat ?? null;
            case enums_1.GoalType.STRENGTH_UP:
                const big3 = [
                    measurements.benchPress1RM,
                    measurements.squat1RM,
                    measurements.deadlift1RM,
                ].filter((v) => v !== undefined && v !== null);
                return big3.length > 0 ? big3.reduce((a, b) => a + b, 0) : null;
            case enums_1.GoalType.ENDURANCE:
                return measurements.stepTestTime ?? null;
            default:
                return null;
        }
    }
    static getGoalDirection(goalType, goalDirection) {
        if (goalType === enums_1.GoalType.CUSTOM && goalDirection) {
            return goalDirection;
        }
        return enums_1.GoalTypeDirections[goalType];
    }
}
exports.ProgressCalculator = ProgressCalculator;


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutHelper = void 0;
class WorkoutHelper {
    static calculateVolume(weight, reps, sets) {
        return weight * reps * sets;
    }
    static normalizeWorkoutValues(weight, reps, sets) {
        const normalizedWeight = weight ?? 0;
        const normalizedReps = reps ?? 1;
        const normalizedSets = sets ?? 1;
        const volume = this.calculateVolume(normalizedWeight, normalizedReps, normalizedSets);
        return {
            weight: normalizedWeight,
            reps: normalizedReps,
            sets: normalizedSets,
            volume,
        };
    }
    static aggregateByBodyPart(records) {
        const volumeMap = new Map();
        records.forEach((record) => {
            const existing = volumeMap.get(record.bodyPart) || {
                volume: 0,
                sets: 0,
                reps: 0,
                count: 0,
            };
            volumeMap.set(record.bodyPart, {
                volume: existing.volume + record.volume,
                sets: existing.sets + record.sets,
                reps: existing.reps + record.reps,
                count: existing.count + 1,
            });
        });
        return volumeMap;
    }
    static volumeMapToResults(volumeMap) {
        return Array.from(volumeMap.entries()).map(([bodyPart, data]) => ({
            bodyPart,
            totalVolume: Math.round(data.volume * 100) / 100,
            totalSets: data.sets,
            totalReps: data.reps,
            recordCount: data.count,
        }));
    }
    static roundToTwo(value) {
        return Math.round(value * 100) / 100;
    }
}
exports.WorkoutHelper = WorkoutHelper;


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PTUsageHelper = void 0;
const exceptions_1 = __webpack_require__(27);
class PTUsageHelper {
    static async getLatestPTUsage(repository, memberId) {
        return repository.findOne({
            where: { memberId },
            order: { createdAt: 'DESC' },
        });
    }
    static validatePTUsage(ptUsage, memberId, logger) {
        if (!ptUsage) {
            logger.warn(`PT 횟수 정보가 없습니다. PT 운동 기록을 생성할 수 없습니다. (MemberId: ${memberId})`);
            throw exceptions_1.ApiExceptions.badRequest('PT 횟수 정보가 없습니다. PT 세션 및 횟수 관리에서 먼저 PT 횟수를 추가해주세요.');
        }
        if (ptUsage.remainingCount <= 0) {
            logger.warn(`PT 횟수가 부족합니다. 남은 횟수: ${ptUsage.remainingCount} (MemberId: ${memberId})`);
            throw exceptions_1.ApiExceptions.badRequest(`PT 횟수가 부족합니다. 남은 횟수: ${ptUsage.remainingCount}회. PT 세션 및 횟수 관리에서 횟수를 추가해주세요.`);
        }
    }
    static async deductPTUsage(repository, ptUsage, usedDate, logger, memberId) {
        ptUsage.remainingCount -= 1;
        ptUsage.usedCount += 1;
        ptUsage.lastUsedDate = usedDate;
        await repository.save(ptUsage);
        logger.log(`PT 횟수 자동 차감: 남은 횟수 ${ptUsage.remainingCount} (MemberId: ${memberId})`);
    }
    static async restorePTUsage(repository, ptUsage, logger, memberId) {
        if (ptUsage) {
            ptUsage.remainingCount += 1;
            ptUsage.usedCount = Math.max(0, ptUsage.usedCount - 1);
            await repository.save(ptUsage);
            logger.log(`PT 횟수 복구: 남은 횟수 ${ptUsage.remainingCount} (MemberId: ${memberId})`);
        }
    }
}
exports.PTUsageHelper = PTUsageHelper;


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryBuilderHelper = void 0;
class QueryBuilderHelper {
    static addDateRangeFilter(queryBuilder, dateField, startDate, endDate) {
        if (startDate) {
            queryBuilder.andWhere(`${dateField} >= :startDate`, { startDate });
        }
        if (endDate) {
            queryBuilder.andWhere(`${dateField} <= :endDate`, { endDate });
        }
        return queryBuilder;
    }
    static addMemberIdFilter(queryBuilder, memberIdField, memberId) {
        return queryBuilder.where(`${memberIdField} = :memberId`, { memberId });
    }
    static addOrderBy(queryBuilder, field, direction = 'DESC') {
        return queryBuilder.orderBy(field, direction);
    }
    static addAdditionalOrderBy(queryBuilder, field, direction = 'DESC') {
        return queryBuilder.addOrderBy(field, direction);
    }
    static addPagination(queryBuilder, page, pageSize) {
        const skip = (page - 1) * pageSize;
        return queryBuilder.skip(skip).take(pageSize);
    }
}
exports.QueryBuilderHelper = QueryBuilderHelper;


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateRangeHelper = void 0;
class DateRangeHelper {
    static getWeekRange(date = new Date()) {
        const dayOfWeek = date.getDay();
        const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const start = new Date(date);
        start.setDate(date.getDate() - diff);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    }
    static getMonthRange(date = new Date()) {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    }
    static getDaysAgoRange(days, date = new Date()) {
        const start = new Date(date);
        start.setDate(date.getDate() - days);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        return { start, end };
    }
    static parseDateString(dateString) {
        return new Date(dateString);
    }
    static formatDateString(date) {
        return date.toISOString().split('T')[0];
    }
    static toDateString(date) {
        if (typeof date === 'string')
            return date.split('T')[0];
        return date.toISOString().split('T')[0];
    }
}
exports.DateRangeHelper = DateRangeHelper;


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OneRepMaxCalculator = exports.OneRepMaxFormula = void 0;
var OneRepMaxFormula;
(function (OneRepMaxFormula) {
    OneRepMaxFormula["EPLEY"] = "EPLEY";
    OneRepMaxFormula["BRZYCKI"] = "BRZYCKI";
    OneRepMaxFormula["LOMBARDI"] = "LOMBARDI";
})(OneRepMaxFormula || (exports.OneRepMaxFormula = OneRepMaxFormula = {}));
class OneRepMaxCalculator {
    static epley(weight, reps) {
        if (reps <= 0 || weight <= 0) {
            throw new Error('무게와 횟수는 0보다 커야 합니다.');
        }
        if (reps > 30) {
            console.warn(`Epley 공식: 30회 이상의 반복은 정확도가 떨어질 수 있습니다. (현재: ${reps}회)`);
        }
        return weight * (1 + reps / 30);
    }
    static brzycki(weight, reps) {
        if (reps <= 0 || weight <= 0) {
            throw new Error('무게와 횟수는 0보다 커야 합니다.');
        }
        if (reps >= 37) {
            throw new Error('Brzycki 공식: 37회 이상의 반복은 계산할 수 없습니다.');
        }
        return weight * (36 / (37 - reps));
    }
    static lombardi(weight, reps) {
        if (reps <= 0 || weight <= 0) {
            throw new Error('무게와 횟수는 0보다 커야 합니다.');
        }
        return weight * Math.pow(reps, 0.1);
    }
    static calculate(weight, reps, formula = OneRepMaxFormula.EPLEY) {
        let oneRepMax;
        switch (formula) {
            case OneRepMaxFormula.EPLEY:
                oneRepMax = this.epley(weight, reps);
                break;
            case OneRepMaxFormula.BRZYCKI:
                oneRepMax = this.brzycki(weight, reps);
                break;
            case OneRepMaxFormula.LOMBARDI:
                oneRepMax = this.lombardi(weight, reps);
                break;
            default:
                oneRepMax = this.epley(weight, reps);
        }
        return {
            oneRepMax: Math.round(oneRepMax * 100) / 100,
            formula,
        };
    }
    static calculateAverage(weight, reps) {
        const results = [];
        try {
            results.push(this.epley(weight, reps));
        }
        catch (e) {
        }
        try {
            results.push(this.brzycki(weight, reps));
        }
        catch (e) {
        }
        try {
            results.push(this.lombardi(weight, reps));
        }
        catch (e) {
        }
        if (results.length === 0) {
            throw new Error('사용 가능한 공식이 없습니다.');
        }
        const average = results.reduce((sum, val) => sum + val, 0) / results.length;
        return Math.round(average * 100) / 100;
    }
}
exports.OneRepMaxCalculator = OneRepMaxCalculator;


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RelativeStrengthCalculator = void 0;
class RelativeStrengthCalculator {
    static calculate(oneRepMax, bodyWeight) {
        if (bodyWeight <= 0) {
            throw new Error('체중은 0보다 커야 합니다.');
        }
        if (oneRepMax < 0) {
            throw new Error('1RM은 0 이상이어야 합니다.');
        }
        const relativeStrength = (oneRepMax / bodyWeight) * 100;
        return {
            relativeStrength: Math.round(relativeStrength * 100) / 100,
            oneRepMax,
            bodyWeight,
        };
    }
    static calculateFromWeightAndReps(weight, reps, bodyWeight, formula) {
        const { OneRepMaxCalculator, OneRepMaxFormula } = __webpack_require__(75);
        const oneRepMaxResult = OneRepMaxCalculator.calculate(weight, reps, formula || OneRepMaxFormula.EPLEY);
        return this.calculate(oneRepMaxResult.oneRepMax, bodyWeight);
    }
}
exports.RelativeStrengthCalculator = RelativeStrengthCalculator;


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StrengthLevelEvaluator = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const strength_standard_entity_1 = __webpack_require__(68);
const enums_1 = __webpack_require__(18);
let StrengthLevelEvaluator = class StrengthLevelEvaluator {
    constructor(strengthStandardRepository) {
        this.strengthStandardRepository = strengthStandardRepository;
    }
    async evaluate(exerciseId, oneRepMax, bodyWeight, gender, age) {
        const bodyweightStandards = await this.strengthStandardRepository.find({
            where: {
                exerciseId,
                gender,
                standardType: 'BODYWEIGHT',
            },
            order: {
                level: 'ASC',
                bodyweightMin: 'ASC',
            },
        });
        let matchingStandards = bodyweightStandards.filter((standard) => standard.bodyweightMin !== null &&
            standard.bodyweightMax !== null &&
            bodyWeight >= standard.bodyweightMin &&
            bodyWeight <= standard.bodyweightMax);
        if (matchingStandards.length === 0 && age !== undefined && age !== null) {
            const ageStandards = await this.strengthStandardRepository.find({
                where: {
                    exerciseId,
                    gender,
                    standardType: 'AGE',
                },
                order: {
                    level: 'ASC',
                    ageMin: 'ASC',
                },
            });
            matchingStandards = ageStandards.filter((standard) => standard.ageMin !== null &&
                standard.ageMax !== null &&
                age >= standard.ageMin &&
                age <= standard.ageMax);
        }
        if (matchingStandards.length === 0) {
            const closestStandard = this.findClosestStandard(bodyweightStandards.length > 0 ? bodyweightStandards : [], bodyWeight);
            if (!closestStandard) {
                return {
                    level: null,
                    currentWeight: oneRepMax,
                    bodyWeight,
                };
            }
            return this.evaluateWithStandard(closestStandard, oneRepMax, bodyWeight);
        }
        let matchedLevel = null;
        let matchedStandard = null;
        for (const standard of matchingStandards) {
            if (oneRepMax >= standard.weightKg) {
                matchedLevel = standard.level;
                matchedStandard = standard;
            }
            else {
                break;
            }
        }
        if (!matchedLevel || !matchedStandard) {
            const beginnerStandard = matchingStandards.find((s) => s.level === enums_1.StrengthLevel.BEGINNER);
            if (beginnerStandard) {
                return {
                    level: null,
                    currentWeight: oneRepMax,
                    bodyWeight,
                    nextLevel: {
                        level: enums_1.StrengthLevel.BEGINNER,
                        targetWeight: beginnerStandard.weightKg,
                        progressPercentage: (oneRepMax / beginnerStandard.weightKg) * 100,
                    },
                };
            }
            return {
                level: null,
                currentWeight: oneRepMax,
                bodyWeight,
            };
        }
        const nextLevelInfo = this.calculateNextLevel(matchingStandards, matchedLevel, oneRepMax);
        return {
            level: matchedLevel,
            currentWeight: oneRepMax,
            bodyWeight,
            nextLevel: nextLevelInfo,
        };
    }
    findClosestStandard(standards, bodyWeight) {
        if (standards.length === 0)
            return null;
        const beginnerStandards = standards.filter((s) => s.level === enums_1.StrengthLevel.BEGINNER);
        if (beginnerStandards.length === 0) {
            return standards[0];
        }
        const bodyweightStandards = beginnerStandards.filter((s) => s.standardType === 'BODYWEIGHT' && s.bodyweightMin !== null && s.bodyweightMax !== null);
        if (bodyweightStandards.length > 0) {
            let closest = bodyweightStandards[0];
            let minDistance = Math.abs(bodyWeight - ((closest.bodyweightMin || 0) + (closest.bodyweightMax || 0)) / 2);
            for (const standard of bodyweightStandards) {
                const center = ((standard.bodyweightMin || 0) + (standard.bodyweightMax || 0)) / 2;
                const distance = Math.abs(bodyWeight - center);
                if (distance < minDistance) {
                    minDistance = distance;
                    closest = standard;
                }
            }
            return closest;
        }
        return beginnerStandards[0];
    }
    evaluateWithStandard(standard, oneRepMax, bodyWeight) {
        if (oneRepMax >= standard.weightKg) {
            return {
                level: standard.level,
                currentWeight: oneRepMax,
                bodyWeight,
            };
        }
        else {
            return {
                level: null,
                currentWeight: oneRepMax,
                bodyWeight,
                nextLevel: {
                    level: standard.level,
                    targetWeight: standard.weightKg,
                    progressPercentage: (oneRepMax / standard.weightKg) * 100,
                },
            };
        }
    }
    calculateNextLevel(standards, currentLevel, currentOneRepMax) {
        const currentIndex = enums_1.StrengthLevelOrder.indexOf(currentLevel);
        if (currentIndex >= enums_1.StrengthLevelOrder.length - 1) {
            return undefined;
        }
        const nextLevel = enums_1.StrengthLevelOrder[currentIndex + 1];
        const nextLevelStandard = standards.find((s) => s.level === nextLevel);
        if (!nextLevelStandard) {
            return undefined;
        }
        const currentLevelStandard = standards.find((s) => s.level === currentLevel);
        if (!currentLevelStandard) {
            return undefined;
        }
        const currentRange = nextLevelStandard.weightKg - currentLevelStandard.weightKg;
        const currentProgress = currentOneRepMax - currentLevelStandard.weightKg;
        const progressPercentage = currentRange > 0 ? (currentProgress / currentRange) * 100 : 0;
        return {
            level: nextLevel,
            targetWeight: nextLevelStandard.weightKg,
            progressPercentage: Math.min(100, Math.max(0, progressPercentage)),
        };
    }
};
exports.StrengthLevelEvaluator = StrengthLevelEvaluator;
exports.StrengthLevelEvaluator = StrengthLevelEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(strength_standard_entity_1.StrengthStandard)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], StrengthLevelEvaluator);


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutRecordHelper = void 0;
const date_range_helper_1 = __webpack_require__(74);
class WorkoutRecordHelper {
    static filterRecordsWithOneRM(records) {
        return records.filter((r) => r.oneRepMax !== null && r.oneRepMax !== undefined);
    }
    static buildHistory(records) {
        return records.map((record) => ({
            oneRepMax: record.oneRepMax,
            workoutDate: date_range_helper_1.DateRangeHelper.toDateString(record.workoutDate),
            strengthLevel: record.strengthLevel || null,
        }));
    }
    static getLatestRecord(records) {
        return records.length > 0 ? records[records.length - 1] : null;
    }
    static getBestRecord(records) {
        if (records.length === 0)
            return null;
        return records.reduce((best, record) => {
            if (!best || (record.oneRepMax > best.oneRepMax)) {
                return record;
            }
            return best;
        }, null);
    }
    static toOneRepMaxInfo(record, memberWeight) {
        return {
            oneRepMax: record.oneRepMax,
            strengthLevel: record.strengthLevel || null,
            workoutDate: date_range_helper_1.DateRangeHelper.toDateString(record.workoutDate),
            relativeStrength: record.relativeStrength ||
                (memberWeight ? (record.oneRepMax / memberWeight) * 100 : undefined),
        };
    }
    static groupByDateWithMaxOneRM(records) {
        const dateMap = new Map();
        records.forEach((record) => {
            if (record.oneRepMax !== null && record.oneRepMax !== undefined) {
                const date = date_range_helper_1.DateRangeHelper.toDateString(record.workoutDate);
                const existing = dateMap.get(date);
                if (!existing || record.oneRepMax > existing.oneRepMax) {
                    dateMap.set(date, {
                        oneRepMax: record.oneRepMax,
                        strengthLevel: record.strengthLevel || null,
                    });
                }
            }
        });
        return dateMap;
    }
    static groupByDateWithVolume(records) {
        const dateMap = new Map();
        records.forEach((record) => {
            const date = date_range_helper_1.DateRangeHelper.toDateString(record.workoutDate);
            const existing = dateMap.get(date) || {
                totalVolume: 0,
                bodyPartMap: new Map(),
            };
            existing.totalVolume += record.volume;
            if (record.bodyPart) {
                const bodyPartVolume = existing.bodyPartMap.get(record.bodyPart) || 0;
                existing.bodyPartMap.set(record.bodyPart, bodyPartVolume + record.volume);
            }
            dateMap.set(date, existing);
        });
        return dateMap;
    }
}
exports.WorkoutRecordHelper = WorkoutRecordHelper;


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WorkoutRoutinesService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutRoutinesService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const workout_routine_entity_1 = __webpack_require__(62);
const member_entity_1 = __webpack_require__(51);
const workout_record_entity_1 = __webpack_require__(61);
const exercise_entity_1 = __webpack_require__(67);
const exceptions_1 = __webpack_require__(27);
const query_builder_helper_1 = __webpack_require__(73);
const entity_update_helper_1 = __webpack_require__(29);
const repository_helper_1 = __webpack_require__(64);
let WorkoutRoutinesService = WorkoutRoutinesService_1 = class WorkoutRoutinesService {
    constructor(workoutRoutineRepository, memberRepository, workoutRecordRepository, exerciseRepository) {
        this.workoutRoutineRepository = workoutRoutineRepository;
        this.memberRepository = memberRepository;
        this.workoutRecordRepository = workoutRecordRepository;
        this.exerciseRepository = exerciseRepository;
        this.logger = new common_1.Logger(WorkoutRoutinesService_1.name);
    }
    async findAllCommon() {
        return this.workoutRoutineRepository.find({
            where: { memberId: null },
            order: { createdAt: 'DESC' },
        });
    }
    async findAll(memberId, startDate, endDate, isCompleted) {
        if (memberId) {
            await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        }
        const queryBuilder = this.workoutRoutineRepository.createQueryBuilder('routine');
        if (memberId) {
            query_builder_helper_1.QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'routine.memberId', memberId);
        }
        else {
            queryBuilder.where('routine.memberId IS NULL');
        }
        query_builder_helper_1.QueryBuilderHelper.addOrderBy(queryBuilder, 'routine.createdAt', 'DESC');
        query_builder_helper_1.QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'routine.routineDate', startDate, endDate);
        if (isCompleted !== undefined) {
            queryBuilder.andWhere('routine.isCompleted = :isCompleted', { isCompleted });
        }
        return queryBuilder.getMany();
    }
    async findToday(memberId) {
        if (memberId) {
            await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const memberRoutine = await this.workoutRoutineRepository.findOne({
                where: {
                    memberId,
                    routineDate: (0, typeorm_2.Between)(today, tomorrow),
                },
                order: { createdAt: 'DESC' },
            });
            if (memberRoutine) {
                return memberRoutine;
            }
        }
        const commonRoutine = await this.workoutRoutineRepository.findOne({
            where: { memberId: null },
            order: { createdAt: 'DESC' },
        });
        return commonRoutine || null;
    }
    async findOne(id, memberId) {
        const where = { id };
        if (memberId !== undefined) {
            where.memberId = memberId;
        }
        else {
            where.memberId = null;
        }
        return repository_helper_1.RepositoryHelper.findOneOrFail(this.workoutRoutineRepository, { where }, this.logger, '운동 루틴', `운동 루틴을 찾을 수 없습니다. ID: ${id}, MemberId: ${memberId || 'null'}`);
    }
    async create(memberId, createDto) {
        if (memberId) {
            await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        }
        let exercises = createDto.exercises;
        if (memberId && createDto.suggestWeights) {
            exercises = await this.suggestWeightsForExercises(memberId, createDto.exercises);
        }
        const routineData = entity_update_helper_1.EntityUpdateHelper.convertDateFields({
            memberId: memberId || null,
            routineName: createDto.routineName,
            routineDate: createDto.routineDate || null,
            exercises,
            estimatedDuration: createDto.estimatedDuration,
            difficulty: createDto.difficulty,
            isCompleted: false,
        }, ['routineDate']);
        const routine = this.workoutRoutineRepository.create(routineData);
        return this.workoutRoutineRepository.save(routine);
    }
    async suggestWeightsForExercises(memberId, exercises) {
        const member = await this.memberRepository.findOne({
            where: { id: memberId },
        });
        if (!member || !member.weight) {
            this.logger.warn(`회원의 체중 정보가 없어 무게 제안을 건너뜁니다. (MemberId: ${memberId})`);
            return exercises;
        }
        const suggestedExercises = await Promise.all(exercises.map(async (exercise) => {
            if (exercise.weight !== undefined && exercise.weight !== null) {
                return exercise;
            }
            const recentRecord = await this.workoutRecordRepository.findOne({
                where: {
                    memberId,
                    exerciseName: exercise.exerciseName,
                },
                order: {
                    workoutDate: 'DESC',
                    createdAt: 'DESC',
                },
            });
            if (!recentRecord || !recentRecord.oneRepMax) {
                const exerciseEntity = await this.exerciseRepository.findOne({
                    where: [
                        { name: exercise.exerciseName },
                        { nameEn: exercise.exerciseName },
                    ],
                });
                if (!exerciseEntity) {
                    return exercise;
                }
                return exercise;
            }
            const suggestedWeight = recentRecord.oneRepMax * 0.75;
            return {
                ...exercise,
                weight: Math.round(suggestedWeight * 10) / 10,
            };
        }));
        return suggestedExercises;
    }
    async suggestWeightForExercise(memberId, exerciseName, reps) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const member = await this.memberRepository.findOne({
            where: { id: memberId },
        });
        if (!member || !member.weight || !member.gender) {
            throw exceptions_1.ApiExceptions.badRequest('회원의 체중 및 성별 정보가 필요합니다.');
        }
        const exercise = await this.exerciseRepository.findOne({
            where: [
                { name: exerciseName },
                { nameEn: exerciseName },
            ],
        });
        if (!exercise) {
            throw exceptions_1.ApiExceptions.badRequest('운동을 찾을 수 없습니다.');
        }
        const latestRecord = await this.workoutRecordRepository.findOne({
            where: {
                memberId,
                exerciseName: exercise.name,
            },
            order: {
                workoutDate: 'DESC',
                createdAt: 'DESC',
            },
        });
        if (latestRecord && latestRecord.oneRepMax) {
            const { OneRepMaxCalculator } = await Promise.resolve().then(() => __webpack_require__(75));
            let suggestedWeight = latestRecord.oneRepMax / (1 + reps / 30);
            return {
                suggestedWeight: Math.round(suggestedWeight * 10) / 10,
                reason: `최신 기록 (1RM: ${latestRecord.oneRepMax}kg) 기반 제안`,
            };
        }
        throw exceptions_1.ApiExceptions.badRequest('해당 운동의 기록이 없어 무게를 제안할 수 없습니다.');
    }
    async update(id, memberId, updateDto) {
        const routine = await this.findOne(id, memberId);
        entity_update_helper_1.EntityUpdateHelper.updateFieldsWithDateConversion(routine, updateDto, ['routineDate']);
        return this.workoutRoutineRepository.save(routine);
    }
    async complete(id, memberId) {
        const routine = await this.findOne(id, memberId);
        routine.isCompleted = true;
        return this.workoutRoutineRepository.save(routine);
    }
    async remove(id, memberId) {
        const routine = await this.findOne(id, memberId);
        await this.workoutRoutineRepository.remove(routine);
    }
};
exports.WorkoutRoutinesService = WorkoutRoutinesService;
exports.WorkoutRoutinesService = WorkoutRoutinesService = WorkoutRoutinesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workout_routine_entity_1.WorkoutRoutine)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(workout_record_entity_1.WorkoutRecord)),
    __param(3, (0, typeorm_1.InjectRepository)(exercise_entity_1.Exercise)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], WorkoutRoutinesService);


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMemberDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
const is_phone_number_decorator_1 = __webpack_require__(81);
class CreateMemberDto {
}
exports.CreateMemberDto = CreateMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "회원 이름",
        example: "홍길동",
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)({ message: "이름은 문자열이어야 합니다." }),
    (0, class_validator_1.MaxLength)(255, { message: "이름은 255자 이하여야 합니다." }),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "전화번호 (한국 형식)",
        example: "010-1234-5678",
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)({ message: "전화번호는 문자열이어야 합니다." }),
    (0, is_phone_number_decorator_1.IsPhoneNumber)({ message: "유효한 전화번호 형식이어야 합니다. (예: 010-1234-5678, 02-1234-5678)" }),
    (0, class_validator_1.MaxLength)(50, { message: "전화번호는 50자 이하여야 합니다." }),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "이메일 주소",
        example: "member@example.com",
        maxLength: 255,
    }),
    (0, class_validator_1.IsEmail)({}, { message: "올바른 이메일 형식이 아닙니다." }),
    (0, class_validator_1.MaxLength)(255, { message: "이메일은 255자 이하여야 합니다." }),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "가입일 (YYYY-MM-DD 형식)",
        example: "2024-01-01",
    }),
    (0, class_validator_1.IsDateString)({}, { message: "올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)" }),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "joinDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "회원 상태",
        enum: enums_1.MemberStatus,
        example: enums_1.MemberStatus.ACTIVE,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MemberStatus, { message: "올바른 상태가 아닙니다." }),
    __metadata("design:type", typeof (_a = typeof enums_1.MemberStatus !== "undefined" && enums_1.MemberStatus) === "function" ? _a : Object)
], CreateMemberDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "키 (cm)",
        example: 175.5,
        minimum: 50,
        maximum: 250,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: "키는 숫자여야 합니다." }),
    (0, class_validator_1.Min)(50, { message: "키는 50cm 이상이어야 합니다." }),
    (0, class_validator_1.Max)(250, { message: "키는 250cm 이하여야 합니다." }),
    __metadata("design:type", Number)
], CreateMemberDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "몸무게 (kg)",
        example: 70.5,
        minimum: 20,
        maximum: 300,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: "몸무게는 숫자여야 합니다." }),
    (0, class_validator_1.Min)(20, { message: "몸무게는 20kg 이상이어야 합니다." }),
    (0, class_validator_1.Max)(300, { message: "몸무게는 300kg 이하여야 합니다." }),
    __metadata("design:type", Number)
], CreateMemberDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "생년월일 (YYYY-MM-DD 형식)",
        example: "1990-01-15",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: "올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)" }),
    __metadata("design:type", String)
], CreateMemberDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "성별",
        enum: enums_1.Gender,
        example: enums_1.Gender.MALE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Gender, { message: "올바른 성별이 아닙니다. (MALE 또는 FEMALE)" }),
    __metadata("design:type", typeof (_b = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _b : Object)
], CreateMemberDto.prototype, "gender", void 0);


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsPhoneNumberConstraint = void 0;
exports.IsPhoneNumber = IsPhoneNumber;
const class_validator_1 = __webpack_require__(31);
let IsPhoneNumberConstraint = class IsPhoneNumberConstraint {
    validate(phone, args) {
        if (typeof phone !== 'string') {
            return false;
        }
        const phoneRegex = /^(?:(?:02|0[3-9]{1,2})[-.\s]?)?[0-9]{3,4}[-.\s]?[0-9]{4}$|^01[0-9]{1}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{4}$|^1[5-9]{1}[0-9]{2,3}[-.\s]?[0-9]{4}$/;
        const cleanedPhone = phone.replace(/[-.\s]/g, '');
        if (!/^\d+$/.test(cleanedPhone)) {
            return false;
        }
        if (cleanedPhone.length < 9 || cleanedPhone.length > 11) {
            return false;
        }
        return phoneRegex.test(phone);
    }
    defaultMessage(args) {
        return '유효한 한국 전화번호 형식이어야 합니다. (예: 010-1234-5678, 02-1234-5678)';
    }
};
exports.IsPhoneNumberConstraint = IsPhoneNumberConstraint;
exports.IsPhoneNumberConstraint = IsPhoneNumberConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsPhoneNumberConstraint);
function IsPhoneNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneNumberConstraint,
        });
    };
}


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMemberFullDto = exports.InitialMeasurementDto = exports.MembershipProgramDto = exports.MemberBasicInfoDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(83);
const enums_1 = __webpack_require__(18);
class MemberBasicInfoDto {
}
exports.MemberBasicInfoDto = MemberBasicInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '회원 이름', example: '홍길동' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], MemberBasicInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', example: '010-1234-5678' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], MemberBasicInfoDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', example: 'member@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], MemberBasicInfoDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '가입일', example: '2024-01-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MemberBasicInfoDto.prototype, "joinDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '생년월일', example: '1990-01-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MemberBasicInfoDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.Gender, description: '성별' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", typeof (_a = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _a : Object)
], MemberBasicInfoDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '키 (cm)', example: 175 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(250),
    __metadata("design:type", Number)
], MemberBasicInfoDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '몸무게 (kg)', example: 70 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(20),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], MemberBasicInfoDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.MemberStatus, default: enums_1.MemberStatus.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MemberStatus),
    __metadata("design:type", typeof (_b = typeof enums_1.MemberStatus !== "undefined" && enums_1.MemberStatus) === "function" ? _b : Object)
], MemberBasicInfoDto.prototype, "status", void 0);
class MembershipProgramDto {
}
exports.MembershipProgramDto = MembershipProgramDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.MembershipType, description: '회원권 타입' }),
    (0, class_validator_1.IsEnum)(enums_1.MembershipType),
    __metadata("design:type", typeof (_c = typeof enums_1.MembershipType !== "undefined" && enums_1.MembershipType) === "function" ? _c : Object)
], MembershipProgramDto.prototype, "membershipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '구매일', example: '2024-01-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MembershipProgramDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '만료일', example: '2024-12-31' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], MembershipProgramDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.MembershipStatus, default: enums_1.MembershipStatus.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MembershipStatus),
    __metadata("design:type", typeof (_d = typeof enums_1.MembershipStatus !== "undefined" && enums_1.MembershipStatus) === "function" ? _d : Object)
], MembershipProgramDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '가격', example: 500000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], MembershipProgramDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '프로그램 기간 (주)', enum: [4, 8, 12] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MembershipProgramDto.prototype, "durationWeeks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.GoalType, description: '메인 목표 유형' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.GoalType),
    __metadata("design:type", typeof (_e = typeof enums_1.GoalType !== "undefined" && enums_1.GoalType) === "function" ? _e : Object)
], MembershipProgramDto.prototype, "mainGoalType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '메인 목표 라벨', example: '체중 감량' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MembershipProgramDto.prototype, "mainGoalLabel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '목표 수치', example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MembershipProgramDto.prototype, "targetValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '목표 단위', example: 'kg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MembershipProgramDto.prototype, "targetUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '시작 수치', example: 85 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MembershipProgramDto.prototype, "startValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'PT 총 횟수', example: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], MembershipProgramDto.prototype, "ptTotalCount", void 0);
class InitialMeasurementDto {
}
exports.InitialMeasurementDto = InitialMeasurementDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '체중 (kg)', example: 75.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(20),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], InitialMeasurementDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '골격근량 (kg)', example: 32.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], InitialMeasurementDto.prototype, "muscleMass", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '체지방률 (%)', example: 18.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], InitialMeasurementDto.prototype, "bodyFat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '벤치프레스 1RM (kg)', example: 80 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], InitialMeasurementDto.prototype, "benchPress1RM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '스쿼트 1RM (kg)', example: 100 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], InitialMeasurementDto.prototype, "squat1RM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '데드리프트 1RM (kg)', example: 120 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], InitialMeasurementDto.prototype, "deadlift1RM", void 0);
class CreateMemberFullDto {
}
exports.CreateMemberFullDto = CreateMemberFullDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '회원 이름', example: '홍길동' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateMemberFullDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전화번호', example: '010-1234-5678' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateMemberFullDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '이메일', example: 'member@example.com' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateMemberFullDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '가입일', example: '2024-01-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMemberFullDto.prototype, "joinDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '생년월일', example: '1990-01-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMemberFullDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.Gender, description: '성별' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", typeof (_f = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _f : Object)
], CreateMemberFullDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '키 (cm)', example: 175 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(250),
    __metadata("design:type", Number)
], CreateMemberFullDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '몸무게 (kg)', example: 70 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(20),
    (0, class_validator_1.Max)(300),
    __metadata("design:type", Number)
], CreateMemberFullDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.MemberStatus, default: enums_1.MemberStatus.ACTIVE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MemberStatus),
    __metadata("design:type", typeof (_g = typeof enums_1.MemberStatus !== "undefined" && enums_1.MemberStatus) === "function" ? _g : Object)
], CreateMemberFullDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: MembershipProgramDto, description: '회원권 및 프로그램 정보' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MembershipProgramDto),
    __metadata("design:type", MembershipProgramDto)
], CreateMemberFullDto.prototype, "membership", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: InitialMeasurementDto, description: '초기 측정값' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => InitialMeasurementDto),
    __metadata("design:type", InitialMeasurementDto)
], CreateMemberFullDto.prototype, "initialMeasurement", void 0);


/***/ }),
/* 83 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 84 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMemberDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
const is_phone_number_decorator_1 = __webpack_require__(81);
class UpdateMemberDto {
}
exports.UpdateMemberDto = UpdateMemberDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '이름',
        example: '홍길동',
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '이름은 문자열이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(255, { message: '이름은 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '전화번호 (한국 형식)',
        example: '010-1234-5678',
        maxLength: 50,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '전화번호는 문자열이어야 합니다.' }),
    (0, is_phone_number_decorator_1.IsPhoneNumber)({ message: '유효한 한국 전화번호 형식이어야 합니다. (예: 010-1234-5678, 02-1234-5678)' }),
    (0, class_validator_1.MaxLength)(50, { message: '전화번호는 50자 이하여야 합니다.' }),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '이메일 주소',
        example: 'member@example.com',
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: '올바른 이메일 형식이 아닙니다.' }),
    (0, class_validator_1.MaxLength)(255, { message: '이메일은 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '회원 상태',
        enum: enums_1.MemberStatus,
        example: enums_1.MemberStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MemberStatus, { message: '올바른 상태가 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.MemberStatus !== "undefined" && enums_1.MemberStatus) === "function" ? _a : Object)
], UpdateMemberDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '키 (cm)',
        example: 175.5,
        minimum: 50,
        maximum: 250,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: '키는 숫자여야 합니다.' }),
    (0, class_validator_1.Min)(50, { message: '키는 50cm 이상이어야 합니다.' }),
    (0, class_validator_1.Max)(250, { message: '키는 250cm 이하여야 합니다.' }),
    __metadata("design:type", Number)
], UpdateMemberDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '몸무게 (kg)',
        example: 70.5,
        minimum: 20,
        maximum: 300,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: '몸무게는 숫자여야 합니다.' }),
    (0, class_validator_1.Min)(20, { message: '몸무게는 20kg 이상이어야 합니다.' }),
    (0, class_validator_1.Max)(300, { message: '몸무게는 300kg 이하여야 합니다.' }),
    __metadata("design:type", Number)
], UpdateMemberDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '생년월일 (YYYY-MM-DD 형식)',
        example: '1990-01-15',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], UpdateMemberDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '성별',
        enum: enums_1.Gender,
        example: enums_1.Gender.MALE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Gender, { message: '올바른 성별이 아닙니다. (MALE 또는 FEMALE)' }),
    __metadata("design:type", typeof (_b = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _b : Object)
], UpdateMemberDto.prototype, "gender", void 0);


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMembershipDto = exports.ProgramInfoDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(83);
const enums_1 = __webpack_require__(18);
class ProgramInfoDto {
}
exports.ProgramInfoDto = ProgramInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '프로그램 기간 (주)',
        example: 12,
        enum: [4, 8, 12],
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProgramInfoDto.prototype, "durationWeeks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.GoalType,
        description: '메인 목표 유형',
        example: enums_1.GoalType.WEIGHT_LOSS,
    }),
    (0, class_validator_1.IsEnum)(enums_1.GoalType),
    __metadata("design:type", typeof (_a = typeof enums_1.GoalType !== "undefined" && enums_1.GoalType) === "function" ? _a : Object)
], ProgramInfoDto.prototype, "mainGoalType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '메인 목표 라벨 (미입력시 GoalType에서 자동 생성)',
        example: '체중 감량',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProgramInfoDto.prototype, "mainGoalLabel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '목표 수치',
        example: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProgramInfoDto.prototype, "targetValue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '목표 단위',
        example: 'kg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProgramInfoDto.prototype, "targetUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '시작 수치 (현재 체중 등)',
        example: 85,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ProgramInfoDto.prototype, "startValue", void 0);
class CreateMembershipDto {
}
exports.CreateMembershipDto = CreateMembershipDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원권 타입',
        enum: enums_1.MembershipType,
        example: enums_1.MembershipType.MONTHLY,
    }),
    (0, class_validator_1.IsEnum)(enums_1.MembershipType, { message: '올바른 회원권 타입이 아닙니다.' }),
    __metadata("design:type", typeof (_b = typeof enums_1.MembershipType !== "undefined" && enums_1.MembershipType) === "function" ? _b : Object)
], CreateMembershipDto.prototype, "membershipType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '구매일 (YYYY-MM-DD 형식)',
        example: '2024-01-01',
    }),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], CreateMembershipDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '만료일 (YYYY-MM-DD 형식)',
        example: '2024-12-31',
    }),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], CreateMembershipDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '회원권 상태',
        enum: enums_1.MembershipStatus,
        example: enums_1.MembershipStatus.ACTIVE,
        default: enums_1.MembershipStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MembershipStatus, { message: '올바른 회원권 상태가 아닙니다.' }),
    __metadata("design:type", typeof (_c = typeof enums_1.MembershipStatus !== "undefined" && enums_1.MembershipStatus) === "function" ? _c : Object)
], CreateMembershipDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '가격',
        example: 100000,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)({}, { message: '가격은 숫자여야 합니다.' }),
    (0, class_validator_1.Min)(0, { message: '가격은 0 이상이어야 합니다.' }),
    __metadata("design:type", Number)
], CreateMembershipDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '프로그램 정보 (선택)',
        type: ProgramInfoDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ProgramInfoDto),
    __metadata("design:type", ProgramInfoDto)
], CreateMembershipDto.prototype, "program", void 0);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateMembershipDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
class UpdateMembershipDto {
}
exports.UpdateMembershipDto = UpdateMembershipDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '회원권 타입',
        enum: enums_1.MembershipType,
        example: enums_1.MembershipType.MONTHLY,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MembershipType, { message: '올바른 회원권 타입이 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.MembershipType !== "undefined" && enums_1.MembershipType) === "function" ? _a : Object)
], UpdateMembershipDto.prototype, "membershipType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '구매일 (YYYY-MM-DD 형식)',
        example: '2024-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], UpdateMembershipDto.prototype, "purchaseDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '만료일 (YYYY-MM-DD 형식)',
        example: '2024-12-31',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], UpdateMembershipDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '회원권 상태',
        enum: enums_1.MembershipStatus,
        example: enums_1.MembershipStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.MembershipStatus, { message: '올바른 회원권 상태가 아닙니다.' }),
    __metadata("design:type", typeof (_b = typeof enums_1.MembershipStatus !== "undefined" && enums_1.MembershipStatus) === "function" ? _b : Object)
], UpdateMembershipDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '가격',
        example: 100000,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: '가격은 숫자여야 합니다.' }),
    (0, class_validator_1.Min)(0, { message: '가격은 0 이상이어야 합니다.' }),
    __metadata("design:type", Number)
], UpdateMembershipDto.prototype, "price", void 0);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePTUsageDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
class UpdatePTUsageDto {
}
exports.UpdatePTUsageDto = UpdatePTUsageDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '전체 PT 횟수',
        example: 20,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: '전체 횟수는 정수여야 합니다.' }),
    (0, class_validator_1.Min)(0, { message: '전체 횟수는 0 이상이어야 합니다.' }),
    __metadata("design:type", Number)
], UpdatePTUsageDto.prototype, "totalCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '남은 PT 횟수',
        example: 15,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: '남은 횟수는 정수여야 합니다.' }),
    (0, class_validator_1.Min)(0, { message: '남은 횟수는 0 이상이어야 합니다.' }),
    __metadata("design:type", Number)
], UpdatePTUsageDto.prototype, "remainingCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '사용한 PT 횟수',
        example: 5,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: '사용 횟수는 정수여야 합니다.' }),
    (0, class_validator_1.Min)(0, { message: '사용 횟수는 0 이상이어야 합니다.' }),
    __metadata("design:type", Number)
], UpdatePTUsageDto.prototype, "usedCount", void 0);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateGoalDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
class UpdateGoalDto {
}
exports.UpdateGoalDto = UpdateGoalDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원의 목표 한줄 요약',
        example: '체중 5kg 감량 및 근력 향상',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGoalDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '목표 진행률 (0-100)',
        example: 65,
        minimum: 0,
        maximum: 100,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], UpdateGoalDto.prototype, "goalProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '트레이너 동기부여 코멘트',
        example: '꾸준히 운동하시는 모습이 인상적입니다! 계속 화이팅!',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateGoalDto.prototype, "goalTrainerComment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 수업 회차',
        example: 20,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateGoalDto.prototype, "totalSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '완료된 수업 회차',
        example: 10,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateGoalDto.prototype, "completedSessions", void 0);


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateGoalDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
class CreateGoalDto {
}
exports.CreateGoalDto = CreateGoalDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원의 목표 한줄 요약',
        example: '체중 5kg 감량, 데드리프트 150kg 달성',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGoalDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '목표 진행률 (0-100)',
        example: 0,
        minimum: 0,
        maximum: 100,
        default: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateGoalDto.prototype, "goalProgress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '트레이너 동기부여 코멘트',
        example: '동기부여 코멘트',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGoalDto.prototype, "goalTrainerComment", void 0);


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoalResponseDto = void 0;
const swagger_1 = __webpack_require__(4);
class GoalResponseDto {
    static fromMember(member) {
        return {
            id: member.id,
            memberId: member.id,
            goal: member.goal,
            goalProgress: member.goalProgress,
            goalTrainerComment: member.goalTrainerComment,
            totalSessions: member.totalSessions,
            completedSessions: member.completedSessions,
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
        };
    }
}
exports.GoalResponseDto = GoalResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 ID',
        example: 'bc1d82ac-a80c-4674-a308-5e792128a181',
    }),
    __metadata("design:type", String)
], GoalResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회원 ID (memberId와 동일)',
        example: 'bc1d82ac-a80c-4674-a308-5e792128a181',
    }),
    __metadata("design:type", String)
], GoalResponseDto.prototype, "memberId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '회원의 목표 한줄 요약',
        example: '체중 5kg 감량, 데드리프트 150kg 달성',
    }),
    __metadata("design:type", String)
], GoalResponseDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '목표 진행률 (0-100)',
        example: 45,
        minimum: 0,
        maximum: 100,
    }),
    __metadata("design:type", Number)
], GoalResponseDto.prototype, "goalProgress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '트레이너 동기부여 코멘트',
        example: '꾸준히 노력하고 있습니다!',
    }),
    __metadata("design:type", String)
], GoalResponseDto.prototype, "goalTrainerComment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 PT 수업 회차',
        example: 20,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], GoalResponseDto.prototype, "totalSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '완료된 PT 수업 회차',
        example: 10,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], GoalResponseDto.prototype, "completedSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '생성일시',
        example: '2024-01-01T00:00:00.000Z',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], GoalResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수정일시',
        example: '2024-01-15T00:00:00.000Z',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], GoalResponseDto.prototype, "updatedAt", void 0);


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateWorkoutRecordDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
const workout_record_entity_1 = __webpack_require__(61);
class CreateWorkoutRecordDto {
}
exports.CreateWorkoutRecordDto = CreateWorkoutRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 날짜',
        example: '2024-03-15',
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateWorkoutRecordDto.prototype, "workoutDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부위 (하체, 가슴, 등, 어깨, 팔 등)',
        example: '하체',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkoutRecordDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동명',
        example: '스쿼트',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkoutRecordDto.prototype, "exerciseName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '무게 (kg)',
        example: 60,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWorkoutRecordDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '횟수',
        example: 10,
        minimum: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWorkoutRecordDto.prototype, "reps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '세트 수',
        example: 3,
        minimum: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWorkoutRecordDto.prototype, "sets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 타입',
        enum: workout_record_entity_1.WorkoutType,
        example: workout_record_entity_1.WorkoutType.PERSONAL,
        default: workout_record_entity_1.WorkoutType.PERSONAL,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(workout_record_entity_1.WorkoutType),
    __metadata("design:type", typeof (_a = typeof workout_record_entity_1.WorkoutType !== "undefined" && workout_record_entity_1.WorkoutType) === "function" ? _a : Object)
], CreateWorkoutRecordDto.prototype, "workoutType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 시간 (분)',
        example: 30,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWorkoutRecordDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'PT 세션 ID (workoutType이 PT인 경우)',
        example: 'uuid',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkoutRecordDto.prototype, "ptSessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '트레이너 코멘트',
        example: '좋은 자세',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkoutRecordDto.prototype, "trainerComment", void 0);


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateWorkoutRecordDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
const workout_record_entity_1 = __webpack_require__(61);
class UpdateWorkoutRecordDto {
}
exports.UpdateWorkoutRecordDto = UpdateWorkoutRecordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 날짜',
        example: '2024-03-15',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateWorkoutRecordDto.prototype, "workoutDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부위 (하체, 가슴, 등, 어깨, 팔 등)',
        example: '하체',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutRecordDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동명',
        example: '스쿼트',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutRecordDto.prototype, "exerciseName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '무게 (kg)',
        example: 60,
        minimum: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateWorkoutRecordDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '횟수',
        example: 10,
        minimum: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateWorkoutRecordDto.prototype, "reps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '세트 수',
        example: 3,
        minimum: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateWorkoutRecordDto.prototype, "sets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 타입',
        enum: workout_record_entity_1.WorkoutType,
        example: workout_record_entity_1.WorkoutType.PERSONAL,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(workout_record_entity_1.WorkoutType),
    __metadata("design:type", typeof (_a = typeof workout_record_entity_1.WorkoutType !== "undefined" && workout_record_entity_1.WorkoutType) === "function" ? _a : Object)
], UpdateWorkoutRecordDto.prototype, "workoutType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 시간 (분)',
        example: 30,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateWorkoutRecordDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'PT 세션 ID (workoutType이 PT인 경우)',
        example: 'uuid',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutRecordDto.prototype, "ptSessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '트레이너 코멘트',
        example: '좋은 자세',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutRecordDto.prototype, "trainerComment", void 0);


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePTSessionDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
class CreatePTSessionDto {
}
exports.CreatePTSessionDto = CreatePTSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수업 날짜',
        example: '2024-03-15',
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePTSessionDto.prototype, "sessionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주요 수업 내용',
        example: '하체 근력 운동 - 스쿼트, 레그프레스, 런지',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePTSessionDto.prototype, "mainContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '트레이너 코멘트',
        example: '자세가 많이 개선되었습니다!',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePTSessionDto.prototype, "trainerComment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '연결할 회원권/프로그램 ID',
        example: 'uuid-membership-id',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePTSessionDto.prototype, "membershipId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '측정 체중 (kg)',
        example: 79.5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePTSessionDto.prototype, "measuredWeight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '측정 골격근량 (kg)',
        example: 35.2,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePTSessionDto.prototype, "measuredMuscleMass", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '측정 체지방률 (%)',
        example: 18.5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePTSessionDto.prototype, "measuredBodyFat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '벤치프레스 1RM (kg)',
        example: 80,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePTSessionDto.prototype, "benchPress1RM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '스쿼트 1RM (kg)',
        example: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePTSessionDto.prototype, "squat1RM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '데드리프트 1RM (kg)',
        example: 120,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePTSessionDto.prototype, "deadlift1RM", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '스텝테스트 시간 (초) - ENDURANCE 목표용',
        example: 180,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePTSessionDto.prototype, "stepTestTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '마일스톤 자동 생성 여부 (기본: true)',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePTSessionDto.prototype, "createMilestone", void 0);


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePTSessionDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
class UpdatePTSessionDto {
}
exports.UpdatePTSessionDto = UpdatePTSessionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수업 날짜',
        example: '2024-03-15',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdatePTSessionDto.prototype, "sessionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주요 수업 내용',
        example: '하체 근력 운동 - 스쿼트, 레그프레스, 런지',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePTSessionDto.prototype, "mainContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '트레이너 코멘트',
        example: '자세가 많이 개선되었습니다!',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePTSessionDto.prototype, "trainerComment", void 0);


/***/ }),
/* 95 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateWorkoutRoutineDto = exports.ExerciseDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
const class_transformer_1 = __webpack_require__(83);
class ExerciseDto {
}
exports.ExerciseDto = ExerciseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동명',
        example: '스쿼트',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExerciseDto.prototype, "exerciseName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부위 (하체, 가슴, 등, 어깨, 팔 등)',
        example: '하체',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExerciseDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '세트 수',
        example: 3,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ExerciseDto.prototype, "sets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '횟수',
        example: 10,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ExerciseDto.prototype, "reps", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '무게 (kg)',
        example: 60,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ExerciseDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '운동 시간 (분, 유산소 운동인 경우)',
        example: 30,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ExerciseDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '휴식 시간 (초)',
        example: 60,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ExerciseDto.prototype, "restTime", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '메모',
        example: '자세 주의',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExerciseDto.prototype, "notes", void 0);
class CreateWorkoutRoutineDto {
}
exports.CreateWorkoutRoutineDto = CreateWorkoutRoutineDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '루틴 이름',
        example: '초보자 상체 루틴',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkoutRoutineDto.prototype, "routineName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '루틴 날짜 (회원별 루틴인 경우)',
        example: '2024-03-15',
        type: String,
        format: 'date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateWorkoutRoutineDto.prototype, "routineDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 목록 (최소 1개)',
        type: [ExerciseDto],
        example: [
            {
                exerciseName: '벤치프레스',
                bodyPart: '상체',
                sets: 3,
                reps: 10,
                weight: 50,
                restTime: 60,
                notes: '가슴 근육에 집중',
            },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ExerciseDto),
    __metadata("design:type", Array)
], CreateWorkoutRoutineDto.prototype, "exercises", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '예상 소요 시간 (분)',
        example: 60,
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWorkoutRoutineDto.prototype, "estimatedDuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '난이도',
        enum: ['EASY', 'MEDIUM', 'HARD'],
        example: 'EASY',
    }),
    (0, class_validator_1.IsEnum)(['EASY', 'MEDIUM', 'HARD']),
    __metadata("design:type", String)
], CreateWorkoutRoutineDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Strength Level 기반 무게 자동 제안 여부',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateWorkoutRoutineDto.prototype, "suggestWeights", void 0);


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateWorkoutRoutineDto = void 0;
const swagger_1 = __webpack_require__(4);
const class_validator_1 = __webpack_require__(31);
const class_transformer_1 = __webpack_require__(83);
const create_workout_routine_dto_1 = __webpack_require__(95);
class UpdateWorkoutRoutineDto {
}
exports.UpdateWorkoutRoutineDto = UpdateWorkoutRoutineDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '루틴 이름',
        example: '수정된 루틴명',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutRoutineDto.prototype, "routineName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '루틴 날짜',
        example: '2024-03-15',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateWorkoutRoutineDto.prototype, "routineDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '운동 목록',
        type: [create_workout_routine_dto_1.ExerciseDto],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_workout_routine_dto_1.ExerciseDto),
    __metadata("design:type", Array)
], UpdateWorkoutRoutineDto.prototype, "exercises", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '예상 소요 시간 (분)',
        example: 70,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateWorkoutRoutineDto.prototype, "estimatedDuration", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '난이도',
        enum: ['EASY', 'MEDIUM', 'HARD'],
        example: 'MEDIUM',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['EASY', 'MEDIUM', 'HARD']),
    __metadata("design:type", String)
], UpdateWorkoutRoutineDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '완료 여부',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateWorkoutRoutineDto.prototype, "isCompleted", void 0);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardResponseDto = exports.WorkoutAnalysisDto = exports.BodyPartVolumeDto = exports.WorkoutCalendarItemDto = exports.PersonalWorkoutCalendarItemDto = exports.PTSessionCalendarItemDto = exports.SessionProgressDto = exports.GoalDto = void 0;
const swagger_1 = __webpack_require__(4);
class GoalDto {
}
exports.GoalDto = GoalDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '회원의 목표 한줄 요약',
        example: '체중 5kg 감량',
    }),
    __metadata("design:type", String)
], GoalDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '목표 진행률 (0-100)',
        example: 60,
        minimum: 0,
        maximum: 100,
    }),
    __metadata("design:type", Number)
], GoalDto.prototype, "goalProgress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '트레이너 동기부여 코멘트',
        example: '좋은 진전이 있습니다! 계속 화이팅!',
    }),
    __metadata("design:type", String)
], GoalDto.prototype, "goalTrainerComment", void 0);
class SessionProgressDto {
}
exports.SessionProgressDto = SessionProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 수업 회차',
        example: 20,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], SessionProgressDto.prototype, "totalSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '완료된 수업 회차',
        example: 12,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], SessionProgressDto.prototype, "completedSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수업 진행률 (%)',
        example: 60,
        minimum: 0,
        maximum: 100,
    }),
    __metadata("design:type", Number)
], SessionProgressDto.prototype, "progressPercentage", void 0);
class PTSessionCalendarItemDto {
}
exports.PTSessionCalendarItemDto = PTSessionCalendarItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'PT 세션 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], PTSessionCalendarItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '세션 번호',
        example: 5,
        minimum: 1,
    }),
    __metadata("design:type", Number)
], PTSessionCalendarItemDto.prototype, "sessionNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '주요 수업 내용',
        example: '하체 근력 운동 - 스쿼트, 레그프레스',
    }),
    __metadata("design:type", String)
], PTSessionCalendarItemDto.prototype, "mainContent", void 0);
class PersonalWorkoutCalendarItemDto {
}
exports.PersonalWorkoutCalendarItemDto = PersonalWorkoutCalendarItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 기록 ID',
        example: 'uuid',
    }),
    __metadata("design:type", String)
], PersonalWorkoutCalendarItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동명',
        example: '스쿼트',
    }),
    __metadata("design:type", String)
], PersonalWorkoutCalendarItemDto.prototype, "exerciseName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부위',
        example: '하체',
    }),
    __metadata("design:type", String)
], PersonalWorkoutCalendarItemDto.prototype, "bodyPart", void 0);
class WorkoutCalendarItemDto {
}
exports.WorkoutCalendarItemDto = WorkoutCalendarItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '날짜 (YYYY-MM-DD)',
        example: '2024-03-15',
    }),
    __metadata("design:type", String)
], WorkoutCalendarItemDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'PT 세션 목록',
        type: [PTSessionCalendarItemDto],
    }),
    __metadata("design:type", Array)
], WorkoutCalendarItemDto.prototype, "ptSessions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '개인 운동 기록 목록',
        type: [PersonalWorkoutCalendarItemDto],
    }),
    __metadata("design:type", Array)
], WorkoutCalendarItemDto.prototype, "personalWorkouts", void 0);
class BodyPartVolumeDto {
}
exports.BodyPartVolumeDto = BodyPartVolumeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부위',
        example: '하체',
    }),
    __metadata("design:type", String)
], BodyPartVolumeDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '볼륨 (kg)',
        example: 1500.5,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], BodyPartVolumeDto.prototype, "volume", void 0);
class WorkoutAnalysisDto {
}
exports.WorkoutAnalysisDto = WorkoutAnalysisDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '집계 기간',
        enum: ['week', 'month'],
        example: 'week',
    }),
    __metadata("design:type", String)
], WorkoutAnalysisDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부위별 볼륨',
        type: [BodyPartVolumeDto],
    }),
    __metadata("design:type", Array)
], WorkoutAnalysisDto.prototype, "bodyPartVolumes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '총 볼륨 (kg)',
        example: 5000.0,
        minimum: 0,
    }),
    __metadata("design:type", Number)
], WorkoutAnalysisDto.prototype, "totalVolume", void 0);
class DashboardResponseDto {
}
exports.DashboardResponseDto = DashboardResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '목표 정보',
        type: GoalDto,
    }),
    __metadata("design:type", GoalDto)
], DashboardResponseDto.prototype, "goal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '수업 진행률',
        type: SessionProgressDto,
    }),
    __metadata("design:type", SessionProgressDto)
], DashboardResponseDto.prototype, "sessionProgress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 캘린더 (최근 30일)',
        type: [WorkoutCalendarItemDto],
    }),
    __metadata("design:type", Array)
], DashboardResponseDto.prototype, "workoutCalendar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 기록 분석',
        type: WorkoutAnalysisDto,
    }),
    __metadata("design:type", WorkoutAnalysisDto)
], DashboardResponseDto.prototype, "workoutAnalysis", void 0);


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InjuriesController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const guards_1 = __webpack_require__(36);
const roles_decorator_1 = __webpack_require__(40);
const enums_1 = __webpack_require__(18);
const injury_history_entity_1 = __webpack_require__(55);
const injury_restriction_entity_1 = __webpack_require__(56);
const create_injury_dto_1 = __webpack_require__(99);
const update_injury_dto_1 = __webpack_require__(100);
const create_injury_restriction_dto_1 = __webpack_require__(101);
const api_response_1 = __webpack_require__(43);
const exceptions_1 = __webpack_require__(27);
const entity_update_helper_1 = __webpack_require__(29);
let InjuriesController = class InjuriesController {
    constructor(injuryRepository, restrictionRepository) {
        this.injuryRepository = injuryRepository;
        this.restrictionRepository = restrictionRepository;
    }
    async findAll(memberId) {
        const injuries = await this.injuryRepository.find({
            where: { memberId },
            relations: ['restrictions'],
            order: { date: 'DESC' },
        });
        return api_response_1.ApiResponseHelper.success({ injuries, total: injuries.length });
    }
    async findOne(memberId, id) {
        const injury = await this.injuryRepository.findOne({
            where: { id, memberId },
            relations: ["restrictions"],
        });
        if (!injury) {
            throw exceptions_1.ApiExceptions.injuryNotFound();
        }
        return api_response_1.ApiResponseHelper.success(injury, "부상 이력 조회 성공");
    }
    async create(memberId, createInjuryDto) {
        const injuryData = entity_update_helper_1.EntityUpdateHelper.convertDateFields({
            memberId,
            ...createInjuryDto,
            date: createInjuryDto.date,
        }, ['date']);
        const injury = this.injuryRepository.create(injuryData);
        const savedInjury = await this.injuryRepository.save(injury);
        return api_response_1.ApiResponseHelper.success(savedInjury, "부상 이력 등록 성공");
    }
    async update(memberId, id, updateData) {
        const injury = await this.injuryRepository.findOne({
            where: { id, memberId },
        });
        if (!injury) {
            throw exceptions_1.ApiExceptions.injuryNotFound();
        }
        entity_update_helper_1.EntityUpdateHelper.updateFieldsWithDateConversion(injury, updateData, ['date']);
        const savedInjury = await this.injuryRepository.save(injury);
        return api_response_1.ApiResponseHelper.success(savedInjury, "부상 이력 수정 성공");
    }
    async createRestriction(memberId, id, createRestrictionDto) {
        const injury = await this.injuryRepository.findOne({
            where: { id, memberId },
        });
        if (!injury) {
            throw exceptions_1.ApiExceptions.injuryNotFound();
        }
        const restriction = this.restrictionRepository.create({
            injuryId: id,
            restrictedCategory: createRestrictionDto.restrictedCategory,
        });
        const savedRestriction = await this.restrictionRepository.save(restriction);
        return api_response_1.ApiResponseHelper.success(savedRestriction, "평가 제한 설정 성공");
    }
};
exports.InjuriesController = InjuriesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '부상 이력 목록 조회', description: '특정 회원의 모든 부상 이력을 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '부상 이력 목록 조회 성공' }),
    __param(0, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InjuriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: '부상 이력 상세 조회', description: '특정 부상 이력의 상세 정보를 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '부상 이력 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '부상 이력 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '부상 이력을 찾을 수 없습니다.' }),
    __param(0, (0, common_1.Param)("memberId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], InjuriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({ summary: '부상 이력 등록', description: '새로운 부상 이력을 등록합니다. (ADMIN, TRAINER 권한 필요)' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: create_injury_dto_1.CreateInjuryDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '부상 이력 등록 성공' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 데이터' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    __param(0, (0, common_1.Param)("memberId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof create_injury_dto_1.CreateInjuryDto !== "undefined" && create_injury_dto_1.CreateInjuryDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], InjuriesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({ summary: '부상 이력 수정', description: '기존 부상 이력을 수정합니다. (ADMIN, TRAINER 권한 필요)' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '부상 이력 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: update_injury_dto_1.UpdateInjuryDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '부상 이력 수정 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '부상 이력을 찾을 수 없습니다.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    __param(0, (0, common_1.Param)("memberId")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_d = typeof update_injury_dto_1.UpdateInjuryDto !== "undefined" && update_injury_dto_1.UpdateInjuryDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], InjuriesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(":id/restrictions"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({ summary: '평가 제한 설정', description: '부상에 대한 평가 제한을 설정합니다. (ADMIN, TRAINER 권한 필요)' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '부상 이력 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: create_injury_restriction_dto_1.CreateInjuryRestrictionDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '평가 제한 설정 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '부상 이력을 찾을 수 없습니다.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    __param(0, (0, common_1.Param)("memberId")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_e = typeof create_injury_restriction_dto_1.CreateInjuryRestrictionDto !== "undefined" && create_injury_restriction_dto_1.CreateInjuryRestrictionDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], InjuriesController.prototype, "createRestriction", null);
exports.InjuriesController = InjuriesController = __decorate([
    (0, swagger_1.ApiTags)("injuries"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)('api/members/:memberId/injuries'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, typeorm_1.InjectRepository)(injury_history_entity_1.InjuryHistory)),
    __param(1, (0, typeorm_1.InjectRepository)(injury_restriction_entity_1.InjuryRestriction)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], InjuriesController);


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateInjuryDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
class CreateInjuryDto {
}
exports.CreateInjuryDto = CreateInjuryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부상 타입',
        example: '골절',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)({ message: '부상 타입은 문자열이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(255, { message: '부상 타입은 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], CreateInjuryDto.prototype, "injuryType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부위',
        example: '어깨',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)({ message: '부위는 문자열이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(255, { message: '부위는 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], CreateInjuryDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '부상 발생일 (YYYY-MM-DD 형식)',
        example: '2024-01-01',
    }),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], CreateInjuryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '심각도',
        enum: enums_1.Severity,
        example: enums_1.Severity.MODERATE,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Severity, { message: '올바른 심각도가 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.Severity !== "undefined" && enums_1.Severity) === "function" ? _a : Object)
], CreateInjuryDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '설명',
        example: '운동 중 발생한 부상',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '설명은 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateInjuryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '회복 상태',
        enum: enums_1.RecoveryStatus,
        example: enums_1.RecoveryStatus.RECOVERING,
    }),
    (0, class_validator_1.IsEnum)(enums_1.RecoveryStatus, { message: '올바른 회복 상태가 아닙니다.' }),
    __metadata("design:type", typeof (_b = typeof enums_1.RecoveryStatus !== "undefined" && enums_1.RecoveryStatus) === "function" ? _b : Object)
], CreateInjuryDto.prototype, "recoveryStatus", void 0);


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateInjuryDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
class UpdateInjuryDto {
}
exports.UpdateInjuryDto = UpdateInjuryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '부상 타입',
        example: '골절',
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '부상 타입은 문자열이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(255, { message: '부상 타입은 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], UpdateInjuryDto.prototype, "injuryType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '부위',
        example: '어깨',
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '부위는 문자열이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(255, { message: '부위는 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], UpdateInjuryDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '부상 발생일 (YYYY-MM-DD 형식)',
        example: '2024-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], UpdateInjuryDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '심각도',
        enum: enums_1.Severity,
        example: enums_1.Severity.MODERATE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Severity, { message: '올바른 심각도가 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.Severity !== "undefined" && enums_1.Severity) === "function" ? _a : Object)
], UpdateInjuryDto.prototype, "severity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '설명',
        example: '운동 중 발생한 부상',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '설명은 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], UpdateInjuryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '회복 상태',
        enum: enums_1.RecoveryStatus,
        example: enums_1.RecoveryStatus.RECOVERING,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.RecoveryStatus, { message: '올바른 회복 상태가 아닙니다.' }),
    __metadata("design:type", typeof (_b = typeof enums_1.RecoveryStatus !== "undefined" && enums_1.RecoveryStatus) === "function" ? _b : Object)
], UpdateInjuryDto.prototype, "recoveryStatus", void 0);


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateInjuryRestrictionDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
class CreateInjuryRestrictionDto {
}
exports.CreateInjuryRestrictionDto = CreateInjuryRestrictionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '제한할 평가 카테고리',
        enum: enums_1.Category,
        example: enums_1.Category.STRENGTH,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Category, { message: '올바른 제한 카테고리가 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.Category !== "undefined" && enums_1.Category) === "function" ? _a : Object)
], CreateInjuryRestrictionDto.prototype, "restrictedCategory", void 0);


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbilitiesController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const guards_1 = __webpack_require__(36);
const assessments_service_1 = __webpack_require__(103);
const api_response_1 = __webpack_require__(43);
const compare_snapshots_query_dto_1 = __webpack_require__(113);
const snapshot_normalizer_1 = __webpack_require__(105);
const hexagon_response_dto_1 = __webpack_require__(114);
let AbilitiesController = class AbilitiesController {
    constructor(assessmentsService) {
        this.assessmentsService = assessmentsService;
    }
    async getLatestSnapshot(memberId) {
        const snapshot = await this.assessmentsService.getLatestSnapshot(memberId);
        const normalizedSnapshot = snapshot_normalizer_1.SnapshotNormalizer.normalize(snapshot, memberId);
        const message = snapshot
            ? "최신 능력치 조회 성공"
            : "능력치 스냅샷이 없습니다.";
        return api_response_1.ApiResponseHelper.success(normalizedSnapshot, message);
    }
    async getSnapshots(memberId) {
        const snapshots = await this.assessmentsService.getSnapshots(memberId);
        return api_response_1.ApiResponseHelper.success({
            snapshots,
            total: snapshots.length,
        });
    }
    async compareSnapshots(memberId, query) {
        const prevCount = query.prev || 1;
        const comparison = await this.assessmentsService.compareSnapshots(memberId, prevCount);
        return api_response_1.ApiResponseHelper.success(comparison, "능력치 비교 성공");
    }
    async getHexagon(memberId, compare) {
        const includeInitial = compare === 'true';
        const hexagon = await this.assessmentsService.getHexagonData(memberId, includeInitial);
        return api_response_1.ApiResponseHelper.success(hexagon, "능력치 헥사곤 조회 성공");
    }
    async getHistory(memberId) {
        const history = await this.assessmentsService.getHistory(memberId);
        return api_response_1.ApiResponseHelper.success(history, "체력 테스트 히스토리 조회 성공");
    }
};
exports.AbilitiesController = AbilitiesController;
__decorate([
    (0, common_1.Get)("latest"),
    (0, swagger_1.ApiOperation)({ summary: '최신 능력치 스냅샷 조회', description: '회원의 최신 능력치 스냅샷을 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    __param(0, (0, common_1.Param)("memberId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AbilitiesController.prototype, "getLatestSnapshot", null);
__decorate([
    (0, common_1.Get)("snapshots"),
    (0, swagger_1.ApiOperation)({ summary: '능력치 스냅샷 목록 조회', description: '회원의 모든 능력치 스냅샷 목록을 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    __param(0, (0, common_1.Param)("memberId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AbilitiesController.prototype, "getSnapshots", null);
__decorate([
    (0, common_1.Get)("compare"),
    (0, swagger_1.ApiOperation)({ summary: '능력치 비교', description: '현재 능력치와 이전 평가를 비교합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiQuery)({ name: 'prev', description: '이전 평가와 비교할 개수 (기본값: 1)', required: false, type: Number, example: 1 }),
    __param(0, (0, common_1.Param)("memberId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof compare_snapshots_query_dto_1.CompareSnapshotsQueryDto !== "undefined" && compare_snapshots_query_dto_1.CompareSnapshotsQueryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AbilitiesController.prototype, "compareSnapshots", null);
__decorate([
    (0, common_1.Get)("hexagon"),
    (0, swagger_1.ApiOperation)({
        summary: '능력치 헥사곤 데이터 조회',
        description: '레이더 차트용 헥사곤 데이터를 조회합니다. compare=true 쿼리 파라미터를 추가하면 초기 평가와 비교 데이터를 포함합니다.'
    }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiQuery)({
        name: 'compare',
        description: '초기 평가와 비교 데이터 포함 여부',
        required: false,
        type: Boolean,
        example: false
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '능력치 헥사곤 조회 성공',
        type: hexagon_response_dto_1.HexagonDataDto
    }),
    __param(0, (0, common_1.Param)("memberId")),
    __param(1, (0, common_1.Query)("compare")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AbilitiesController.prototype, "getHexagon", null);
__decorate([
    (0, common_1.Get)("history"),
    (0, swagger_1.ApiOperation)({ summary: '체력 테스트 히스토리 조회', description: '라인 차트용 체력 테스트 히스토리를 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    __param(0, (0, common_1.Param)("memberId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AbilitiesController.prototype, "getHistory", null);
exports.AbilitiesController = AbilitiesController = __decorate([
    (0, swagger_1.ApiTags)("abilities"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)("api/members/:memberId/abilities"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof assessments_service_1.AssessmentsService !== "undefined" && assessments_service_1.AssessmentsService) === "function" ? _a : Object])
], AbilitiesController);


/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AssessmentsService_1;
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssessmentsService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const assessment_entity_1 = __webpack_require__(52);
const assessment_item_entity_1 = __webpack_require__(53);
const enums_1 = __webpack_require__(18);
const ability_snapshot_entity_1 = __webpack_require__(54);
const score_calculator_1 = __webpack_require__(104);
const exceptions_1 = __webpack_require__(27);
const date_helper_1 = __webpack_require__(9);
const snapshot_normalizer_1 = __webpack_require__(105);
const entity_update_helper_1 = __webpack_require__(29);
const repository_helper_1 = __webpack_require__(64);
const grade_score_converter_1 = __webpack_require__(106);
const analytics_helper_1 = __webpack_require__(112);
const member_entity_1 = __webpack_require__(51);
let AssessmentsService = AssessmentsService_1 = class AssessmentsService {
    constructor(assessmentRepository, assessmentItemRepository, abilitySnapshotRepository, memberRepository, scoreCalculator, gradeScoreConverter) {
        this.assessmentRepository = assessmentRepository;
        this.assessmentItemRepository = assessmentItemRepository;
        this.abilitySnapshotRepository = abilitySnapshotRepository;
        this.memberRepository = memberRepository;
        this.scoreCalculator = scoreCalculator;
        this.gradeScoreConverter = gradeScoreConverter;
        this.logger = new common_1.Logger(AssessmentsService_1.name);
    }
    async findAll(memberId) {
        const assessments = await this.assessmentRepository.find({
            where: { memberId },
            relations: ['items', 'snapshot'],
            order: { assessedAt: 'DESC' },
        });
        return assessments.map(assessment => this.normalizeAssessment(assessment));
    }
    async hasInitialAssessment(memberId) {
        const initialAssessment = await this.assessmentRepository.findOne({
            where: {
                memberId,
                isInitial: true,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
        });
        return !!initialAssessment;
    }
    async getInitialAssessment(memberId) {
        return await this.assessmentRepository.findOne({
            where: {
                memberId,
                isInitial: true,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
            relations: ['items', 'snapshot'],
            order: { assessedAt: 'ASC' },
        });
    }
    async findOne(id, memberId) {
        const assessment = await repository_helper_1.RepositoryHelper.findOneOrFailByMemberId(this.assessmentRepository, id, memberId, this.logger, '평가');
        const assessmentWithRelations = await this.assessmentRepository.findOne({
            where: { id, memberId },
            relations: ['items', 'snapshot'],
        });
        if (!assessmentWithRelations) {
            return assessment;
        }
        return this.normalizeAssessment(assessmentWithRelations);
    }
    normalizeAssessment(assessment) {
        if (assessment.items) {
            assessment.items = assessment.items.map(item => ({
                ...item,
                score: item.score ?? 0,
                value: item.value ?? 0,
            }));
        }
        assessment.snapshot = snapshot_normalizer_1.SnapshotNormalizer.normalize(assessment.snapshot, assessment.memberId);
        return assessment;
    }
    async create(memberId, createAssessmentDto) {
        if (createAssessmentDto.assessmentType === enums_1.AssessmentType.INITIAL) {
            const existingInitial = await this.assessmentRepository.findOne({
                where: {
                    memberId,
                    isInitial: true,
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            if (existingInitial) {
                this.logger.warn(`초기 평가가 이미 존재합니다. MemberId: ${memberId}, ExistingAssessmentId: ${existingInitial.id}`);
                throw exceptions_1.ApiExceptions.initialAssessmentAlreadyExists("초기 평가는 이미 존재합니다. 정기 평가를 생성해주세요.", {
                    id: existingInitial.id,
                    assessedAt: existingInitial.assessedAt,
                    assessmentType: existingInitial.assessmentType,
                });
            }
        }
        const assessmentData = entity_update_helper_1.EntityUpdateHelper.convertDateFields({
            memberId,
            assessmentType: createAssessmentDto.assessmentType,
            evaluationType: createAssessmentDto.evaluationType,
            staticEvaluation: createAssessmentDto.staticEvaluation,
            dynamicEvaluation: createAssessmentDto.dynamicEvaluation,
            isInitial: createAssessmentDto.assessmentType === enums_1.AssessmentType.INITIAL,
            assessedAt: createAssessmentDto.assessedAt,
            trainerComment: createAssessmentDto.trainerComment,
            bodyWeight: createAssessmentDto.bodyWeight,
            condition: createAssessmentDto.condition,
        }, ['assessedAt']);
        const convertedAssessmentData = entity_update_helper_1.EntityUpdateHelper.convertDateFields(assessmentData, ['assessedAt']);
        const assessment = this.assessmentRepository.create(assessmentData);
        const savedAssessment = await this.assessmentRepository.save(assessment);
        const member = await this.memberRepository.findOne({
            where: { id: memberId },
        });
        if (!member) {
            this.logger.warn(`회원을 찾을 수 없습니다. MemberId: ${memberId}`);
            throw exceptions_1.ApiExceptions.memberNotFound('회원을 찾을 수 없습니다.');
        }
        const items = await Promise.all(createAssessmentDto.items.map(async (itemDto) => {
            let score = null;
            const hasGradeInfo = itemDto.details?.grade ||
                itemDto.details?.flexibilityItems ||
                (itemDto.details?.ohsa && itemDto.details?.pain) ||
                (itemDto.details?.muscleMass && itemDto.details?.bodyFatPercentage);
            if (hasGradeInfo) {
                const detailsForCalculation = itemDto.category === enums_1.Category.BODY && member
                    ? {
                        ...itemDto.details,
                        age: member.age,
                        gender: member.gender,
                        bodyWeight: createAssessmentDto.bodyWeight || member.weight || null,
                    }
                    : itemDto.details;
                score = await this.gradeScoreConverter.convertGradeToScore(itemDto.category, detailsForCalculation);
                if (score === null) {
                    if (itemDto.category === enums_1.Category.FLEXIBILITY) {
                        this.logger.warn(`유연성 점수 계산 실패. MemberId: ${memberId}, Details: ${JSON.stringify(detailsForCalculation)}`);
                    }
                    else if (itemDto.category === enums_1.Category.BODY) {
                        this.logger.warn(`체성분 점수 계산 실패. MemberId: ${memberId}, Details: ${JSON.stringify(detailsForCalculation)}`);
                    }
                }
                if (score !== null && itemDto.details) {
                    itemDto.details.internalScore = score;
                }
            }
            else if (itemDto.value !== undefined && itemDto.value !== null) {
                score = itemDto.value;
            }
            const assessmentItem = this.assessmentItemRepository.create({
                assessmentId: savedAssessment.id,
                category: itemDto.category,
                name: itemDto.name,
                value: itemDto.value,
                unit: itemDto.unit,
                score,
                details: itemDto.details || {},
            });
            return this.assessmentItemRepository.save(assessmentItem);
        }));
        await this.scoreCalculator.calculateAssessmentScore(savedAssessment.id, memberId);
        return this.findOne(savedAssessment.id, memberId);
    }
    async update(id, memberId, updateAssessmentDto) {
        const assessment = await this.findOne(id, memberId);
        entity_update_helper_1.EntityUpdateHelper.updateFieldsWithDateConversion(assessment, updateAssessmentDto, ['assessedAt']);
        const savedAssessment = await this.assessmentRepository.save(assessment);
        if (updateAssessmentDto.items) {
            await this.assessmentItemRepository.delete({
                assessmentId: id,
            });
            const member = await this.memberRepository.findOne({
                where: { id: memberId },
            });
            if (!member) {
                this.logger.warn(`회원을 찾을 수 없습니다. MemberId: ${memberId}`);
                throw exceptions_1.ApiExceptions.memberNotFound('회원을 찾을 수 없습니다.');
            }
            await Promise.all(updateAssessmentDto.items.map(async (itemDto) => {
                let score = null;
                const hasGradeInfo = itemDto.details?.grade ||
                    itemDto.details?.flexibilityItems ||
                    (itemDto.details?.ohsa && itemDto.details?.pain) ||
                    (itemDto.details?.muscleMass && itemDto.details?.bodyFatPercentage);
                if (hasGradeInfo) {
                    const assessment = await this.assessmentRepository.findOne({
                        where: { id },
                    });
                    const detailsForCalculation = itemDto.category === enums_1.Category.BODY && member
                        ? {
                            ...itemDto.details,
                            age: member.age,
                            gender: member.gender,
                            bodyWeight: updateAssessmentDto.bodyWeight || assessment?.bodyWeight || member.weight || null,
                        }
                        : itemDto.details;
                    score = await this.gradeScoreConverter.convertGradeToScore(itemDto.category, detailsForCalculation);
                    if (score !== null && itemDto.details) {
                        itemDto.details.internalScore = score;
                    }
                }
                else if (itemDto.value !== undefined && itemDto.value !== null) {
                    score = itemDto.value;
                }
                const assessmentItem = this.assessmentItemRepository.create({
                    assessmentId: id,
                    category: itemDto.category,
                    name: itemDto.name,
                    value: itemDto.value,
                    unit: itemDto.unit,
                    score,
                    details: itemDto.details || {},
                });
                return this.assessmentItemRepository.save(assessmentItem);
            }));
            await this.scoreCalculator.calculateAssessmentScore(id, memberId);
        }
        return this.findOne(id, memberId);
    }
    async getLatestSnapshot(memberId) {
        const snapshot = await this.abilitySnapshotRepository.findOne({
            where: { memberId },
            order: { assessedAt: 'DESC' },
            relations: ['assessment'],
        });
        if (!snapshot) {
            return null;
        }
        return this.normalizeSnapshot(snapshot);
    }
    normalizeSnapshot(snapshot) {
        return {
            ...snapshot,
            strengthScore: snapshot.strengthScore ?? 0,
            cardioScore: snapshot.cardioScore ?? 0,
            enduranceScore: snapshot.enduranceScore ?? 0,
            flexibilityScore: snapshot.flexibilityScore ?? 0,
            bodyScore: snapshot.bodyScore ?? 0,
            stabilityScore: snapshot.stabilityScore ?? 0,
            totalScore: snapshot.totalScore ?? 0,
        };
    }
    async getSnapshots(memberId) {
        const snapshots = await this.abilitySnapshotRepository.find({
            where: { memberId },
            order: { assessedAt: 'DESC' },
            relations: ['assessment'],
        });
        return snapshots.map(snapshot => this.normalizeSnapshot(snapshot));
    }
    async compareSnapshots(memberId, prevCount = 1) {
        const snapshots = await this.abilitySnapshotRepository.find({
            where: { memberId },
            order: { assessedAt: "DESC" },
            take: prevCount + 1,
        });
        if (snapshots.length === 0) {
            this.logger.warn(`능력치 스냅샷이 없습니다. MemberId: ${memberId}`);
            throw exceptions_1.ApiExceptions.abilitySnapshotNotFound();
        }
        const current = this.normalizeSnapshot(snapshots[0]);
        const previous = snapshots.length > 1 ? this.normalizeSnapshot(snapshots[prevCount]) : null;
        const delta = {};
        const percentageChange = {};
        if (previous) {
            const fields = [
                "strengthScore",
                "cardioScore",
                "enduranceScore",
                "flexibilityScore",
                "bodyScore",
                "stabilityScore",
                "totalScore",
            ];
            fields.forEach((field) => {
                const currentValue = current[field] ?? 0;
                const previousValue = previous[field] ?? 0;
                delta[field] = currentValue - previousValue;
                percentageChange[field] =
                    previousValue !== 0
                        ? ((currentValue - previousValue) / previousValue) * 100
                        : 0;
            });
        }
        return {
            current,
            previous,
            delta,
            percentageChange,
        };
    }
    async getHexagonData(memberId, includeInitial = false) {
        const snapshot = await this.getLatestSnapshot(memberId);
        if (!snapshot) {
            this.logger.warn(`능력치 스냅샷이 없습니다. MemberId: ${memberId}`);
            throw exceptions_1.ApiExceptions.abilitySnapshotNotFound();
        }
        const current = {
            indicators: analytics_helper_1.AnalyticsHelper.toHexagonIndicators(snapshot),
            assessedAt: date_helper_1.DateHelper.toKoreaTimeISOString(snapshot.assessedAt),
            version: snapshot.version || "v1",
        };
        if (includeInitial) {
            const initialSnapshot = await this.getInitialSnapshot(memberId);
            return {
                ...current,
                initial: initialSnapshot ? {
                    indicators: analytics_helper_1.AnalyticsHelper.toHexagonIndicators(initialSnapshot),
                    assessedAt: date_helper_1.DateHelper.toKoreaTimeISOString(initialSnapshot.assessedAt),
                    version: initialSnapshot.version || "v1",
                } : null,
            };
        }
        return current;
    }
    async getInitialSnapshot(memberId) {
        const initialAssessment = await this.assessmentRepository.findOne({
            where: {
                memberId,
                isInitial: true,
                deletedAt: (0, typeorm_2.IsNull)(),
            },
            relations: ['snapshot'],
        });
        if (!initialAssessment || !initialAssessment.snapshot) {
            return null;
        }
        return this.normalizeSnapshot(initialAssessment.snapshot);
    }
    async getHistory(memberId) {
        const snapshots = await this.getSnapshots(memberId);
        return {
            history: snapshots.map((snapshot) => ({
                assessedAt: date_helper_1.DateHelper.toKoreaTimeISOString(snapshot.assessedAt),
                indicators: analytics_helper_1.AnalyticsHelper.toHexagonIndicators(snapshot),
                version: snapshot.version || "v1",
            })),
        };
    }
};
exports.AssessmentsService = AssessmentsService;
exports.AssessmentsService = AssessmentsService = AssessmentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assessment_entity_1.Assessment)),
    __param(1, (0, typeorm_1.InjectRepository)(assessment_item_entity_1.AssessmentItem)),
    __param(2, (0, typeorm_1.InjectRepository)(ability_snapshot_entity_1.AbilitySnapshot)),
    __param(3, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof score_calculator_1.ScoreCalculator !== "undefined" && score_calculator_1.ScoreCalculator) === "function" ? _e : Object, typeof (_f = typeof grade_score_converter_1.GradeScoreConverter !== "undefined" && grade_score_converter_1.GradeScoreConverter) === "function" ? _f : Object])
], AssessmentsService);


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScoreCalculator = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const assessment_item_entity_1 = __webpack_require__(53);
const enums_1 = __webpack_require__(18);
const ability_snapshot_entity_1 = __webpack_require__(54);
const injury_restriction_entity_1 = __webpack_require__(56);
const CURRENT_VERSION = "v1";
let ScoreCalculator = class ScoreCalculator {
    constructor(assessmentItemRepository, abilitySnapshotRepository, injuryRestrictionRepository) {
        this.assessmentItemRepository = assessmentItemRepository;
        this.abilitySnapshotRepository = abilitySnapshotRepository;
        this.injuryRestrictionRepository = injuryRestrictionRepository;
    }
    calculateCategoryScores(items) {
        const categoryScores = {};
        const itemsByCategory = items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        Object.keys(itemsByCategory).forEach((category) => {
            const categoryItems = itemsByCategory[category];
            if (categoryItems.length > 0) {
                const validItems = categoryItems.filter((item) => item.score !== null && item.score !== undefined);
                if (validItems.length > 0) {
                    const averageScore = validItems.reduce((sum, item) => sum + (item.score || 0), 0) / validItems.length;
                    switch (category) {
                        case enums_1.Category.STRENGTH:
                            categoryScores.strengthScore = averageScore;
                            break;
                        case enums_1.Category.CARDIO:
                            categoryScores.cardioScore = averageScore;
                            break;
                        case enums_1.Category.ENDURANCE:
                            categoryScores.enduranceScore = averageScore;
                            break;
                        case enums_1.Category.FLEXIBILITY:
                            categoryScores.flexibilityScore = averageScore;
                            break;
                        case enums_1.Category.BODY:
                            categoryScores.bodyScore = averageScore;
                            break;
                        case enums_1.Category.STABILITY:
                            categoryScores.stabilityScore = averageScore;
                            break;
                    }
                }
            }
        });
        return categoryScores;
    }
    excludeRestrictedCategories(categoryScores, restrictions) {
        const restrictedCategories = restrictions.map((r) => r.restrictedCategory);
        const adjustedScores = { ...categoryScores };
        restrictedCategories.forEach((category) => {
            switch (category) {
                case enums_1.Category.STRENGTH:
                    adjustedScores.strengthScore = null;
                    break;
                case enums_1.Category.CARDIO:
                    adjustedScores.cardioScore = null;
                    break;
                case enums_1.Category.ENDURANCE:
                    adjustedScores.enduranceScore = null;
                    break;
                case enums_1.Category.FLEXIBILITY:
                    adjustedScores.flexibilityScore = null;
                    break;
                case enums_1.Category.BODY:
                    adjustedScores.bodyScore = null;
                    break;
                case enums_1.Category.STABILITY:
                    adjustedScores.stabilityScore = null;
                    break;
            }
        });
        return adjustedScores;
    }
    calculateTotalScore(categoryScores) {
        const weights = {
            stability: 0.2,
            cardio: 0.2,
            endurance: 0.2,
            strength: 0.15,
            body: 0.15,
            flexibility: 0.1,
        };
        let totalWeight = 0;
        let weightedSum = 0;
        if (categoryScores.strengthScore !== null && categoryScores.strengthScore !== undefined) {
            weightedSum += categoryScores.strengthScore * weights.strength;
            totalWeight += weights.strength;
        }
        if (categoryScores.cardioScore !== null && categoryScores.cardioScore !== undefined) {
            weightedSum += categoryScores.cardioScore * weights.cardio;
            totalWeight += weights.cardio;
        }
        if (categoryScores.enduranceScore !== null && categoryScores.enduranceScore !== undefined) {
            weightedSum += categoryScores.enduranceScore * weights.endurance;
            totalWeight += weights.endurance;
        }
        if (categoryScores.flexibilityScore !== null && categoryScores.flexibilityScore !== undefined) {
            weightedSum += categoryScores.flexibilityScore * weights.flexibility;
            totalWeight += weights.flexibility;
        }
        if (categoryScores.bodyScore !== null && categoryScores.bodyScore !== undefined) {
            weightedSum += categoryScores.bodyScore * weights.body;
            totalWeight += weights.body;
        }
        if (categoryScores.stabilityScore !== null && categoryScores.stabilityScore !== undefined) {
            weightedSum += categoryScores.stabilityScore * weights.stability;
            totalWeight += weights.stability;
        }
        if (totalWeight === 0) {
            return 0;
        }
        return weightedSum / totalWeight;
    }
    async calculateAssessmentScore(assessmentId, memberId) {
        try {
            const items = await this.assessmentItemRepository.find({
                where: { assessmentId },
            });
            if (items.length === 0) {
                throw new Error("평가 항목이 없습니다.");
            }
            const categoryScores = this.calculateCategoryScores(items);
            const injuryRestrictions = await this.injuryRestrictionRepository
                .createQueryBuilder("restriction")
                .leftJoinAndSelect("restriction.injury", "injury")
                .where("injury.memberId = :memberId", { memberId })
                .andWhere("injury.recoveryStatus IN (:...statuses)", {
                statuses: ["RECOVERING", "CHRONIC"],
            })
                .getMany();
            const adjustedScores = this.excludeRestrictedCategories(categoryScores, injuryRestrictions);
            const totalScore = this.calculateTotalScore(adjustedScores);
            const snapshot = this.abilitySnapshotRepository.create({
                assessmentId,
                memberId,
                assessedAt: new Date(),
                version: CURRENT_VERSION,
                strengthScore: adjustedScores.strengthScore ?? undefined,
                cardioScore: adjustedScores.cardioScore ?? undefined,
                enduranceScore: adjustedScores.enduranceScore ?? undefined,
                flexibilityScore: adjustedScores.flexibilityScore ?? undefined,
                bodyScore: adjustedScores.bodyScore ?? undefined,
                stabilityScore: adjustedScores.stabilityScore ?? undefined,
                totalScore,
            });
            return await this.abilitySnapshotRepository.save(snapshot);
        }
        catch (error) {
            console.error(`Ability calculation failed for assessment ${assessmentId}:`, error);
            throw error;
        }
    }
};
exports.ScoreCalculator = ScoreCalculator;
exports.ScoreCalculator = ScoreCalculator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assessment_item_entity_1.AssessmentItem)),
    __param(1, (0, typeorm_1.InjectRepository)(ability_snapshot_entity_1.AbilitySnapshot)),
    __param(2, (0, typeorm_1.InjectRepository)(injury_restriction_entity_1.InjuryRestriction)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], ScoreCalculator);


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotNormalizer = void 0;
class SnapshotNormalizer {
    static normalize(snapshot, memberId) {
        if (!snapshot) {
            return this.createDefaultSnapshot(memberId || '');
        }
        return {
            ...snapshot,
            strengthScore: snapshot.strengthScore ?? 0,
            cardioScore: snapshot.cardioScore ?? 0,
            enduranceScore: snapshot.enduranceScore ?? 0,
            flexibilityScore: snapshot.flexibilityScore ?? 0,
            bodyScore: snapshot.bodyScore ?? 0,
            stabilityScore: snapshot.stabilityScore ?? 0,
            totalScore: snapshot.totalScore ?? 0,
        };
    }
    static normalizeArray(snapshots) {
        return snapshots
            .filter((s) => s !== null && s !== undefined)
            .map((snapshot) => this.normalize(snapshot));
    }
    static createDefaultSnapshot(memberId) {
        return {
            id: '',
            assessmentId: '',
            memberId,
            assessedAt: new Date(),
            version: 'v1',
            strengthScore: 0,
            cardioScore: 0,
            enduranceScore: 0,
            flexibilityScore: 0,
            bodyScore: 0,
            stabilityScore: 0,
            totalScore: 0,
            createdAt: new Date(),
        };
    }
    static createAverageSnapshot(averages) {
        return {
            id: '',
            assessmentId: '',
            memberId: '',
            assessedAt: new Date(),
            version: 'v1',
            strengthScore: averages.strengthScore,
            cardioScore: averages.cardioScore,
            enduranceScore: averages.enduranceScore,
            flexibilityScore: averages.flexibilityScore,
            bodyScore: averages.bodyScore,
            stabilityScore: averages.stabilityScore,
            totalScore: averages.totalScore,
            createdAt: new Date(),
        };
    }
}
exports.SnapshotNormalizer = SnapshotNormalizer;


/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GradeScoreConverter_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GradeScoreConverter = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const assessment_category_score_entity_1 = __webpack_require__(107);
const flexibility_item_weight_entity_1 = __webpack_require__(109);
const flexibility_grade_threshold_entity_1 = __webpack_require__(110);
const body_composition_standard_entity_1 = __webpack_require__(111);
const enums_1 = __webpack_require__(18);
let GradeScoreConverter = GradeScoreConverter_1 = class GradeScoreConverter {
    constructor(categoryScoreRepository, flexibilityWeightRepository, flexibilityThresholdRepository, bodyCompositionStandardRepository) {
        this.categoryScoreRepository = categoryScoreRepository;
        this.flexibilityWeightRepository = flexibilityWeightRepository;
        this.flexibilityThresholdRepository = flexibilityThresholdRepository;
        this.bodyCompositionStandardRepository = bodyCompositionStandardRepository;
        this.logger = new common_1.Logger(GradeScoreConverter_1.name);
    }
    async convertGradeToScore(category, details) {
        switch (category) {
            case enums_1.Category.STRENGTH:
                if (!details.grade)
                    return null;
                return this.convertStrengthScore(details);
            case enums_1.Category.CARDIO:
                if (!details.grade)
                    return null;
                return this.convertCardioScore(details);
            case enums_1.Category.ENDURANCE:
                if (!details.grade)
                    return null;
                return this.convertEnduranceScore(details);
            case enums_1.Category.FLEXIBILITY:
                if (!details.flexibilityItems)
                    return null;
                return await this.convertFlexibilityScore(details);
            case enums_1.Category.BODY:
                return await this.convertBodyCompositionScore(details);
            case enums_1.Category.STABILITY:
                return this.convertStabilityScore(details);
            default:
                return null;
        }
    }
    convertStrengthScore(details) {
        const grade = details.grade;
        if (!grade) {
            this.logger.warn('하체 근력 점수 계산 실패: grade가 없습니다.');
            return null;
        }
        const scoreMap = {
            A: 80,
            B: 60,
            C: 45,
            'D-1': 30,
            'D-2': 20,
        };
        const score = scoreMap[grade];
        if (score === undefined) {
            this.logger.warn(`하체 근력 점수 계산 실패: 알 수 없는 등급 '${grade}'. 허용된 등급: A, B, C, D-1, D-2`);
            return null;
        }
        return score;
    }
    convertCardioScore(details) {
        const grade = details.grade;
        if (!grade) {
            this.logger.warn('심폐 지구력 점수 계산 실패: grade가 없습니다.');
            return null;
        }
        if (grade === 'B') {
            const recoverySpeed = details.recoverySpeed || [];
            if (recoverySpeed.includes('fast')) {
                return 65;
            }
            else if (recoverySpeed.includes('slow')) {
                return 55;
            }
            return 60;
        }
        const scoreMap = {
            A: 80,
            C: 40,
            IMPOSSIBLE: 20,
        };
        const score = scoreMap[grade];
        if (score === undefined) {
            this.logger.warn(`심폐 지구력 점수 계산 실패: 알 수 없는 등급 '${grade}'. 허용된 등급: A, B, C, IMPOSSIBLE`);
            return null;
        }
        return score;
    }
    convertEnduranceScore(details) {
        const grade = details.grade;
        if (!grade) {
            this.logger.warn('근지구력 점수 계산 실패: grade가 없습니다.');
            return null;
        }
        const scoreMap = {
            A: 80,
            B: 60,
            C: 40,
            IMPOSSIBLE: 20,
        };
        const score = scoreMap[grade];
        if (score === undefined) {
            this.logger.warn(`근지구력 점수 계산 실패: 알 수 없는 등급 '${grade}'. 허용된 등급: A, B, C, IMPOSSIBLE`);
            return null;
        }
        return score;
    }
    async convertFlexibilityScore(details) {
        const flexibilityItems = details.flexibilityItems;
        if (!flexibilityItems) {
            this.logger.warn('유연성 점수 계산 실패: flexibilityItems가 없습니다.');
            return null;
        }
        try {
            const weights = await this.flexibilityWeightRepository.find({
                where: { isActive: true },
            });
            if (weights.length === 0) {
                this.logger.warn('유연성 점수 계산 실패: 가중치 데이터가 없습니다. (flexibility_item_weights 테이블 확인 필요)');
                return null;
            }
            const weightMap = new Map();
            weights.forEach((w) => {
                weightMap.set(w.itemName, Number(w.weight));
            });
            let weightSum = 0;
            Object.entries(flexibilityItems).forEach(([itemName, grade]) => {
                if (grade === 'C') {
                    const weight = weightMap.get(itemName);
                    if (weight === undefined) {
                        this.logger.warn(`유연성 항목 가중치 없음: ${itemName}. flexibility_item_weights 테이블 확인 필요.`);
                    }
                    weightSum += weight || 0;
                }
            });
            const thresholds = await this.flexibilityThresholdRepository.find({
                where: { isActive: true },
                order: { weightSumMin: 'ASC' },
            });
            if (thresholds.length === 0) {
                this.logger.warn('유연성 점수 계산 실패: 등급 판정 기준 데이터가 없습니다. (flexibility_grade_thresholds 테이블 확인 필요)');
                return weightSum === 0 ? 80 : null;
            }
            for (const threshold of thresholds) {
                const min = Number(threshold.weightSumMin);
                const max = Number(threshold.weightSumMax);
                if (weightSum >= min && weightSum <= max) {
                    return threshold.internalScore;
                }
            }
            if (weightSum === 0) {
                return 80;
            }
            this.logger.warn(`유연성 점수 계산 실패: 가중치 합 ${weightSum}에 해당하는 등급 판정 기준을 찾을 수 없습니다.`);
            return null;
        }
        catch (error) {
            this.logger.error(`유연성 점수 계산 중 오류 발생: ${error.message}`, error.stack);
            return null;
        }
    }
    async convertBodyCompositionScore(details) {
        const { bodyFatPercentage, muscleMass, fatMass, bodyWeight, age, gender } = details;
        if (bodyFatPercentage === undefined || bodyFatPercentage === null) {
            this.logger.warn('체성분 점수 계산 실패: bodyFatPercentage가 없습니다.');
            return null;
        }
        if (muscleMass === undefined || muscleMass === null) {
            this.logger.warn('체성분 점수 계산 실패: muscleMass가 없습니다.');
            return null;
        }
        if (age === undefined || age === null) {
            this.logger.warn('체성분 점수 계산 실패: age가 없습니다.');
            return null;
        }
        if (!gender) {
            this.logger.warn('체성분 점수 계산 실패: gender가 없습니다.');
            return null;
        }
        try {
            const standards = await this.bodyCompositionStandardRepository.find({
                where: {
                    gender: gender,
                    isActive: true,
                },
                order: { ageMin: 'ASC' },
            });
            if (standards.length === 0) {
                this.logger.warn(`체성분 점수 계산 실패: ${gender}의 연령대별 기준 데이터가 없습니다. (body_composition_standards 테이블 확인 필요)`);
                return null;
            }
            let standard = null;
            for (const s of standards) {
                if (age >= Number(s.ageMin) && age <= Number(s.ageMax)) {
                    standard = s;
                    break;
                }
            }
            if (!standard) {
                this.logger.warn(`체성분 점수 계산 실패: ${age}세 ${gender}에 해당하는 연령대별 기준을 찾을 수 없습니다.`);
                return null;
            }
            const bodyFatMin = Number(standard.bodyFatPercentageMin);
            const bodyFatMax = Number(standard.bodyFatPercentageMax);
            const muscleMassPercentageMin = Number(standard.muscleMassPercentageMin);
            let muscleMassPercentage;
            if (bodyWeight && bodyWeight > 0) {
                muscleMassPercentage = (muscleMass / bodyWeight) * 100;
            }
            else {
                muscleMassPercentage = muscleMass;
            }
            const isBodyFatNormal = bodyFatPercentage >= bodyFatMin && bodyFatPercentage <= bodyFatMax;
            const isMuscleMassSufficient = muscleMassPercentage >= muscleMassPercentageMin;
            if (isBodyFatNormal && isMuscleMassSufficient) {
                return 80;
            }
            else if (isBodyFatNormal || isMuscleMassSufficient) {
                return 60;
            }
            else if (bodyFatPercentage > bodyFatMax || muscleMassPercentage < muscleMassPercentageMin) {
                return 40;
            }
            else {
                return 20;
            }
        }
        catch (error) {
            this.logger.error(`체성분 점수 계산 중 오류 발생: ${error.message}`, error.stack);
            return null;
        }
    }
    convertStabilityScore(details) {
        const { ohsa, pain } = details;
        if (!ohsa) {
            this.logger.warn('안정성 점수 계산 실패: ohsa가 없습니다.');
            return null;
        }
        if (!pain) {
            this.logger.warn('안정성 점수 계산 실패: pain이 없습니다.');
            return null;
        }
        if (ohsa === 'A' && pain === 'none')
            return 80;
        if (ohsa === 'B' && pain === 'none')
            return 60;
        if (ohsa === 'C' && pain === 'none')
            return 40;
        if (ohsa === 'A' && pain === 'present')
            return 50;
        if (ohsa === 'B' && pain === 'present')
            return 45;
        if (ohsa === 'C' && pain === 'present')
            return 20;
        this.logger.warn(`안정성 점수 계산 실패: 알 수 없는 조합. OHSA: '${ohsa}', Pain: '${pain}'. 허용된 값: OHSA(A, B, C), Pain(none, present)`);
        return null;
    }
};
exports.GradeScoreConverter = GradeScoreConverter;
exports.GradeScoreConverter = GradeScoreConverter = GradeScoreConverter_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assessment_category_score_entity_1.AssessmentCategoryScore)),
    __param(1, (0, typeorm_1.InjectRepository)(flexibility_item_weight_entity_1.FlexibilityItemWeight)),
    __param(2, (0, typeorm_1.InjectRepository)(flexibility_grade_threshold_entity_1.FlexibilityGradeThreshold)),
    __param(3, (0, typeorm_1.InjectRepository)(body_composition_standard_entity_1.BodyCompositionStandard)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], GradeScoreConverter);


/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssessmentCategoryScore = void 0;
const typeorm_1 = __webpack_require__(15);
const enums_1 = __webpack_require__(18);
const assessment_grade_constant_entity_1 = __webpack_require__(108);
let AssessmentCategoryScore = class AssessmentCategoryScore {
};
exports.AssessmentCategoryScore = AssessmentCategoryScore;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AssessmentCategoryScore.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Category,
    }),
    __metadata("design:type", typeof (_a = typeof enums_1.Category !== "undefined" && enums_1.Category) === "function" ? _a : Object)
], AssessmentCategoryScore.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'input_grade', length: 20 }),
    __metadata("design:type", String)
], AssessmentCategoryScore.prototype, "inputGrade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AssessmentCategoryScore.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'internal_score', type: 'int' }),
    __metadata("design:type", Number)
], AssessmentCategoryScore.prototype, "internalScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'final_grade_code', length: 20 }),
    __metadata("design:type", String)
], AssessmentCategoryScore.prototype, "finalGradeCode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assessment_grade_constant_entity_1.AssessmentGradeConstant, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'final_grade_code', referencedColumnName: 'gradeCode' }),
    __metadata("design:type", typeof (_b = typeof assessment_grade_constant_entity_1.AssessmentGradeConstant !== "undefined" && assessment_grade_constant_entity_1.AssessmentGradeConstant) === "function" ? _b : Object)
], AssessmentCategoryScore.prototype, "finalGrade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AssessmentCategoryScore.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'v1' }),
    __metadata("design:type", String)
], AssessmentCategoryScore.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], AssessmentCategoryScore.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], AssessmentCategoryScore.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], AssessmentCategoryScore.prototype, "updatedAt", void 0);
exports.AssessmentCategoryScore = AssessmentCategoryScore = __decorate([
    (0, typeorm_1.Index)('idx_assessment_category_scores_category', ['category']),
    (0, typeorm_1.Index)('idx_assessment_category_scores_input_grade', ['inputGrade']),
    (0, typeorm_1.Index)('idx_assessment_category_scores_active', ['isActive'], { where: '"is_active" = true' }),
    (0, typeorm_1.Entity)('assessment_category_scores')
], AssessmentCategoryScore);


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssessmentGradeConstant = void 0;
const typeorm_1 = __webpack_require__(15);
let AssessmentGradeConstant = class AssessmentGradeConstant {
};
exports.AssessmentGradeConstant = AssessmentGradeConstant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AssessmentGradeConstant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_code', length: 20, unique: true }),
    __metadata("design:type", String)
], AssessmentGradeConstant.prototype, "gradeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_name_kr', length: 50 }),
    __metadata("design:type", String)
], AssessmentGradeConstant.prototype, "gradeNameKr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grade_name_en', length: 50 }),
    __metadata("design:type", String)
], AssessmentGradeConstant.prototype, "gradeNameEn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'internal_score', type: 'int' }),
    __metadata("design:type", Number)
], AssessmentGradeConstant.prototype, "internalScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AssessmentGradeConstant.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'v1' }),
    __metadata("design:type", String)
], AssessmentGradeConstant.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], AssessmentGradeConstant.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AssessmentGradeConstant.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AssessmentGradeConstant.prototype, "updatedAt", void 0);
exports.AssessmentGradeConstant = AssessmentGradeConstant = __decorate([
    (0, typeorm_1.Index)('idx_assessment_grade_constants_code', ['gradeCode']),
    (0, typeorm_1.Index)('idx_assessment_grade_constants_active', ['isActive'], { where: 'is_active = true' }),
    (0, typeorm_1.Entity)('assessment_grade_constants')
], AssessmentGradeConstant);


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlexibilityItemWeight = void 0;
const typeorm_1 = __webpack_require__(15);
let FlexibilityItemWeight = class FlexibilityItemWeight {
};
exports.FlexibilityItemWeight = FlexibilityItemWeight;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FlexibilityItemWeight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_name', length: 100, unique: true }),
    __metadata("design:type", String)
], FlexibilityItemWeight.prototype, "itemName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'item_name_kr', length: 100 }),
    __metadata("design:type", String)
], FlexibilityItemWeight.prototype, "itemNameKr", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], FlexibilityItemWeight.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], FlexibilityItemWeight.prototype, "importance", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'v1' }),
    __metadata("design:type", String)
], FlexibilityItemWeight.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], FlexibilityItemWeight.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FlexibilityItemWeight.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], FlexibilityItemWeight.prototype, "updatedAt", void 0);
exports.FlexibilityItemWeight = FlexibilityItemWeight = __decorate([
    (0, typeorm_1.Index)('idx_flexibility_item_weights_item_name', ['itemName']),
    (0, typeorm_1.Index)('idx_flexibility_item_weights_active', ['isActive'], { where: 'is_active = true' }),
    (0, typeorm_1.Entity)('flexibility_item_weights')
], FlexibilityItemWeight);


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlexibilityGradeThreshold = void 0;
const typeorm_1 = __webpack_require__(15);
const assessment_grade_constant_entity_1 = __webpack_require__(108);
let FlexibilityGradeThreshold = class FlexibilityGradeThreshold {
};
exports.FlexibilityGradeThreshold = FlexibilityGradeThreshold;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FlexibilityGradeThreshold.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weight_sum_min', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], FlexibilityGradeThreshold.prototype, "weightSumMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'weight_sum_max', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], FlexibilityGradeThreshold.prototype, "weightSumMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'final_grade_code', length: 20 }),
    __metadata("design:type", String)
], FlexibilityGradeThreshold.prototype, "finalGradeCode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assessment_grade_constant_entity_1.AssessmentGradeConstant, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'final_grade_code', referencedColumnName: 'gradeCode' }),
    __metadata("design:type", typeof (_a = typeof assessment_grade_constant_entity_1.AssessmentGradeConstant !== "undefined" && assessment_grade_constant_entity_1.AssessmentGradeConstant) === "function" ? _a : Object)
], FlexibilityGradeThreshold.prototype, "finalGrade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'internal_score', type: 'int' }),
    __metadata("design:type", Number)
], FlexibilityGradeThreshold.prototype, "internalScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'v1' }),
    __metadata("design:type", String)
], FlexibilityGradeThreshold.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], FlexibilityGradeThreshold.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], FlexibilityGradeThreshold.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], FlexibilityGradeThreshold.prototype, "updatedAt", void 0);
exports.FlexibilityGradeThreshold = FlexibilityGradeThreshold = __decorate([
    (0, typeorm_1.Index)('idx_flexibility_grade_thresholds_active', ['isActive'], { where: 'is_active = true' }),
    (0, typeorm_1.Entity)('flexibility_grade_thresholds')
], FlexibilityGradeThreshold);


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BodyCompositionStandard = void 0;
const typeorm_1 = __webpack_require__(15);
let BodyCompositionStandard = class BodyCompositionStandard {
};
exports.BodyCompositionStandard = BodyCompositionStandard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BodyCompositionStandard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], BodyCompositionStandard.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'age_min', type: 'int' }),
    __metadata("design:type", Number)
], BodyCompositionStandard.prototype, "ageMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'age_max', type: 'int' }),
    __metadata("design:type", Number)
], BodyCompositionStandard.prototype, "ageMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'body_fat_percentage_min', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], BodyCompositionStandard.prototype, "bodyFatPercentageMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'body_fat_percentage_max', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], BodyCompositionStandard.prototype, "bodyFatPercentageMax", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'muscle_mass_percentage_min', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], BodyCompositionStandard.prototype, "muscleMassPercentageMin", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'v1' }),
    __metadata("design:type", String)
], BodyCompositionStandard.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], BodyCompositionStandard.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BodyCompositionStandard.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BodyCompositionStandard.prototype, "updatedAt", void 0);
exports.BodyCompositionStandard = BodyCompositionStandard = __decorate([
    (0, typeorm_1.Index)('idx_body_composition_standards_gender_age', ['gender', 'ageMin', 'ageMax']),
    (0, typeorm_1.Index)('idx_body_composition_standards_active', ['isActive'], { where: 'is_active = true' }),
    (0, typeorm_1.Entity)('body_composition_standards')
], BodyCompositionStandard);


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsHelper = exports.HEXAGON_INDICATOR_NAMES = void 0;
const snapshot_normalizer_1 = __webpack_require__(105);
exports.HEXAGON_INDICATOR_NAMES = {
    strength: '하체 근력',
    cardio: '심폐 지구력',
    endurance: '근지구력',
    flexibility: '유연성',
    body: '체성분 밸런스',
    stability: '부상 안정성',
};
class AnalyticsHelper {
    static calculateAverages(snapshots) {
        const validSnapshots = snapshot_normalizer_1.SnapshotNormalizer.normalizeArray(snapshots);
        if (validSnapshots.length === 0) {
            return {
                strengthScore: 0,
                cardioScore: 0,
                enduranceScore: 0,
                flexibilityScore: 0,
                bodyScore: 0,
                stabilityScore: 0,
                totalScore: 0,
            };
        }
        const sums = {
            strengthScore: 0,
            cardioScore: 0,
            enduranceScore: 0,
            flexibilityScore: 0,
            bodyScore: 0,
            stabilityScore: 0,
            totalScore: 0,
        };
        validSnapshots.forEach((snapshot) => {
            sums.strengthScore += snapshot.strengthScore;
            sums.cardioScore += snapshot.cardioScore;
            sums.enduranceScore += snapshot.enduranceScore;
            sums.flexibilityScore += snapshot.flexibilityScore;
            sums.bodyScore += snapshot.bodyScore;
            sums.stabilityScore += snapshot.stabilityScore;
            sums.totalScore += snapshot.totalScore;
        });
        const count = validSnapshots.length;
        return {
            strengthScore: sums.strengthScore / count,
            cardioScore: sums.cardioScore / count,
            enduranceScore: sums.enduranceScore / count,
            flexibilityScore: sums.flexibilityScore / count,
            bodyScore: sums.bodyScore / count,
            stabilityScore: sums.stabilityScore / count,
            totalScore: sums.totalScore / count,
        };
    }
    static toHexagonIndicators(snapshot) {
        const normalized = snapshot ? snapshot_normalizer_1.SnapshotNormalizer.normalize(snapshot) : null;
        return [
            { name: exports.HEXAGON_INDICATOR_NAMES.strength, score: normalized?.strengthScore ?? 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.cardio, score: normalized?.cardioScore ?? 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.endurance, score: normalized?.enduranceScore ?? 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.flexibility, score: normalized?.flexibilityScore ?? 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.body, score: normalized?.bodyScore ?? 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.stability, score: normalized?.stabilityScore ?? 0 },
        ];
    }
    static averagesToHexagonIndicators(averages) {
        return [
            { name: exports.HEXAGON_INDICATOR_NAMES.strength, score: Math.round(averages.strengthScore) },
            { name: exports.HEXAGON_INDICATOR_NAMES.cardio, score: Math.round(averages.cardioScore) },
            { name: exports.HEXAGON_INDICATOR_NAMES.endurance, score: Math.round(averages.enduranceScore) },
            { name: exports.HEXAGON_INDICATOR_NAMES.flexibility, score: Math.round(averages.flexibilityScore) },
            { name: exports.HEXAGON_INDICATOR_NAMES.body, score: Math.round(averages.bodyScore) },
            { name: exports.HEXAGON_INDICATOR_NAMES.stability, score: Math.round(averages.stabilityScore) },
        ];
    }
    static emptyHexagonIndicators() {
        return [
            { name: exports.HEXAGON_INDICATOR_NAMES.strength, score: 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.cardio, score: 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.endurance, score: 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.flexibility, score: 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.body, score: 0 },
            { name: exports.HEXAGON_INDICATOR_NAMES.stability, score: 0 },
        ];
    }
    static calculatePercentile(memberValue, averageValue) {
        if (averageValue === 0)
            return 50;
        const ratio = memberValue / averageValue;
        return Math.min(100, Math.max(0, (ratio - 0.5) * 100 + 50));
    }
    static calculatePercentiles(memberSnapshot, averages) {
        const normalized = snapshot_normalizer_1.SnapshotNormalizer.normalize(memberSnapshot);
        return {
            strengthScore: this.calculatePercentile(normalized.strengthScore, averages.strengthScore),
            cardioScore: this.calculatePercentile(normalized.cardioScore, averages.cardioScore),
            enduranceScore: this.calculatePercentile(normalized.enduranceScore, averages.enduranceScore),
            flexibilityScore: this.calculatePercentile(normalized.flexibilityScore, averages.flexibilityScore),
            bodyScore: this.calculatePercentile(normalized.bodyScore, averages.bodyScore),
            stabilityScore: this.calculatePercentile(normalized.stabilityScore, averages.stabilityScore),
            totalScore: this.calculatePercentile(normalized.totalScore, averages.totalScore),
        };
    }
}
exports.AnalyticsHelper = AnalyticsHelper;


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompareSnapshotsQueryDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const class_transformer_1 = __webpack_require__(83);
class CompareSnapshotsQueryDto {
}
exports.CompareSnapshotsQueryDto = CompareSnapshotsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '이전 평가와 비교할 개수 (기본값: 1)',
        example: 1,
        minimum: 1,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'prev는 정수여야 합니다.' }),
    (0, class_validator_1.Min)(1, { message: 'prev는 1 이상이어야 합니다.' }),
    __metadata("design:type", Number)
], CompareSnapshotsQueryDto.prototype, "prev", void 0);


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HexagonDataDto = exports.HexagonIndicatorDto = void 0;
const swagger_1 = __webpack_require__(4);
class HexagonIndicatorDto {
}
exports.HexagonIndicatorDto = HexagonIndicatorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '평가 항목 이름', example: '하체 근력' }),
    __metadata("design:type", String)
], HexagonIndicatorDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '점수 (0-100)', example: 75 }),
    __metadata("design:type", Number)
], HexagonIndicatorDto.prototype, "score", void 0);
class HexagonDataDto {
}
exports.HexagonDataDto = HexagonDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '6개 평가 항목 점수',
        type: [HexagonIndicatorDto],
        example: [
            { name: '하체 근력', score: 75 },
            { name: '심폐 지구력', score: 60 },
            { name: '근지구력', score: 70 },
            { name: '유연성', score: 65 },
            { name: '체성분 밸런스', score: 80 },
            { name: '부상 안정성', score: 72 }
        ]
    }),
    __metadata("design:type", Array)
], HexagonDataDto.prototype, "indicators", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '평가 일시 (ISO 8601)', example: '2024-03-15T10:00:00Z' }),
    __metadata("design:type", String)
], HexagonDataDto.prototype, "assessedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '버전', example: 'v1' }),
    __metadata("design:type", String)
], HexagonDataDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '초기 평가 데이터 (compare=true일 때만 포함)',
        type: HexagonDataDto,
        nullable: true,
        example: {
            indicators: [
                { name: '하체 근력', score: 50 },
                { name: '심폐 지구력', score: 45 },
                { name: '근지구력', score: 55 },
                { name: '유연성', score: 50 },
                { name: '체성분 밸런스', score: 40 },
                { name: '부상 안정성', score: 60 }
            ],
            assessedAt: '2024-01-15T10:00:00Z',
            version: 'v1'
        }
    }),
    __metadata("design:type", HexagonDataDto)
], HexagonDataDto.prototype, "initial", void 0);


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemberAnalyticsController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const guards_1 = __webpack_require__(36);
const ability_snapshot_entity_1 = __webpack_require__(54);
const api_response_1 = __webpack_require__(43);
const snapshot_normalizer_1 = __webpack_require__(105);
const analytics_helper_1 = __webpack_require__(112);
let MemberAnalyticsController = class MemberAnalyticsController {
    constructor(abilitySnapshotRepository) {
        this.abilitySnapshotRepository = abilitySnapshotRepository;
    }
    async getMemberAnalytics(memberId) {
        const snapshots = await this.abilitySnapshotRepository.find({
            where: { memberId },
            order: { assessedAt: "DESC" },
            relations: ["assessment"],
        });
        const normalizedSnapshots = snapshot_normalizer_1.SnapshotNormalizer.normalizeArray(snapshots);
        const latestSnapshot = snapshot_normalizer_1.SnapshotNormalizer.normalize(normalizedSnapshots[0], memberId);
        const allSnapshots = await this.abilitySnapshotRepository
            .createQueryBuilder('snapshot')
            .where('snapshot.totalScore IS NOT NULL')
            .getMany();
        const averages = analytics_helper_1.AnalyticsHelper.calculateAverages(allSnapshots);
        const percentile = analytics_helper_1.AnalyticsHelper.calculatePercentiles(latestSnapshot, averages);
        const averageSnapshot = snapshot_normalizer_1.SnapshotNormalizer.createAverageSnapshot(averages);
        return api_response_1.ApiResponseHelper.success({
            memberId,
            latestSnapshot,
            averageSnapshot,
            percentile,
            snapshots: normalizedSnapshots,
            total: normalizedSnapshots.length,
            latest: latestSnapshot,
        }, "회원 능력치 데이터 조회 성공");
    }
};
exports.MemberAnalyticsController = MemberAnalyticsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '회원 능력치 데이터 조회', description: '특정 회원의 모든 능력치 스냅샷 데이터를 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    __param(0, (0, common_1.Param)("memberId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberAnalyticsController.prototype, "getMemberAnalytics", null);
exports.MemberAnalyticsController = MemberAnalyticsController = __decorate([
    (0, swagger_1.ApiTags)("analytics"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)("api/members/:memberId/analytics"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, typeorm_1.InjectRepository)(ability_snapshot_entity_1.AbilitySnapshot)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], MemberAnalyticsController);


/***/ }),
/* 116 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkoutRoutinesController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const workout_routines_service_1 = __webpack_require__(79);
const create_workout_routine_dto_1 = __webpack_require__(95);
const update_workout_routine_dto_1 = __webpack_require__(96);
const guards_1 = __webpack_require__(36);
const roles_decorator_1 = __webpack_require__(40);
const enums_1 = __webpack_require__(18);
const api_response_1 = __webpack_require__(43);
const exceptions_1 = __webpack_require__(27);
let WorkoutRoutinesController = class WorkoutRoutinesController {
    constructor(workoutRoutinesService) {
        this.workoutRoutinesService = workoutRoutinesService;
    }
    async getCommonRoutines(startDate, endDate, isCompleted) {
        const isCompletedBool = isCompleted === "true" ? true : isCompleted === "false" ? false : undefined;
        const routines = await this.workoutRoutinesService.findAll(undefined, startDate, endDate, isCompletedBool);
        return api_response_1.ApiResponseHelper.success({ routines, total: routines.length }, "공통 운동 루틴 목록 조회 성공");
    }
    async getTodayCommonRoutine() {
        const routine = await this.workoutRoutinesService.findToday();
        if (!routine) {
            throw exceptions_1.ApiExceptions.routineNotFound("오늘의 공통 운동 루틴이 없습니다.");
        }
        return api_response_1.ApiResponseHelper.success(routine, "오늘의 공통 운동 루틴 조회 성공");
    }
    async getCommonRoutine(routineId) {
        const routine = await this.workoutRoutinesService.findOne(routineId);
        return api_response_1.ApiResponseHelper.success(routine, "공통 운동 루틴 상세 조회 성공");
    }
    async createCommonRoutine(createDto) {
        const routine = await this.workoutRoutinesService.create(null, createDto);
        return api_response_1.ApiResponseHelper.success(routine, "공통 운동 루틴 생성 성공");
    }
    async updateCommonRoutine(routineId, updateDto) {
        const routine = await this.workoutRoutinesService.update(routineId, null, updateDto);
        return api_response_1.ApiResponseHelper.success(routine, "공통 운동 루틴 수정 성공");
    }
    async deleteCommonRoutine(routineId) {
        await this.workoutRoutinesService.remove(routineId, null);
        return api_response_1.ApiResponseHelper.success(null, "공통 운동 루틴 삭제 성공");
    }
};
exports.WorkoutRoutinesController = WorkoutRoutinesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "공통 운동 루틴 목록 조회",
        description: "전체 공통 운동 루틴 목록을 조회합니다. 날짜 범위 및 완료 여부로 필터링 가능합니다.",
    }),
    (0, swagger_1.ApiQuery)({ name: "startDate", required: false, description: "시작 날짜 (YYYY-MM-DD)" }),
    (0, swagger_1.ApiQuery)({ name: "endDate", required: false, description: "종료 날짜 (YYYY-MM-DD)" }),
    (0, swagger_1.ApiQuery)({ name: "isCompleted", required: false, description: "완료 여부 (true/false)" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "공통 운동 루틴 목록 조회 성공" }),
    __param(0, (0, common_1.Query)("startDate")),
    __param(1, (0, common_1.Query)("endDate")),
    __param(2, (0, common_1.Query)("isCompleted")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], WorkoutRoutinesController.prototype, "getCommonRoutines", null);
__decorate([
    (0, common_1.Get)("today"),
    (0, swagger_1.ApiOperation)({
        summary: "오늘의 공통 운동 루틴 조회",
        description: "오늘 날짜의 공통 운동 루틴을 조회합니다.",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "오늘의 공통 운동 루틴 조회 성공" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "오늘의 공통 운동 루틴이 없습니다" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkoutRoutinesController.prototype, "getTodayCommonRoutine", null);
__decorate([
    (0, common_1.Get)(":routineId"),
    (0, swagger_1.ApiOperation)({
        summary: "공통 운동 루틴 상세 조회",
        description: "특정 공통 운동 루틴의 상세 정보를 조회합니다.",
    }),
    (0, swagger_1.ApiParam)({ name: "routineId", description: "루틴 ID (UUID)", type: "string" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "공통 운동 루틴 상세 조회 성공" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "공통 운동 루틴을 찾을 수 없습니다" }),
    __param(0, (0, common_1.Param)("routineId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkoutRoutinesController.prototype, "getCommonRoutine", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: "공통 운동 루틴 생성",
        description: "새로운 공통 운동 루틴을 생성합니다. (ADMIN, TRAINER 권한 필요)",
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "공통 운동 루틴 생성 성공" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_workout_routine_dto_1.CreateWorkoutRoutineDto !== "undefined" && create_workout_routine_dto_1.CreateWorkoutRoutineDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], WorkoutRoutinesController.prototype, "createCommonRoutine", null);
__decorate([
    (0, common_1.Put)(":routineId"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: "공통 운동 루틴 수정",
        description: "기존 공통 운동 루틴을 수정합니다. (ADMIN, TRAINER 권한 필요)",
    }),
    (0, swagger_1.ApiParam)({ name: "routineId", description: "루틴 ID (UUID)", type: "string" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "공통 운동 루틴 수정 성공" }),
    __param(0, (0, common_1.Param)("routineId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_workout_routine_dto_1.UpdateWorkoutRoutineDto !== "undefined" && update_workout_routine_dto_1.UpdateWorkoutRoutineDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], WorkoutRoutinesController.prototype, "updateCommonRoutine", null);
__decorate([
    (0, common_1.Delete)(":routineId"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: "공통 운동 루틴 삭제",
        description: "공통 운동 루틴을 삭제합니다. (ADMIN, TRAINER 권한 필요)",
    }),
    (0, swagger_1.ApiParam)({ name: "routineId", description: "루틴 ID (UUID)", type: "string" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "공통 운동 루틴 삭제 성공" }),
    __param(0, (0, common_1.Param)("routineId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkoutRoutinesController.prototype, "deleteCommonRoutine", null);
exports.WorkoutRoutinesController = WorkoutRoutinesController = __decorate([
    (0, swagger_1.ApiTags)("workout-routines"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)("api/workout-routines"),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof workout_routines_service_1.WorkoutRoutinesService !== "undefined" && workout_routines_service_1.WorkoutRoutinesService) === "function" ? _a : Object])
], WorkoutRoutinesController);


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssessmentsModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const assessments_controller_1 = __webpack_require__(118);
const assessments_service_1 = __webpack_require__(103);
const assessment_entity_1 = __webpack_require__(52);
const assessment_item_entity_1 = __webpack_require__(53);
const ability_snapshot_entity_1 = __webpack_require__(54);
const injury_restriction_entity_1 = __webpack_require__(56);
const injury_history_entity_1 = __webpack_require__(55);
const assessment_grade_constant_entity_1 = __webpack_require__(108);
const assessment_category_score_entity_1 = __webpack_require__(107);
const flexibility_item_weight_entity_1 = __webpack_require__(109);
const flexibility_grade_threshold_entity_1 = __webpack_require__(110);
const body_composition_standard_entity_1 = __webpack_require__(111);
const member_entity_1 = __webpack_require__(51);
const score_calculator_1 = __webpack_require__(104);
const grade_score_converter_1 = __webpack_require__(106);
let AssessmentsModule = class AssessmentsModule {
};
exports.AssessmentsModule = AssessmentsModule;
exports.AssessmentsModule = AssessmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                assessment_entity_1.Assessment,
                assessment_item_entity_1.AssessmentItem,
                ability_snapshot_entity_1.AbilitySnapshot,
                injury_restriction_entity_1.InjuryRestriction,
                injury_history_entity_1.InjuryHistory,
                assessment_grade_constant_entity_1.AssessmentGradeConstant,
                assessment_category_score_entity_1.AssessmentCategoryScore,
                flexibility_item_weight_entity_1.FlexibilityItemWeight,
                flexibility_grade_threshold_entity_1.FlexibilityGradeThreshold,
                body_composition_standard_entity_1.BodyCompositionStandard,
                member_entity_1.Member,
            ]),
        ],
        controllers: [assessments_controller_1.AssessmentsController],
        providers: [assessments_service_1.AssessmentsService, score_calculator_1.ScoreCalculator, grade_score_converter_1.GradeScoreConverter],
        exports: [assessments_service_1.AssessmentsService],
    })
], AssessmentsModule);


/***/ }),
/* 118 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssessmentsController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const assessments_service_1 = __webpack_require__(103);
const create_assessment_dto_1 = __webpack_require__(119);
const update_assessment_dto_1 = __webpack_require__(121);
const guards_1 = __webpack_require__(36);
const roles_decorator_1 = __webpack_require__(40);
const enums_1 = __webpack_require__(18);
const api_response_1 = __webpack_require__(43);
let AssessmentsController = class AssessmentsController {
    constructor(assessmentsService) {
        this.assessmentsService = assessmentsService;
    }
    async findAll(memberId) {
        const assessments = await this.assessmentsService.findAll(memberId);
        const hasInitialAssessment = await this.assessmentsService.hasInitialAssessment(memberId);
        return api_response_1.ApiResponseHelper.success({
            assessments,
            total: assessments.length,
            hasInitialAssessment,
        });
    }
    async checkInitialAssessment(memberId) {
        const hasInitial = await this.assessmentsService.hasInitialAssessment(memberId);
        const initialAssessment = hasInitial
            ? await this.assessmentsService.getInitialAssessment(memberId)
            : null;
        return api_response_1.ApiResponseHelper.success({
            hasInitialAssessment: hasInitial,
            initialAssessment: initialAssessment ? {
                id: initialAssessment.id,
                assessedAt: initialAssessment.assessedAt,
                assessmentType: initialAssessment.assessmentType,
            } : null,
        });
    }
    async findOne(memberId, id) {
        const assessment = await this.assessmentsService.findOne(id, memberId);
        return api_response_1.ApiResponseHelper.success(assessment, '평가 조회 성공');
    }
    async create(memberId, createAssessmentDto) {
        const assessment = await this.assessmentsService.create(memberId, createAssessmentDto);
        return api_response_1.ApiResponseHelper.success(assessment, "평가 생성 성공");
    }
    async update(memberId, id, updateAssessmentDto) {
        const assessment = await this.assessmentsService.update(id, memberId, updateAssessmentDto);
        return api_response_1.ApiResponseHelper.success(assessment, '평가 수정 성공');
    }
};
exports.AssessmentsController = AssessmentsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '평가 목록 조회', description: '특정 회원의 모든 평가 목록을 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '평가 목록 조회 성공' }),
    __param(0, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssessmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('check-initial'),
    (0, swagger_1.ApiOperation)({
        summary: '초기 평가 존재 여부 확인',
        description: '회원의 초기 평가 존재 여부를 확인합니다. 프론트엔드에서 평가 생성 전에 호출하여 평가 타입을 결정할 수 있습니다.'
    }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '초기 평가 존재 여부 확인 성공' }),
    __param(0, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AssessmentsController.prototype, "checkInitialAssessment", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '평가 상세 조회', description: '특정 평가의 상세 정보를 조회합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '평가 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '평가 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '평가를 찾을 수 없습니다.' }),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AssessmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({
        summary: '평가 생성',
        description: '새로운 평가를 생성합니다. (ADMIN, TRAINER 권한 필요)\n\n' +
            '**점수 계산**: 백엔드에서 자동으로 등급 → 점수 변환을 수행합니다.\n' +
            '- 하체 근력, 심폐 지구력, 근지구력: 등급(A, B, C 등) → 내부 점수(0-100) 변환\n' +
            '- 유연성: 항목별 등급을 가중치로 변환하여 합산 후 점수 계산\n' +
            '- 체성분: 회원의 age, gender로 연령대별 기준 조회 후 판정\n' +
            '- 안정성: OHSA 등급 + 통증 여부 조합으로 점수 계산\n\n' +
            '**응답**: 생성된 평가와 함께 `items[].score`, `items[].details.internalScore`, `snapshot` 정보가 포함됩니다.\n\n' +
            '자세한 점수 계산 방식은 `점수계산표.md` 문서를 참고하세요.'
    }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: create_assessment_dto_1.CreateAssessmentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: '평가 생성 성공', type: create_assessment_dto_1.CreateAssessmentDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '잘못된 요청 데이터 또는 초기 평가 이미 존재' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '회원을 찾을 수 없음' }),
    __param(0, (0, common_1.Param)("memberId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof create_assessment_dto_1.CreateAssessmentDto !== "undefined" && create_assessment_dto_1.CreateAssessmentDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AssessmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    (0, swagger_1.ApiOperation)({ summary: '평가 수정', description: '기존 평가를 수정합니다. (ADMIN, TRAINER 권한 필요)' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '평가 ID (UUID)', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: update_assessment_dto_1.UpdateAssessmentDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '평가 수정 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '평가를 찾을 수 없습니다.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: '권한 없음' }),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, typeof (_c = typeof update_assessment_dto_1.UpdateAssessmentDto !== "undefined" && update_assessment_dto_1.UpdateAssessmentDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AssessmentsController.prototype, "update", null);
exports.AssessmentsController = AssessmentsController = __decorate([
    (0, swagger_1.ApiTags)("assessments"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)('api/members/:memberId/assessments'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof assessments_service_1.AssessmentsService !== "undefined" && assessments_service_1.AssessmentsService) === "function" ? _a : Object])
], AssessmentsController);


/***/ }),
/* 119 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAssessmentDto = void 0;
const class_validator_1 = __webpack_require__(31);
const class_transformer_1 = __webpack_require__(83);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
const create_assessment_item_dto_1 = __webpack_require__(120);
class CreateAssessmentDto {
}
exports.CreateAssessmentDto = CreateAssessmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '평가 타입',
        enum: enums_1.AssessmentType,
        example: enums_1.AssessmentType.INITIAL,
    }),
    (0, class_validator_1.IsEnum)(enums_1.AssessmentType, { message: '올바른 평가 타입이 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.AssessmentType !== "undefined" && enums_1.AssessmentType) === "function" ? _a : Object)
], CreateAssessmentDto.prototype, "assessmentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '평가 위계 타입 (정적/동적 평가 구분)',
        enum: enums_1.EvaluationType,
        example: enums_1.EvaluationType.DYNAMIC,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.EvaluationType, { message: '올바른 평가 위계 타입이 아닙니다.' }),
    __metadata("design:type", typeof (_b = typeof enums_1.EvaluationType !== "undefined" && enums_1.EvaluationType) === "function" ? _b : Object)
], CreateAssessmentDto.prototype, "evaluationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '정적평가 데이터 (설문조사, 체성분 평가, 육안체형평가)',
        example: {
            survey: {},
            bodyComposition: {
                muscleMass: 50.5,
                bodyFatPercentage: 15.2,
            },
            visualAssessment: {
                notes: '전반적으로 균형잡힌 체형',
            },
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAssessmentDto.prototype, "staticEvaluation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '동적평가 데이터 (유연성, 근력, 밸런스, 유산소성 평가)',
        example: {
            flexibility: {},
            strength: {},
            balance: {},
            cardio: {},
        },
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateAssessmentDto.prototype, "dynamicEvaluation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '평가일 (YYYY-MM-DD 형식)',
        example: '2024-01-01',
    }),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "assessedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '트레이너 코멘트',
        example: '전반적으로 양호한 상태입니다.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '트레이너 코멘트는 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], CreateAssessmentDto.prototype, "trainerComment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '체중 (kg)',
        example: 70.5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: '체중은 숫자여야 합니다.' }),
    __metadata("design:type", Number)
], CreateAssessmentDto.prototype, "bodyWeight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '컨디션',
        enum: enums_1.Condition,
        example: enums_1.Condition.GOOD,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Condition, { message: '올바른 컨디션이 아닙니다.' }),
    __metadata("design:type", typeof (_c = typeof enums_1.Condition !== "undefined" && enums_1.Condition) === "function" ? _c : Object)
], CreateAssessmentDto.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '평가 항목 배열',
        type: [create_assessment_item_dto_1.CreateAssessmentItemDto],
        example: [
            {
                category: 'STRENGTH',
                name: '벤치프레스',
                value: 80,
                unit: 'kg',
            },
        ],
    }),
    (0, class_validator_1.IsArray)({ message: '평가 항목은 배열이어야 합니다.' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_assessment_item_dto_1.CreateAssessmentItemDto),
    __metadata("design:type", Array)
], CreateAssessmentDto.prototype, "items", void 0);


/***/ }),
/* 120 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAssessmentItemDto = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
class CreateAssessmentItemDto {
}
exports.CreateAssessmentItemDto = CreateAssessmentItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '평가 카테고리',
        enum: enums_1.Category,
        example: enums_1.Category.STRENGTH,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Category, { message: '올바른 카테고리가 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.Category !== "undefined" && enums_1.Category) === "function" ? _a : Object)
], CreateAssessmentItemDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '평가 항목 이름',
        example: '체중 스쿼트',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)({ message: '이름은 문자열이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(255, { message: '이름은 255자 이하여야 합니다.' }),
    __metadata("design:type", String)
], CreateAssessmentItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '측정값 (등급 기반 평가의 경우 null 가능)',
        example: 80,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: '값은 숫자여야 합니다.' }),
    __metadata("design:type", Number)
], CreateAssessmentItemDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '단위 (value가 null이면 unit도 null)',
        example: 'kg',
        maxLength: 50,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '단위는 문자열이어야 합니다.' }),
    (0, class_validator_1.MaxLength)(50, { message: '단위는 50자 이하여야 합니다.' }),
    __metadata("design:type", String)
], CreateAssessmentItemDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '평가 항목 상세 정보 (등급, 관찰 포인트, 대체 항목 정보 등). 카테고리별로 필요한 필드가 다릅니다.\n\n' +
            '**하체 근력 (STRENGTH)**: `grade` 필수 (A, B, C, D-1, D-2)\n' +
            '**심폐 지구력 (CARDIO)**: `grade` 필수 (A, B, C, IMPOSSIBLE), B 선택 시 `recoverySpeed` 권장 (["fast"] 또는 ["slow"])\n' +
            '**근지구력 (ENDURANCE)**: `grade` 필수 (A, B, C, IMPOSSIBLE)\n' +
            '**유연성 (FLEXIBILITY)**: `flexibilityItems` 필수 (최소 1개 항목)\n' +
            '**체성분 (BODY)**: `muscleMass`, `fatMass`, `bodyFatPercentage` 필수 (회원의 age, gender는 백엔드에서 자동 조회)\n' +
            '**안정성 (STABILITY)**: `ohsa`, `pain` 필수\n\n' +
            '⚠️ 주의: `internalScore`는 백엔드에서 자동 계산되므로 입력하지 마세요.',
        example: {
            grade: 'A',
            internalScore: 80,
            recoverySpeed: ['fast'],
            flexibilityItems: {
                sitAndReach: 'A',
                shoulder: 'B',
                hip: 'C',
            },
            ohsa: 'A',
            pain: 'none',
            muscleMass: 45.2,
            fatMass: 15.8,
            bodyFatPercentage: 22.4,
        },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)({ message: '상세 정보는 객체여야 합니다.' }),
    __metadata("design:type", Object)
], CreateAssessmentItemDto.prototype, "details", void 0);


/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAssessmentDto = void 0;
const class_validator_1 = __webpack_require__(31);
const class_transformer_1 = __webpack_require__(83);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
const create_assessment_item_dto_1 = __webpack_require__(120);
class UpdateAssessmentDto {
}
exports.UpdateAssessmentDto = UpdateAssessmentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '평가일 (YYYY-MM-DD 형식)',
        example: '2024-01-01',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "assessedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '트레이너 코멘트',
        example: '전반적으로 양호한 상태입니다.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: '트레이너 코멘트는 문자열이어야 합니다.' }),
    __metadata("design:type", String)
], UpdateAssessmentDto.prototype, "trainerComment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '체중 (kg)',
        example: 70.5,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: '체중은 숫자여야 합니다.' }),
    __metadata("design:type", Number)
], UpdateAssessmentDto.prototype, "bodyWeight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '컨디션',
        enum: enums_1.Condition,
        example: enums_1.Condition.GOOD,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Condition, { message: '올바른 컨디션이 아닙니다.' }),
    __metadata("design:type", typeof (_a = typeof enums_1.Condition !== "undefined" && enums_1.Condition) === "function" ? _a : Object)
], UpdateAssessmentDto.prototype, "condition", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '평가 위계 타입 (정적/동적 평가 구분)',
        enum: enums_1.EvaluationType,
        example: enums_1.EvaluationType.DYNAMIC,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.EvaluationType, { message: '올바른 평가 위계 타입이 아닙니다.' }),
    __metadata("design:type", typeof (_b = typeof enums_1.EvaluationType !== "undefined" && enums_1.EvaluationType) === "function" ? _b : Object)
], UpdateAssessmentDto.prototype, "evaluationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '정적평가 데이터 (설문조사, 체성분 평가, 육안체형평가)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateAssessmentDto.prototype, "staticEvaluation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '동적평가 데이터 (유연성, 근력, 밸런스, 유산소성 평가)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateAssessmentDto.prototype, "dynamicEvaluation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '평가 항목 배열',
        type: [create_assessment_item_dto_1.CreateAssessmentItemDto],
        example: [
            {
                category: 'STRENGTH',
                name: '벤치프레스',
                value: 80,
                unit: 'kg',
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: '평가 항목은 배열이어야 합니다.' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_assessment_item_dto_1.CreateAssessmentItemDto),
    __metadata("design:type", Array)
], UpdateAssessmentDto.prototype, "items", void 0);


/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const analytics_controller_1 = __webpack_require__(123);
const analytics_service_1 = __webpack_require__(124);
const ability_snapshot_entity_1 = __webpack_require__(54);
const member_entity_1 = __webpack_require__(51);
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([ability_snapshot_entity_1.AbilitySnapshot, member_entity_1.Member])],
        controllers: [analytics_controller_1.AnalyticsController],
        providers: [analytics_service_1.AnalyticsService],
        exports: [analytics_service_1.AnalyticsService],
    })
], AnalyticsModule);


/***/ }),
/* 123 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const analytics_service_1 = __webpack_require__(124);
const guards_1 = __webpack_require__(36);
const api_response_1 = __webpack_require__(43);
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getAverages() {
        const averages = await this.analyticsService.getAverages();
        return api_response_1.ApiResponseHelper.success(averages, '전체 평균 조회 성공');
    }
    async compareWithAverage(memberId) {
        const comparison = await this.analyticsService.compareWithAverage(memberId);
        return api_response_1.ApiResponseHelper.success(comparison, "평균 비교 조회 성공");
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('averages'),
    (0, swagger_1.ApiOperation)({ summary: '전체 평균 데이터 조회', description: '모든 회원의 능력치 평균 데이터를 조회합니다.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getAverages", null);
__decorate([
    (0, common_1.Get)("comparison/:memberId"),
    (0, swagger_1.ApiOperation)({ summary: '개별 vs 평균 비교', description: '특정 회원의 능력치와 전체 평균을 비교합니다.' }),
    (0, swagger_1.ApiParam)({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
    __param(0, (0, common_1.Param)("memberId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "compareWithAverage", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)("analytics"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)('api/analytics'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof analytics_service_1.AnalyticsService !== "undefined" && analytics_service_1.AnalyticsService) === "function" ? _a : Object])
], AnalyticsController);


/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AnalyticsService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const ability_snapshot_entity_1 = __webpack_require__(54);
const member_entity_1 = __webpack_require__(51);
const exceptions_1 = __webpack_require__(27);
const snapshot_normalizer_1 = __webpack_require__(105);
const analytics_helper_1 = __webpack_require__(112);
let AnalyticsService = AnalyticsService_1 = class AnalyticsService {
    constructor(abilitySnapshotRepository, memberRepository) {
        this.abilitySnapshotRepository = abilitySnapshotRepository;
        this.memberRepository = memberRepository;
        this.logger = new common_1.Logger(AnalyticsService_1.name);
    }
    async getAverages() {
        const members = await this.memberRepository.find();
        const latestSnapshots = await Promise.all(members.map((member) => this.abilitySnapshotRepository.findOne({
            where: { memberId: member.id },
            order: { assessedAt: 'DESC' },
        })));
        const averages = analytics_helper_1.AnalyticsHelper.calculateAverages(latestSnapshots);
        const validCount = snapshot_normalizer_1.SnapshotNormalizer.normalizeArray(latestSnapshots).length;
        return {
            ...averages,
            totalMembers: validCount,
        };
    }
    async compareWithAverage(memberId) {
        const memberSnapshot = await this.abilitySnapshotRepository.findOne({
            where: { memberId },
            order: { assessedAt: 'DESC' },
        });
        if (!memberSnapshot) {
            this.logger.warn(`회원의 능력치 스냅샷을 찾을 수 없습니다. MemberId: ${memberId}`);
            throw exceptions_1.ApiExceptions.abilitySnapshotNotFound("회원의 능력치 스냅샷을 찾을 수 없습니다.");
        }
        const averages = await this.getAverages();
        const normalizedMember = snapshot_normalizer_1.SnapshotNormalizer.normalize(memberSnapshot, memberId);
        const percentile = analytics_helper_1.AnalyticsHelper.calculatePercentiles(normalizedMember, averages);
        return {
            member: normalizedMember,
            average: {
                strengthScore: averages.strengthScore,
                cardioScore: averages.cardioScore,
                enduranceScore: averages.enduranceScore,
                flexibilityScore: averages.flexibilityScore,
                bodyScore: averages.bodyScore,
                stabilityScore: averages.stabilityScore,
                totalScore: averages.totalScore,
            },
            percentile,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = AnalyticsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ability_snapshot_entity_1.AbilitySnapshot)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], AnalyticsService);


/***/ }),
/* 125 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsightsModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const insights_controller_1 = __webpack_require__(126);
const insights_service_1 = __webpack_require__(127);
const ability_snapshot_entity_1 = __webpack_require__(54);
const member_entity_1 = __webpack_require__(51);
const assessment_entity_1 = __webpack_require__(52);
const injury_history_entity_1 = __webpack_require__(55);
const membership_entity_1 = __webpack_require__(57);
let InsightsModule = class InsightsModule {
};
exports.InsightsModule = InsightsModule;
exports.InsightsModule = InsightsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ability_snapshot_entity_1.AbilitySnapshot, member_entity_1.Member, assessment_entity_1.Assessment, injury_history_entity_1.InjuryHistory, membership_entity_1.Membership]),
        ],
        controllers: [insights_controller_1.InsightsController],
        providers: [insights_service_1.InsightsService],
        exports: [insights_service_1.InsightsService],
    })
], InsightsModule);


/***/ }),
/* 126 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsightsController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const insights_service_1 = __webpack_require__(127);
const guards_1 = __webpack_require__(36);
const roles_decorator_1 = __webpack_require__(40);
const enums_1 = __webpack_require__(18);
const api_response_1 = __webpack_require__(43);
let InsightsController = class InsightsController {
    constructor(insightsService) {
        this.insightsService = insightsService;
    }
    async getHexagon() {
        const hexagon = await this.insightsService.getHexagon();
        return api_response_1.ApiResponseHelper.success(hexagon, "운영 능력치 헥사곤 조회 성공");
    }
    async getWeeklySummary() {
        const summary = await this.insightsService.getWeeklySummary();
        return api_response_1.ApiResponseHelper.success(summary, "주간 요약 조회 성공");
    }
    async getRiskMembers() {
        const riskMembers = await this.insightsService.getRiskMembers();
        return api_response_1.ApiResponseHelper.success(riskMembers, "위험 신호 회원 조회 성공");
    }
    async getCenterDashboard() {
        const dashboard = await this.insightsService.getCenterDashboard();
        return api_response_1.ApiResponseHelper.success(dashboard, "센터 대시보드 조회 성공");
    }
};
exports.InsightsController = InsightsController;
__decorate([
    (0, common_1.Get)("hexagon"),
    (0, swagger_1.ApiOperation)({ summary: "운영 능력치 헥사곤 조회", description: "전체 회원의 평균 능력치 헥사곤 데이터를 조회합니다. (ADMIN, TRAINER만)" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getHexagon", null);
__decorate([
    (0, common_1.Get)("weekly-summary"),
    (0, swagger_1.ApiOperation)({ summary: "주간 요약 조회", description: "이번 주와 지난 주의 평가 데이터를 비교합니다. (ADMIN, TRAINER만)" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getWeeklySummary", null);
__decorate([
    (0, common_1.Get)("risk-members"),
    (0, swagger_1.ApiOperation)({ summary: "위험 신호 회원 조회", description: "능력치 하락, 부상, 비활성 등 위험 신호가 있는 회원 목록을 조회합니다. (ADMIN, TRAINER만)" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getRiskMembers", null);
__decorate([
    (0, common_1.Get)("center-dashboard"),
    (0, swagger_1.ApiOperation)({
        summary: "센터 대시보드 조회",
        description: "센터 전체 통계 및 회원 목록을 조회합니다. (ADMIN, TRAINER만)",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InsightsController.prototype, "getCenterDashboard", null);
exports.InsightsController = InsightsController = __decorate([
    (0, swagger_1.ApiTags)("insights"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)("api/insights"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    __metadata("design:paramtypes", [typeof (_a = typeof insights_service_1.InsightsService !== "undefined" && insights_service_1.InsightsService) === "function" ? _a : Object])
], InsightsController);


/***/ }),
/* 127 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsightsService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const ability_snapshot_entity_1 = __webpack_require__(54);
const member_entity_1 = __webpack_require__(51);
const assessment_entity_1 = __webpack_require__(52);
const injury_history_entity_1 = __webpack_require__(55);
const membership_entity_1 = __webpack_require__(57);
const enums_1 = __webpack_require__(18);
const date_helper_1 = __webpack_require__(9);
const snapshot_normalizer_1 = __webpack_require__(105);
const analytics_helper_1 = __webpack_require__(112);
let InsightsService = class InsightsService {
    constructor(abilitySnapshotRepository, memberRepository, assessmentRepository, injuryHistoryRepository, membershipRepository) {
        this.abilitySnapshotRepository = abilitySnapshotRepository;
        this.memberRepository = memberRepository;
        this.assessmentRepository = assessmentRepository;
        this.injuryHistoryRepository = injuryHistoryRepository;
        this.membershipRepository = membershipRepository;
    }
    async getHexagon() {
        const members = await this.memberRepository.find({
            where: { status: enums_1.MemberStatus.ACTIVE },
        });
        if (members.length === 0) {
            return {
                indicators: analytics_helper_1.AnalyticsHelper.emptyHexagonIndicators(),
                assessedAt: date_helper_1.DateHelper.getKoreaTimeISOString(),
                version: "v1",
            };
        }
        const latestSnapshots = await Promise.all(members.map((member) => this.abilitySnapshotRepository.findOne({
            where: { memberId: member.id },
            order: { assessedAt: "DESC" },
        })));
        const validSnapshots = snapshot_normalizer_1.SnapshotNormalizer.normalizeArray(latestSnapshots);
        if (validSnapshots.length === 0) {
            return {
                indicators: analytics_helper_1.AnalyticsHelper.emptyHexagonIndicators(),
                assessedAt: date_helper_1.DateHelper.getKoreaTimeISOString(),
                version: "v1",
            };
        }
        const averages = analytics_helper_1.AnalyticsHelper.calculateAverages(validSnapshots);
        const latestDate = validSnapshots.reduce((latest, snapshot) => snapshot.assessedAt > latest ? snapshot.assessedAt : latest, validSnapshots[0].assessedAt);
        return {
            indicators: analytics_helper_1.AnalyticsHelper.averagesToHexagonIndicators(averages),
            assessedAt: date_helper_1.DateHelper.toKoreaTimeISOString(latestDate),
            version: validSnapshots[0].version || "v1",
        };
    }
    async getWeeklySummary() {
        const now = new Date();
        const thisWeekStart = new Date(now);
        thisWeekStart.setDate(now.getDate() - 7);
        const lastWeekStart = new Date(thisWeekStart);
        lastWeekStart.setDate(thisWeekStart.getDate() - 7);
        const thisWeekSnapshots = await this.abilitySnapshotRepository.find({
            where: {
                assessedAt: (0, typeorm_2.MoreThan)(thisWeekStart),
            },
            order: { assessedAt: "DESC" },
        });
        const lastWeekSnapshots = await this.abilitySnapshotRepository.find({
            where: {
                assessedAt: (0, typeorm_2.MoreThan)(lastWeekStart),
            },
            order: { assessedAt: "DESC" },
        });
        const normalizedThisWeek = snapshot_normalizer_1.SnapshotNormalizer.normalizeArray(thisWeekSnapshots);
        const normalizedLastWeek = snapshot_normalizer_1.SnapshotNormalizer.normalizeArray(lastWeekSnapshots);
        const thisWeek = analytics_helper_1.AnalyticsHelper.calculateAverages(normalizedThisWeek);
        const lastWeek = analytics_helper_1.AnalyticsHelper.calculateAverages(normalizedLastWeek);
        const changes = {
            strengthScore: thisWeek.strengthScore - lastWeek.strengthScore,
            cardioScore: thisWeek.cardioScore - lastWeek.cardioScore,
            enduranceScore: thisWeek.enduranceScore - lastWeek.enduranceScore,
            bodyScore: thisWeek.bodyScore - lastWeek.bodyScore,
            stabilityScore: thisWeek.stabilityScore - lastWeek.stabilityScore,
            totalScore: thisWeek.totalScore - lastWeek.totalScore,
        };
        const percentageChange = {
            strengthScore: lastWeek.strengthScore !== 0 ? (changes.strengthScore / lastWeek.strengthScore) * 100 : 0,
            cardioScore: lastWeek.cardioScore !== 0 ? (changes.cardioScore / lastWeek.cardioScore) * 100 : 0,
            enduranceScore: lastWeek.enduranceScore !== 0 ? (changes.enduranceScore / lastWeek.enduranceScore) * 100 : 0,
            bodyScore: lastWeek.bodyScore !== 0 ? (changes.bodyScore / lastWeek.bodyScore) * 100 : 0,
            stabilityScore: lastWeek.stabilityScore !== 0 ? (changes.stabilityScore / lastWeek.stabilityScore) * 100 : 0,
            totalScore: lastWeek.totalScore !== 0 ? (changes.totalScore / lastWeek.totalScore) * 100 : 0,
        };
        return {
            thisWeek: {
                strengthScore: Math.round(thisWeek.strengthScore),
                cardioScore: Math.round(thisWeek.cardioScore),
                enduranceScore: Math.round(thisWeek.enduranceScore),
                bodyScore: Math.round(thisWeek.bodyScore),
                stabilityScore: Math.round(thisWeek.stabilityScore),
                totalScore: Math.round(thisWeek.totalScore),
            },
            lastWeek: {
                strengthScore: Math.round(lastWeek.strengthScore),
                cardioScore: Math.round(lastWeek.cardioScore),
                enduranceScore: Math.round(lastWeek.enduranceScore),
                bodyScore: Math.round(lastWeek.bodyScore),
                stabilityScore: Math.round(lastWeek.stabilityScore),
                totalScore: Math.round(lastWeek.totalScore),
            },
            changes: {
                strengthScore: Math.round(changes.strengthScore),
                cardioScore: Math.round(changes.cardioScore),
                enduranceScore: Math.round(changes.enduranceScore),
                bodyScore: Math.round(changes.bodyScore),
                stabilityScore: Math.round(changes.stabilityScore),
                totalScore: Math.round(changes.totalScore),
            },
            percentageChange: {
                strengthScore: Math.round(percentageChange.strengthScore * 100) / 100,
                cardioScore: Math.round(percentageChange.cardioScore * 100) / 100,
                enduranceScore: Math.round(percentageChange.enduranceScore * 100) / 100,
                bodyScore: Math.round(percentageChange.bodyScore * 100) / 100,
                stabilityScore: Math.round(percentageChange.stabilityScore * 100) / 100,
                totalScore: Math.round(percentageChange.totalScore * 100) / 100,
            },
        };
    }
    async getRiskMembers() {
        const members = await this.memberRepository.find({
            where: { status: enums_1.MemberStatus.ACTIVE },
            select: ["id", "name"],
        });
        if (members.length === 0) {
            return [];
        }
        const memberIds = members.map(m => m.id);
        const [snapshotsData, injuriesData, assessmentsData] = await Promise.all([
            this.abilitySnapshotRepository
                .createQueryBuilder("snapshot")
                .select([
                "snapshot.id",
                "snapshot.memberId",
                "snapshot.assessedAt",
                "snapshot.strengthScore",
                "snapshot.cardioScore",
                "snapshot.enduranceScore",
                "snapshot.flexibilityScore",
                "snapshot.bodyScore",
                "snapshot.stabilityScore",
                "snapshot.totalScore",
                "snapshot.version",
            ])
                .where("snapshot.memberId IN (:...memberIds)", { memberIds })
                .orderBy("snapshot.memberId", "ASC")
                .addOrderBy("snapshot.assessedAt", "DESC")
                .getMany(),
            this.injuryHistoryRepository
                .createQueryBuilder("injury")
                .select([
                "injury.id",
                "injury.memberId",
                "injury.bodyPart",
                "injury.injuryType",
            ])
                .where("injury.memberId IN (:...memberIds)", { memberIds })
                .andWhere("injury.recoveryStatus IN (:...statuses)", {
                statuses: [enums_1.RecoveryStatus.RECOVERING, enums_1.RecoveryStatus.CHRONIC],
            })
                .andWhere("injury.deletedAt IS NULL")
                .getMany(),
            this.assessmentRepository
                .createQueryBuilder("assessment")
                .select([
                "assessment.id",
                "assessment.memberId",
                "assessment.assessedAt",
            ])
                .where("assessment.memberId IN (:...memberIds)", { memberIds })
                .andWhere("assessment.deletedAt IS NULL")
                .orderBy("assessment.memberId", "ASC")
                .addOrderBy("assessment.assessedAt", "DESC")
                .getMany(),
        ]);
        const snapshotsByMember = new Map();
        for (const snapshot of snapshotsData) {
            if (!snapshotsByMember.has(snapshot.memberId)) {
                snapshotsByMember.set(snapshot.memberId, []);
            }
            const memberSnapshots = snapshotsByMember.get(snapshot.memberId);
            if (memberSnapshots.length < 2) {
                memberSnapshots.push(snapshot);
            }
        }
        const injuriesByMember = new Map();
        for (const injury of injuriesData) {
            if (!injuriesByMember.has(injury.memberId)) {
                injuriesByMember.set(injury.memberId, []);
            }
            injuriesByMember.get(injury.memberId).push(injury);
        }
        const lastAssessmentByMember = new Map();
        for (const assessment of assessmentsData) {
            if (!lastAssessmentByMember.has(assessment.memberId)) {
                lastAssessmentByMember.set(assessment.memberId, assessment);
            }
        }
        const riskMembersMap = new Map();
        for (const member of members) {
            const memberId = member.id;
            const riskSignals = [];
            const snapshots = snapshotsByMember.get(memberId) || [];
            if (snapshots.length >= 2) {
                const current = snapshot_normalizer_1.SnapshotNormalizer.normalize(snapshots[0], memberId);
                const previous = snapshot_normalizer_1.SnapshotNormalizer.normalize(snapshots[1], memberId);
                const currentTotalScore = current.totalScore;
                const previousTotalScore = previous.totalScore;
                if (currentTotalScore > 0 && previousTotalScore > 0) {
                    const declinePercentage = ((previousTotalScore - currentTotalScore) / previousTotalScore) * 100;
                    if (declinePercentage >= 10) {
                        riskSignals.push({
                            memberId: member.id,
                            memberName: member.name,
                            riskType: "DECLINE",
                            description: `능력치가 ${Math.round(declinePercentage)}% 하락했습니다.`,
                            currentScore: currentTotalScore,
                            previousScore: previousTotalScore,
                            declinePercentage: Math.round(declinePercentage),
                        });
                    }
                }
            }
            const activeInjuries = injuriesByMember.get(memberId) || [];
            if (activeInjuries.length > 0) {
                const injuryTypes = activeInjuries.map(injury => `${injury.bodyPart} ${injury.injuryType}`).join(", ");
                riskSignals.push({
                    memberId: member.id,
                    memberName: member.name,
                    riskType: "INJURY",
                    description: `활성 부상이 있습니다: ${injuryTypes}`,
                });
            }
            const lastAssessment = lastAssessmentByMember.get(memberId);
            if (!lastAssessment) {
                riskSignals.push({
                    memberId: member.id,
                    memberName: member.name,
                    riskType: "INACTIVE",
                    description: "최근 평가 기록이 없습니다.",
                });
            }
            else {
                const assessedAtDate = lastAssessment.assessedAt instanceof Date
                    ? lastAssessment.assessedAt
                    : new Date(lastAssessment.assessedAt);
                const daysSinceLastAssessment = (Date.now() - assessedAtDate.getTime()) / (1000 * 60 * 60 * 24);
                if (daysSinceLastAssessment > 30) {
                    riskSignals.push({
                        memberId: member.id,
                        memberName: member.name,
                        riskType: "INACTIVE",
                        description: `마지막 평가로부터 ${Math.round(daysSinceLastAssessment)}일이 경과했습니다.`,
                    });
                }
            }
            if (riskSignals.length > 0) {
                const priorityOrder = { DECLINE: 1, INJURY: 2, INACTIVE: 3 };
                const selectedRisk = riskSignals.reduce((prev, current) => {
                    return priorityOrder[prev.riskType] < priorityOrder[current.riskType] ? prev : current;
                });
                riskMembersMap.set(memberId, selectedRisk);
            }
        }
        return Array.from(riskMembersMap.values());
    }
    async getCenterDashboard() {
        const members = await this.memberRepository.find({
            select: ['id', 'name', 'phone', 'status', 'totalSessions', 'completedSessions'],
            order: { createdAt: 'DESC' },
        });
        const memberIds = members.map(m => m.id);
        const [memberships, lastAssessments] = await Promise.all([
            this.membershipRepository.find({
                where: { memberId: (0, typeorm_2.In)(memberIds), status: enums_1.MembershipStatus.ACTIVE },
                select: ['memberId', 'mainGoalLabel', 'currentProgress', 'durationWeeks', 'riskStatus'],
            }),
            this.assessmentRepository
                .createQueryBuilder('assessment')
                .select(['assessment.memberId', 'assessment.assessedAt'])
                .where('assessment.memberId IN (:...memberIds)', { memberIds })
                .andWhere('assessment.deletedAt IS NULL')
                .orderBy('assessment.memberId', 'ASC')
                .addOrderBy('assessment.assessedAt', 'DESC')
                .getMany(),
        ]);
        const membershipByMember = new Map();
        for (const membership of memberships) {
            if (!membershipByMember.has(membership.memberId)) {
                membershipByMember.set(membership.memberId, membership);
            }
        }
        const lastAssessmentByMember = new Map();
        for (const assessment of lastAssessments) {
            if (!lastAssessmentByMember.has(assessment.memberId)) {
                lastAssessmentByMember.set(assessment.memberId, assessment.assessedAt);
            }
        }
        const activeMembers = members.filter(m => m.status === enums_1.MemberStatus.ACTIVE);
        const riskCounts = { green: 0, yellow: 0, red: 0 };
        let totalProgress = 0;
        let progressCount = 0;
        let missingMeasurements = 0;
        const memberList = members.map(member => {
            const membership = membershipByMember.get(member.id);
            const lastAssessmentDate = lastAssessmentByMember.get(member.id);
            const riskStatus = membership?.riskStatus || enums_1.RiskStatus.GREEN;
            if (riskStatus === enums_1.RiskStatus.GREEN)
                riskCounts.green++;
            else if (riskStatus === enums_1.RiskStatus.YELLOW)
                riskCounts.yellow++;
            else if (riskStatus === enums_1.RiskStatus.RED)
                riskCounts.red++;
            if (membership?.currentProgress) {
                totalProgress += membership.currentProgress;
                progressCount++;
            }
            if (!lastAssessmentDate) {
                missingMeasurements++;
            }
            else {
                const daysSince = (Date.now() - new Date(lastAssessmentDate).getTime()) / (1000 * 60 * 60 * 24);
                if (daysSince > 30)
                    missingMeasurements++;
            }
            return {
                id: member.id,
                name: member.name,
                phone: member.phone,
                status: member.status,
                riskStatus,
                program: membership ? {
                    mainGoal: membership.mainGoalLabel || null,
                    currentProgress: membership.currentProgress || 0,
                    durationWeeks: membership.durationWeeks || null,
                } : null,
                lastAssessmentDate: lastAssessmentDate
                    ? new Date(lastAssessmentDate).toISOString().split('T')[0]
                    : null,
                completedSessions: member.completedSessions,
                totalSessions: member.totalSessions,
            };
        });
        return {
            summary: {
                totalMembers: members.length,
                activeMembers: activeMembers.length,
                averageProgress: progressCount > 0 ? Math.round(totalProgress / progressCount) : 0,
                riskCounts,
                missingMeasurements,
            },
            memberList,
        };
    }
};
exports.InsightsService = InsightsService;
exports.InsightsService = InsightsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ability_snapshot_entity_1.AbilitySnapshot)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(assessment_entity_1.Assessment)),
    __param(3, (0, typeorm_1.InjectRepository)(injury_history_entity_1.InjuryHistory)),
    __param(4, (0, typeorm_1.InjectRepository)(membership_entity_1.Membership)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
], InsightsService);


/***/ }),
/* 128 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExercisesModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const exercises_controller_1 = __webpack_require__(129);
const exercises_service_1 = __webpack_require__(130);
const exercise_entity_1 = __webpack_require__(67);
const workout_record_entity_1 = __webpack_require__(61);
let ExercisesModule = class ExercisesModule {
};
exports.ExercisesModule = ExercisesModule;
exports.ExercisesModule = ExercisesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exercise_entity_1.Exercise, workout_record_entity_1.WorkoutRecord])],
        controllers: [exercises_controller_1.ExercisesController],
        providers: [exercises_service_1.ExercisesService],
        exports: [exercises_service_1.ExercisesService],
    })
], ExercisesModule);


/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExercisesController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const exercises_service_1 = __webpack_require__(130);
const get_exercises_dto_1 = __webpack_require__(131);
const guards_1 = __webpack_require__(36);
const api_response_1 = __webpack_require__(43);
let ExercisesController = class ExercisesController {
    constructor(exercisesService) {
        this.exercisesService = exercisesService;
    }
    async findAll(query) {
        const exercises = await this.exercisesService.findAll(query);
        return api_response_1.ApiResponseHelper.success({ exercises: exercises.data, total: exercises.total }, '운동 목록 조회 성공');
    }
    async findOne(id) {
        const exercise = await this.exercisesService.findOne(id);
        return api_response_1.ApiResponseHelper.success(exercise, '운동 상세 조회 성공');
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: '운동 목록 조회',
        description: '필터링 및 검색을 지원하는 운동 목록을 조회합니다.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 목록 조회 성공' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof get_exercises_dto_1.GetExercisesDto !== "undefined" && get_exercises_dto_1.GetExercisesDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '운동 상세 조회',
        description: '특정 운동의 상세 정보를 조회합니다.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: '운동 ID (UUID)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '운동 상세 조회 성공' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: '운동을 찾을 수 없습니다' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExercisesController.prototype, "findOne", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, swagger_1.ApiTags)('exercises'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('api/exercises'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof exercises_service_1.ExercisesService !== "undefined" && exercises_service_1.ExercisesService) === "function" ? _a : Object])
], ExercisesController);


/***/ }),
/* 130 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ExercisesService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExercisesService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const exercise_entity_1 = __webpack_require__(67);
const workout_record_entity_1 = __webpack_require__(61);
let ExercisesService = ExercisesService_1 = class ExercisesService {
    constructor(exerciseRepository, workoutRecordRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutRecordRepository = workoutRecordRepository;
        this.logger = new common_1.Logger(ExercisesService_1.name);
    }
    async findAll(query) {
        const queryBuilder = this.exerciseRepository.createQueryBuilder('exercise');
        if (query.category) {
            queryBuilder.andWhere('exercise.category = :category', { category: query.category });
        }
        if (query.bodyPart) {
            queryBuilder.andWhere('exercise.bodyPart = :bodyPart', { bodyPart: query.bodyPart });
        }
        if (query.search) {
            queryBuilder.andWhere('(exercise.name ILIKE :search OR exercise.nameEn ILIKE :search)', { search: `%${query.search}%` });
        }
        const isActive = query.isActive !== undefined ? query.isActive : true;
        queryBuilder.andWhere('exercise.isActive = :isActive', { isActive });
        const total = await queryBuilder.getCount();
        const page = query.page || 1;
        const limit = query.limit || 50;
        const skip = (page - 1) * limit;
        queryBuilder.skip(skip).take(limit);
        queryBuilder.orderBy('exercise.name', 'ASC');
        const exercises = await queryBuilder.getMany();
        const result = await Promise.all(exercises.map(async (exercise) => {
            const bodyPartCounts = await this.workoutRecordRepository
                .createQueryBuilder('wr')
                .select('wr.bodyPart', 'bodyPart')
                .addSelect('COUNT(*)', 'count')
                .where('(wr.exerciseName = :name OR wr.exerciseName = :nameEn)', { name: exercise.name, nameEn: exercise.nameEn })
                .groupBy('wr.bodyPart')
                .orderBy('count', 'DESC')
                .limit(1)
                .getRawOne();
            const bodyPart = bodyPartCounts?.bodyPart || exercise.bodyPart || undefined;
            let recentCount = undefined;
            if (query.memberId) {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                const count = await this.workoutRecordRepository.count({
                    where: {
                        memberId: query.memberId,
                        exerciseName: exercise.name,
                        workoutDate: (0, typeorm_2.LessThanOrEqual)(new Date()),
                    },
                });
                const recentRecords = await this.workoutRecordRepository.find({
                    where: {
                        memberId: query.memberId,
                        exerciseName: exercise.name,
                    },
                    order: {
                        workoutDate: 'DESC',
                    },
                });
                recentCount = recentRecords.filter((r) => r.workoutDate >= thirtyDaysAgo).length;
            }
            return {
                id: exercise.id,
                name: exercise.name,
                nameEn: exercise.nameEn,
                category: exercise.category,
                bodyPart,
                recentCount,
            };
        }));
        if (query.memberId) {
            result.sort((a, b) => {
                if (a.recentCount && b.recentCount) {
                    return b.recentCount - a.recentCount;
                }
                if (a.recentCount)
                    return -1;
                if (b.recentCount)
                    return 1;
                return a.name.localeCompare(b.name);
            });
        }
        return {
            data: result,
            total,
            page,
            limit,
        };
    }
    async findOne(id) {
        return this.exerciseRepository.findOneOrFail({
            where: { id },
        });
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = ExercisesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercise_entity_1.Exercise)),
    __param(1, (0, typeorm_1.InjectRepository)(workout_record_entity_1.WorkoutRecord)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], ExercisesService);


/***/ }),
/* 131 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetExercisesDto = void 0;
const class_validator_1 = __webpack_require__(31);
const class_transformer_1 = __webpack_require__(83);
const swagger_1 = __webpack_require__(4);
const exercise_entity_1 = __webpack_require__(67);
class GetExercisesDto {
}
exports.GetExercisesDto = GetExercisesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: exercise_entity_1.ExerciseCategory,
        description: '카테고리 필터 (UPPER, LOWER, FULL_BODY)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(exercise_entity_1.ExerciseCategory),
    __metadata("design:type", typeof (_a = typeof exercise_entity_1.ExerciseCategory !== "undefined" && exercise_entity_1.ExerciseCategory) === "function" ? _a : Object)
], GetExercisesDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '부위 필터 (가슴, 등, 어깨, 팔, 하체)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetExercisesDto.prototype, "bodyPart", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '검색어 (운동명 검색)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetExercisesDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '회원 ID (최근 운동 우선 정렬용)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GetExercisesDto.prototype, "memberId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '최근 운동 정보 포함 여부',
        example: false,
        default: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetExercisesDto.prototype, "includeRecent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '활성화 여부 필터',
        example: true,
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], GetExercisesDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '페이지 번호',
        example: 1,
        default: 1,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetExercisesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '페이지당 항목 수',
        example: 50,
        default: 50,
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GetExercisesDto.prototype, "limit", void 0);


/***/ }),
/* 132 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StrengthLevelModule = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const strength_level_controller_1 = __webpack_require__(133);
const strength_level_service_1 = __webpack_require__(134);
const exercise_entity_1 = __webpack_require__(67);
const strength_standard_entity_1 = __webpack_require__(68);
let StrengthLevelModule = class StrengthLevelModule {
};
exports.StrengthLevelModule = StrengthLevelModule;
exports.StrengthLevelModule = StrengthLevelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exercise_entity_1.Exercise, strength_standard_entity_1.StrengthStandard])],
        controllers: [strength_level_controller_1.StrengthLevelController],
        providers: [strength_level_service_1.StrengthLevelService],
        exports: [strength_level_service_1.StrengthLevelService],
    })
], StrengthLevelModule);


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StrengthLevelController = void 0;
const common_1 = __webpack_require__(2);
const swagger_1 = __webpack_require__(4);
const strength_level_service_1 = __webpack_require__(134);
const calculate_strength_level_dto_1 = __webpack_require__(135);
const strength_level_response_dto_1 = __webpack_require__(136);
let StrengthLevelController = class StrengthLevelController {
    constructor(strengthLevelService) {
        this.strengthLevelService = strengthLevelService;
    }
    async calculate(dto) {
        return this.strengthLevelService.calculate(dto);
    }
};
exports.StrengthLevelController = StrengthLevelController;
__decorate([
    (0, common_1.Post)('calculate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: '빅3 Strength Level 계산',
        description: `
체중, 나이, 성별을 기반으로 빅3 운동(벤치프레스, 스쿼트, 데드리프트)의 
5단계 Strength Level 기준 무게를 조회합니다.

**레벨 단계:**
- BEGINNER (헬스 입문): 운동을 시작한 지 얼마 되지 않은 단계
- NOVICE (초보자): 기본 동작을 익히고 꾸준히 운동하는 단계
- INTERMEDIATE (중급자): 일반적인 피트니스 수준을 가진 사람들보다 강함
- ADVANCED (고수): 상당한 수준의 근력을 보유
- ELITE (신): 최상위 수준의 근력, 상위 5% 이내

**사용 방법:**
1. 운동 종류, 나이, 체중, 성별을 입력
2. (선택) 현재 1RM 무게를 입력하면 현재 레벨 판정
3. 각 레벨별 목표 무게와 현재 위치 확인

**비로그인 사용 가능** - 로그인 없이도 측정 가능합니다.
		`,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Strength Level 계산 성공',
        type: strength_level_response_dto_1.StrengthLevelResponse,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: '잘못된 요청 (유효성 검사 실패)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: '운동 정보를 찾을 수 없음',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof calculate_strength_level_dto_1.CalculateStrengthLevelDto !== "undefined" && calculate_strength_level_dto_1.CalculateStrengthLevelDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], StrengthLevelController.prototype, "calculate", null);
exports.StrengthLevelController = StrengthLevelController = __decorate([
    (0, swagger_1.ApiTags)('Strength Level'),
    (0, common_1.Controller)('api/strength-level'),
    __metadata("design:paramtypes", [typeof (_a = typeof strength_level_service_1.StrengthLevelService !== "undefined" && strength_level_service_1.StrengthLevelService) === "function" ? _a : Object])
], StrengthLevelController);


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StrengthLevelService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StrengthLevelService = void 0;
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(6);
const typeorm_2 = __webpack_require__(15);
const exercise_entity_1 = __webpack_require__(67);
const strength_standard_entity_1 = __webpack_require__(68);
const enums_1 = __webpack_require__(18);
const calculate_strength_level_dto_1 = __webpack_require__(135);
const strength_level_response_dto_1 = __webpack_require__(136);
let StrengthLevelService = StrengthLevelService_1 = class StrengthLevelService {
    constructor(exerciseRepository, strengthStandardRepository) {
        this.exerciseRepository = exerciseRepository;
        this.strengthStandardRepository = strengthStandardRepository;
        this.logger = new common_1.Logger(StrengthLevelService_1.name);
    }
    async calculate(dto) {
        const { exerciseType, age, bodyWeight, gender, currentWeight } = dto;
        const exerciseNameEn = calculate_strength_level_dto_1.ExerciseTypeEnglishNames[exerciseType];
        const exercise = await this.exerciseRepository.findOne({
            where: { nameEn: exerciseNameEn },
        });
        if (!exercise) {
            throw new common_1.NotFoundException(`운동을 찾을 수 없습니다: ${exerciseNameEn}`);
        }
        const standards = await this.strengthStandardRepository
            .createQueryBuilder('ss')
            .where('ss.exercise_id = :exerciseId', { exerciseId: exercise.id })
            .andWhere('ss.gender = :gender', { gender })
            .andWhere('ss.standard_type = :standardType', { standardType: 'BODYWEIGHT' })
            .andWhere('ss.bodyweight_min <= :bodyWeight', { bodyWeight })
            .andWhere('ss.bodyweight_max >= :bodyWeight', { bodyWeight })
            .orderBy(`CASE ss.level 
					WHEN 'BEGINNER' THEN 1 
					WHEN 'NOVICE' THEN 2 
					WHEN 'INTERMEDIATE' THEN 3 
					WHEN 'ADVANCED' THEN 4 
					WHEN 'ELITE' THEN 5 
				END`, 'ASC')
            .getMany();
        let finalStandards = standards;
        if (standards.length === 0) {
            this.logger.warn(`체중 범위에 맞는 데이터 없음. 가장 가까운 범위 조회: ${bodyWeight}kg`);
            finalStandards = await this.findClosestBodyweightStandards(exercise.id, gender, bodyWeight);
        }
        const allLevels = this.buildAllLevels(finalStandards, currentWeight);
        let currentLevelInfo;
        if (currentWeight !== undefined) {
            currentLevelInfo = this.calculateCurrentLevel(allLevels, currentWeight);
        }
        return {
            success: true,
            data: {
                exercise: {
                    type: exerciseType,
                    nameKorean: calculate_strength_level_dto_1.ExerciseTypeNames[exerciseType],
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
    async findClosestBodyweightStandards(exerciseId, gender, bodyWeight) {
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
        let closestRange = allRanges[0];
        let minDistance = Math.abs(bodyWeight - (closestRange.bodyweightMin + closestRange.bodyweightMax) / 2);
        for (const range of allRanges) {
            const midPoint = (range.bodyweightMin + range.bodyweightMax) / 2;
            const distance = Math.abs(bodyWeight - midPoint);
            if (distance < minDistance) {
                minDistance = distance;
                closestRange = range;
            }
        }
        return this.strengthStandardRepository
            .createQueryBuilder('ss')
            .where('ss.exercise_id = :exerciseId', { exerciseId })
            .andWhere('ss.gender = :gender', { gender })
            .andWhere('ss.standard_type = :standardType', { standardType: 'BODYWEIGHT' })
            .andWhere('ss.bodyweight_min = :min', { min: closestRange.bodyweightMin })
            .andWhere('ss.bodyweight_max = :max', { max: closestRange.bodyweightMax })
            .orderBy(`CASE ss.level 
					WHEN 'BEGINNER' THEN 1 
					WHEN 'NOVICE' THEN 2 
					WHEN 'INTERMEDIATE' THEN 3 
					WHEN 'ADVANCED' THEN 4 
					WHEN 'ELITE' THEN 5 
				END`, 'ASC')
            .getMany();
    }
    buildAllLevels(standards, currentWeight) {
        const standardMap = new Map();
        for (const standard of standards) {
            standardMap.set(standard.level, standard);
        }
        let currentLevelIndex = -1;
        if (currentWeight !== undefined) {
            for (let i = enums_1.StrengthLevelOrder.length - 1; i >= 0; i--) {
                const level = enums_1.StrengthLevelOrder[i];
                const standard = standardMap.get(level);
                if (standard && currentWeight >= standard.weightKg) {
                    currentLevelIndex = i;
                    break;
                }
            }
        }
        return enums_1.StrengthLevelOrder.map((level, index) => {
            const standard = standardMap.get(level);
            const weight = standard?.weightKg ?? 0;
            return {
                level,
                levelKorean: strength_level_response_dto_1.StrengthLevelFriendlyNames[level],
                weight,
                description: strength_level_response_dto_1.StrengthLevelDescriptions[level],
                isCurrent: currentWeight !== undefined && index === currentLevelIndex,
                isNext: currentWeight !== undefined && index === currentLevelIndex + 1,
            };
        });
    }
    calculateCurrentLevel(allLevels, currentWeight) {
        let currentLevelIndex = -1;
        for (let i = allLevels.length - 1; i >= 0; i--) {
            if (currentWeight >= allLevels[i].weight) {
                currentLevelIndex = i;
                break;
            }
        }
        if (currentLevelIndex === -1) {
            const beginnerLevel = allLevels[0];
            return {
                level: enums_1.StrengthLevel.BEGINNER,
                levelKorean: '미달성',
                weight: currentWeight,
                weightToNextLevel: Math.round((beginnerLevel.weight - currentWeight) * 10) / 10,
                nextLevel: enums_1.StrengthLevel.BEGINNER,
                nextLevelKorean: strength_level_response_dto_1.StrengthLevelFriendlyNames[enums_1.StrengthLevel.BEGINNER],
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
};
exports.StrengthLevelService = StrengthLevelService;
exports.StrengthLevelService = StrengthLevelService = StrengthLevelService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exercise_entity_1.Exercise)),
    __param(1, (0, typeorm_1.InjectRepository)(strength_standard_entity_1.StrengthStandard)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], StrengthLevelService);


/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculateStrengthLevelDto = exports.ExerciseTypeEnglishNames = exports.ExerciseTypeNames = exports.ExerciseType = void 0;
const class_validator_1 = __webpack_require__(31);
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
var ExerciseType;
(function (ExerciseType) {
    ExerciseType["BENCH_PRESS"] = "BENCH_PRESS";
    ExerciseType["SQUAT"] = "SQUAT";
    ExerciseType["DEADLIFT"] = "DEADLIFT";
})(ExerciseType || (exports.ExerciseType = ExerciseType = {}));
exports.ExerciseTypeNames = {
    [ExerciseType.BENCH_PRESS]: '벤치프레스',
    [ExerciseType.SQUAT]: '스쿼트',
    [ExerciseType.DEADLIFT]: '데드리프트',
};
exports.ExerciseTypeEnglishNames = {
    [ExerciseType.BENCH_PRESS]: 'Bench Press',
    [ExerciseType.SQUAT]: 'Squat',
    [ExerciseType.DEADLIFT]: 'Deadlift',
};
class CalculateStrengthLevelDto {
}
exports.CalculateStrengthLevelDto = CalculateStrengthLevelDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ExerciseType,
        description: '운동 종류 (BENCH_PRESS, SQUAT, DEADLIFT)',
        example: ExerciseType.BENCH_PRESS,
    }),
    (0, class_validator_1.IsEnum)(ExerciseType),
    __metadata("design:type", String)
], CalculateStrengthLevelDto.prototype, "exerciseType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '나이 (만 나이, 15-90세)',
        example: 25,
        minimum: 15,
        maximum: 90,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(15),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], CalculateStrengthLevelDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '체중 (kg)',
        example: 70,
        minimum: 40,
        maximum: 200,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(40),
    (0, class_validator_1.Max)(200),
    __metadata("design:type", Number)
], CalculateStrengthLevelDto.prototype, "bodyWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.Gender,
        description: '성별 (MALE, FEMALE)',
        example: enums_1.Gender.MALE,
    }),
    (0, class_validator_1.IsEnum)(enums_1.Gender),
    __metadata("design:type", typeof (_a = typeof enums_1.Gender !== "undefined" && enums_1.Gender) === "function" ? _a : Object)
], CalculateStrengthLevelDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '현재 1RM 무게 (kg) - 입력시 현재 레벨 판정',
        example: 80,
        minimum: 0,
        maximum: 500,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(500),
    __metadata("design:type", Number)
], CalculateStrengthLevelDto.prototype, "currentWeight", void 0);


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StrengthLevelFriendlyNames = exports.StrengthLevelDescriptions = exports.StrengthLevelResponse = exports.StrengthLevelData = exports.CurrentLevelInfo = exports.InputInfo = exports.ExerciseInfo = exports.LevelInfo = void 0;
const swagger_1 = __webpack_require__(4);
const enums_1 = __webpack_require__(18);
class LevelInfo {
}
exports.LevelInfo = LevelInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.StrengthLevel,
        description: '레벨 코드',
        example: 'INTERMEDIATE',
    }),
    __metadata("design:type", typeof (_a = typeof enums_1.StrengthLevel !== "undefined" && enums_1.StrengthLevel) === "function" ? _a : Object)
], LevelInfo.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '레벨 한글명',
        example: '중급자',
    }),
    __metadata("design:type", String)
], LevelInfo.prototype, "levelKorean", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '해당 레벨 기준 무게 (kg)',
        example: 87.5,
    }),
    __metadata("design:type", Number)
], LevelInfo.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '레벨 설명',
        example: '일반적인 피트니스 수준을 가진 사람들보다 강합니다.',
    }),
    __metadata("design:type", String)
], LevelInfo.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 레벨 여부',
        example: true,
    }),
    __metadata("design:type", Boolean)
], LevelInfo.prototype, "isCurrent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '다음 목표 레벨 여부',
        example: false,
    }),
    __metadata("design:type", Boolean)
], LevelInfo.prototype, "isNext", void 0);
class ExerciseInfo {
}
exports.ExerciseInfo = ExerciseInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 타입 코드',
        example: 'BENCH_PRESS',
    }),
    __metadata("design:type", String)
], ExerciseInfo.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 한글명',
        example: '벤치프레스',
    }),
    __metadata("design:type", String)
], ExerciseInfo.prototype, "nameKorean", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '운동 영문명',
        example: 'Bench Press',
    }),
    __metadata("design:type", String)
], ExerciseInfo.prototype, "nameEnglish", void 0);
class InputInfo {
}
exports.InputInfo = InputInfo;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '나이', example: 25 }),
    __metadata("design:type", Number)
], InputInfo.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '체중 (kg)', example: 70 }),
    __metadata("design:type", Number)
], InputInfo.prototype, "bodyWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '성별', example: 'MALE' }),
    __metadata("design:type", String)
], InputInfo.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '현재 1RM 무게 (kg)', example: 80 }),
    __metadata("design:type", Number)
], InputInfo.prototype, "currentWeight", void 0);
class CurrentLevelInfo {
}
exports.CurrentLevelInfo = CurrentLevelInfo;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: enums_1.StrengthLevel,
        description: '현재 레벨 코드',
        example: 'INTERMEDIATE',
    }),
    __metadata("design:type", typeof (_b = typeof enums_1.StrengthLevel !== "undefined" && enums_1.StrengthLevel) === "function" ? _b : Object)
], CurrentLevelInfo.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '현재 레벨 한글명',
        example: '중급자',
    }),
    __metadata("design:type", String)
], CurrentLevelInfo.prototype, "levelKorean", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '입력된 무게 (kg)',
        example: 80,
    }),
    __metadata("design:type", Number)
], CurrentLevelInfo.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '다음 레벨까지 필요한 무게 (kg)',
        example: 7.5,
    }),
    __metadata("design:type", Number)
], CurrentLevelInfo.prototype, "weightToNextLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '다음 레벨 코드',
        example: 'ADVANCED',
    }),
    __metadata("design:type", typeof (_c = typeof enums_1.StrengthLevel !== "undefined" && enums_1.StrengthLevel) === "function" ? _c : Object)
], CurrentLevelInfo.prototype, "nextLevel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: '다음 레벨 한글명',
        example: '고수',
    }),
    __metadata("design:type", String)
], CurrentLevelInfo.prototype, "nextLevelKorean", void 0);
class StrengthLevelData {
}
exports.StrengthLevelData = StrengthLevelData;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '운동 정보' }),
    __metadata("design:type", ExerciseInfo)
], StrengthLevelData.prototype, "exercise", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '입력 정보' }),
    __metadata("design:type", InputInfo)
], StrengthLevelData.prototype, "input", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '현재 레벨 정보 (currentWeight 입력시에만)' }),
    __metadata("design:type", CurrentLevelInfo)
], StrengthLevelData.prototype, "currentLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '전체 레벨 목록', type: [LevelInfo] }),
    __metadata("design:type", Array)
], StrengthLevelData.prototype, "allLevels", void 0);
class StrengthLevelResponse {
}
exports.StrengthLevelResponse = StrengthLevelResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '성공 여부',
        example: true,
    }),
    __metadata("design:type", Boolean)
], StrengthLevelResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '응답 데이터',
        type: StrengthLevelData,
    }),
    __metadata("design:type", StrengthLevelData)
], StrengthLevelResponse.prototype, "data", void 0);
exports.StrengthLevelDescriptions = {
    [enums_1.StrengthLevel.BEGINNER]: '운동을 시작한 지 얼마 되지 않은 단계입니다.',
    [enums_1.StrengthLevel.NOVICE]: '기본 동작을 익히고 꾸준히 운동하는 단계입니다.',
    [enums_1.StrengthLevel.INTERMEDIATE]: '일반적인 피트니스 수준을 가진 사람들보다 강합니다.',
    [enums_1.StrengthLevel.ADVANCED]: '상당한 수준의 근력을 보유하고 있습니다.',
    [enums_1.StrengthLevel.ELITE]: '최상위 수준의 근력으로, 상위 5% 이내입니다.',
};
exports.StrengthLevelFriendlyNames = {
    [enums_1.StrengthLevel.BEGINNER]: '헬스 입문',
    [enums_1.StrengthLevel.NOVICE]: '초보자',
    [enums_1.StrengthLevel.INTERMEDIATE]: '중급자',
    [enums_1.StrengthLevel.ADVANCED]: '고수',
    [enums_1.StrengthLevel.ELITE]: '신',
};


/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDatabaseConfig = void 0;
const user_entity_1 = __webpack_require__(17);
const member_entity_1 = __webpack_require__(51);
const membership_entity_1 = __webpack_require__(57);
const pt_usage_entity_1 = __webpack_require__(60);
const assessment_entity_1 = __webpack_require__(52);
const assessment_item_entity_1 = __webpack_require__(53);
const ability_snapshot_entity_1 = __webpack_require__(54);
const injury_history_entity_1 = __webpack_require__(55);
const injury_restriction_entity_1 = __webpack_require__(56);
const workout_record_entity_1 = __webpack_require__(61);
const pt_session_entity_1 = __webpack_require__(59);
const workout_routine_entity_1 = __webpack_require__(62);
const assessment_grade_constant_entity_1 = __webpack_require__(108);
const assessment_category_score_entity_1 = __webpack_require__(107);
const flexibility_item_weight_entity_1 = __webpack_require__(109);
const flexibility_grade_threshold_entity_1 = __webpack_require__(110);
const body_composition_standard_entity_1 = __webpack_require__(111);
const exercise_entity_1 = __webpack_require__(67);
const strength_standard_entity_1 = __webpack_require__(68);
const program_milestone_entity_1 = __webpack_require__(58);
const getDatabaseConfig = (configService) => {
    const nodeEnv = configService.get('NODE_ENV') || 'development';
    const isDevelopment = nodeEnv === 'development';
    const commonConfig = {
        type: 'postgres',
        entities: [
            user_entity_1.User,
            member_entity_1.Member,
            membership_entity_1.Membership,
            pt_usage_entity_1.PTUsage,
            assessment_entity_1.Assessment,
            assessment_item_entity_1.AssessmentItem,
            ability_snapshot_entity_1.AbilitySnapshot,
            injury_history_entity_1.InjuryHistory,
            injury_restriction_entity_1.InjuryRestriction,
            workout_record_entity_1.WorkoutRecord,
            pt_session_entity_1.PTSession,
            workout_routine_entity_1.WorkoutRoutine,
            assessment_grade_constant_entity_1.AssessmentGradeConstant,
            assessment_category_score_entity_1.AssessmentCategoryScore,
            flexibility_item_weight_entity_1.FlexibilityItemWeight,
            flexibility_grade_threshold_entity_1.FlexibilityGradeThreshold,
            body_composition_standard_entity_1.BodyCompositionStandard,
            exercise_entity_1.Exercise,
            strength_standard_entity_1.StrengthStandard,
            program_milestone_entity_1.ProgramMilestone,
        ],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        logging: configService.get('DB_LOGGING') === 'true' || isDevelopment,
    };
    const databaseUrl = configService.get('DATABASE_URL');
    if (databaseUrl) {
        const isProduction = databaseUrl.includes('render.com') || databaseUrl.includes('amazonaws.com');
        return {
            ...commonConfig,
            url: databaseUrl,
            ssl: isProduction ? { rejectUnauthorized: false } : false,
        };
    }
    const host = configService.get('DB_HOST') || 'localhost';
    const port = parseInt(configService.get('DB_PORT') || '5432', 10);
    const username = configService.get('DB_USERNAME') || 'postgres';
    const password = configService.get('DB_PASSWORD') || 'postgres';
    const database = configService.get('DB_NAME') || 'gym_membership_db';
    const isProduction = host.includes('render.com') || host.includes('amazonaws.com');
    return {
        ...commonConfig,
        host,
        port,
        username,
        password,
        database,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
    };
};
exports.getDatabaseConfig = getDatabaseConfig;


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCorsConfig = void 0;
const getCorsConfig = (configService) => {
    const frontendUrl = configService.get('FRONTEND_URL');
    const defaultOrigins = [
        'http://localhost:3000',
        'https://gym-admin-mu.vercel.app',
    ];
    const allowedOrigins = frontendUrl
        ? [...defaultOrigins, ...frontendUrl.split(',').map((url) => url.trim())]
        : defaultOrigins;
    const nodeEnv = configService.get('NODE_ENV') || 'development';
    return {
        origin: (origin, callback) => {
            if (nodeEnv === 'development') {
                return callback(null, true);
            }
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('CORS 정책에 의해 차단되었습니다.'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
};
exports.getCorsConfig = getCorsConfig;


/***/ }),
/* 139 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(2);
const api_response_1 = __webpack_require__(43);
const error_codes_1 = __webpack_require__(140);
const date_helper_1 = __webpack_require__(9);
const api_exception_1 = __webpack_require__(28);
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let errorCode = error_codes_1.ErrorCodes.INTERNAL_SERVER_ERROR;
        let message = "서버 오류가 발생했습니다.";
        if (exception instanceof api_exception_1.ApiException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            errorCode = exceptionResponse.errorCode;
            message = exceptionResponse.message;
            if (exceptionResponse.details) {
                exceptionResponse.details = exceptionResponse.details;
            }
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (status === common_1.HttpStatus.UNAUTHORIZED) {
                errorCode = error_codes_1.ErrorCodes.UNAUTHORIZED;
            }
            else if (status === common_1.HttpStatus.FORBIDDEN) {
                errorCode = error_codes_1.ErrorCodes.FORBIDDEN;
            }
            else if (status === common_1.HttpStatus.NOT_FOUND) {
                errorCode = error_codes_1.ErrorCodes.MEMBER_NOT_FOUND;
            }
            if (typeof exceptionResponse === "string") {
                message = exceptionResponse;
            }
            else if (typeof exceptionResponse === "object" && exceptionResponse !== null) {
                const responseObj = exceptionResponse;
                message = responseObj.message || message;
                errorCode = responseObj.errorCode || errorCode;
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        const errorContext = {
            method: request.method,
            url: request.url,
            statusCode: status,
            errorCode,
            message,
            user: request.user || null,
            body: request.body || null,
            query: request.query || null,
            params: request.params || null,
            timestamp: date_helper_1.DateHelper.getKoreaTimeISOString(),
            ip: request.ip || request.socket.remoteAddress,
            userAgent: request.headers["user-agent"] || null,
        };
        console.error("=".repeat(80));
        console.error("🚨 API 에러 발생");
        console.error("=".repeat(80));
        console.error("📋 요청 정보:");
        console.error(`   Method: ${errorContext.method}`);
        console.error(`   URL: ${errorContext.url}`);
        console.error(`   IP: ${errorContext.ip}`);
        console.error(`   User-Agent: ${errorContext.userAgent}`);
        console.error(`   Timestamp: ${errorContext.timestamp}`);
        if (errorContext.user) {
            console.error(`   User: ${JSON.stringify(errorContext.user, null, 2)}`);
        }
        console.error("\n📝 요청 데이터:");
        if (errorContext.body && Object.keys(errorContext.body).length > 0) {
            console.error(JSON.stringify(errorContext.body, null, 2));
        }
        if (errorContext.query && Object.keys(errorContext.query).length > 0) {
            console.error("Query:", JSON.stringify(errorContext.query, null, 2));
        }
        if (errorContext.params && Object.keys(errorContext.params).length > 0) {
            console.error("Params:", JSON.stringify(errorContext.params, null, 2));
        }
        console.error("\n❌ 에러 정보:");
        console.error(`   Status Code: ${errorContext.statusCode}`);
        console.error(`   Error Code: ${errorContext.errorCode}`);
        console.error(`   Message: ${errorContext.message}`);
        if (exception instanceof Error && exception.stack) {
            console.error("\n📚 Stack Trace:");
            console.error(exception.stack);
        }
        console.error("=".repeat(80));
        this.logger.error(`${request.method} ${request.url} - ${status} - ${message}`, JSON.stringify(errorContext, null, 2), exception instanceof Error ? exception.stack : undefined);
        const errorDetails = {
            path: request.url,
            method: request.method,
            timestamp: date_helper_1.DateHelper.getKoreaTimeISOString(),
        };
        if (exception instanceof api_exception_1.ApiException && exception.details) {
            Object.assign(errorDetails, exception.details);
        }
        response.status(status).json(api_response_1.ApiResponseHelper.error(errorCode, message, errorDetails));
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);


/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorCodes = void 0;
exports.ErrorCodes = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    MEMBER_NOT_FOUND: 'MEMBER_NOT_FOUND',
    MEMBER_ALREADY_EXISTS: 'MEMBER_ALREADY_EXISTS',
    ASSESSMENT_NOT_FOUND: 'ASSESSMENT_NOT_FOUND',
    ASSESSMENT_DELETE_FORBIDDEN: 'ASSESSMENT_DELETE_FORBIDDEN',
    INITIAL_ASSESSMENT_ALREADY_EXISTS: 'INITIAL_ASSESSMENT_ALREADY_EXISTS',
    INJURY_NOT_FOUND: 'INJURY_NOT_FOUND',
    GOAL_NOT_FOUND: 'GOAL_NOT_FOUND',
    ROUTINE_NOT_FOUND: 'ROUTINE_NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    INVALID_INPUT: 'INVALID_INPUT',
    BAD_REQUEST: 'BAD_REQUEST',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
};


/***/ }),
/* 141 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(142), exports);
__exportStar(__webpack_require__(144), exports);
__exportStar(__webpack_require__(145), exports);


/***/ }),
/* 142 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(2);
const operators_1 = __webpack_require__(143);
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url, ip, headers } = request;
        const userAgent = headers["user-agent"] || "";
        const now = Date.now();
        this.logger.log(`${method} ${url} - ${ip} - ${userAgent}`);
        return next.handle().pipe((0, operators_1.tap)({
            next: () => {
                const response = context.switchToHttp().getResponse();
                const { statusCode } = response;
                const responseTime = Date.now() - now;
                this.logger.log(`${method} ${url} ${statusCode} - ${responseTime}ms`);
            },
            error: (error) => {
                const responseTime = Date.now() - now;
                this.logger.error(`${method} ${url} - ${responseTime}ms - ${error.message}`);
            },
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);


/***/ }),
/* 143 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 144 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(2);
const operators_1 = __webpack_require__(143);
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data && typeof data === "object" && "success" in data) {
                return data;
            }
            return {
                success: true,
                data,
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);


/***/ }),
/* 145 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeoutInterceptor = void 0;
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(146);
const operators_1 = __webpack_require__(143);
let TimeoutInterceptor = class TimeoutInterceptor {
    constructor(timeoutMs = 30000) {
        this.timeoutMs = timeoutMs;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.timeout)(this.timeoutMs), (0, operators_1.catchError)((err) => {
            if (err instanceof rxjs_1.TimeoutError) {
                return (0, rxjs_1.throwError)(() => new common_1.RequestTimeoutException("요청 시간이 초과되었습니다."));
            }
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
};
exports.TimeoutInterceptor = TimeoutInterceptor;
exports.TimeoutInterceptor = TimeoutInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Number])
], TimeoutInterceptor);


/***/ }),
/* 146 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const cors_config_1 = __webpack_require__(138);
const http_exception_filter_1 = __webpack_require__(139);
const interceptors_1 = __webpack_require__(141);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.enableCors((0, cors_config_1.getCorsConfig)(configService));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new interceptors_1.LoggingInterceptor(), new interceptors_1.TransformInterceptor(), new interceptors_1.TimeoutInterceptor(configService.get("REQUEST_TIMEOUT") || 30000));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("헬스장 회원관리 시스템 API")
        .setDescription("헬스장 회원의 신체 능력을 수치화·평균화·시각화하고 시간에 따른 변화를 추적하는 API")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "JWT 토큰을 입력하세요",
        in: "header",
    }, "JWT-auth")
        .addTag("auth", "인증 관련 API")
        .addTag("members", "회원 관리 API")
        .addTag("assessments", "평가 시스템 API")
        .addTag("abilities", "능력치 API")
        .addTag("injuries", "부상 관리 API")
        .addTag("analytics", "분석 API")
        .addTag("insights", "인사이트 API (대시보드용)")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = configService.get("PORT") || 3001;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();

})();

/******/ })()
;