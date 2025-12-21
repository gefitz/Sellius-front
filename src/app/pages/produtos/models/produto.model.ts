import { OrigemTabelaPreco } from '../Enum/OrigemTabelaPreco.enum';
import { TpProdutoModel } from './tpProduto.model';

export interface ProdutoModel {
  id: number;
  nome: string;
  tipoProduto: TpProdutoModel;
  tipoProdutoId: number;
  qtd: number;
  marca: number;
  fAtivo: number;
  dthCriacao: Date;
  descricao: string;
  valor: number;
  fornecedorId: number;
  origemTabelaPreco: OrigemTabelaPreco;
}
