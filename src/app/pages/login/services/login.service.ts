import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginModel } from '../models/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { ResponseApiModel } from '../../../core/model/ResponseApi.model';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isAuthenticado: boolean = true;
  private urlApi: string = 'http://localhost:5000/api/Login';
  constructor(
    private cookie: CookieService,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {}
  authenticarUsuario(login: LoginModel) {
    this.http.post<ResponseApiModel>(this.urlApi, login).subscribe({
      next: (response) => {
        this.cookie.set('auth_token', response.data.toString());
        this.snackBar.open('Sucesso na autenticação', 'ok', {
          duration: 1000,
        });
        this.router.navigateByUrl('');
      },
      error: (error) => {
        this.snackBar.open(error.error.errorMessage, 'Ok', { duration: 5000 });
      },
    });
  }
  sair() {
    this.cookie.delete('auth_token');
    this.router.navigateByUrl('/Login');
  }
}
