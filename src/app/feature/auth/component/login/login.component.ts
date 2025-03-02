import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { LoginForm, LoginRequest } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [InputTextModule, ReactiveFormsModule, ButtonModule, PasswordModule];

@Component({
  selector: 'ft-login',
  template: `
    <h1 class="text-center my-8 text-3xl">Logowanie</h1>

    <form class="grid  w-full" [formGroup]="form" (ngSubmit)="login()">
      <input pInputText placeholder="Email" type="text" [formControl]="form.controls.email" />
      <p-password placeholder="Password" [feedback]="false" [formControl]="form.controls.password" />
    </form>

    <p-button label="Signin" type="submit" (onClick)="login()" />
  `,
  imports,
})
export class LoginComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  readonly form: LoginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  login(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const loginReq: LoginRequest = {
      email: this.form.controls.email.value,
      password: this.form.controls.password.value,
    };

    this.#authService.login$(loginReq).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
