import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { AuthStatus, AuthResultDTO as TAuthResultDTO } from 'domain-shared/user';

export class AuthResultDTO implements TAuthResultDTO {

    @ApiProperty({ description: '인증 상태', enum: AuthStatus })
    readonly status: AuthStatus;

    @ApiProperty({ description: '액세스 토큰' })
    readonly accessToken: string | null;

    @ApiProperty({ description: '액세스 토큰 만료시간' })
    readonly expiresIn: number | null;

    @ApiProperty({ description: '리프레시토큰' })
    readonly refreshToken: string | null;

    static fromSuccess(accessToken: string, expiresIn: number, refreshToken: string) {
        return plainToInstance(AuthResultDTO, {
            status: AuthStatus.SUCCESS,
            accessToken,
            refreshToken,
            expiresIn,
        } as AuthResultDTO);
    }

    static fromNeedOtp() {
        return plainToInstance(AuthResultDTO, {
            status: AuthStatus.NEED_OTP,
            accessToken: null,
            refreshToken: null,
            expiresIn: null,
        } as AuthResultDTO);
    }

    static fromNeedSocialRegister(): AuthResultDTO | PromiseLike<AuthResultDTO> {
        return plainToInstance(AuthResultDTO, {
            status: AuthStatus.NEED_SOCIAL_REGISTER,
            accessToken: null,
            refreshToken: null,
            expiresIn: null,
        } as AuthResultDTO);
    }
}