import { MatDialog } from '@angular/material/dialog';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { ApiService } from '../../../core/services/Api/api.service';
import { FiltroTabelaPreco } from '../models/TabelaPreco/tabela-preco-filtro.model';
import { TabelaPrecoModel } from '../models/TabelaPreco/tabela-preco.model';
import { TabelaPrecoCadastroComponent } from '../components/TabelaPreco/tabela-preco-cadastro/tabela-preco-cadastro.component';
import { DialogInativarComponent } from '../../clientes/components/Clientes/dialog-inativar/dialog-inativar.component';
import { TabelaPrecoInativarComponent } from '../components/dialogs/tabela-preco-inativar/tabela-preco-inativar.component';
import { TabelaPrecoFiltroComponent } from '../components/TabelaPreco/tabela-preco-filtro/tabela-preco-filtro.component';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TabelaPrecoService {
  apiUrl: string = '/TabelaPreco';
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) {}

  public criarTabelaPreco(tabela: TabelaPrecoModel) {
    tabela.dtInicioVigencia = new Date(tabela.dtInicioVigencia);
    if (tabela.dtFimVigencia) {
      tabela.dtFimVigencia = new Date(tabela.dtFimVigencia);
    }
    return this.api.post<TabelaPrecoModel>(
      this.apiUrl + '/novaTabelaPreco',
      tabela,
    );
  }

  public buscarTabelaPrecoPaginada(
    tabela: Paginacao<TabelaPrecoModel, FiltroTabelaPreco>,
  ) {
    return this.api.post<Paginacao<TabelaPrecoModel, FiltroTabelaPreco>>(
      this.apiUrl + '/paginacaoTabelaPreco',
      tabela,
    );
  }

  public updateTabelaPreco(tabela: TabelaPrecoModel) {
    return this.api.put<TabelaPrecoModel>(this.apiUrl, tabela);
  }

  public inativarTabelaPreco(tabela: TabelaPrecoModel) {
    return this.api.delete<TabelaPrecoModel>(
      this.api + '?idTabelaPreco=' + tabela.id,
    );
  }

  public obterTabelaPreco(id: number) {
    return this.api.get<TabelaPrecoModel>(this.apiUrl + '?idTabelaPreco=' + id);
  }

  public abrirModalCadastroTabelaPreco(tabela?: TabelaPrecoModel) {
    const retModal = this.dialog.open(TabelaPrecoCadastroComponent, {
      data: tabela,
      panelClass: 'md-large',
    });

    return retModal.afterClosed();
  }

  public abrirModalInativarTabela(tabela: TabelaPrecoModel) {
    const ret = this.dialog.open(TabelaPrecoInativarComponent, {
      data: tabela,
    });
    return ret.afterClosed();
  }

  public abrirModalPesquisaTabela(tabela: FiltroTabelaPreco) {
    const ret = this.dialog.open(TabelaPrecoFiltroComponent, {
      data: tabela,
    });
    return ret.afterClosed();
  }
}
