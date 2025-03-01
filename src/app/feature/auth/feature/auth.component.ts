import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthRequest } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [InputTextModule, PasswordModule, ReactiveFormsModule, ButtonModule];

@Component({
  selector: 'ft-auth',
  template: `
    <form [formGroup]="form">
      <input pInputText placeholder="Email" type="text" [formControl]="form.controls.email" />
      <input pInputText placeholder="Username" type="text" [formControl]="form.controls.username" />
      <p-password placeholder="Password" [feedback]="false" [formControl]="form.controls.password" />
    </form>

    <p-button label="Signin" (onClick)="signup()" />
  `,
  imports,
})
export class AuthComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  readonly form = this.#authService.authForm;

  signup(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const authReq: AuthRequest = {
      email: this.form.controls.email.value,
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    };

    this.#authService.signup$(authReq).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
