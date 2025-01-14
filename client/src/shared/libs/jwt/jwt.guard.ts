import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { from, map } from "rxjs";
import { TokenStorage } from "./plain-functions";

export function jwtGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('jwt guard');

    const router: Router = inject(Router);
    const tokenStorage: TokenStorage = TokenStorage.getInstance();

    return from(tokenStorage.getRefreshToken()).pipe(
        map(refreshToken => {
            if (!refreshToken) {
                router.navigateByUrl('/');
                return false;
            }
            return true;
        })
    );
}