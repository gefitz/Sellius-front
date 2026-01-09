import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  // Clona a requisição adicionando withCredentials: true
  const authReq = req.clone({
    withCredentials: true,
  });

  return next(authReq);
}
