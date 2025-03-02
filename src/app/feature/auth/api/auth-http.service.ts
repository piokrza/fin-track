import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignupRequest, AuthResponse, LoginRequest } from '#auth/model';
import { ApiService } from '#core/service';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  readonly #apiService = inject(ApiService);

  readonly #baseUrl = 'auth/app/v1/auth/';

  signup$(payload: SignupRequest): Observable<AuthResponse> {
    return this.#apiService.post$(this.#baseUrl + 'signup', payload);
  }

  login$(payload: LoginRequest): Observable<AuthResponse> {
    return this.#apiService.post$(this.#baseUrl + 'login', payload);
  }

  logout$(): Observable<object> {
    return this.#apiService.delete$('session');
  }
}
