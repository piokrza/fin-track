import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '#environment/index';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly #http = inject(HttpClient);

  get$<T>(url: string): Observable<T> {
    return this.#http.get<T>(environment.baseUrl + url);
  }

  post$<Req, Res>(url: string, body: Req): Observable<Res> {
    return this.#http.post<Res>(environment.baseUrl + url, body);
  }
}
