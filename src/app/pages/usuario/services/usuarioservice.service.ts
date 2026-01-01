import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/Api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioCadastroComponent } from '../components/usuario-cadastro/usuario-cadastro.component';
import { TpUsuarioCadastroComponent } from '../components/cadastro-tipo-usuario/cadastro-tipo-usuario.component';
import { TpUsuario } from '../models/tipo-usuario.model';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { DialogInativacaoComponent } from '../../../shared/dialog-inativacao/dialog-inativacao.component';
import { filter, switchMap, tap } from 'rxjs';
import { FiltroTpUsuarioComponent } from '../components/filtro-tp-usuario/filtro-tp-usuario.component';
import { tpUsuairoFiltro } from '../models/tp-usuario-filtro.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioserviceService {
  apiUrl = '/Usuario';
  constructor(
    private http: ApiService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  createUsuario(usuairo: UsuarioModel) {
    this.http.post(this.apiUrl, usuairo).subscribe({
      next: (response) => {
        if (response) {
          this.snack.open('Sucesso ao criar usuario', 'Ok', { duration: 1000 });
        }
      },
    });
  }
  abrirModalCadastro(usuairo?: UsuarioModel) {
    const ret = this.dialog.open(UsuarioCadastroComponent, {
      panelClass: 'md-large',
      data: usuairo,
    });
  }
  abrirModalCadastroTpUsuario(tpUsuairo?: TpUsuario) {
    const ret = this.dialog.open(TpUsuarioCadastroComponent, {
      panelClass: 'md-large',
      data: tpUsuairo,
    });
    return ret.afterClosed();
  }

  listarMenus(paginacao: Paginacao<TpUsuario, tpUsuairoFiltro>) {
    return this.http.post<Paginacao<TpUsuario, tpUsuairoFiltro>>(
      this.apiUrl + '/TpUsuario/paginacao',
      paginacao
    );
  }
  salvarTpUsuario(tpUsuario: TpUsuario) {
    return this.http.post<TpUsuario>(
      this.apiUrl + '/TpUsuario/cadastrarTpUsuario',
      tpUsuario
    );
  }
  updateTpUsuario(tpUsuario: TpUsuario) {
    return this.http.put<TpUsuario>(this.apiUrl + '/TpUsuario', tpUsuario);
  }
  inativarTpUsuario(tpUsuario: TpUsuario) {
    const retDialog = this.dialog.open(DialogInativacaoComponent, {
      data: tpUsuario,
    });
    return retDialog.afterClosed().pipe(
      filter((ret) => !!ret),
      switchMap(() =>
        this.http.delete(this.apiUrl + '/TpUsuario?id=' + tpUsuario.id)
      )
    );
  }
  abrirModalPesquisaTpUsuario(filtro: tpUsuairoFiltro) {
    const ret = this.dialog.open(FiltroTpUsuarioComponent, {
      data: filtro,
    });

    return ret.afterClosed().pipe(tap((valor) => console.log(valor)));
  }
}
