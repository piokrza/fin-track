import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthRequest } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [InputTextModule, ReactiveFormsModule, ButtonModule, PasswordModule, AuthFormComponent];

@Component({
  selector: 'ft-login',
  template: `<ft-auth-form (afSubmit)="login($event)" />`,
  imports,
})
export class LoginComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  login(loginReq: AuthRequest): void {
    this.#authService.login$(loginReq).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
