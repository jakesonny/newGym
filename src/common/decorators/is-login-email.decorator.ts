import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isEmail,
} from "class-validator";

/**
 * 로그인 전용 이메일 형식 검증.
 *
 * 포트폴리오 데모 목적으로, 리터럴 문자열 'admin' 딱 하나만 이메일 형식 검증을
 * 우회하도록 허용한다 (면접관이 실제 이메일 없이 시드된 데모 관리자 계정으로
 * 바로 로그인해볼 수 있게 하기 위함). 이 예외는 로그인(LoginDto)에만 적용되며,
 * 다른 문자열은 전혀 허용하지 않고 비밀번호 검증(bcrypt 비교)도 그대로 거친다
 * — 이전에 여러 테스트 문자열을 느슨하게 허용하던 인증 우회 백도어와는 다르다.
 * 회원가입/프로필수정 DTO에는 절대 적용하지 않는다.
 */
@ValidatorConstraint({ name: "isLoginEmail", async: false })
export class IsLoginEmailConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (value === "admin") {
      return true;
    }

    return isEmail(value);
  }

  defaultMessage(args: ValidationArguments) {
    return "유효한 이메일 형식이어야 합니다.";
  }
}

export function IsLoginEmail(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsLoginEmailConstraint,
    });
  };
}
