import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  readonly #tokenKey = 'accessToken';

  get token(): string | null {
    return sessionStorage.getItem(this.#tokenKey);
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.#tokenKey, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.#tokenKey);
  }
}
