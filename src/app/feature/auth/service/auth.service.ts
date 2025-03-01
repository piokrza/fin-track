import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthHttpService } from '#auth/api';
import { AuthForm, AuthRequest, AuthResponse } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #authHttpService = inject(AuthHttpService);

  readonly authForm: AuthForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  signup$(payload: AuthRequest): Observable<AuthResponse> {
    return this.#authHttpService.signup$(payload);
  }
}
