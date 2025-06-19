import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { finalize, from, Observable, tap } from 'rxjs';

import { AuthApiService } from '#auth/api';
import { AuthPayload } from '#auth/model';
import { UserStore } from '#auth/store';
import { Path } from '#core/enum';
import { ProgressBarService } from '#ui/service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #auth = inject(Auth);
  readonly #router = inject(Router);
  readonly #userStore = inject(UserStore);
  readonly #authApiService = inject(AuthApiService);
  readonly #progressBarService = inject(ProgressBarService);

  login$(payload: AuthPayload): Observable<UserCredential> {
    this.#userStore.update('isProcessing', true);
    this.#progressBarService.update('isProcessing', this.#userStore.select('isProcessing')());

    return this.#authApiService.login$(payload).pipe(
      tap(() => {
        this.#router.navigate([Path.FIN_TRACK]);
      }),
      finalize(() => {
        this.#userStore.update('isProcessing', false);
        this.#progressBarService.update('isProcessing', this.#userStore.select('isProcessing')());
      })
    );
  }

  signin$(payload: AuthPayload): Observable<UserCredential> {
    this.#userStore.update('isProcessing', true);
    this.#progressBarService.update('isProcessing', this.#userStore.select('isProcessing')());

    return this.#authApiService.signin$(payload).pipe(
      tap(() => this.#router.navigate([Path.FIN_TRACK])),
      finalize(() => {
        this.#userStore.update('isProcessing', false);
        this.#progressBarService.update('isProcessing', this.#userStore.select('isProcessing')());
      })
    );
  }

  signInWithGoogle$(): Observable<UserCredential> {
    this.#userStore.update('isProcessing', true);

    return from(signInWithPopup(this.#auth, new GoogleAuthProvider())).pipe(
      tap(() => this.#router.navigate([Path.FIN_TRACK])),
      finalize(() => this.#userStore.update('isProcessing', false))
    );
  }

  logout(): Promise<void> {
    return this.#authApiService.logout();
  }

  setUser$(): Observable<User | null> {
    this.#progressBarService.update('isProcessing', true);

    return this.#authApiService.user$.pipe(
      tap((user: User | null) => {
        this.#userStore.update('user', user);
        this.#progressBarService.update('isProcessing', false);
      })
    );
  }
}
