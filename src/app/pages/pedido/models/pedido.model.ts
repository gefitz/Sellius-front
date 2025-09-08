import { ClienteModel } from '../../clientes/models/cliente.model';
import { ProdutoModel } from '../../produtos/models/produto.model';
import { PedidoXProdutoModel } from './pedidoxproduto.model';
import { StatusPedido } from './statuspedido.enum';

export interface PedidoModel {
  id: number;
  cliente: ClienteModel;
  clienteId: number;
  usuarioId: number;
  empresaId: number;
  status: StatusPedido;
  dthPedido: Date;
  produtos: PedidoXProdutoModel[];
}
