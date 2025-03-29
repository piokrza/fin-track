import { inject, Injectable } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';

import { AuthHttpService } from '#auth/api';
import { AuthPayload } from '#auth/model';
import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #router = inject(Router);
  readonly #userStore = inject(UserStore);
  readonly #authHttpService = inject(AuthHttpService);

  login$(payload: AuthPayload): Observable<UserCredential> {
    this.#userStore.setIsProcessing(true);

    return this.#authHttpService.login$(payload).pipe(
      tap(() => {
        this.#router.navigate([Path.FIN_TRACK]);
      }),
      finalize(() => this.#userStore.setIsProcessing(false))
    );
  }

  signin$(payload: AuthPayload): Observable<void> {
    this.#userStore.setIsProcessing(true);

    return this.#authHttpService.signin$(payload).pipe(
      tap(() => {
        this.#router.navigate([Path.FIN_TRACK]);
      }),
      finalize(() => this.#userStore.setIsProcessing(false))
    );
  }

  logout(): Promise<void> {
    return this.#authHttpService.logout();
  }

  setUser$(): Observable<User | null> {
    this.#userStore.setIsProcessing(true);

    return this.#authHttpService.user$.pipe(
      tap((user) => {
        this.#userStore.setUser({ email: user?.email ?? '', username: user?.displayName ?? '' });
        this.#userStore.setIsProcessing(false);
      })
    );
  }
}
