import { inject, Injectable } from '@angular/core';

import { AuthHttpService } from '#auth/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #authHttpService = inject(AuthHttpService);

  testLoad$() {
    return this.#authHttpService.testLoad$();
  }
}
