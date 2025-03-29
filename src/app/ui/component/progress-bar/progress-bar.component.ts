import { Component, inject } from '@angular/core';

import { ProgressBarModule } from 'primeng/progressbar';

import { ProgressBarService } from '#ui/service';

const imports = [ProgressBarModule];

@Component({
  selector: 'ft-progress-bar',
  template: `
    @if (isProcessing()) {
      <p-progressbar class="absolute inset-x-0 top-0" mode="indeterminate" [style]="{ height: '.25rem' }" />
    }
  `,
  imports,
})
export class ProgressBarComponent {
  readonly isProcessing = inject(ProgressBarService).isProcessing;
}
