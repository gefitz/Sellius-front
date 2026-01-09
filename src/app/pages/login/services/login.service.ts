import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginModel } from '../models/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/Api/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isAuthenticado: boolean = true;
  // private urlApi: string = environment.apiUrl + '/api';
  constructor(
    private cookie: CookieService,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: ApiService
  ) {}
  authenticarUsuario(login: LoginModel) {
    this.http.post<string>('/Login', login).subscribe({
      next: (response) => {
        this.cookie.set('token', response);
        this.snackBar.open('Sucesso na autenticação', 'ok', {
          duration: 1000,
        });
        this.router.navigateByUrl('');
      },
    });
  }
  sair() {
    this.http.delete<any>('/Login/logout').subscribe({
      next: (ret) => {
        this.snackBar.open('Sessao finalizado com sucesso', 'Ok', {
          duration: 5000,
        });
        this.router.navigateByUrl('/Login');
      },
    });
  }
}
