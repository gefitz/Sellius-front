import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { FornecedorModel } from '../models/forncedor.model';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { FornecedorFiltro } from '../models/forncedor-filtro.model';
import { ForncedorXCliente } from '../models/fornecedor-x-cliente.model';
import { ForncedorXClienteFiltro } from '../models/forncedor-x-cliente-filtro.model';
import { MatDialog } from '@angular/material/dialog';
import { PesquisaComponent } from '../../../shared/components/pesquisa/pesquisa.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FonecedorFiltroComponent } from '../component/fonecedor-filtro/fonecedor-filtro.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private url: string = '/Fornecedor';

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) {}
  cadastrarFornecedor(fornecedor: FornecedorModel) {
    return this.api.post<FornecedorModel>(
      this.url + '/NovoFornecedor',
      fornecedor,
    );
  }
  obterFornecedor(idFornecedor: number) {
    return this.api.get<FornecedorModel>(
      this.url + '?idFornecedor=' + idFornecedor,
    );
  }
  editarFornecedor(fornecedor: FornecedorModel) {
    return this.api.put<FornecedorModel>(this.url, fornecedor);
  }
  carregaTabelaFornecedor(
    paginator: Paginacao<FornecedorModel, FornecedorFiltro>,
  ) {
    return this.api.post<Paginacao<FornecedorModel, FornecedorFiltro>>(
      this.url + '/ObterTabelaFornecedor',
      paginator,
    );
  }
  carregarCombo() {
    return this.api.get<FornecedorModel[]>(
      this.url + `/carregarComboFornecedor`,
    );
  }
  inativarFornecedor(forncedor: FornecedorModel) {
    return this.api.delete<FornecedorModel>(this.url + '?id=' + forncedor.id);
  }
  obterFornecedorXClientePagina(
    paginacao: Paginacao<ForncedorXCliente, ForncedorXClienteFiltro>,
  ) {
    return this.api.post<Paginacao<ForncedorXCliente, ForncedorXClienteFiltro>>(
      this.url + '/obterFornecedorXClientePaginada',
      paginacao,
    );
  }
  pesquisaFornecedor() {
    const filtroInicial: FornecedorFiltro = {
      nome: '',
      cidadeId: -1,
      cnpj: '',
      estadoId: -1,
      fAtivo: -1,
    };

    const event = new Subject<FornecedorFiltro>();

    var retDialog = this.dialog.open(
      PesquisaComponent<FornecedorModel, FornecedorFiltro>,
      {
        data: {
          urlChamada: '/Fornecedor/ObterTabelaFornecedor',
          tituloPesquisa: 'Selecionar Fornecedor',
          colunas: ['nome', 'cnpj'],
          nomeColunas: ['Nome', 'CNPJ'],
          eventFiltro: event,
          modelFiltro: filtroInicial,
        },
        panelClass: `md-medium`,
      },
    );
    event.subscribe(() => {
      this.abrirModalPesquisa(retDialog.componentInstance.modelFiltro);
    });

    return retDialog.afterClosed();
  }
  adicionarFornecedorXCliente(fornecedorXCliente: ForncedorXClienteFiltro) {
    return this.api.post<ForncedorXCliente>(
      this.url + '/addFornecedorXCliente',
      fornecedorXCliente,
    );
  }
  abrirModalPesquisa(filtro: FornecedorFiltro) {
    const retFiltro = this.dialog.open(FonecedorFiltroComponent, {
      data: filtro,
      panelClass: 'md-medium',
    });

    return retFiltro.afterClosed();
  }
  removerVinculoFornecedorXCliente(fornecedorXCliente: ForncedorXCliente) {
    return this.api.post<ForncedorXCliente>(
      this.url + '/removerVinculoFornecedorXCliente',
      fornecedorXCliente,
    );
  }
}
