import { HttpInterceptorFn } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { inject } from '@angular/core';

export const autInterceptor: HttpInterceptorFn = (req, next) => {
  const cookie = inject(AuthGuardService);
  const token = cookie.getCookie();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
  return next(req);
};
