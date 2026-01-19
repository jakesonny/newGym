/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const date_helper_1 = __webpack_require__(/*! ./common/utils/date-helper */ "./src/common/utils/date-helper.ts");
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

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ "./src/modules/auth/auth.module.ts");
const members_module_1 = __webpack_require__(/*! ./modules/members/members.module */ "./src/modules/members/members.module.ts");
const assessments_module_1 = __webpack_require__(/*! ./modules/assessments/assessments.module */ "./src/modules/assessments/assessments.module.ts");
const analytics_module_1 = __webpack_require__(/*! ./modules/analytics/analytics.module */ "./src/modules/analytics/analytics.module.ts");
const insights_module_1 = __webpack_require__(/*! ./modules/insights/insights.module */ "./src/modules/insights/insights.module.ts");
const exercises_module_1 = __webpack_require__(/*! ./modules/exercises/exercises.module */ "./src/modules/exercises/exercises.module.ts");
const database_config_1 = __webpack_require__(/*! ./config/database.config */ "./src/config/database.config.ts");
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
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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

/***/ "./src/common/decorators/index.ts":
/*!****************************************!*\
  !*** ./src/common/decorators/index.ts ***!
  \****************************************/
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
__exportStar(__webpack_require__(/*! ./public.decorator */ "./src/common/decorators/public.decorator.ts"), exports);


/***/ }),

/***/ "./src/common/decorators/is-email-or-test.decorator.ts":
/*!*************************************************************!*\
  !*** ./src/common/decorators/is-email-or-test.decorator.ts ***!
  \*************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/common/decorators/is-phone-number.decorator.ts":
/*!************************************************************!*\
  !*** ./src/common/decorators/is-phone-number.decorator.ts ***!
  \************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/common/decorators/public.decorator.ts":
/*!***************************************************!*\
  !*** ./src/common/decorators/public.decorator.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.IS_PUBLIC_KEY = "isPublic";
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),

/***/ "./src/common/enums/assessment.enum.ts":
/*!*********************************************!*\
  !*** ./src/common/enums/assessment.enum.ts ***!
  \*********************************************/
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

/***/ "./src/common/enums/gender.enum.ts":
/*!*****************************************!*\
  !*** ./src/common/enums/gender.enum.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));


/***/ }),

/***/ "./src/common/enums/index.ts":
/*!***********************************!*\
  !*** ./src/common/enums/index.ts ***!
  \***********************************/
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
__exportStar(__webpack_require__(/*! ./user-role.enum */ "./src/common/enums/user-role.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./member-status.enum */ "./src/common/enums/member-status.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./membership.enum */ "./src/common/enums/membership.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./assessment.enum */ "./src/common/enums/assessment.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./injury.enum */ "./src/common/enums/injury.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./gender.enum */ "./src/common/enums/gender.enum.ts"), exports);
__exportStar(__webpack_require__(/*! ./strength-level.enum */ "./src/common/enums/strength-level.enum.ts"), exports);


/***/ }),

/***/ "./src/common/enums/injury.enum.ts":
/*!*****************************************!*\
  !*** ./src/common/enums/injury.enum.ts ***!
  \*****************************************/
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

/***/ "./src/common/enums/member-status.enum.ts":
/*!************************************************!*\
  !*** ./src/common/enums/member-status.enum.ts ***!
  \************************************************/
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

/***/ "./src/common/enums/membership.enum.ts":
/*!*********************************************!*\
  !*** ./src/common/enums/membership.enum.ts ***!
  \*********************************************/
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

/***/ "./src/common/enums/strength-level.enum.ts":
/*!*************************************************!*\
  !*** ./src/common/enums/strength-level.enum.ts ***!
  \*************************************************/
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

/***/ "./src/common/enums/user-role.enum.ts":
/*!********************************************!*\
  !*** ./src/common/enums/user-role.enum.ts ***!
  \********************************************/
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

/***/ "./src/common/exceptions/api.exception.ts":
/*!************************************************!*\
  !*** ./src/common/exceptions/api.exception.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiExceptions = exports.ApiException = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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

/***/ "./src/common/exceptions/index.ts":
/*!****************************************!*\
  !*** ./src/common/exceptions/index.ts ***!
  \****************************************/
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
__exportStar(__webpack_require__(/*! ./api.exception */ "./src/common/exceptions/api.exception.ts"), exports);


/***/ }),

/***/ "./src/common/filters/http-exception.filter.ts":
/*!*****************************************************!*\
  !*** ./src/common/filters/http-exception.filter.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const api_response_1 = __webpack_require__(/*! ../utils/api-response */ "./src/common/utils/api-response.ts");
const error_codes_1 = __webpack_require__(/*! ../utils/error-codes */ "./src/common/utils/error-codes.ts");
const date_helper_1 = __webpack_require__(/*! ../utils/date-helper */ "./src/common/utils/date-helper.ts");
const api_exception_1 = __webpack_require__(/*! ../exceptions/api.exception */ "./src/common/exceptions/api.exception.ts");
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

/***/ "./src/common/guards/index.ts":
/*!************************************!*\
  !*** ./src/common/guards/index.ts ***!
  \************************************/
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
__exportStar(__webpack_require__(/*! ./jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./roles.guard */ "./src/common/guards/roles.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./jwt-roles.guard */ "./src/common/guards/jwt-roles.guard.ts"), exports);


/***/ }),

/***/ "./src/common/guards/jwt-auth.guard.ts":
/*!*********************************************!*\
  !*** ./src/common/guards/jwt-auth.guard.ts ***!
  \*********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
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

/***/ "./src/common/guards/jwt-roles.guard.ts":
/*!**********************************************!*\
  !*** ./src/common/guards/jwt-roles.guard.ts ***!
  \**********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const jwt_auth_guard_1 = __webpack_require__(/*! ./jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts");
const roles_guard_1 = __webpack_require__(/*! ./roles.guard */ "./src/common/guards/roles.guard.ts");
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

/***/ "./src/common/guards/roles.guard.ts":
/*!******************************************!*\
  !*** ./src/common/guards/roles.guard.ts ***!
  \******************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
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

/***/ "./src/common/interceptors/index.ts":
/*!******************************************!*\
  !*** ./src/common/interceptors/index.ts ***!
  \******************************************/
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
__exportStar(__webpack_require__(/*! ./logging.interceptor */ "./src/common/interceptors/logging.interceptor.ts"), exports);
__exportStar(__webpack_require__(/*! ./transform.interceptor */ "./src/common/interceptors/transform.interceptor.ts"), exports);
__exportStar(__webpack_require__(/*! ./timeout.interceptor */ "./src/common/interceptors/timeout.interceptor.ts"), exports);


/***/ }),

/***/ "./src/common/interceptors/logging.interceptor.ts":
/*!********************************************************!*\
  !*** ./src/common/interceptors/logging.interceptor.ts ***!
  \********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
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

/***/ "./src/common/interceptors/timeout.interceptor.ts":
/*!********************************************************!*\
  !*** ./src/common/interceptors/timeout.interceptor.ts ***!
  \********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
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

/***/ "./src/common/interceptors/transform.interceptor.ts":
/*!**********************************************************!*\
  !*** ./src/common/interceptors/transform.interceptor.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
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

/***/ "./src/common/utils/analytics-helper.ts":
/*!**********************************************!*\
  !*** ./src/common/utils/analytics-helper.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsHelper = void 0;
const snapshot_normalizer_1 = __webpack_require__(/*! ./snapshot-normalizer */ "./src/common/utils/snapshot-normalizer.ts");
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

/***/ "./src/common/utils/api-response.ts":
/*!******************************************!*\
  !*** ./src/common/utils/api-response.ts ***!
  \******************************************/
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

/***/ "./src/common/utils/date-helper.ts":
/*!*****************************************!*\
  !*** ./src/common/utils/date-helper.ts ***!
  \*****************************************/
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

/***/ "./src/common/utils/date-range-helper.ts":
/*!***********************************************!*\
  !*** ./src/common/utils/date-range-helper.ts ***!
  \***********************************************/
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
    static parseDateString(dateString) {
        return new Date(dateString);
    }
    static formatDateString(date) {
        return date.toISOString().split('T')[0];
    }
}
exports.DateRangeHelper = DateRangeHelper;


/***/ }),

/***/ "./src/common/utils/entity-update-helper.ts":
/*!**************************************************!*\
  !*** ./src/common/utils/entity-update-helper.ts ***!
  \**************************************************/
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

/***/ "./src/common/utils/error-codes.ts":
/*!*****************************************!*\
  !*** ./src/common/utils/error-codes.ts ***!
  \*****************************************/
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

/***/ "./src/common/utils/grade-score-converter.ts":
/*!***************************************************!*\
  !*** ./src/common/utils/grade-score-converter.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const assessment_category_score_entity_1 = __webpack_require__(/*! ../../entities/assessment-category-score.entity */ "./src/entities/assessment-category-score.entity.ts");
const flexibility_item_weight_entity_1 = __webpack_require__(/*! ../../entities/flexibility-item-weight.entity */ "./src/entities/flexibility-item-weight.entity.ts");
const flexibility_grade_threshold_entity_1 = __webpack_require__(/*! ../../entities/flexibility-grade-threshold.entity */ "./src/entities/flexibility-grade-threshold.entity.ts");
const body_composition_standard_entity_1 = __webpack_require__(/*! ../../entities/body-composition-standard.entity */ "./src/entities/body-composition-standard.entity.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/common/enums/index.ts");
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

/***/ "./src/common/utils/member-helper.ts":
/*!*******************************************!*\
  !*** ./src/common/utils/member-helper.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MemberHelper = void 0;
const date_helper_1 = __webpack_require__(/*! ./date-helper */ "./src/common/utils/date-helper.ts");
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

/***/ "./src/common/utils/one-rep-max-calculator.ts":
/*!****************************************************!*\
  !*** ./src/common/utils/one-rep-max-calculator.ts ***!
  \****************************************************/
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

/***/ "./src/common/utils/pt-usage-helper.ts":
/*!*********************************************!*\
  !*** ./src/common/utils/pt-usage-helper.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PTUsageHelper = void 0;
const exceptions_1 = __webpack_require__(/*! ../exceptions */ "./src/common/exceptions/index.ts");
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

/***/ "./src/common/utils/query-builder-helper.ts":
/*!**************************************************!*\
  !*** ./src/common/utils/query-builder-helper.ts ***!
  \**************************************************/
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

