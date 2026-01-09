import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenModel } from '../../model/token.model';
import { TpUsuarioConfiguracao } from '../../../pages/usuario/models/tp-usuario-configuracao.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private permissao!: any;
  constructor(private cookie: CookieService, private router: Router) {}
  canActivate(): boolean {
    if (this.cookie.check('token')) {
      return true;
    }
    this.router.navigate(['/Login']);
    return false;
  }
  decoficadoToken() {
    return jwtDecode<TokenModel>(this.getCookie());
  }
  getCookie() {
    return this.cookie.get('token');
  }
  temPermissao(permissao: string): boolean {
    const tokenJson = this.decoficadoToken();
    if (!this.permissao) {
      this.permissao = tokenJson.config;
    }
    return Boolean(this.permissao[permissao]);
  }
}
