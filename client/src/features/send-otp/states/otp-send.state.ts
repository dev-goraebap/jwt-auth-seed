import { HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { catchError, EMPTY, finalize, Observable, tap } from "rxjs";

import { AuthApi } from "src/entities/user";
import { BaseState } from "src/shared/foundations";

@Injectable({
    providedIn: 'root'
})
export class OtpSendState extends BaseState<void> {

    readonly isCompleted: Signal<boolean>;

    private readonly authService: AuthApi = inject(AuthApi);
    private readonly _isCompleted: WritableSignal<boolean> = signal(false);

    constructor() {
        super();
        this.isCompleted = this._isCompleted.asReadonly();
    }

    sendOtp(email: string): Observable<void> {
        this.setPending();
        return this.authService.sendOtp(email).pipe(
            tap(() => this._isCompleted.set(true)),
            catchError((res: HttpErrorResponse) => {
                this.setError(res.error);
                return EMPTY;
            }),
            finalize(() => this.clearPending())
        );
    }
}