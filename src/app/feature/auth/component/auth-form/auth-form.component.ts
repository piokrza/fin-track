import { Component, computed, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthForm, AuthRequest } from '#auth/model';
import { Path } from '#core/enum';

const imports = [InputTextModule, PasswordModule, ReactiveFormsModule, ButtonModule, RouterLink];

@Component({
  selector: 'ft-auth-form',
  template: `
    <h1 class="text-center mb-6 text-3xl">{{ mode() === 'login' ? 'Login' : 'Signin' }}</h1>
    <form class="grid gap-3 mb-5" [formGroup]="form" (ngSubmit)="formSubmit()">
      @let ctrls = form.controls;

      <input pInputText placeholder="Email" type="text" [formControl]="ctrls.email" />
      @if (this.mode() === 'signin') {
        <input pInputText placeholder="Username" type="text" [formControl]="ctrls.username" />
      }
      <p-password styleClass="w-full" placeholder="Password" [feedback]="false" [formControl]="ctrls.password" />
    </form>
    <p-button styleClass="w-full" label="Signin" type="submit" (onClick)="formSubmit()" />

    <p class="mt-7 text-center">
      @if (mode() === 'login') {
        Don't have account?
      } @else {
        Have an account?
      }
      <a class="text-sky-500" [routerLink]="redirectPath()">
        @if (mode() === 'login') {
          Signin
        } @else {
          Login
        }
      </a>
    </p>
  `,
  styleUrl: './auth-form.component.scss',
  imports,
})
export class AuthFormComponent {
  readonly mode = input<'login' | 'signin'>('login');
  readonly afSubmit = output<AuthRequest>();

  readonly form: AuthForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });
  readonly redirectPath = computed(() => ['../', this.mode() === 'login' ? Path.SIGNIN : Path.LOGIN]);

  readonly Path = Path;

  formSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const { email, password, username } = this.form.controls;

    if (this.mode() === 'login') {
      this.afSubmit.emit({
        email: email.value,
        password: password.value,
      });
      return;
    }

    this.afSubmit.emit({
      email: email.value,
      password: password.value,
      username: username.value,
    });
  }
}
