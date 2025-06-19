import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AddTransactionFormComponent } from '#fin-track/component/add-transaction-form';
import { TransactionsComponent } from '#fin-track/component/transactions';

const imports = [MatButtonModule, MatIconModule, AddTransactionFormComponent, TransactionsComponent];

@Component({
  selector: 'ft-dashboard',
  template: `
    <ft-add-transaction-form />

    <div class="mt-6">
      <ft-transactions />
    </div>
  `,
  imports,
})
export class DashboardComponent {}
