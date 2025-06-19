import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog';

import { ConfirmDialogData } from '#ui/component/confirm-dialog';

const imports = [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogContent];

@Component({
  selector: 'ft-confirm-dialog',
  template: `
    @let d = data;

    <mat-dialog-content>
      <h2 class="text-xl">{{ d.title ?? '' }}</h2>
      <p class="mt-4">{{ d.description ?? '' }}</p>
    </mat-dialog-content>

    <mat-dialog-actions>
      <div class="flex flex-col gap-2 md:flex-row-reverse">
        <button matButton="filled" [mat-dialog-close]="true">{{ d.confirmBtnLabel ?? 'Accept' }}</button>
        <button matButton mat-dialog-close cdk-focus-initial>{{ d.cancelBtnLabel ?? 'Cancel' }}</button>
      </div>
    </mat-dialog-actions>
  `,
  imports,
})
export class ConfirmDialogComponent {
  readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
