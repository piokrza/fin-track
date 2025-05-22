import { Component, inject } from '@angular/core';

import { PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';

import { UserStore } from '#auth/store';
import { AddTransactionDialogComponent } from '#fin-track/component/add-transaction-dialog';
import { TransactionsComponent } from '#fin-track/component/transactions';

const imports = [ButtonModule, TransactionsComponent, TooltipModule];

@Component({
  selector: 'ft-dashboard',
  template: `
    <p-button pTooltip="Add transaction" [icon]="PrimeIcons.PLUS" [rounded]="true" (onClick)="addTransaction()" />

    <div class="mt-6">
      <ft-transactions />
    </div>
  `,
  imports,
})
export class DashboardComponent {
  readonly #dialogService = inject(DialogService);

  readonly userStore = inject(UserStore);

  readonly PrimeIcons = PrimeIcons;

  addTransaction(): void {
    this.#dialogService.open(AddTransactionDialogComponent, {
      header: 'Add transaction',
      width: '70%',
      maximizable: true,
    });
  }
}
