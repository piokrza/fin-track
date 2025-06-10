import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AddTransactionDialogComponent } from '#fin-track/component/add-transaction-dialog';
import { TransactionsComponent } from '#fin-track/component/transactions';

const imports = [MatButtonModule, MatIconModule, TransactionsComponent];

@Component({
  selector: 'ft-dashboard',
  template: `
    <button matFab extended="" (click)="addTransaction()">
      <mat-icon>material-symbols-outlined">transfer-within-a-station</mat-icon>
      Add transaction
    </button>

    <div class="mt-6">
      <ft-transactions />
    </div>
  `,
  imports,
})
export class DashboardComponent {
  readonly #dialog = inject(MatDialog);

  addTransaction(): void {
    this.#dialog.open(AddTransactionDialogComponent, {});
  }
}
