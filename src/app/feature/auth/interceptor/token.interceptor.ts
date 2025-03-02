import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenService } from '#auth/service';

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = inject(TokenService).token;

  if (token) {
    const clonedReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    return next(clonedReq);
  }

  return next(req);
};
