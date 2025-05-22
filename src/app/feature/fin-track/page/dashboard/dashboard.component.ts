import { Component, inject } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { UserStore } from '#auth/store';
import { TransactionsComponent } from '#fin-track/component/transactions';

const imports = [ButtonModule, TransactionsComponent];

@Component({
  selector: 'ft-dashboard',
  template: `
    <p-button [icon]="PrimeIcons.PLUS" [rounded]="true" (onClick)="addTransaction()" />
    <h1>This is userName: {{ userStore.user()?.displayName }}</h1>

    <ft-transactions />
  `,
  imports,
})
export class DashboardComponent {
  readonly userStore = inject(UserStore);

  readonly PrimeIcons = PrimeIcons;

  addTransaction(): void {
    //
  }
}
