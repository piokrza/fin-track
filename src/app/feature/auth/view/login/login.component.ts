import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthPayload } from '#auth/model';
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

  login({ email, password }: Partial<AuthPayload>): void {
    if (!email || !password) return;
    this.#authService.login$({ email, password }).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
