import { CanActivate, ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";

import { LocalAuthService } from "src/app/user";
import { CustomException, CustomExceptions } from "../errors";

/**
 * @description
 * 요청 객체에서 토큰을 추출하고 유효성을 검사하는 가드입니다.
 * 
 * - 모든 요청에 대해 작동되며, 토큰이 유효하지 않으면 요청을 거부합니다.
 * - 요청 해더의 `Bearer` 토큰을 검증합니다.
 * - `Public` 데코레이터가 적용된 요청은 권한 검사를 건너뜁니다.
 */
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector,
        private readonly authService: LocalAuthService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();

        if (this.isPublic(context)) {
            return true;
        }

        const errMsg: string = '액세스토큰이 유효하지 않습니다.';
        const token = this.getBearerTokenOrThrow(context, errMsg);
        const [user, userSession] = await this.authService.getCredentialOrThrow(token);
        req['user'] = user;
        req['userSession'] = userSession;
        return true;
    }

    private isPublic(context: ExecutionContext): boolean {
        const isPublic = this.reflector.getAllAndOverride<boolean>('public', [
            context.getHandler(),
            context.getClass(),
        ]);
        return isPublic ? true : false;
    }

    private getBearerTokenOrThrow(context: ExecutionContext, errMsg: string): string | undefined {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new CustomException(CustomExceptions.NEED_REFRESH, errMsg, HttpStatus.UNAUTHORIZED);
        }

        return token;
    }
}