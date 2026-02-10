import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError, finalize } from 'rxjs';
import { Cookie } from '../cookie/cookie.service';
import {
  Injectable,
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  Inject,
} from '@angular/core';
import { ResponseModel } from './model/response.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../pages/login/services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Subscription } from 'rxjs';

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
    private cookie: Cookie,
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

// Componente de Loader integrado ao ApiService
@Component({
  selector: 'app-api-loader',
  imports: [],
  template: `
    @if (isLoading) {
      <div class="loader-overlay">
        <div class="spinner"></div>
      </div>
    }
  `,
  styles: [
    `
      .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
  standalone: true,
})
export class ApiLoaderComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription = this.apiService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