/***/ "./src/common/utils/relative-strength-calculator.ts":
/*!**********************************************************!*\
  !*** ./src/common/utils/relative-strength-calculator.ts ***!
  \**********************************************************/
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
        const { OneRepMaxCalculator, OneRepMaxFormula } = __webpack_require__(/*! ./one-rep-max-calculator */ "./src/common/utils/one-rep-max-calculator.ts");
        const oneRepMaxResult = OneRepMaxCalculator.calculate(weight, reps, formula || OneRepMaxFormula.EPLEY);
        return this.calculate(oneRepMaxResult.oneRepMax, bodyWeight);
    }
}
exports.RelativeStrengthCalculator = RelativeStrengthCalculator;


/***/ }),

/***/ "./src/common/utils/repository-helper.ts":
/*!***********************************************!*\
  !*** ./src/common/utils/repository-helper.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RepositoryHelper = void 0;
const exceptions_1 = __webpack_require__(/*! ../exceptions */ "./src/common/exceptions/index.ts");
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

/***/ "./src/common/utils/score-calculator.ts":
/*!**********************************************!*\
  !*** ./src/common/utils/score-calculator.ts ***!
  \**********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const assessment_item_entity_1 = __webpack_require__(/*! ../../entities/assessment-item.entity */ "./src/entities/assessment-item.entity.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/common/enums/index.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const injury_restriction_entity_1 = __webpack_require__(/*! ../../entities/injury-restriction.entity */ "./src/entities/injury-restriction.entity.ts");
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

/***/ "./src/common/utils/snapshot-normalizer.ts":
/*!*************************************************!*\
  !*** ./src/common/utils/snapshot-normalizer.ts ***!
  \*************************************************/
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

/***/ "./src/common/utils/strength-level-evaluator.ts":
/*!******************************************************!*\
  !*** ./src/common/utils/strength-level-evaluator.ts ***!
  \******************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const strength_standard_entity_1 = __webpack_require__(/*! ../../entities/strength-standard.entity */ "./src/entities/strength-standard.entity.ts");
const enums_1 = __webpack_require__(/*! ../enums */ "./src/common/enums/index.ts");
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

/***/ "./src/common/utils/workout-helper.ts":
/*!********************************************!*\
  !*** ./src/common/utils/workout-helper.ts ***!
  \********************************************/
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
}
exports.WorkoutHelper = WorkoutHelper;


/***/ }),

/***/ "./src/config/cors.config.ts":
/*!***********************************!*\
  !*** ./src/config/cors.config.ts ***!
  \***********************************/
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

/***/ "./src/config/database.config.ts":
/*!***************************************!*\
  !*** ./src/config/database.config.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDatabaseConfig = void 0;
const user_entity_1 = __webpack_require__(/*! ../entities/user.entity */ "./src/entities/user.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../entities/member.entity */ "./src/entities/member.entity.ts");
const membership_entity_1 = __webpack_require__(/*! ../entities/membership.entity */ "./src/entities/membership.entity.ts");
const pt_usage_entity_1 = __webpack_require__(/*! ../entities/pt-usage.entity */ "./src/entities/pt-usage.entity.ts");
const assessment_entity_1 = __webpack_require__(/*! ../entities/assessment.entity */ "./src/entities/assessment.entity.ts");
const assessment_item_entity_1 = __webpack_require__(/*! ../entities/assessment-item.entity */ "./src/entities/assessment-item.entity.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const injury_history_entity_1 = __webpack_require__(/*! ../entities/injury-history.entity */ "./src/entities/injury-history.entity.ts");
const injury_restriction_entity_1 = __webpack_require__(/*! ../entities/injury-restriction.entity */ "./src/entities/injury-restriction.entity.ts");
const workout_record_entity_1 = __webpack_require__(/*! ../entities/workout-record.entity */ "./src/entities/workout-record.entity.ts");
const pt_session_entity_1 = __webpack_require__(/*! ../entities/pt-session.entity */ "./src/entities/pt-session.entity.ts");
const workout_routine_entity_1 = __webpack_require__(/*! ../entities/workout-routine.entity */ "./src/entities/workout-routine.entity.ts");
const assessment_grade_constant_entity_1 = __webpack_require__(/*! ../entities/assessment-grade-constant.entity */ "./src/entities/assessment-grade-constant.entity.ts");
const assessment_category_score_entity_1 = __webpack_require__(/*! ../entities/assessment-category-score.entity */ "./src/entities/assessment-category-score.entity.ts");
const flexibility_item_weight_entity_1 = __webpack_require__(/*! ../entities/flexibility-item-weight.entity */ "./src/entities/flexibility-item-weight.entity.ts");
const flexibility_grade_threshold_entity_1 = __webpack_require__(/*! ../entities/flexibility-grade-threshold.entity */ "./src/entities/flexibility-grade-threshold.entity.ts");
const body_composition_standard_entity_1 = __webpack_require__(/*! ../entities/body-composition-standard.entity */ "./src/entities/body-composition-standard.entity.ts");
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

/***/ "./src/entities/ability-snapshot.entity.ts":
/*!*************************************************!*\
  !*** ./src/entities/ability-snapshot.entity.ts ***!
  \*************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const assessment_entity_1 = __webpack_require__(/*! ./assessment.entity */ "./src/entities/assessment.entity.ts");
const member_entity_1 = __webpack_require__(/*! ./member.entity */ "./src/entities/member.entity.ts");
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

/***/ "./src/entities/assessment-category-score.entity.ts":
/*!**********************************************************!*\
  !*** ./src/entities/assessment-category-score.entity.ts ***!
  \**********************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
const assessment_grade_constant_entity_1 = __webpack_require__(/*! ./assessment-grade-constant.entity */ "./src/entities/assessment-grade-constant.entity.ts");
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

/***/ "./src/entities/assessment-grade-constant.entity.ts":
/*!**********************************************************!*\
  !*** ./src/entities/assessment-grade-constant.entity.ts ***!
  \**********************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/entities/assessment-item.entity.ts":
/*!************************************************!*\
  !*** ./src/entities/assessment-item.entity.ts ***!
  \************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const assessment_entity_1 = __webpack_require__(/*! ./assessment.entity */ "./src/entities/assessment.entity.ts");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/entities/assessment.entity.ts":
/*!*******************************************!*\
  !*** ./src/entities/assessment.entity.ts ***!
  \*******************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const member_entity_1 = __webpack_require__(/*! ./member.entity */ "./src/entities/member.entity.ts");
const assessment_item_entity_1 = __webpack_require__(/*! ./assessment-item.entity */ "./src/entities/assessment-item.entity.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ./ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/entities/body-composition-standard.entity.ts":
/*!**********************************************************!*\
  !*** ./src/entities/body-composition-standard.entity.ts ***!
  \**********************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/entities/exercise.entity.ts":
/*!*****************************************!*\
  !*** ./src/entities/exercise.entity.ts ***!
  \*****************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const strength_standard_entity_1 = __webpack_require__(/*! ./strength-standard.entity */ "./src/entities/strength-standard.entity.ts");
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

/***/ "./src/entities/flexibility-grade-threshold.entity.ts":
/*!************************************************************!*\
  !*** ./src/entities/flexibility-grade-threshold.entity.ts ***!
  \************************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const assessment_grade_constant_entity_1 = __webpack_require__(/*! ./assessment-grade-constant.entity */ "./src/entities/assessment-grade-constant.entity.ts");
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

/***/ "./src/entities/flexibility-item-weight.entity.ts":
/*!********************************************************!*\
  !*** ./src/entities/flexibility-item-weight.entity.ts ***!
  \********************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
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

/***/ "./src/entities/injury-history.entity.ts":
/*!***********************************************!*\
  !*** ./src/entities/injury-history.entity.ts ***!
  \***********************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const member_entity_1 = __webpack_require__(/*! ./member.entity */ "./src/entities/member.entity.ts");
const injury_restriction_entity_1 = __webpack_require__(/*! ./injury-restriction.entity */ "./src/entities/injury-restriction.entity.ts");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/entities/injury-restriction.entity.ts":
/*!***************************************************!*\
  !*** ./src/entities/injury-restriction.entity.ts ***!
  \***************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const injury_history_entity_1 = __webpack_require__(/*! ./injury-history.entity */ "./src/entities/injury-history.entity.ts");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/entities/member.entity.ts":
/*!***************************************!*\
  !*** ./src/entities/member.entity.ts ***!
  \***************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const assessment_entity_1 = __webpack_require__(/*! ./assessment.entity */ "./src/entities/assessment.entity.ts");
const injury_history_entity_1 = __webpack_require__(/*! ./injury-history.entity */ "./src/entities/injury-history.entity.ts");
const membership_entity_1 = __webpack_require__(/*! ./membership.entity */ "./src/entities/membership.entity.ts");
const pt_usage_entity_1 = __webpack_require__(/*! ./pt-usage.entity */ "./src/entities/pt-usage.entity.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ./ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const workout_record_entity_1 = __webpack_require__(/*! ./workout-record.entity */ "./src/entities/workout-record.entity.ts");
const pt_session_entity_1 = __webpack_require__(/*! ./pt-session.entity */ "./src/entities/pt-session.entity.ts");
const workout_routine_entity_1 = __webpack_require__(/*! ./workout-routine.entity */ "./src/entities/workout-routine.entity.ts");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/entities/membership.entity.ts":
/*!*******************************************!*\
  !*** ./src/entities/membership.entity.ts ***!
  \*******************************************/
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
exports.Membership = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const member_entity_1 = __webpack_require__(/*! ./member.entity */ "./src/entities/member.entity.ts");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Membership.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], Membership.prototype, "updatedAt", void 0);
exports.Membership = Membership = __decorate([
    (0, typeorm_1.Index)('idx_memberships_member_id', ['memberId']),
    (0, typeorm_1.Index)('idx_memberships_status', ['status']),
    (0, typeorm_1.Index)('idx_memberships_expiry_date', ['expiryDate']),
    (0, typeorm_1.Entity)('memberships')
], Membership);


/***/ }),

