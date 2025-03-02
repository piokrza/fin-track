import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '#environment/index';

@Injectable({ providedIn: 'root' })
export class ApiService {
  readonly #http = inject(HttpClient);

  get$<Res>(url: string): Observable<Res> {
    return this.#http.get<Res>(environment.baseUrl + url);
  }

  post$<Req, Res>(url: string, body: Req): Observable<Res> {
    return this.#http.post<Res>(environment.baseUrl + url, body);
  }

  delete$(url: string): Observable<object> {
    return this.#http.delete(environment.baseUrl + url);
  }
}
