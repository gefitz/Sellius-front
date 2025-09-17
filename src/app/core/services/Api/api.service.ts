import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Cookie } from '../cookie/cookie.service';
import { Injectable } from '@angular/core';
import { ResponseModel } from './model/response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../pages/login/services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:5000/api';

  constructor(
    private http: HttpClient,
    private cookie: Cookie,
    private snack: MatSnackBar,
    private login: LoginService,
    private route: Router
  ) {}
  get<model>(endPoint: string): Observable<model> {
    return this.http
      .get<ResponseModel<model>>(this.url + endPoint, {
        headers: this.montarHeader(),
      })
      .pipe(
        map((response) => {
          if (response.success) {
            this.snack.open(response.message, 'Ok', { duration: 5000 });
            return response.data;
          } else {
            this.snack.open(response.errorMessage, `Ok`, { duration: 5000 });
            throw new Error('Erro: ' + response.errorMessage);
          }
        }),
        catchError((error) => this.error(error))
      );
  }
  post<model>(endPoint: string, obj: object): Observable<model> {
    return this.http
      .post<ResponseModel<model>>(this.url + endPoint, obj, {
        headers: this.montarHeader(),
      })
      .pipe(
        map((response) => {
          if (response.success) {
            this.snack.open(response.message, `Ok`, {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
            return response.data;
          } else {
            throw new Error(response.errorMessage);
          }
        }),
        catchError((error) => this.error(error))
      );
  }

  put<model>(endPoint: string, obj: object): Observable<model> {
    return this.http
      .put<ResponseModel<model>>(this.url + endPoint, obj, {
        headers: this.montarHeader(),
      })
      .pipe(
        map((response) => {
          if (response.success) {
            this.snack.open(response.message, 'Ok', { duration: 5000 });
            return response.data;
          } else {
            throw new Error('Erro ao excluir');
          }
        }),
        catchError((error) => this.error(error))
      );
  }

  delete<model>(endPoint: string): Observable<model> {
    return this.http
      .delete<ResponseModel<model>>(this.url + endPoint, {
        headers: this.montarHeader(),
      })
      .pipe(
        map((response) => {
          if (response.success) {
            this.snack.open(response.message, 'Ok', { duration: 5000 });
            return response.data;
          } else {
            throw new Error('Erro ao excluir');
          }
        }),
        catchError((error) => this.error(error))
      );
  }

  private montarHeader(): HttpHeaders {
    const token = this.cookie.resgatarCookie('auth_token');
    if (!token || token == '') {
      this.login.sair();
    }
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + token,
    });
    return headers;
  }
  private httpResponse401(erro: any) {
    if (erro.error === 'Token is experied.') {
      this.login.sair();
    }
  }
  private error(error: any) {
    if (error.status == 401) {
      this.httpResponse401(error);
    }
    this.snack.open(error.error, 'Ok', { duration: 5000 });
    return throwError(() => error.error);
  }
}
