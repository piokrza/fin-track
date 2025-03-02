import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { SigninForm, SignupRequest } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [InputTextModule, PasswordModule, ReactiveFormsModule, ButtonModule];

@Component({
  selector: 'ft-signin',
  template: `
    <h1 class="text-center">Signin</h1>

    <form [formGroup]="form" (ngSubmit)="signup()">
      <input pInputText placeholder="Email" type="text" [formControl]="form.controls.email" />
      <input pInputText placeholder="Username" type="text" [formControl]="form.controls.username" />
      <p-password placeholder="Password" [feedback]="false" [formControl]="form.controls.password" />
    </form>

    <p-button label="Signin" type="submit" (onClick)="signup()" />
  `,
  imports,
})
export class SigninComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  readonly form: SigninForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });

  signup(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const signinReq: SignupRequest = {
      email: this.form.controls.email.value,
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    };

    this.#authService.signup$(signinReq).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
