import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { expandCollapse } from '#ui/animation';

const animations = [expandCollapse];
const imports = [MatButtonModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatSelectModule];

@Component({
  selector: 'ft-add-transaction-form',
  template: `
    <button matIconButton (click)="isFormVisible.set(!isFormVisible())">
      <mat-icon>add</mat-icon>
    </button>

    <form [@expandCollapse]="isFormVisible() ? 'expanded' : 'collapsed'" class="grid">
      <mat-form-field>
        <mat-label>Amount</mat-label>
        <input matInput type="number" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Category</mat-label>
        <mat-select>
          @for (category of categories; track $index) {
            <mat-option [value]="category">{{ category }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </form>
  `,
  animations,
  imports,
})
export class AddTransactionFormComponent {
  readonly isFormVisible = signal(false);
  readonly categories = ['Zakupy', 'Samochód', 'Rozrywka', 'Jedzenie'];
}
