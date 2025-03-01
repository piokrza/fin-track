import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  readonly #http = inject(HttpClient);

  testLoad$() {
    return this.#http.get('/');
  }
}
