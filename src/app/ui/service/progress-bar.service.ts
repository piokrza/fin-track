import { Injectable } from '@angular/core';

import { Store } from '#core/abstract';

@Injectable({ providedIn: 'root' })
export class ProgressBarService extends Store<{ isProcessing: boolean }> {
  constructor() {
    super({ isProcessing: false });
  }
}
