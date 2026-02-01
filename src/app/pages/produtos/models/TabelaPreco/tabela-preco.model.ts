import { OrigemTabelaPreco } from '../../Enum/OrigemTabelaPreco.enum';

export interface TabelaPrecoModel {
  id: number;
  descTabelaPreco: string;
  dtInicioVigencia: Date;
  dtFimVigencia: Date;
  idOrigemTabelaPreco: OrigemTabelaPreco;
  idReferenciaOrigem: number;
  dtCadastro: Date;
  dtAtualizado: Date;
}
