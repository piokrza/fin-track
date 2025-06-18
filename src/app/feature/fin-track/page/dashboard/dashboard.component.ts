import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { TransactionsComponent } from '#fin-track/component/transactions';
import { ConfirmDialogComponent } from '#ui/component/confirm-dialog';
import { ConfirmDialogData } from '#ui/component/confirm-dialog/model';

const imports = [MatButtonModule, MatIconModule, TransactionsComponent];

@Component({
  selector: 'ft-dashboard',
  template: `
    <button matFab extended (click)="addTransaction()">
      <mat-icon>add</mat-icon>
      Add transaction
    </button>

    <div class="mt-6">
      <ft-transactions />
    </div>
  `,
  imports,
})
export class DashboardComponent {
  constructor() {
    this.addTransaction();
  }

  readonly #dialog = inject(MatDialog);

  addTransaction(): void {
    this.#dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'title tego',
        description: 'he hef lajlwi jwilaf jilawjlf ijaw lijlawfijaflw ijhe',
      } satisfies ConfirmDialogData,
    });
  }
}
