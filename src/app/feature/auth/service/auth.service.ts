import { inject, Injectable } from '@angular/core';
import { User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

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
    return this.#authHttpService.login$(payload).pipe(
      tap(() => {
        this.#router.navigate([Path.FIN_TRACK]);
      })
    );
  }

  signin$(payload: AuthPayload): Observable<void> {
    return this.#authHttpService.signin$(payload).pipe(
      tap(() => {
        this.#router.navigate([Path.FIN_TRACK]);
      })
    );
  }

  logout(): Promise<void> {
    return this.#authHttpService.logout();
  }

  setUser$(): Observable<User | null> {
    return this.#authHttpService.user$.pipe(
      tap((user) => {
        this.#userStore.setUser({
          email: user?.email ?? '',
          username: user?.displayName ?? '',
        });
      })
    );
  }
}
