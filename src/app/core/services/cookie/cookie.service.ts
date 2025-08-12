import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class Cookie {
  constructor(private cookie: CookieService) {}

  guardaCookie(nomeCookie: string, valor: object) {
    this.cookie.set(nomeCookie, JSON.stringify(valor));
  }
  resgatarCookie(nomeCookie: string) {
    return this.cookie.get(nomeCookie);
  }
  guardaCookieUsuario(token: string) {
    this.cookie.set('auth_token', JSON.stringify(token));
  }
  resgatarCookieUsuario() {
    return this.cookie.get('auth_token');
  }
}
