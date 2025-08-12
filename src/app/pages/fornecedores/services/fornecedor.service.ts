import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { FornecedorModel } from '../models/forncedor.model';
import { Paginacao } from '../../../core/model/paginacao.mode';

@Injectable({
  providedIn: 'root',
})
export class FornecedorService {
  private url: string = '/Fornecedor';

  constructor(private api: ApiService) {}
  cadastrarFornecedor(fornecedor: FornecedorModel) {
    return this.api.post<FornecedorModel>(
      this.url + '/NovoFornecedor',
      fornecedor
    );
  }
  editarFornecedor(fornecedor: FornecedorModel) {
    return this.api.put<FornecedorModel>(this.url, fornecedor);
  }
  carregaTabelaFornecedor(
    paginator: Paginacao<FornecedorModel, FornecedorModel>
  ) {
    return this.api.post<Paginacao<FornecedorModel, FornecedorModel>>(
      this.url + '/ObterTabelaFornecedor',
      paginator
    );
  }
  carregarCombo() {
    return this.api.get<FornecedorModel[]>(
      this.url + `/carregarComboFornecedor`
    );
  }
  inativarFornecedor(forncedor: FornecedorModel) {
    return this.api.delete<FornecedorModel>(this.url + '?id=' + forncedor.id);
  }
}