/***/ "./src/entities/pt-session.entity.ts":
/*!*******************************************!*\
  !*** ./src/entities/pt-session.entity.ts ***!
  \*******************************************/
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
exports.PTSession = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const member_entity_1 = __webpack_require__(/*! ./member.entity */ "./src/entities/member.entity.ts");
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
    (0, typeorm_1.Column)({ type: 'int', name: 'session_number' }),
    __metadata("design:type", Number)
], PTSession.prototype, "sessionNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'session_date' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
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
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], PTSession.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], PTSession.prototype, "updatedAt", void 0);
exports.PTSession = PTSession = __decorate([
    (0, typeorm_1.Index)('idx_pt_sessions_member_id', ['memberId']),
    (0, typeorm_1.Index)('idx_pt_sessions_session_date', ['sessionDate']),
    (0, typeorm_1.Index)('idx_pt_sessions_session_number', ['memberId', 'sessionNumber']),
    (0, typeorm_1.Entity)('pt_sessions')
], PTSession);


/***/ }),

/***/ "./src/entities/pt-usage.entity.ts":
/*!*****************************************!*\
  !*** ./src/entities/pt-usage.entity.ts ***!
  \*****************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const member_entity_1 = __webpack_require__(/*! ./member.entity */ "./src/entities/member.entity.ts");
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

/***/ "./src/entities/strength-standard.entity.ts":
/*!**************************************************!*\
  !*** ./src/entities/strength-standard.entity.ts ***!
  \**************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const exercise_entity_1 = __webpack_require__(/*! ./exercise.entity */ "./src/entities/exercise.entity.ts");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/entities/user.entity.ts":
/*!*************************************!*\
  !*** ./src/entities/user.entity.ts ***!
  \*************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/entities/workout-record.entity.ts":
/*!***********************************************!*\
  !*** ./src/entities/workout-record.entity.ts ***!
  \***********************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const member_entity_1 = __webpack_require__(/*! ./member.entity */ "./src/entities/member.entity.ts");
const enums_1 = __webpack_require__(/*! ../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/entities/workout-routine.entity.ts":
/*!************************************************!*\
  !*** ./src/entities/workout-routine.entity.ts ***!
  \************************************************/
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const member_entity_1 = __webpack_require__(/*! ./member.entity */ "./src/entities/member.entity.ts");
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

/***/ "./src/modules/analytics/analytics.controller.ts":
/*!*******************************************************!*\
  !*** ./src/modules/analytics/analytics.controller.ts ***!
  \*******************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const analytics_service_1 = __webpack_require__(/*! ./analytics.service */ "./src/modules/analytics/analytics.service.ts");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
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

/***/ "./src/modules/analytics/analytics.module.ts":
/*!***************************************************!*\
  !*** ./src/modules/analytics/analytics.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalyticsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const analytics_controller_1 = __webpack_require__(/*! ./analytics.controller */ "./src/modules/analytics/analytics.controller.ts");
const analytics_service_1 = __webpack_require__(/*! ./analytics.service */ "./src/modules/analytics/analytics.service.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
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

/***/ "./src/modules/analytics/analytics.service.ts":
/*!****************************************************!*\
  !*** ./src/modules/analytics/analytics.service.ts ***!
  \****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
const snapshot_normalizer_1 = __webpack_require__(/*! ../../common/utils/snapshot-normalizer */ "./src/common/utils/snapshot-normalizer.ts");
const analytics_helper_1 = __webpack_require__(/*! ../../common/utils/analytics-helper */ "./src/common/utils/analytics-helper.ts");
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

/***/ "./src/modules/assessments/assessments.controller.ts":
/*!***********************************************************!*\
  !*** ./src/modules/assessments/assessments.controller.ts ***!
  \***********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const assessments_service_1 = __webpack_require__(/*! ./assessments.service */ "./src/modules/assessments/assessments.service.ts");
const create_assessment_dto_1 = __webpack_require__(/*! ./dto/create-assessment.dto */ "./src/modules/assessments/dto/create-assessment.dto.ts");
const update_assessment_dto_1 = __webpack_require__(/*! ./dto/update-assessment.dto */ "./src/modules/assessments/dto/update-assessment.dto.ts");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
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

/***/ "./src/modules/assessments/assessments.module.ts":
/*!*******************************************************!*\
  !*** ./src/modules/assessments/assessments.module.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssessmentsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const assessments_controller_1 = __webpack_require__(/*! ./assessments.controller */ "./src/modules/assessments/assessments.controller.ts");
const assessments_service_1 = __webpack_require__(/*! ./assessments.service */ "./src/modules/assessments/assessments.service.ts");
const assessment_entity_1 = __webpack_require__(/*! ../../entities/assessment.entity */ "./src/entities/assessment.entity.ts");
const assessment_item_entity_1 = __webpack_require__(/*! ../../entities/assessment-item.entity */ "./src/entities/assessment-item.entity.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const injury_restriction_entity_1 = __webpack_require__(/*! ../../entities/injury-restriction.entity */ "./src/entities/injury-restriction.entity.ts");
const injury_history_entity_1 = __webpack_require__(/*! ../../entities/injury-history.entity */ "./src/entities/injury-history.entity.ts");
const assessment_grade_constant_entity_1 = __webpack_require__(/*! ../../entities/assessment-grade-constant.entity */ "./src/entities/assessment-grade-constant.entity.ts");
const assessment_category_score_entity_1 = __webpack_require__(/*! ../../entities/assessment-category-score.entity */ "./src/entities/assessment-category-score.entity.ts");
const flexibility_item_weight_entity_1 = __webpack_require__(/*! ../../entities/flexibility-item-weight.entity */ "./src/entities/flexibility-item-weight.entity.ts");
const flexibility_grade_threshold_entity_1 = __webpack_require__(/*! ../../entities/flexibility-grade-threshold.entity */ "./src/entities/flexibility-grade-threshold.entity.ts");
const body_composition_standard_entity_1 = __webpack_require__(/*! ../../entities/body-composition-standard.entity */ "./src/entities/body-composition-standard.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const exercise_entity_1 = __webpack_require__(/*! ../../entities/exercise.entity */ "./src/entities/exercise.entity.ts");
const strength_standard_entity_1 = __webpack_require__(/*! ../../entities/strength-standard.entity */ "./src/entities/strength-standard.entity.ts");
const score_calculator_1 = __webpack_require__(/*! ../../common/utils/score-calculator */ "./src/common/utils/score-calculator.ts");
const grade_score_converter_1 = __webpack_require__(/*! ../../common/utils/grade-score-converter */ "./src/common/utils/grade-score-converter.ts");
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
                exercise_entity_1.Exercise,
                strength_standard_entity_1.StrengthStandard,
            ]),
        ],
        controllers: [assessments_controller_1.AssessmentsController],
        providers: [assessments_service_1.AssessmentsService, score_calculator_1.ScoreCalculator, grade_score_converter_1.GradeScoreConverter],
        exports: [assessments_service_1.AssessmentsService],
    })
], AssessmentsModule);


/***/ }),

/***/ "./src/modules/assessments/assessments.service.ts":
/*!********************************************************!*\
  !*** ./src/modules/assessments/assessments.service.ts ***!
  \********************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssessmentsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const assessment_entity_1 = __webpack_require__(/*! ../../entities/assessment.entity */ "./src/entities/assessment.entity.ts");
