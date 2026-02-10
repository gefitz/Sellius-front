import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError, finalize } from 'rxjs';
import { Injectable } from '@angular/core';
import { ResponseModel } from './model/response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = environment.apiUrl + '/api';

  // Controle interno do loader
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  private requestCount = 0;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private route: Router,
  ) {}

  // Métodos para controlar o loader internamente
  private showLoader(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  private hideLoader(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loadingSubject.next(false);
    }
  }
  get<model>(endPoint: string): Observable<model> {
    this.showLoader();
    return this.http.get<ResponseModel<model>>(this.url + endPoint).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          this.snack.open(response.errorMessage, 'Ok', { duration: 5000 });
          throw new Error('Erro: ' + response.errorMessage);
        }
      }),
      catchError((error) => this.error(error)),
      finalize(() => this.hideLoader()),
    );
  }
  post<model>(endPoint: string, obj: object): Observable<model> {
    this.showLoader();
    return this.http.post<ResponseModel<model>>(this.url + endPoint, obj).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          this.snack.open(response.errorMessage, 'Ok', { duration: 5000 });
          throw new Error(response.errorMessage);
        }
      }),
      catchError((error) => this.error(error)),
      finalize(() => this.hideLoader()),
    );
  }

  put<model>(endPoint: string, obj: object): Observable<model> {
    this.showLoader();
    return this.http.put<ResponseModel<model>>(this.url + endPoint, obj).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          this.snack.open(response.errorMessage, 'Ok', { duration: 5000 });
          throw new Error('Erro ao excluir');
        }
      }),
      catchError((error) => this.error(error)),
      finalize(() => this.hideLoader()),
    );
  }

  delete<model>(endPoint: string): Observable<model> {
    this.showLoader();
    return this.http.delete<ResponseModel<model>>(this.url + endPoint).pipe(
      map((response) => {
        if (response.success) {
          return response.data;
        } else {
          this.snack.open(response.errorMessage, 'Ok', { duration: 5000 });
          throw new Error('Erro ao excluir');
        }
      }),
      catchError((error) => this.error(error)),
      finalize(() => this.hideLoader()),
    );
  }

  private httpResponse401(erro: HttpErrorResponse) {
    this.route.navigateByUrl('/Login');
  }
  private httpResponse403(erro: HttpErrorResponse) {
    this.snack.open(
      'Acesso negado! Seu usuario nao tem permisao para realizar essa acao',
      'Ok',
      { duration: 5000 },
    );
  }
  private error(error: HttpErrorResponse) {
    if (error.status == 401) {
      this.httpResponse401(error);
    } else if (error.status == 403) {
      this.httpResponse403(error);
    }
    return throwError(() => error.error);
  }
}
