import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthForm, AuthRequest } from '#auth/model';
import { UserStore } from '#auth/store/user';
import { Path } from '#core/enum';

const imports = [InputTextModule, PasswordModule, ReactiveFormsModule, ButtonModule, RouterLink];

@Component({
  selector: 'ft-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  imports,
})
export class AuthFormComponent {
  constructor() {
    effect(() => {
      if (this.view() === 'signin') {
        this.form.controls.username.addValidators([Validators.required]);
      } else {
        this.form.controls.username.removeValidators([Validators.required]);
      }
    });
  }

  readonly userStore = inject(UserStore);

  readonly view = input<'login' | 'signin'>('login');
  readonly afSubmit = output<AuthRequest>();

  readonly form: AuthForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
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
    const basePayload: AuthRequest = { email: email.value, password: password.value };

    this.afSubmit.emit(this.view() === 'login' ? basePayload : { ...basePayload, username: username.value });
  }
}
