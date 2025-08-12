import { ClienteModel } from '../../clientes/models/cliente.model';
import { ProdutoModel } from '../../produtos/models/produto.model';
import { StatusPedido } from './statuspedido.enum';

export interface PedidoModel {
  id: number;
  cliente: ClienteModel;
  status: StatusPedido;
  dthPedido: Date;
}
