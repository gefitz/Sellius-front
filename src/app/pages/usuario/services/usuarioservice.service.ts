import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/Cadastro/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/Api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioCadastroComponent } from '../components/Usuario/usuario-cadastro/usuario-cadastro.component';
import { TpUsuarioCadastroComponent } from '../components/TpUsuario/cadastro-tipo-usuario/cadastro-tipo-usuario.component';
import { TpUsuario } from '../models/tipo-usuario.model';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { DialogInativacaoComponent } from '../../../shared/dialog-inativacao/dialog-inativacao.component';
import { filter, switchMap, tap } from 'rxjs';
import { FiltroTpUsuarioComponent } from '../components/TpUsuario/filtro-tp-usuario/filtro-tp-usuario.component';
import { tpUsuairoFiltro } from '../models/tp-usuario-filtro.model';
import { UsuarioTabela } from '../models/Tabela/usuario-tabela.model';
import { UsuarioFiltro } from '../models/Filtros/usuario-filtro.model';
import { FiltroUsuarioComponent } from '../components/Usuario/filtro/filtro-usuario.component';

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
    return this.http.post(this.apiUrl + '/novoUsuario', usuairo);
  }
  abrirModalCadastro(usuairo?: UsuarioModel) {
    const ret = this.dialog.open(UsuarioCadastroComponent, {
      panelClass: 'md-large',
      data: usuairo,
    });
    return ret.afterClosed();
  }
  obterUsuarios(paginacao: Paginacao<UsuarioTabela, UsuarioFiltro>) {
    return this.http.post<Paginacao<UsuarioTabela, UsuarioFiltro>>(
      this.apiUrl + '/obterTodosUsuarios',
      paginacao
    );
  }
  AbrirmodalPesquisa(filtro: UsuarioFiltro) {
    const ret = this.dialog.open(FiltroUsuarioComponent, {
      data: filtro,
    });
    return ret.afterClosed().pipe(tap((valor) => console.log(valor)));
  }
  obterUsuarioById(usuario: UsuarioTabela) {
    return this.http.get<UsuarioModel>(
      this.apiUrl + '/obterUsuario?id=' + usuario.id
    );
  }
  upDateUsuario(usuario: UsuarioModel) {
    return this.http.put<UsuarioModel>(this.apiUrl, usuario);
  }
}
