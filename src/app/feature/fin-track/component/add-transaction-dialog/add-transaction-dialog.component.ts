import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

const imports = [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose];

@Component({
  selector: 'ft-add-transaction-dialog',
  template: `
    <h2 mat-dialog-title>Add transaction</h2>
    <mat-dialog-content>form here</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton mat-dialog-close>Cancel</button>
      <button matButton mat-dialog-close cdkFocusInitial>Submit</button>
    </mat-dialog-actions>
  `,
  imports,
})
export class AddTransactionDialogComponent {}
