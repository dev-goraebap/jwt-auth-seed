import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Notyf } from 'notyf';
import { from, map, Observable } from 'rxjs';

import { TokenStorage } from 'src/shared/libs/jwt';

export const privateGuard: CanActivateFn = (): Observable<boolean> => {
    const router = inject(Router);
    const storage = TokenStorage.getInstance();

    return from(storage.getRefreshToken()).pipe(
        map((refreshToken: string | null) => {
            if (!refreshToken) {
                new Notyf().error({
                    message: '접근할 수 없어요!',
                    dismissible: true,
                });
                router.navigateByUrl('/login');

                return false;
            }

            return true;
        }),
    );
};
