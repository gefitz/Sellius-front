import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { CadastroEmpresaModel } from '../models/cadastro-empresa.model';
import { finalize } from 'rxjs';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cookie } from '../../../core/services/cookie/cookie.service';
@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  url: string = '/Empresa';
  constructor(
    private api: ApiService,
    private snack: MatSnackBar,
    private cookie: Cookie
  ) {}

  cadastrarEmpresa(model: CadastroEmpresaModel) {
    this.api.post<string>(this.url + '/cadastroNovaEmpresa', model).subscribe({
      next: (ret) => {
        this.cookie.guardaCookieUsuario(ret);
      },
      error: (ret) => {
        this.snack.open('Error: ' + ret.errorMessage, 'Ok', {
          duration: 5000,
        });
      },
    });
  }
}
