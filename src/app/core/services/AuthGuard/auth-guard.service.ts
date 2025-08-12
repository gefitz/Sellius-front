import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenModel } from '../../model/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private cookie: CookieService, private router: Router) {}
  canActivate(): boolean {
    if (this.cookie.check('auth_token')) {
      return true;
    }
    this.router.navigate(['/Login']);
    return false;
  }
  decoficadoToken() {
    return jwtDecode<TokenModel>(this.cookie.get('auth_token'));
  }
  getCookie() {
    return this.cookie.get('auth_token');
  }
}
