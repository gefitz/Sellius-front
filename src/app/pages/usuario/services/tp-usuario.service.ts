import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../core/services/Api/api.service';
import { TpUsuarioCadastroComponent } from '../components/TpUsuario/cadastro-tipo-usuario/cadastro-tipo-usuario.component';
import { TpUsuario } from '../models/tipo-usuario.model';
import { tpUsuairoFiltro } from '../models/tp-usuario-filtro.model';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { DialogInativacaoComponent } from '../../../shared/dialog-inativacao/dialog-inativacao.component';
import { filter, switchMap, tap } from 'rxjs';
import { FiltroTpUsuarioComponent } from '../components/TpUsuario/filtro-tp-usuario/filtro-tp-usuario.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TpUsuarioService {
  private apiUrl: string = '/TpUsuario';
  constructor(private http: ApiService, private dialog: MatDialog) {}
  abrirModalCadastroTpUsuario(tpUsuairo?: TpUsuario) {
    const ret = this.dialog.open(TpUsuarioCadastroComponent, {
      panelClass: 'md-large',
      data: tpUsuairo,
    });
    return ret.afterClosed();
  }

  listarMenus(paginacao: Paginacao<TpUsuario, tpUsuairoFiltro>) {
    return this.http.post<Paginacao<TpUsuario, tpUsuairoFiltro>>(
      this.apiUrl + '/paginacao',
      paginacao
    );
  }
  salvarTpUsuario(tpUsuario: TpUsuario) {
    return this.http.post<TpUsuario>(
      this.apiUrl + '/cadastrarTpUsuario',
      tpUsuario
    );
  }
  updateTpUsuario(tpUsuario: TpUsuario) {
    return this.http.put<TpUsuario>(this.apiUrl, tpUsuario);
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

  carregaTpUsuario() {
    return this.http.get<TpUsuario[]>(this.apiUrl + '/obterTodosTpUsuarios');
  }
}
