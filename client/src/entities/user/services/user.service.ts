import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { EmailDuplicateCheckResultDTO } from "domain-shared/user";
import { environment } from "src/shared/environments";
import { skipAuth } from "src/shared/libs/jwt";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly httpClient: HttpClient = inject(HttpClient);
    private readonly apiUrl: string = `${environment.apiUrl}/v1/users`;

    checkDuplicateEmail(email: string): Observable<EmailDuplicateCheckResultDTO> {
        return this.httpClient.get<EmailDuplicateCheckResultDTO>(
            `${this.apiUrl}/emails/${email}/duplicated`, {
            context: skipAuth()
        });
    }
}