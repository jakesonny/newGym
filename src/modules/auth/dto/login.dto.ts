import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "이메일 주소",
    example: "user@example.com",
  })
  @IsEmail({}, { message: "유효한 이메일 형식이어야 합니다." })
  email: string;

  @ApiProperty({
    description: "비밀번호",
    example: "password123",
  })
  @IsString({ message: "비밀번호는 문자열이어야 합니다." })
  password: string;
}
