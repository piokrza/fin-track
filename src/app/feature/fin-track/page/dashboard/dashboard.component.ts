import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { UserStore } from '#auth/store';
import { TransactionsComponent } from '#fin-track/component/transactions';

const imports = [MatButtonModule, TransactionsComponent];

@Component({
  selector: 'ft-dashboard',
  template: `
    <button matButton (click)="addTransaction()">plus</button>

    <div class="mt-6">
      <ft-transactions />
    </div>
  `,
  imports,
})
export class DashboardComponent {
  // readonly #dialogService = inject(DialogService);

  readonly userStore = inject(UserStore);

  addTransaction(): void {
    // this.#dialogService.open(AddTransactionDialogComponent, {
    //   header: 'Add transaction',
    //   width: '70%',
    //   maximizable: true,
    // });
  }
}
