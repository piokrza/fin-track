import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CookiesService {
  readonly #document = inject(DOCUMENT);

  set(name: string, value: string, days = 7): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    this.#document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  }

  get(name: string): string | null {
    const cookies = this.#document.cookie.split('; ');

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  }
}