const assessment_item_entity_1 = __webpack_require__(/*! ../../entities/assessment-item.entity */ "./src/entities/assessment-item.entity.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const score_calculator_1 = __webpack_require__(/*! ../../common/utils/score-calculator */ "./src/common/utils/score-calculator.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
const date_helper_1 = __webpack_require__(/*! ../../common/utils/date-helper */ "./src/common/utils/date-helper.ts");
const snapshot_normalizer_1 = __webpack_require__(/*! ../../common/utils/snapshot-normalizer */ "./src/common/utils/snapshot-normalizer.ts");
const entity_update_helper_1 = __webpack_require__(/*! ../../common/utils/entity-update-helper */ "./src/common/utils/entity-update-helper.ts");
const repository_helper_1 = __webpack_require__(/*! ../../common/utils/repository-helper */ "./src/common/utils/repository-helper.ts");
const grade_score_converter_1 = __webpack_require__(/*! ../../common/utils/grade-score-converter */ "./src/common/utils/grade-score-converter.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const exercise_entity_1 = __webpack_require__(/*! ../../entities/exercise.entity */ "./src/entities/exercise.entity.ts");
const strength_standard_entity_1 = __webpack_require__(/*! ../../entities/strength-standard.entity */ "./src/entities/strength-standard.entity.ts");
let AssessmentsService = AssessmentsService_1 = class AssessmentsService {
    constructor(assessmentRepository, assessmentItemRepository, abilitySnapshotRepository, memberRepository, exerciseRepository, strengthStandardRepository, scoreCalculator, gradeScoreConverter) {
        this.assessmentRepository = assessmentRepository;
        this.assessmentItemRepository = assessmentItemRepository;
        this.abilitySnapshotRepository = abilitySnapshotRepository;
        this.memberRepository = memberRepository;
        this.exerciseRepository = exerciseRepository;
        this.strengthStandardRepository = strengthStandardRepository;
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
            let detailsWithStrength = itemDto.details || {};
            const assessmentItem = this.assessmentItemRepository.create({
                assessmentId: savedAssessment.id,
                category: itemDto.category,
                name: itemDto.name,
                value: itemDto.value,
                unit: itemDto.unit,
                score,
                details: detailsWithStrength,
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
                let detailsWithStrength = itemDto.details || {};
                const assessmentItem = this.assessmentItemRepository.create({
                    assessmentId: id,
                    category: itemDto.category,
                    name: itemDto.name,
                    value: itemDto.value,
                    unit: itemDto.unit,
                    score,
                    details: detailsWithStrength,
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
            indicators: [
                { name: "하체 근력", score: snapshot.strengthScore ?? 0 },
                { name: "심폐 지구력", score: snapshot.cardioScore ?? 0 },
                { name: "근지구력", score: snapshot.enduranceScore ?? 0 },
                { name: "유연성", score: snapshot.flexibilityScore ?? 0 },
                { name: "체성분 밸런스", score: snapshot.bodyScore ?? 0 },
                { name: "부상 안정성", score: snapshot.stabilityScore ?? 0 },
            ],
            assessedAt: date_helper_1.DateHelper.toKoreaTimeISOString(snapshot.assessedAt),
            version: snapshot.version || "v1",
        };
        if (includeInitial) {
            const initialSnapshot = await this.getInitialSnapshot(memberId);
            const initial = initialSnapshot
                ? {
                    indicators: [
                        { name: "하체 근력", score: initialSnapshot.strengthScore ?? 0 },
                        { name: "심폐 지구력", score: initialSnapshot.cardioScore ?? 0 },
                        { name: "근지구력", score: initialSnapshot.enduranceScore ?? 0 },
                        { name: "유연성", score: initialSnapshot.flexibilityScore ?? 0 },
                        { name: "체성분 밸런스", score: initialSnapshot.bodyScore ?? 0 },
                        { name: "부상 안정성", score: initialSnapshot.stabilityScore ?? 0 },
                    ],
                    assessedAt: date_helper_1.DateHelper.toKoreaTimeISOString(initialSnapshot.assessedAt),
                    version: initialSnapshot.version || "v1",
                }
                : null;
            return {
                ...current,
                initial,
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
                indicators: [
                    { name: "하체 근력", score: snapshot.strengthScore ?? 0 },
                    { name: "심폐 지구력", score: snapshot.cardioScore ?? 0 },
                    { name: "근지구력", score: snapshot.enduranceScore ?? 0 },
                    { name: "유연성", score: snapshot.flexibilityScore ?? 0 },
                    { name: "체성분 밸런스", score: snapshot.bodyScore ?? 0 },
                    { name: "부상 안정성", score: snapshot.stabilityScore ?? 0 },
                ],
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
    __param(4, (0, typeorm_1.InjectRepository)(exercise_entity_1.Exercise)),
    __param(5, (0, typeorm_1.InjectRepository)(strength_standard_entity_1.StrengthStandard)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object, typeof (_g = typeof score_calculator_1.ScoreCalculator !== "undefined" && score_calculator_1.ScoreCalculator) === "function" ? _g : Object, typeof (_h = typeof grade_score_converter_1.GradeScoreConverter !== "undefined" && grade_score_converter_1.GradeScoreConverter) === "function" ? _h : Object])
], AssessmentsService);


/***/ }),

/***/ "./src/modules/assessments/dto/create-assessment-item.dto.ts":
/*!*******************************************************************!*\
  !*** ./src/modules/assessments/dto/create-assessment-item.dto.ts ***!
  \*******************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/modules/assessments/dto/create-assessment.dto.ts":
/*!**************************************************************!*\
  !*** ./src/modules/assessments/dto/create-assessment.dto.ts ***!
  \**************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
const create_assessment_item_dto_1 = __webpack_require__(/*! ./create-assessment-item.dto */ "./src/modules/assessments/dto/create-assessment-item.dto.ts");
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

/***/ "./src/modules/assessments/dto/update-assessment.dto.ts":
/*!**************************************************************!*\
  !*** ./src/modules/assessments/dto/update-assessment.dto.ts ***!
  \**************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
const create_assessment_item_dto_1 = __webpack_require__(/*! ./create-assessment-item.dto */ "./src/modules/assessments/dto/create-assessment-item.dto.ts");
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

/***/ "./src/modules/auth/auth.controller.ts":
/*!*********************************************!*\
  !*** ./src/modules/auth/auth.controller.ts ***!
  \*********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/modules/auth/auth.service.ts");
const login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ "./src/modules/auth/dto/login.dto.ts");
const register_dto_1 = __webpack_require__(/*! ./dto/register.dto */ "./src/modules/auth/dto/register.dto.ts");
const refresh_token_dto_1 = __webpack_require__(/*! ./dto/refresh-token.dto */ "./src/modules/auth/dto/refresh-token.dto.ts");
const update_user_dto_1 = __webpack_require__(/*! ./dto/update-user.dto */ "./src/modules/auth/dto/update-user.dto.ts");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const roles_decorator_1 = __webpack_require__(/*! ./decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const decorators_1 = __webpack_require__(/*! ../../common/decorators */ "./src/common/decorators/index.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
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

/***/ "./src/modules/auth/auth.module.ts":
/*!*****************************************!*\
  !*** ./src/modules/auth/auth.module.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./src/modules/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/modules/auth/auth.service.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ "./src/modules/auth/strategies/jwt.strategy.ts");
const kakao_strategy_1 = __webpack_require__(/*! ./strategies/kakao.strategy */ "./src/modules/auth/strategies/kakao.strategy.ts");
const user_entity_1 = __webpack_require__(/*! ../../entities/user.entity */ "./src/entities/user.entity.ts");
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

/***/ "./src/modules/auth/auth.service.ts":
/*!******************************************!*\
  !*** ./src/modules/auth/auth.service.ts ***!
  \******************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const user_entity_1 = __webpack_require__(/*! ../../entities/user.entity */ "./src/entities/user.entity.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
const entity_update_helper_1 = __webpack_require__(/*! ../../common/utils/entity-update-helper */ "./src/common/utils/entity-update-helper.ts");
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
        const savedUser = await this.userRepository.save(user);
        if (requestedRole === enums_1.Role.TRAINER) {
            this.logger.log(`TRAINER 회원가입 완료 (승인 대기): ${savedUser.email} - ADMIN 승인 필요`);
        }
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

/***/ "./src/modules/auth/decorators/roles.decorator.ts":
/*!********************************************************!*\
  !*** ./src/modules/auth/decorators/roles.decorator.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const roles_guard_1 = __webpack_require__(/*! ../../../common/guards/roles.guard */ "./src/common/guards/roles.guard.ts");
const Roles = (...roles) => (0, common_1.SetMetadata)(roles_guard_1.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./src/modules/auth/dto/login.dto.ts":
/*!*******************************************!*\
  !*** ./src/modules/auth/dto/login.dto.ts ***!
  \*******************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const is_email_or_test_decorator_1 = __webpack_require__(/*! ../../../common/decorators/is-email-or-test.decorator */ "./src/common/decorators/is-email-or-test.decorator.ts");
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

/***/ "./src/modules/auth/dto/refresh-token.dto.ts":
/*!***************************************************!*\
  !*** ./src/modules/auth/dto/refresh-token.dto.ts ***!
  \***************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/modules/auth/dto/register.dto.ts":
/*!**********************************************!*\
  !*** ./src/modules/auth/dto/register.dto.ts ***!
  \**********************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
const is_email_or_test_decorator_1 = __webpack_require__(/*! ../../../common/decorators/is-email-or-test.decorator */ "./src/common/decorators/is-email-or-test.decorator.ts");
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

/***/ "./src/modules/auth/dto/update-user.dto.ts":
/*!*************************************************!*\
  !*** ./src/modules/auth/dto/update-user.dto.ts ***!
  \*************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
const is_email_or_test_decorator_1 = __webpack_require__(/*! ../../../common/decorators/is-email-or-test.decorator */ "./src/common/decorators/is-email-or-test.decorator.ts");
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

/***/ "./src/modules/auth/strategies/jwt.strategy.ts":
/*!*****************************************************!*\
  !*** ./src/modules/auth/strategies/jwt.strategy.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./src/modules/auth/auth.service.ts");
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

/***/ "./src/modules/auth/strategies/kakao.strategy.ts":
/*!*******************************************************!*\
  !*** ./src/modules/auth/strategies/kakao.strategy.ts ***!
  \*******************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_kakao_1 = __webpack_require__(/*! passport-kakao */ "passport-kakao");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_service_1 = __webpack_require__(/*! ../auth.service */ "./src/modules/auth/auth.service.ts");
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

/***/ "./src/modules/exercises/dto/get-exercises.dto.ts":
/*!********************************************************!*\
  !*** ./src/modules/exercises/dto/get-exercises.dto.ts ***!
  \********************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const exercise_entity_1 = __webpack_require__(/*! ../../../entities/exercise.entity */ "./src/entities/exercise.entity.ts");
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

/***/ "./src/modules/exercises/exercises.controller.ts":
/*!*******************************************************!*\
  !*** ./src/modules/exercises/exercises.controller.ts ***!
  \*******************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const exercises_service_1 = __webpack_require__(/*! ./exercises.service */ "./src/modules/exercises/exercises.service.ts");
const get_exercises_dto_1 = __webpack_require__(/*! ./dto/get-exercises.dto */ "./src/modules/exercises/dto/get-exercises.dto.ts");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
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

/***/ "./src/modules/exercises/exercises.module.ts":
/*!***************************************************!*\
  !*** ./src/modules/exercises/exercises.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExercisesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const exercises_controller_1 = __webpack_require__(/*! ./exercises.controller */ "./src/modules/exercises/exercises.controller.ts");
const exercises_service_1 = __webpack_require__(/*! ./exercises.service */ "./src/modules/exercises/exercises.service.ts");
const exercise_entity_1 = __webpack_require__(/*! ../../entities/exercise.entity */ "./src/entities/exercise.entity.ts");
const workout_record_entity_1 = __webpack_require__(/*! ../../entities/workout-record.entity */ "./src/entities/workout-record.entity.ts");
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

/***/ "./src/modules/exercises/exercises.service.ts":
/*!****************************************************!*\
  !*** ./src/modules/exercises/exercises.service.ts ***!
  \****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const exercise_entity_1 = __webpack_require__(/*! ../../entities/exercise.entity */ "./src/entities/exercise.entity.ts");
const workout_record_entity_1 = __webpack_require__(/*! ../../entities/workout-record.entity */ "./src/entities/workout-record.entity.ts");
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

/***/ "./src/modules/insights/insights.controller.ts":
/*!*****************************************************!*\
  !*** ./src/modules/insights/insights.controller.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const insights_service_1 = __webpack_require__(/*! ./insights.service */ "./src/modules/insights/insights.service.ts");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
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
exports.InsightsController = InsightsController = __decorate([
    (0, swagger_1.ApiTags)("insights"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.Controller)("api/insights"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    __metadata("design:paramtypes", [typeof (_a = typeof insights_service_1.InsightsService !== "undefined" && insights_service_1.InsightsService) === "function" ? _a : Object])
], InsightsController);


/***/ }),

/***/ "./src/modules/insights/insights.module.ts":
/*!*************************************************!*\
  !*** ./src/modules/insights/insights.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsightsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const insights_controller_1 = __webpack_require__(/*! ./insights.controller */ "./src/modules/insights/insights.controller.ts");
const insights_service_1 = __webpack_require__(/*! ./insights.service */ "./src/modules/insights/insights.service.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const assessment_entity_1 = __webpack_require__(/*! ../../entities/assessment.entity */ "./src/entities/assessment.entity.ts");
const injury_history_entity_1 = __webpack_require__(/*! ../../entities/injury-history.entity */ "./src/entities/injury-history.entity.ts");
let InsightsModule = class InsightsModule {
};
exports.InsightsModule = InsightsModule;
exports.InsightsModule = InsightsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ability_snapshot_entity_1.AbilitySnapshot, member_entity_1.Member, assessment_entity_1.Assessment, injury_history_entity_1.InjuryHistory]),
        ],
        controllers: [insights_controller_1.InsightsController],
        providers: [insights_service_1.InsightsService],
        exports: [insights_service_1.InsightsService],
    })
], InsightsModule);


