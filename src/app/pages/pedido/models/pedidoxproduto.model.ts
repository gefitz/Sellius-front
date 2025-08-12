import { ProdutoModel } from '../../produtos/models/produto.model';
import { PedidoModel } from './pedido.model';

export interface PedidoXProdutoModel {
  id: number;
  produto: ProdutoModel;
  pedido: PedidoModel;
  qtdProduto: number;
  vlrProduto: number;
}
