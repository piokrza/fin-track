import { Component, inject, signal } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { take, tap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UserStore } from '#auth/store';
import { TransactionsService } from '#fin-track/service';
import { expandCollapse } from '#ui/animation';

const animations = [expandCollapse];
const imports = [MatButtonModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatSelectModule];

@Component({
  selector: 'ft-add-transaction-form',
  template: `
    <button matIconButton (click)="isFormVisible.set(!isFormVisible())">
      <mat-icon>add</mat-icon>
    </button>

    <form [@expandCollapse]="isFormVisible() ? 'expanded' : 'collapsed'" class="grid" [formGroup]="form">
      <mat-form-field>
        <mat-label>Amount</mat-label>
        <input matInput type="number" [formControl]="form.controls.amount" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Category</mat-label>
        <mat-select [formControl]="form.controls.category">
          @for (category of categories; track $index) {
            <mat-option [value]="category">{{ category }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <button matButton (click)="submit()">Add transaction</button>
    </form>
  `,
  animations,
  imports,
})
export class AddTransactionFormComponent {
  readonly #transactionsService = inject(TransactionsService);

  readonly isFormVisible = signal(false);
  readonly user = inject(UserStore).select('user');
  readonly categories = ['Zakupy', 'Samochód', 'Rozrywka', 'Jedzenie'];

  readonly form = new FormGroup({
    amount: new FormControl<number>(0, { nonNullable: true }),
    category: new FormControl<string>('', { nonNullable: true }),
  });

  submit(): void {
    this.#transactionsService
      .addTransaction$({
        amount: this.form.controls.amount.value,
        category: this.form.controls.category.value,
        id: '4124',
        userId: this.user()?.uid ?? '',
        type: 'expense',
        createDate: Timestamp.fromDate(new Date()),
      })
      .pipe(
        tap(() => {
          this.form.reset();
          this.isFormVisible.set(false);
        }),
        take(1)
      )
      .subscribe();
  }
}
