import type { Signal, WritableSignal } from '@angular/core';
import { computed, signal } from '@angular/core';

export abstract class Store<T extends object> {
  constructor(private readonly initialState: T) {
    this.#state = signal(initialState);
  }

  readonly #state: WritableSignal<T>;

  get state(): Signal<T> {
    return this.#state.asReadonly();
  }

  select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.#state()[key]);
  }

  update<K extends keyof T>(key: K, value: T[K]): void {
    this.#state.update((currentState) => ({ ...currentState, [key]: value }));
  }

  clear(): void {
    this.#state.set(this.initialState);
  }
}
