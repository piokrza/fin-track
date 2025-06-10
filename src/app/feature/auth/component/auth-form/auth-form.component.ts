import { Component, computed, DestroyRef, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AuthForm, AuthPayload } from '#auth/model';
import { AuthService } from '#auth/service';
import { UserStore } from '#auth/store';
import { Path } from '#core/enum';

const imports = [ReactiveFormsModule, MatButtonModule, MatInputModule, RouterLink];

@Component({
  selector: 'ft-auth-form',
  templateUrl: './auth-form.component.html',
  imports,
})
export class AuthFormComponent {
  constructor() {
    effect(() => {
      if (this.view() === 'signin') {
        this.form.controls.username.addValidators([Validators.required]);
      } else this.form.controls.username.removeValidators([Validators.required]);
    });
  }

  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  readonly view = input<'login' | 'signin'>('login');
  readonly formSubmit = output<Partial<AuthPayload>>();

  readonly form: AuthForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  readonly isProcessing = inject(UserStore).select('isProcessing');
  readonly redirectPath = computed(() => ['../', this.view() === 'login' ? Path.SIGNIN : Path.LOGIN]);

  readonly Path = Path;

  submit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const { email, password, username } = this.form.controls;
    const basePayload = { email: email.value, password: password.value };

    this.formSubmit.emit(this.view() === 'login' ? basePayload : { ...basePayload, username: username.value });
  }

  signInWithGoogle(): void {
    this.#authService.signInWithGoogle$().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