/***/ }),

/***/ "./src/modules/insights/insights.service.ts":
/*!**************************************************!*\
  !*** ./src/modules/insights/insights.service.ts ***!
  \**************************************************/
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InsightsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const assessment_entity_1 = __webpack_require__(/*! ../../entities/assessment.entity */ "./src/entities/assessment.entity.ts");
const injury_history_entity_1 = __webpack_require__(/*! ../../entities/injury-history.entity */ "./src/entities/injury-history.entity.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const date_helper_1 = __webpack_require__(/*! ../../common/utils/date-helper */ "./src/common/utils/date-helper.ts");
const snapshot_normalizer_1 = __webpack_require__(/*! ../../common/utils/snapshot-normalizer */ "./src/common/utils/snapshot-normalizer.ts");
const analytics_helper_1 = __webpack_require__(/*! ../../common/utils/analytics-helper */ "./src/common/utils/analytics-helper.ts");
let InsightsService = class InsightsService {
    constructor(abilitySnapshotRepository, memberRepository, assessmentRepository, injuryHistoryRepository) {
        this.abilitySnapshotRepository = abilitySnapshotRepository;
        this.memberRepository = memberRepository;
        this.assessmentRepository = assessmentRepository;
        this.injuryHistoryRepository = injuryHistoryRepository;
    }
    async getHexagon() {
        const members = await this.memberRepository.find({
            where: { status: enums_1.MemberStatus.ACTIVE },
        });
        if (members.length === 0) {
            return {
                indicators: [
                    { name: "하체 근력", score: 0 },
                    { name: "심폐 지구력", score: 0 },
                    { name: "근지구력", score: 0 },
                    { name: "유연성", score: 0 },
                    { name: "체성분 밸런스", score: 0 },
                    { name: "부상 안정성", score: 0 },
                ],
                assessedAt: date_helper_1.DateHelper.getKoreaTimeISOString(),
                version: "v1",
            };
        }
        const latestSnapshots = await Promise.all(members.map(async (member) => {
            return this.abilitySnapshotRepository.findOne({
                where: { memberId: member.id },
                order: { assessedAt: "DESC" },
            });
        }));
        const validSnapshots = snapshot_normalizer_1.SnapshotNormalizer.normalizeArray(latestSnapshots);
        if (validSnapshots.length === 0) {
            return {
                indicators: [
                    { name: "하체 근력", score: 0 },
                    { name: "심폐 지구력", score: 0 },
                    { name: "근지구력", score: 0 },
                    { name: "유연성", score: 0 },
                    { name: "체성분 밸런스", score: 0 },
                    { name: "부상 안정성", score: 0 },
                ],
                assessedAt: date_helper_1.DateHelper.getKoreaTimeISOString(),
                version: "v1",
            };
        }
        const averages = analytics_helper_1.AnalyticsHelper.calculateAverages(validSnapshots);
        const latestDate = validSnapshots.reduce((latest, snapshot) => {
            return snapshot.assessedAt > latest ? snapshot.assessedAt : latest;
        }, validSnapshots[0].assessedAt);
        return {
            indicators: [
                { name: "하체 근력", score: Math.round(averages.strengthScore) },
                { name: "심폐 지구력", score: Math.round(averages.cardioScore) },
                { name: "근지구력", score: Math.round(averages.enduranceScore) },
                { name: "유연성", score: Math.round(averages.flexibilityScore) },
                { name: "체성분 밸런스", score: Math.round(averages.bodyScore) },
                { name: "부상 안정성", score: Math.round(averages.stabilityScore) },
            ],
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
};
exports.InsightsService = InsightsService;
exports.InsightsService = InsightsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ability_snapshot_entity_1.AbilitySnapshot)),
    __param(1, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(2, (0, typeorm_1.InjectRepository)(assessment_entity_1.Assessment)),
    __param(3, (0, typeorm_1.InjectRepository)(injury_history_entity_1.InjuryHistory)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], InsightsService);


/***/ }),

/***/ "./src/modules/members/abilities.controller.ts":
/*!*****************************************************!*\
  !*** ./src/modules/members/abilities.controller.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const assessments_service_1 = __webpack_require__(/*! ../assessments/assessments.service */ "./src/modules/assessments/assessments.service.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
const compare_snapshots_query_dto_1 = __webpack_require__(/*! ./dto/compare-snapshots-query.dto */ "./src/modules/members/dto/compare-snapshots-query.dto.ts");
const snapshot_normalizer_1 = __webpack_require__(/*! ../../common/utils/snapshot-normalizer */ "./src/common/utils/snapshot-normalizer.ts");
const hexagon_response_dto_1 = __webpack_require__(/*! ./dto/hexagon-response.dto */ "./src/modules/members/dto/hexagon-response.dto.ts");
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

/***/ "./src/modules/members/analytics.controller.ts":
/*!*****************************************************!*\
  !*** ./src/modules/members/analytics.controller.ts ***!
  \*****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
const snapshot_normalizer_1 = __webpack_require__(/*! ../../common/utils/snapshot-normalizer */ "./src/common/utils/snapshot-normalizer.ts");
const analytics_helper_1 = __webpack_require__(/*! ../../common/utils/analytics-helper */ "./src/common/utils/analytics-helper.ts");
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

/***/ "./src/modules/members/dto/compare-snapshots-query.dto.ts":
/*!****************************************************************!*\
  !*** ./src/modules/members/dto/compare-snapshots-query.dto.ts ***!
  \****************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
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

/***/ "./src/modules/members/dto/create-goal.dto.ts":
/*!****************************************************!*\
  !*** ./src/modules/members/dto/create-goal.dto.ts ***!
  \****************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/modules/members/dto/create-injury-restriction.dto.ts":
/*!******************************************************************!*\
  !*** ./src/modules/members/dto/create-injury-restriction.dto.ts ***!
  \******************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/modules/members/dto/create-injury.dto.ts":
/*!******************************************************!*\
  !*** ./src/modules/members/dto/create-injury.dto.ts ***!
  \******************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/modules/members/dto/create-member.dto.ts":
/*!******************************************************!*\
  !*** ./src/modules/members/dto/create-member.dto.ts ***!
  \******************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
const is_phone_number_decorator_1 = __webpack_require__(/*! ../../../common/decorators/is-phone-number.decorator */ "./src/common/decorators/is-phone-number.decorator.ts");
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

/***/ "./src/modules/members/dto/create-membership.dto.ts":
/*!**********************************************************!*\
  !*** ./src/modules/members/dto/create-membership.dto.ts ***!
  \**********************************************************/
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
exports.CreateMembershipDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
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
    __metadata("design:type", typeof (_a = typeof enums_1.MembershipType !== "undefined" && enums_1.MembershipType) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof enums_1.MembershipStatus !== "undefined" && enums_1.MembershipStatus) === "function" ? _b : Object)
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


/***/ }),

/***/ "./src/modules/members/dto/create-pt-session.dto.ts":
/*!**********************************************************!*\
  !*** ./src/modules/members/dto/create-pt-session.dto.ts ***!
  \**********************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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


/***/ }),

/***/ "./src/modules/members/dto/create-workout-record.dto.ts":
/*!**************************************************************!*\
  !*** ./src/modules/members/dto/create-workout-record.dto.ts ***!
  \**************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const workout_record_entity_1 = __webpack_require__(/*! ../../../entities/workout-record.entity */ "./src/entities/workout-record.entity.ts");
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

/***/ "./src/modules/members/dto/create-workout-routine.dto.ts":
/*!***************************************************************!*\
  !*** ./src/modules/members/dto/create-workout-routine.dto.ts ***!
  \***************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
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

/***/ "./src/modules/members/dto/dashboard-response.dto.ts":
/*!***********************************************************!*\
  !*** ./src/modules/members/dto/dashboard-response.dto.ts ***!
  \***********************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/modules/members/dto/goal-response.dto.ts":
/*!******************************************************!*\
  !*** ./src/modules/members/dto/goal-response.dto.ts ***!
  \******************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class GoalResponseDto {
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

/***/ "./src/modules/members/dto/hexagon-response.dto.ts":
/*!*********************************************************!*\
  !*** ./src/modules/members/dto/hexagon-response.dto.ts ***!
  \*********************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/modules/members/dto/update-goal.dto.ts":
/*!****************************************************!*\
  !*** ./src/modules/members/dto/update-goal.dto.ts ***!
  \****************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/modules/members/dto/update-injury.dto.ts":
/*!******************************************************!*\
  !*** ./src/modules/members/dto/update-injury.dto.ts ***!
  \******************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/modules/members/dto/update-member.dto.ts":
/*!******************************************************!*\
  !*** ./src/modules/members/dto/update-member.dto.ts ***!
  \******************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
const is_phone_number_decorator_1 = __webpack_require__(/*! ../../../common/decorators/is-phone-number.decorator */ "./src/common/decorators/is-phone-number.decorator.ts");
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

/***/ "./src/modules/members/dto/update-membership.dto.ts":
/*!**********************************************************!*\
  !*** ./src/modules/members/dto/update-membership.dto.ts ***!
  \**********************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const enums_1 = __webpack_require__(/*! ../../../common/enums */ "./src/common/enums/index.ts");
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

/***/ "./src/modules/members/dto/update-pt-session.dto.ts":
/*!**********************************************************!*\
  !*** ./src/modules/members/dto/update-pt-session.dto.ts ***!
  \**********************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/modules/members/dto/update-pt-usage.dto.ts":
/*!********************************************************!*\
  !*** ./src/modules/members/dto/update-pt-usage.dto.ts ***!
  \********************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
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

/***/ "./src/modules/members/dto/update-workout-record.dto.ts":
/*!**************************************************************!*\
  !*** ./src/modules/members/dto/update-workout-record.dto.ts ***!
  \**************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const workout_record_entity_1 = __webpack_require__(/*! ../../../entities/workout-record.entity */ "./src/entities/workout-record.entity.ts");
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

/***/ "./src/modules/members/dto/update-workout-routine.dto.ts":
/*!***************************************************************!*\
  !*** ./src/modules/members/dto/update-workout-routine.dto.ts ***!
  \***************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const create_workout_routine_dto_1 = __webpack_require__(/*! ./create-workout-routine.dto */ "./src/modules/members/dto/create-workout-routine.dto.ts");
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

