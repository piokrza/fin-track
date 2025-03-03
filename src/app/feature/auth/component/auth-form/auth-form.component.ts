import { Component, computed, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthForm, AuthRequest } from '#auth/model';
import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';
import { removeFalsyValues } from '#core/util';

const imports = [InputTextModule, PasswordModule, ReactiveFormsModule, ButtonModule, RouterLink];

@Component({
  selector: 'ft-auth-form',
  template: `
    <h1 class="text-center mb-6 text-3xl">{{ view() === 'login' ? 'Login' : 'Signin' }}</h1>
    <form class="grid gap-3 mb-5" [formGroup]="form" (ngSubmit)="formSubmit()">
      @let ctrls = form.controls;

      <input pInputText placeholder="Email" type="text" [formControl]="ctrls.email" />
      @if (this.view() === 'signin') {
        <input pInputText placeholder="Username" type="text" [formControl]="ctrls.username" />
      }
      <p-password styleClass="w-full" placeholder="Password" [feedback]="false" [formControl]="ctrls.password" />
    </form>
    <p-button
      type="submit"
      label="Signin"
      styleClass="w-full"
      [disabled]="userStore.isLoading()"
      [icon]="userStore.isLoading() ? PrimeIcons.SPINNER + ' pi pi-spin' : ''"
      (onClick)="formSubmit()" />

    <p class="mt-7 text-center">
      @if (view() === 'login') {
        Don't have account?
      } @else {
        Have an account?
      }
      <a class="text-sky-500" [routerLink]="redirectPath()">
        @if (view() === 'login') {
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
  readonly userStore = inject(UserStore);

  readonly view = input<'login' | 'signin'>('login');
  readonly afSubmit = output<AuthRequest>();

  readonly form: AuthForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', {
      validators: removeFalsyValues([this.view() === 'signin' ? Validators.required : undefined]), // TODO: add dynamic required validator
      nonNullable: true,
    }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
  });
  readonly redirectPath = computed(() => ['../', this.view() === 'login' ? Path.SIGNIN : Path.LOGIN]);

  readonly Path = Path;
  readonly PrimeIcons = PrimeIcons;

  formSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const { email, password, username } = this.form.controls;
    const base = { email: email.value, password: password.value };

    this.afSubmit.emit(this.view() === 'login' ? base : { ...base, username: username.value });
  }
}
