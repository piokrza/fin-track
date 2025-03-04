import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TitleService {
  readonly #title = signal('Test title');
  readonly title = this.#title.asReadonly();

  setTitle(title: string): void {
    this.#title.set(title);
  }
}