/***/ "./src/modules/members/dto/workout-volume-query.dto.ts":
/*!*************************************************************!*\
  !*** ./src/modules/members/dto/workout-volume-query.dto.ts ***!
  \*************************************************************/
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
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/modules/members/injuries.controller.ts":
/*!****************************************************!*\
  !*** ./src/modules/members/injuries.controller.ts ***!
  \****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const injury_history_entity_1 = __webpack_require__(/*! ../../entities/injury-history.entity */ "./src/entities/injury-history.entity.ts");
const injury_restriction_entity_1 = __webpack_require__(/*! ../../entities/injury-restriction.entity */ "./src/entities/injury-restriction.entity.ts");
const create_injury_dto_1 = __webpack_require__(/*! ./dto/create-injury.dto */ "./src/modules/members/dto/create-injury.dto.ts");
const update_injury_dto_1 = __webpack_require__(/*! ./dto/update-injury.dto */ "./src/modules/members/dto/update-injury.dto.ts");
const create_injury_restriction_dto_1 = __webpack_require__(/*! ./dto/create-injury-restriction.dto */ "./src/modules/members/dto/create-injury-restriction.dto.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
const entity_update_helper_1 = __webpack_require__(/*! ../../common/utils/entity-update-helper */ "./src/common/utils/entity-update-helper.ts");
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

/***/ "./src/modules/members/members.controller.ts":
/*!***************************************************!*\
  !*** ./src/modules/members/members.controller.ts ***!
  \***************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const members_service_1 = __webpack_require__(/*! ./members.service */ "./src/modules/members/members.service.ts");
const workout_records_service_1 = __webpack_require__(/*! ./workout-records.service */ "./src/modules/members/workout-records.service.ts");
const pt_sessions_service_1 = __webpack_require__(/*! ./pt-sessions.service */ "./src/modules/members/pt-sessions.service.ts");
const workout_routines_service_1 = __webpack_require__(/*! ./workout-routines.service */ "./src/modules/members/workout-routines.service.ts");
const create_member_dto_1 = __webpack_require__(/*! ./dto/create-member.dto */ "./src/modules/members/dto/create-member.dto.ts");
const update_member_dto_1 = __webpack_require__(/*! ./dto/update-member.dto */ "./src/modules/members/dto/update-member.dto.ts");
const create_membership_dto_1 = __webpack_require__(/*! ./dto/create-membership.dto */ "./src/modules/members/dto/create-membership.dto.ts");
const update_membership_dto_1 = __webpack_require__(/*! ./dto/update-membership.dto */ "./src/modules/members/dto/update-membership.dto.ts");
const update_pt_usage_dto_1 = __webpack_require__(/*! ./dto/update-pt-usage.dto */ "./src/modules/members/dto/update-pt-usage.dto.ts");
const update_goal_dto_1 = __webpack_require__(/*! ./dto/update-goal.dto */ "./src/modules/members/dto/update-goal.dto.ts");
const create_goal_dto_1 = __webpack_require__(/*! ./dto/create-goal.dto */ "./src/modules/members/dto/create-goal.dto.ts");
const goal_response_dto_1 = __webpack_require__(/*! ./dto/goal-response.dto */ "./src/modules/members/dto/goal-response.dto.ts");
const create_workout_record_dto_1 = __webpack_require__(/*! ./dto/create-workout-record.dto */ "./src/modules/members/dto/create-workout-record.dto.ts");
const update_workout_record_dto_1 = __webpack_require__(/*! ./dto/update-workout-record.dto */ "./src/modules/members/dto/update-workout-record.dto.ts");
const workout_volume_query_dto_1 = __webpack_require__(/*! ./dto/workout-volume-query.dto */ "./src/modules/members/dto/workout-volume-query.dto.ts");
const create_pt_session_dto_1 = __webpack_require__(/*! ./dto/create-pt-session.dto */ "./src/modules/members/dto/create-pt-session.dto.ts");
const update_pt_session_dto_1 = __webpack_require__(/*! ./dto/update-pt-session.dto */ "./src/modules/members/dto/update-pt-session.dto.ts");
const create_workout_routine_dto_1 = __webpack_require__(/*! ./dto/create-workout-routine.dto */ "./src/modules/members/dto/create-workout-routine.dto.ts");
const update_workout_routine_dto_1 = __webpack_require__(/*! ./dto/update-workout-routine.dto */ "./src/modules/members/dto/update-workout-routine.dto.ts");
const dashboard_response_dto_1 = __webpack_require__(/*! ./dto/dashboard-response.dto */ "./src/modules/members/dto/dashboard-response.dto.ts");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
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
    async getGoal(id) {
        const goal = await this.membersService.getGoal(id);
        return api_response_1.ApiResponseHelper.success(goal, '목표 조회 성공');
    }
    async createGoal(id, createGoalDto) {
        const member = await this.membersService.createGoal(id, createGoalDto);
        const goalResponse = {
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
        return api_response_1.ApiResponseHelper.success(goalResponse, '목표 생성 성공');
    }
    async updateGoal(id, updateGoalDto) {
        const member = await this.membersService.updateGoal(id, updateGoalDto);
        const goalResponse = {
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
        return api_response_1.ApiResponseHelper.success(goalResponse, '목표 수정 성공');
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_member_dto_1.CreateMemberDto !== "undefined" && create_member_dto_1.CreateMemberDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "create", null);
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
    __metadata("design:paramtypes", [String, typeof (_f = typeof update_member_dto_1.UpdateMemberDto !== "undefined" && update_member_dto_1.UpdateMemberDto) === "function" ? _f : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_g = typeof create_membership_dto_1.CreateMembershipDto !== "undefined" && create_membership_dto_1.CreateMembershipDto) === "function" ? _g : Object]),
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
    __metadata("design:paramtypes", [String, String, typeof (_h = typeof update_membership_dto_1.UpdateMembershipDto !== "undefined" && update_membership_dto_1.UpdateMembershipDto) === "function" ? _h : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_j = typeof update_pt_usage_dto_1.UpdatePTUsageDto !== "undefined" && update_pt_usage_dto_1.UpdatePTUsageDto) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], MembersController.prototype, "createOrUpdatePTUsage", null);
__decorate([
    (0, common_1.Put)(":id/pt-count"),
    (0, common_1.UseGuards)(guards_1.JwtRolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.Role.ADMIN, enums_1.Role.TRAINER),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof update_pt_usage_dto_1.UpdatePTUsageDto !== "undefined" && update_pt_usage_dto_1.UpdatePTUsageDto) === "function" ? _k : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_l = typeof create_goal_dto_1.CreateGoalDto !== "undefined" && create_goal_dto_1.CreateGoalDto) === "function" ? _l : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_m = typeof update_goal_dto_1.UpdateGoalDto !== "undefined" && update_goal_dto_1.UpdateGoalDto) === "function" ? _m : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_o = typeof workout_volume_query_dto_1.WorkoutVolumeQueryDto !== "undefined" && workout_volume_query_dto_1.WorkoutVolumeQueryDto) === "function" ? _o : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_p = typeof create_workout_record_dto_1.CreateWorkoutRecordDto !== "undefined" && create_workout_record_dto_1.CreateWorkoutRecordDto) === "function" ? _p : Object]),
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
    __metadata("design:paramtypes", [String, String, typeof (_q = typeof update_workout_record_dto_1.UpdateWorkoutRecordDto !== "undefined" && update_workout_record_dto_1.UpdateWorkoutRecordDto) === "function" ? _q : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_r = typeof create_pt_session_dto_1.CreatePTSessionDto !== "undefined" && create_pt_session_dto_1.CreatePTSessionDto) === "function" ? _r : Object]),
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
    __metadata("design:paramtypes", [String, String, typeof (_s = typeof update_pt_session_dto_1.UpdatePTSessionDto !== "undefined" && update_pt_session_dto_1.UpdatePTSessionDto) === "function" ? _s : Object]),
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
    __metadata("design:paramtypes", [String, typeof (_t = typeof create_workout_routine_dto_1.CreateWorkoutRoutineDto !== "undefined" && create_workout_routine_dto_1.CreateWorkoutRoutineDto) === "function" ? _t : Object]),
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
    __metadata("design:paramtypes", [String, String, typeof (_u = typeof update_workout_routine_dto_1.UpdateWorkoutRoutineDto !== "undefined" && update_workout_routine_dto_1.UpdateWorkoutRoutineDto) === "function" ? _u : Object]),
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

/***/ "./src/modules/members/members.module.ts":
/*!***********************************************!*\
  !*** ./src/modules/members/members.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const members_controller_1 = __webpack_require__(/*! ./members.controller */ "./src/modules/members/members.controller.ts");
