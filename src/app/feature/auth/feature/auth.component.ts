import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';

import { LoginComponent } from '#auth/component/login';
import { SigninComponent } from '#auth/component/signin';

const imports = [SigninComponent, SelectButtonModule, FormsModule, LoginComponent, CardModule];

@Component({
  selector: 'ft-auth',
  template: `
    <section class="h-screen flex justify-center align-center">
      <p-card>
        <div class="flex justify-center mb-5">
          <p-selectbutton optionValue="value" aria-labelledby="basic" [(ngModel)]="value" [options]="stateOptions" />
        </div>

        @if (value === 'login') {
          <ft-login />
        } @else {
          <ft-signin />
        }
      </p-card>
    </section>
  `,
  imports,
})
export class AuthComponent {
  stateOptions: { value: 'login' | 'signup'; label: string }[] = [
    { value: 'login', label: 'login' },
    { value: 'signup', label: 'signup' },
  ];

  value: 'login' | 'signup' = 'login';
}
