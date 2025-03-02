import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { MessageService } from 'primeng/api';

import { AuthHttpService } from '#auth/api';
import { SignupRequest, AuthResponse, LoginRequest } from '#auth/model';
import { TokenService } from '#auth/service';
import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #router = inject(Router);
  readonly #authStore = inject(UserStore);
  readonly #tokenService = inject(TokenService);
  readonly #messageService = inject(MessageService);
  readonly #authHttpService = inject(AuthHttpService);

  signup$(payload: SignupRequest): Observable<AuthResponse> {
    return this.#authHttpService.signup$(payload).pipe(
      tap((res) => {
        this.#authStore.setUser(res.data.user);
        this.#tokenService.setToken(res.meta.session_token);
        this.#router.navigate([Path.DASHBOARD]);
      }),
      catchError(() => {
        this.#messageService.add({ severity: 'success', summary: 'Error', detail: 'Something is no yes :/' });
        return EMPTY;
      })
    );
  }

  login$(payload: LoginRequest): Observable<AuthResponse> {
    return this.#authHttpService.login$(payload).pipe(
      tap((res) => {
        this.#authStore.setUser(res.data.user);
        this.#tokenService.setToken(res.meta.session_token);
        this.#router.navigate([Path.DASHBOARD]);
      }),
      catchError(() => {
        this.#messageService.add({ severity: 'success', summary: 'Error', detail: 'Something is no yes :/' });
        return EMPTY;
      })
    );
  }
}
