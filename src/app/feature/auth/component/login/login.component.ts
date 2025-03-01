import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginRequest } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [InputTextModule, ReactiveFormsModule, ButtonModule];

@Component({
  selector: 'ft-login',
  template: `
    <h1>Login!</h1>

    <form [formGroup]="form">
      <input pInputText placeholder="Email" type="text" [formControl]="form.controls.email" />
      <input pInputText placeholder="Username" type="text" [formControl]="form.controls.username" />
    </form>

    <p-button label="Signin" (onClick)="signup()" />
  `,
  imports,
})
export class LoginComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  readonly form = this.#authService.signinForm;

  signup(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const authReq: LoginRequest = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    this.#authService.login$(authReq).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
