import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';

import { MessageService } from 'primeng/api';

import { AuthHttpService } from '#auth/api';
import { AuthRequest, AuthResponse } from '#auth/model';
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

  checkAuth(): void {
    const token = this.#tokenService.token;

    if (!token) {
      this.#router.navigate([Path.AUTH]);
      return;
    }

    this.#authStore.setUser({
      username: 'test username',
      display: 'test displayname',
      email: 'test@test.pl',
      has_usable_password: false,
      id: 234,
    });
  }

  signup$(payload: AuthRequest): Observable<AuthResponse> {
    this.#authStore.setIsLoading(true);

    return this.#authHttpService.signup$(payload).pipe(
      tap((res) => {
        this.#authStore.setUser(res.data.user);
        this.#tokenService.setToken(res.meta.session_token);
        this.#router.navigate([Path.DASHBOARD]);
      }),
      catchError(() => {
        this.#messageService.add({ severity: 'error', summary: 'Error', detail: 'Something is no yes :/' });
        return EMPTY;
      }),
      finalize(() => this.#authStore.setIsLoading(false))
    );
  }

  login$(payload: AuthRequest): Observable<AuthResponse> {
    this.#authStore.setIsLoading(true);

    return this.#authHttpService.login$(payload).pipe(
      tap((res) => {
        this.#authStore.setUser(res.data.user);
        this.#tokenService.setToken(res.meta.session_token);
        this.#router.navigate([Path.DASHBOARD]);
      }),
      catchError(() => {
        this.#messageService.add({ severity: 'error', summary: 'Error', detail: 'Something is no yes :/' });
        return EMPTY;
      }),
      finalize(() => this.#authStore.setIsLoading(false))
    );
  }

  logout$(): Observable<object> {
    return this.#authHttpService.logout$().pipe(
      tap(() => {
        this.#authStore.setUser(null);
        this.#router.navigate([Path.AUTH]);
      })
    );
  }
}
