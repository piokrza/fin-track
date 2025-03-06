import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '#core/constant/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly #http = inject(HttpClient);

  get$<Res>(url: string, opt = {}): Observable<Res> {
    return this.#http.get<Res>(environment.baseUrl + url, opt);
  }

  post$<Req, Res>(url: string, body: Req, opt = {}): Observable<Res> {
    return this.#http.post<Res>(environment.baseUrl + url, body, opt);
  }

  delete$(url: string): Observable<object> {
    return this.#http.delete(environment.baseUrl + url);
  }
}
