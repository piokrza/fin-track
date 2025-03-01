import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthRequest, AuthResponse } from '#auth/model';
import { ApiService } from '#core/service';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  readonly #apiService = inject(ApiService);

  readonly #baseUrl = 'auth/app/v1/auth/';

  signup$(payload: AuthRequest): Observable<AuthResponse> {
    return this.#apiService.post$(this.#baseUrl + 'signup', payload);
  }
}
