import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthFormComponent } from '#auth/component/auth-form';
import { AuthPayload } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [InputTextModule, PasswordModule, ReactiveFormsModule, ButtonModule, AuthFormComponent];

@Component({
  selector: 'ft-signin',
  template: `<ft-auth-form view="signin" (formSubmit)="registerWithEmailAndPassword$($event)" />`,
  imports,
})
export class SigninComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  registerWithEmailAndPassword$({ email, password, username }: Partial<AuthPayload>) {
    if (!email || !password || !username) return;

    return this.#authService.signin$({ email, password, username }).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
