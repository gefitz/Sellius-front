import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { TpProdutoModel } from '../models/tpProduto.model';
import { map, Observable } from 'rxjs';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { LoginService } from '../../login/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class TpProdutoService {
  private endpoint: string = `/TpProduto`;
  constructor(private api: ApiService) {}
  cadastrarTpProduto(tpProduto: TpProdutoModel): Observable<TpProdutoModel> {
    return this.api.post<TpProdutoModel>(
      this.endpoint + `/NovoTpProduto`,
      tpProduto
    );
  }
  buscarTpProduto(paginacao: Paginacao<TpProdutoModel, TpProdutoModel>) {
    return this.api.post<Paginacao<TpProdutoModel, TpProdutoModel>>(
      this.endpoint + '/ObterTabelaTpProduto',
      paginacao
    );
  }
  editTpProduto(tpProduto: TpProdutoModel) {
    return this.api.put(this.endpoint, tpProduto);
  }
  inativarTpProduto(tpProduto: TpProdutoModel) {
    return this.api.delete(this.endpoint + '?id=' + tpProduto.id);
  }
  carregarTpProdutoCombo() {
    return this.api.get<TpProdutoModel[]>(this.endpoint + '/carregarCombo');
  }
}
