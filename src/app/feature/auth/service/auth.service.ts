import { inject, Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, User, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { finalize, from, Observable, tap } from 'rxjs';

import { AuthHttpService } from '#auth/api';
import { AuthPayload } from '#auth/model';
import { UserStore } from '#auth/store';
import { Path } from '#core/enum';
import { ProgressBarService } from '#ui/service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #auth = inject(Auth);
  readonly #router = inject(Router);
  readonly #userStore = inject(UserStore);
  readonly #authHttpService = inject(AuthHttpService);
  readonly #progressBarService = inject(ProgressBarService);

  login$(payload: AuthPayload): Observable<UserCredential> {
    this.#userStore.setIsProcessing(true);
    this.#progressBarService.update('isProcessing', this.#userStore.isProcessing());

    return this.#authHttpService.login$(payload).pipe(
      tap(() => {
        this.#router.navigate([Path.FIN_TRACK]);
      }),
      finalize(() => {
        this.#userStore.setIsProcessing(false);
        this.#progressBarService.update('isProcessing', this.#userStore.isProcessing());
      })
    );
  }

  signin$(payload: AuthPayload): Observable<UserCredential> {
    this.#userStore.setIsProcessing(true);
    this.#progressBarService.update('isProcessing', this.#userStore.isProcessing());

    return this.#authHttpService.signin$(payload).pipe(
      tap(() => this.#router.navigate([Path.FIN_TRACK])),
      finalize(() => {
        this.#userStore.setIsProcessing(false);
        this.#progressBarService.update('isProcessing', this.#userStore.isProcessing());
      })
    );
  }

  signInWithGoogle$(): Observable<UserCredential> {
    this.#userStore.setIsProcessing(true);

    return from(signInWithPopup(this.#auth, new GoogleAuthProvider())).pipe(
      tap(() => this.#router.navigate([Path.FIN_TRACK])),
      finalize(() => this.#userStore.setIsProcessing(false))
    );
  }

  logout(): Promise<void> {
    return this.#authHttpService.logout();
  }

  setUser$(): Observable<User | null> {
    this.#progressBarService.update('isProcessing', true);

    return this.#authHttpService.user$.pipe(
      tap((user: User | null) => {
        this.#userStore.setUser(user);
        this.#progressBarService.update('isProcessing', false);
      })
    );
  }
}
