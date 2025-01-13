import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

import { USER_RULES } from "domain-shared/user";

export class VerifyEmailDTO {
    @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
    @IsEmail({}, { message: '이메일 형식이 올바르지 않습니다.' })
    @ApiProperty({ description: '이메일', example: 'test@gmail.com' })
    readonly email: string;

    @IsNotEmpty({ message: 'OTP 코드가 비어있습니다.' })
    @Length(USER_RULES.otp.min, USER_RULES.otp.max, { message: USER_RULES.otp.lengthErrMsg })
    @Matches(USER_RULES.otp.regex, { message: USER_RULES.otp.regexErrMsg })
    @ApiProperty({ description: 'OTP 코드', example: '123456' })
    readonly otp: string;
}