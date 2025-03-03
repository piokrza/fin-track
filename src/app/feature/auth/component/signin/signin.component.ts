import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthRequest } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [InputTextModule, PasswordModule, ReactiveFormsModule, ButtonModule, AuthFormComponent];

@Component({
  selector: 'ft-signin',
  template: `<ft-auth-form mode="signin" (afSubmit)="signup($event)" />`,
  imports,
})
export class SigninComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  signup(authReq: AuthRequest): void {
    const signinReq: AuthRequest = {
      email: authReq.email,
      password: authReq.password,
      username: authReq.username,
    };

    this.#authService.signup$(signinReq).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
