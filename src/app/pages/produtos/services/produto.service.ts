import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoModel } from '../models/produto.model';
import { ProdutoFiltro } from '../models/produtoFiltro.model';
import { ApiService } from '../../../core/services/Api/api.service';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { AuthGuardService } from '../../../core/services/AuthGuard/auth-guard.service';
import { ProdutoTabela } from '../models/produto-tabela.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = '/Produto';
  constructor(private api: ApiService) {}

  listProduto(produto: Paginacao<ProdutoTabela, ProdutoFiltro>) {
    return this.api.post<Paginacao<ProdutoTabela, ProdutoFiltro>>(
      this.apiUrl + '/ObterProduto',
      produto
    );
  }
  cadastrarProduto(produto: ProdutoModel) {
    this.api
      .post<ProdutoModel>(this.apiUrl + '/CadastrarProduto', produto)
      .subscribe({
        next: (response) => {
          if (response) {
            window.location.reload();
          }
        },
      });
  }
  editarProduto(produto: ProdutoModel) {
    return this.api.put<ProdutoModel>(this.apiUrl, produto).subscribe({
      next: (response) => {
        if (response) {
          window.location.reload();
        }
      },
    });
  }
  inativarProduto(produto: ProdutoModel) {
    return this.api.delete<ProdutoModel>(this.apiUrl + '?id=' + produto.id);
  }
}
