import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProgressBarService {
  readonly #isProcessing = signal(false);
  readonly isProcessing = this.#isProcessing.asReadonly();

  setIsProcessing(isProcessing: boolean): void {
    this.#isProcessing.set(isProcessing);
  }
}
