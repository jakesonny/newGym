import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsLoginEmail } from "../../../common/decorators";

export class LoginDto {
  @ApiProperty({
    description:
      "이메일 주소 (포트폴리오 데모용 관리자 계정은 예외적으로 'admin' 리터럴도 허용)",
    example: "user@example.com",
  })
  // 로그인에서만 'admin' 리터럴 하나에 한해 이메일 형식 검증을 우회한다.
  // 회원가입(RegisterDto)/프로필수정(UpdateUserDto)은 여전히 표준 IsEmail을 사용한다.
  @IsLoginEmail({ message: "유효한 이메일 형식이어야 합니다." })
  email: string;

  @ApiProperty({
    description: "비밀번호",
    example: "password123",
  })
  @IsString({ message: "비밀번호는 문자열이어야 합니다." })
  password: string;
}
