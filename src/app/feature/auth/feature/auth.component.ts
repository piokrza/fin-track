import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SelectButtonModule } from 'primeng/selectbutton';

import { LoginComponent } from '#auth/component/login';
import { SigninComponent } from '#auth/component/signin';

const imports = [SigninComponent, SelectButtonModule, FormsModule, LoginComponent];

@Component({
  selector: 'ft-auth',
  template: `
    <p-selectbutton optionValue="value" aria-labelledby="basic" [(ngModel)]="value" [options]="stateOptions" />

    @if (value === 'login') {
      <ft-login />
    } @else {
      <ft-signin />
    }
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
