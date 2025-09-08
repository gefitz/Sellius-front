import { ProdutoTabela } from '../../produtos/models/produto-tabela.model';
import { ProdutoModel } from '../../produtos/models/produto.model';
import { PedidoModel } from './pedido.model';

export interface PedidoXProdutoModel {
  id: number;
  produto: ProdutoTabela;
  qtd: number;
  valorVenda: number;
}
