import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { MessageService } from 'primeng/api';

import { AuthHttpService } from '#auth/api';
import { SigninForm, SignupRequest, AuthResponse, LoginRequest, LoginForm } from '#auth/model';
import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #router = inject(Router);
  readonly #authStore = inject(UserStore);
  readonly #messageService = inject(MessageService);
  readonly #authHttpService = inject(AuthHttpService);

  readonly loginForm: LoginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  readonly signinForm: SigninForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });

  signup$(payload: SignupRequest): Observable<AuthResponse> {
    return this.#authHttpService.signup$(payload).pipe(
      tap((user) => {
        this.#authStore.setUser(user.data.user);
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
      tap((user) => {
        this.#authStore.setUser(user.data.user);
        this.#router.navigate([Path.DASHBOARD]);
      }),
      catchError(() => {
        this.#messageService.add({ severity: 'success', summary: 'Error', detail: 'Something is no yes :/' });
        return EMPTY;
      })
    );
  }
}
