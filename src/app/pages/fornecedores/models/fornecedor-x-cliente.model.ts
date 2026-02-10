import { ClienteTabela } from '../../clientes/models/cliente-tabela.model';
import { FornecedorModel } from './forncedor.model';

export interface ForncedorXCliente {
  idCliente: number;
  idFornecedor: number;
  cliente: ClienteTabela;
  fornecedor: FornecedorModel;
}