const members_service_1 = __webpack_require__(/*! ./members.service */ "./src/modules/members/members.service.ts");
const workout_records_service_1 = __webpack_require__(/*! ./workout-records.service */ "./src/modules/members/workout-records.service.ts");
const pt_sessions_service_1 = __webpack_require__(/*! ./pt-sessions.service */ "./src/modules/members/pt-sessions.service.ts");
const workout_routines_service_1 = __webpack_require__(/*! ./workout-routines.service */ "./src/modules/members/workout-routines.service.ts");
const injuries_controller_1 = __webpack_require__(/*! ./injuries.controller */ "./src/modules/members/injuries.controller.ts");
const abilities_controller_1 = __webpack_require__(/*! ./abilities.controller */ "./src/modules/members/abilities.controller.ts");
const analytics_controller_1 = __webpack_require__(/*! ./analytics.controller */ "./src/modules/members/analytics.controller.ts");
const workout_routines_controller_1 = __webpack_require__(/*! ./workout-routines.controller */ "./src/modules/members/workout-routines.controller.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const membership_entity_1 = __webpack_require__(/*! ../../entities/membership.entity */ "./src/entities/membership.entity.ts");
const pt_usage_entity_1 = __webpack_require__(/*! ../../entities/pt-usage.entity */ "./src/entities/pt-usage.entity.ts");
const injury_history_entity_1 = __webpack_require__(/*! ../../entities/injury-history.entity */ "./src/entities/injury-history.entity.ts");
const injury_restriction_entity_1 = __webpack_require__(/*! ../../entities/injury-restriction.entity */ "./src/entities/injury-restriction.entity.ts");
const ability_snapshot_entity_1 = __webpack_require__(/*! ../../entities/ability-snapshot.entity */ "./src/entities/ability-snapshot.entity.ts");
const workout_record_entity_1 = __webpack_require__(/*! ../../entities/workout-record.entity */ "./src/entities/workout-record.entity.ts");
const pt_session_entity_1 = __webpack_require__(/*! ../../entities/pt-session.entity */ "./src/entities/pt-session.entity.ts");
const workout_routine_entity_1 = __webpack_require__(/*! ../../entities/workout-routine.entity */ "./src/entities/workout-routine.entity.ts");
const exercise_entity_1 = __webpack_require__(/*! ../../entities/exercise.entity */ "./src/entities/exercise.entity.ts");
const strength_standard_entity_1 = __webpack_require__(/*! ../../entities/strength-standard.entity */ "./src/entities/strength-standard.entity.ts");
const assessments_module_1 = __webpack_require__(/*! ../assessments/assessments.module */ "./src/modules/assessments/assessments.module.ts");
const strength_level_evaluator_1 = __webpack_require__(/*! ../../common/utils/strength-level-evaluator */ "./src/common/utils/strength-level-evaluator.ts");
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

/***/ "./src/modules/members/members.service.ts":
/*!************************************************!*\
  !*** ./src/modules/members/members.service.ts ***!
  \************************************************/
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MembersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const membership_entity_1 = __webpack_require__(/*! ../../entities/membership.entity */ "./src/entities/membership.entity.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const pt_usage_entity_1 = __webpack_require__(/*! ../../entities/pt-usage.entity */ "./src/entities/pt-usage.entity.ts");
const workout_volume_query_dto_1 = __webpack_require__(/*! ./dto/workout-volume-query.dto */ "./src/modules/members/dto/workout-volume-query.dto.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
const entity_update_helper_1 = __webpack_require__(/*! ../../common/utils/entity-update-helper */ "./src/common/utils/entity-update-helper.ts");
const repository_helper_1 = __webpack_require__(/*! ../../common/utils/repository-helper */ "./src/common/utils/repository-helper.ts");
const member_helper_1 = __webpack_require__(/*! ../../common/utils/member-helper */ "./src/common/utils/member-helper.ts");
let MembersService = MembersService_1 = class MembersService {
    constructor(memberRepository, membershipRepository, ptUsageRepository) {
        this.memberRepository = memberRepository;
        this.membershipRepository = membershipRepository;
        this.ptUsageRepository = ptUsageRepository;
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
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = MembersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
    __param(1, (0, typeorm_1.InjectRepository)(membership_entity_1.Membership)),
    __param(2, (0, typeorm_1.InjectRepository)(pt_usage_entity_1.PTUsage)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], MembersService);


/***/ }),

/***/ "./src/modules/members/pt-sessions.service.ts":
/*!****************************************************!*\
  !*** ./src/modules/members/pt-sessions.service.ts ***!
  \****************************************************/
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PTSessionsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const pt_session_entity_1 = __webpack_require__(/*! ../../entities/pt-session.entity */ "./src/entities/pt-session.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const entity_update_helper_1 = __webpack_require__(/*! ../../common/utils/entity-update-helper */ "./src/common/utils/entity-update-helper.ts");
const repository_helper_1 = __webpack_require__(/*! ../../common/utils/repository-helper */ "./src/common/utils/repository-helper.ts");
let PTSessionsService = PTSessionsService_1 = class PTSessionsService {
    constructor(ptSessionRepository, memberRepository) {
        this.ptSessionRepository = ptSessionRepository;
        this.memberRepository = memberRepository;
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
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const member = await this.memberRepository.findOne({ where: { id: memberId } });
        const sessionNumber = await this.getNextSessionNumber(memberId);
        const sessionData = entity_update_helper_1.EntityUpdateHelper.convertDateFields({
            memberId,
            sessionNumber,
            mainContent: createDto.mainContent,
            trainerComment: createDto.trainerComment,
            sessionDate: createDto.sessionDate,
        }, ['sessionDate']);
        const session = this.ptSessionRepository.create(sessionData);
        const savedSession = await this.ptSessionRepository.save(session);
        member.completedSessions += 1;
        if (member.totalSessions > 0) {
            member.goalProgress = Math.round((member.completedSessions / member.totalSessions) * 100);
            if (member.goalProgress > 100) {
                member.goalProgress = 100;
            }
        }
        await this.memberRepository.save(member);
        return savedSession;
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
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], PTSessionsService);


/***/ }),

/***/ "./src/modules/members/workout-records.service.ts":
/*!********************************************************!*\
  !*** ./src/modules/members/workout-records.service.ts ***!
  \********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const workout_record_entity_1 = __webpack_require__(/*! ../../entities/workout-record.entity */ "./src/entities/workout-record.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const pt_usage_entity_1 = __webpack_require__(/*! ../../entities/pt-usage.entity */ "./src/entities/pt-usage.entity.ts");
const exercise_entity_1 = __webpack_require__(/*! ../../entities/exercise.entity */ "./src/entities/exercise.entity.ts");
const workout_volume_query_dto_1 = __webpack_require__(/*! ./dto/workout-volume-query.dto */ "./src/modules/members/dto/workout-volume-query.dto.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
const pt_sessions_service_1 = __webpack_require__(/*! ./pt-sessions.service */ "./src/modules/members/pt-sessions.service.ts");
const members_service_1 = __webpack_require__(/*! ./members.service */ "./src/modules/members/members.service.ts");
const workout_helper_1 = __webpack_require__(/*! ../../common/utils/workout-helper */ "./src/common/utils/workout-helper.ts");
const pt_usage_helper_1 = __webpack_require__(/*! ../../common/utils/pt-usage-helper */ "./src/common/utils/pt-usage-helper.ts");
const query_builder_helper_1 = __webpack_require__(/*! ../../common/utils/query-builder-helper */ "./src/common/utils/query-builder-helper.ts");
const date_range_helper_1 = __webpack_require__(/*! ../../common/utils/date-range-helper */ "./src/common/utils/date-range-helper.ts");
const entity_update_helper_1 = __webpack_require__(/*! ../../common/utils/entity-update-helper */ "./src/common/utils/entity-update-helper.ts");
const repository_helper_1 = __webpack_require__(/*! ../../common/utils/repository-helper */ "./src/common/utils/repository-helper.ts");
const one_rep_max_calculator_1 = __webpack_require__(/*! ../../common/utils/one-rep-max-calculator */ "./src/common/utils/one-rep-max-calculator.ts");
const relative_strength_calculator_1 = __webpack_require__(/*! ../../common/utils/relative-strength-calculator */ "./src/common/utils/relative-strength-calculator.ts");
const strength_level_evaluator_1 = __webpack_require__(/*! ../../common/utils/strength-level-evaluator */ "./src/common/utils/strength-level-evaluator.ts");
const strength_standard_entity_1 = __webpack_require__(/*! ../../entities/strength-standard.entity */ "./src/entities/strength-standard.entity.ts");
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
        const records = await this.workoutRecordRepository.find({
            where: {
                memberId,
                workoutDate: (0, typeorm_2.Between)(startDate, endDate),
            },
        });
        const volumeMap = new Map();
        records.forEach((record) => {
            const currentVolume = volumeMap.get(record.bodyPart) || 0;
            volumeMap.set(record.bodyPart, currentVolume + record.volume);
        });
        const bodyPartVolumes = Array.from(volumeMap.entries())
            .map(([bodyPart, volume]) => ({
            bodyPart,
            volume: Math.round(volume * 100) / 100,
        }))
            .sort((a, b) => b.volume - a.volume);
        const totalVolume = bodyPartVolumes.reduce((sum, item) => sum + item.volume, 0);
        return {
            period,
            bodyPartVolumes,
            totalVolume: Math.round(totalVolume * 100) / 100,
        };
    }
    async getVolumeAnalysis(memberId, period, startDate, endDate) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const result = {};
        if (!period || period === 'WEEKLY') {
            const { start: weekStart, end: weekEnd } = date_range_helper_1.DateRangeHelper.getWeekRange();
            const weeklyRecords = await this.workoutRecordRepository.find({
                where: {
                    memberId,
                    workoutDate: (0, typeorm_2.Between)(weekStart, weekEnd),
                },
            });
            const weeklyMap = new Map();
            weeklyRecords.forEach((record) => {
                const existing = weeklyMap.get(record.bodyPart) || {
                    volume: 0,
                    sets: 0,
                    reps: 0,
                    count: 0,
                };
                weeklyMap.set(record.bodyPart, {
                    volume: existing.volume + record.volume,
                    sets: existing.sets + record.sets,
                    reps: existing.reps + record.reps,
                    count: existing.count + 1,
                });
            });
            result.weekly = {
                period: 'WEEKLY',
                startDate: weekStart.toISOString().split('T')[0],
                endDate: weekEnd.toISOString().split('T')[0],
                bodyPartVolumes: Array.from(weeklyMap.entries()).map(([bodyPart, data]) => ({
                    bodyPart,
                    totalVolume: Math.round(data.volume * 100) / 100,
                    totalSets: data.sets,
                    totalReps: data.reps,
                    recordCount: data.count,
                })),
            };
        }
        if (!period || period === 'MONTHLY') {
            const { start: monthStart, end: monthEnd } = date_range_helper_1.DateRangeHelper.getMonthRange();
            const monthlyRecords = await this.workoutRecordRepository.find({
                where: {
                    memberId,
                    workoutDate: (0, typeorm_2.Between)(monthStart, monthEnd),
                },
            });
            const monthlyMap = new Map();
            monthlyRecords.forEach((record) => {
                const existing = monthlyMap.get(record.bodyPart) || {
                    volume: 0,
                    sets: 0,
                    reps: 0,
                    count: 0,
                };
                monthlyMap.set(record.bodyPart, {
                    volume: existing.volume + record.volume,
                    sets: existing.sets + record.sets,
                    reps: existing.reps + record.reps,
                    count: existing.count + 1,
                });
            });
            result.monthly = {
                period: 'MONTHLY',
                startDate: date_range_helper_1.DateRangeHelper.formatDateString(monthStart),
                endDate: date_range_helper_1.DateRangeHelper.formatDateString(monthEnd),
                bodyPartVolumes: Array.from(monthlyMap.entries()).map(([bodyPart, data]) => ({
                    bodyPart,
                    totalVolume: Math.round(data.volume * 100) / 100,
                    totalSets: data.sets,
                    totalReps: data.reps,
                    recordCount: data.count,
                })),
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
        const majorExercises = ['벤치프레스', 'Bench Press', '스쿼트', 'Squat', '데드리프트', 'Deadlift'];
        const exerciseNames = [
            ['벤치프레스', 'Bench Press'],
            ['스쿼트', 'Squat'],
            ['데드리프트', 'Deadlift'],
        ];
        const result = [];
        for (const [primaryName, englishName] of exerciseNames) {
            const records = await this.workoutRecordRepository.find({
                where: [
                    { memberId, exerciseName: primaryName },
                    { memberId, exerciseName: englishName },
                ],
                order: {
                    workoutDate: 'ASC',
                    createdAt: 'ASC',
                },
            });
            const recordsWith1RM = records.filter((r) => r.oneRepMax !== null && r.oneRepMax !== undefined);
            if (recordsWith1RM.length === 0) {
                result.push({
                    exerciseName: primaryName,
                    latest: null,
                    max: null,
                    history: [],
                });
                continue;
            }
            const history = recordsWith1RM.map((record) => ({
                oneRepMax: record.oneRepMax,
                workoutDate: record.workoutDate.toISOString().split('T')[0],
                strengthLevel: record.strengthLevel || null,
            }));
            const latestRecord = recordsWith1RM[recordsWith1RM.length - 1];
            const latest = latestRecord
                ? {
                    oneRepMax: latestRecord.oneRepMax,
                    strengthLevel: latestRecord.strengthLevel || null,
                    workoutDate: latestRecord.workoutDate.toISOString().split('T')[0],
                }
                : null;
            const maxRecord = recordsWith1RM.reduce((best, record) => {
                if (!best || record.oneRepMax > best.oneRepMax) {
                    return record;
                }
                return best;
            }, null);
            const max = maxRecord
                ? {
                    oneRepMax: maxRecord.oneRepMax,
                    workoutDate: maxRecord.workoutDate.toISOString().split('T')[0],
                }
                : null;
            result.push({
                exerciseName: primaryName,
                latest,
                max,
                history,
            });
        }
        return { exercises: result };
    }
    async getOneRepMaxTrend(memberId, exerciseName, startDate, endDate) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const where = { memberId };
        if (exerciseName) {
            where.exerciseName = exerciseName;
        }
        const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
        query_builder_helper_1.QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
        if (exerciseName) {
            queryBuilder.andWhere('(record.exerciseName = :exerciseName OR record.exerciseName = :exerciseNameEn)', { exerciseName, exerciseNameEn: exerciseName });
        }
        query_builder_helper_1.QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
        queryBuilder.orderBy('record.workoutDate', 'ASC');
        queryBuilder.addOrderBy('record.createdAt', 'ASC');
        const records = await queryBuilder.getMany();
        const dateMap = new Map();
        records.forEach((record) => {
            if (record.oneRepMax !== null && record.oneRepMax !== undefined) {
                const date = record.workoutDate.toISOString().split('T')[0];
                const existing = dateMap.get(date);
                if (!existing || record.oneRepMax > existing.oneRepMax) {
                    dateMap.set(date, {
                        oneRepMax: record.oneRepMax,
                        strengthLevel: record.strengthLevel || null,
                    });
                }
            }
        });
        const trend = Array.from(dateMap.entries()).map(([date, info]) => ({
            date,
            oneRepMax: info.oneRepMax,
            strengthLevel: info.strengthLevel,
        }));
        return {
            exerciseName: exerciseName || undefined,
            trend,
        };
    }
    async getVolumeTrend(memberId, startDate, endDate, bodyPart) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
        query_builder_helper_1.QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
        query_builder_helper_1.QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
        if (bodyPart) {
            queryBuilder.andWhere('record.bodyPart = :bodyPart', { bodyPart });
        }
        queryBuilder.orderBy('record.workoutDate', 'ASC');
        queryBuilder.addOrderBy('record.createdAt', 'ASC');
        const records = await queryBuilder.getMany();
        const dateMap = new Map();
        records.forEach((record) => {
            const date = record.workoutDate.toISOString().split('T')[0];
            const existing = dateMap.get(date) || {
                totalVolume: 0,
                bodyPartMap: new Map(),
            };
            existing.totalVolume += record.volume;
            const bodyPartVolume = existing.bodyPartMap.get(record.bodyPart) || 0;
            existing.bodyPartMap.set(record.bodyPart, bodyPartVolume + record.volume);
            dateMap.set(date, existing);
        });
        const trend = Array.from(dateMap.entries()).map(([date, data]) => {
            const result = {
                date,
                totalVolume: Math.round(data.totalVolume * 100) / 100,
            };
            if (!bodyPart && data.bodyPartMap.size > 0) {
                result.bodyPartVolumes = Array.from(data.bodyPartMap.entries()).map(([bodyPart, volume]) => ({
                    bodyPart,
                    volume: Math.round(volume * 100) / 100,
                }));
            }
            return result;
        });
        return { trend };
    }
    async getTrends(memberId, type, exerciseName, startDate, endDate) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const where = { memberId };
        if (exerciseName) {
            where.exerciseName = exerciseName;
        }
        const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
        query_builder_helper_1.QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
        if (exerciseName) {
            queryBuilder.andWhere('record.exerciseName = :exerciseName', { exerciseName });
        }
        query_builder_helper_1.QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
        queryBuilder.orderBy('record.workoutDate', 'ASC');
        queryBuilder.addOrderBy('record.createdAt', 'ASC');
        const records = await queryBuilder.getMany();
        const data = [];
        if (type === 'one_rm') {
            const dateMap = new Map();
            records.forEach((record) => {
                if (record.oneRepMax !== null && record.oneRepMax !== undefined) {
                    const date = record.workoutDate.toISOString().split('T')[0];
                    const existing = dateMap.get(date);
                    if (!existing || record.oneRepMax > existing.value) {
                        dateMap.set(date, {
                            value: record.oneRepMax,
                            strengthLevel: record.strengthLevel || null,
                        });
                    }
                }
            });
            data.push(...Array.from(dateMap.entries()).map(([date, info]) => ({
                date,
                value: info.value,
                strengthLevel: info.strengthLevel,
            })));
        }
        else {
            const dateMap = new Map();
            records.forEach((record) => {
                const date = record.workoutDate.toISOString().split('T')[0];
                const existing = dateMap.get(date) || 0;
                dateMap.set(date, existing + record.volume);
            });
            data.push(...Array.from(dateMap.entries()).map(([date, volume]) => ({
                date,
                value: Math.round(volume * 100) / 100,
            })));
        }
        return {
            type,
            exerciseName: exerciseName || undefined,
            data,
        };
    }
    async getStrengthProgress(memberId, exerciseName) {
        await repository_helper_1.RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
        const where = { memberId };
        if (exerciseName) {
            where.exerciseName = exerciseName;
        }
        const records = await this.workoutRecordRepository.find({
            where,
            order: {
                workoutDate: 'ASC',
                createdAt: 'ASC',
            },
        });
        const history = records.map((record) => ({
            oneRepMax: record.oneRepMax || null,
            relativeStrength: record.relativeStrength || null,
            strengthLevel: record.strengthLevel || null,
            workoutDate: record.workoutDate.toISOString().split('T')[0],
        }));
        const current = history.length > 0 ? history[history.length - 1] : undefined;
        return {
            exerciseName: exerciseName || undefined,
            history,
            current,
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

/***/ "./src/modules/members/workout-routines.controller.ts":
/*!************************************************************!*\
  !*** ./src/modules/members/workout-routines.controller.ts ***!
  \************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const workout_routines_service_1 = __webpack_require__(/*! ./workout-routines.service */ "./src/modules/members/workout-routines.service.ts");
const create_workout_routine_dto_1 = __webpack_require__(/*! ./dto/create-workout-routine.dto */ "./src/modules/members/dto/create-workout-routine.dto.ts");
const update_workout_routine_dto_1 = __webpack_require__(/*! ./dto/update-workout-routine.dto */ "./src/modules/members/dto/update-workout-routine.dto.ts");
const guards_1 = __webpack_require__(/*! ../../common/guards */ "./src/common/guards/index.ts");
const roles_decorator_1 = __webpack_require__(/*! ../auth/decorators/roles.decorator */ "./src/modules/auth/decorators/roles.decorator.ts");
const enums_1 = __webpack_require__(/*! ../../common/enums */ "./src/common/enums/index.ts");
const api_response_1 = __webpack_require__(/*! ../../common/utils/api-response */ "./src/common/utils/api-response.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
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

/***/ "./src/modules/members/workout-routines.service.ts":
/*!*********************************************************!*\
  !*** ./src/modules/members/workout-routines.service.ts ***!
  \*********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const workout_routine_entity_1 = __webpack_require__(/*! ../../entities/workout-routine.entity */ "./src/entities/workout-routine.entity.ts");
const member_entity_1 = __webpack_require__(/*! ../../entities/member.entity */ "./src/entities/member.entity.ts");
const workout_record_entity_1 = __webpack_require__(/*! ../../entities/workout-record.entity */ "./src/entities/workout-record.entity.ts");
const exercise_entity_1 = __webpack_require__(/*! ../../entities/exercise.entity */ "./src/entities/exercise.entity.ts");
const exceptions_1 = __webpack_require__(/*! ../../common/exceptions */ "./src/common/exceptions/index.ts");
const query_builder_helper_1 = __webpack_require__(/*! ../../common/utils/query-builder-helper */ "./src/common/utils/query-builder-helper.ts");
const entity_update_helper_1 = __webpack_require__(/*! ../../common/utils/entity-update-helper */ "./src/common/utils/entity-update-helper.ts");
const repository_helper_1 = __webpack_require__(/*! ../../common/utils/repository-helper */ "./src/common/utils/repository-helper.ts");
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
            const { OneRepMaxCalculator } = await Promise.resolve().then(() => __webpack_require__(/*! ../../common/utils/one-rep-max-calculator */ "./src/common/utils/one-rep-max-calculator.ts"));
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

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-kakao":
/*!*********************************!*\
  !*** external "passport-kakao" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-kakao");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const cors_config_1 = __webpack_require__(/*! ./config/cors.config */ "./src/config/cors.config.ts");
const http_exception_filter_1 = __webpack_require__(/*! ./common/filters/http-exception.filter */ "./src/common/filters/http-exception.filter.ts");
const interceptors_1 = __webpack_require__(/*! ./common/interceptors */ "./src/common/interceptors/index.ts");
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