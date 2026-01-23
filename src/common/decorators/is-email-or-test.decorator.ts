import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';

/**
 * 이메일 형식 검증 또는 개발용 계정 허용
 * 개발 편의를 위해 'test', 'qwer' 등 간단한 문자열 허용
 * 나머지는 이메일 형식 검증
 */
@ValidatorConstraint({ name: 'isEmailOrTest', async: false })
export class IsEmailOrTestConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		// 개발용 계정 허용 (test, qwer 등)
		const devAccounts = ['test', 'qwer'];
		if (devAccounts.includes(value)) {
			return true;
		}

		// 이메일 형식 검증
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return typeof value === 'string' && emailRegex.test(value);
	}

	defaultMessage(args: ValidationArguments) {
		return `${args.property}는 유효한 이메일 형식이어야 합니다. (test, qwer 계정은 예외)`;
	}
}

/**
 * 이메일 형식 검증 또는 개발용 계정 허용 데코레이터
 * @param validationOptions 검증 옵션
 */
export function IsEmailOrTest(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsEmailOrTestConstraint,
		});
	};
}
