import { OrigemTabelaPreco } from '../../Enum/OrigemTabelaPreco.enum';

export interface FiltroTabelaPreco {
  descTabelaPreco: string;
  idOrigemTabelaPreco: number;
  dtInicialPesquisaInicioVigencia: Date;
  dtFimPesquisaInicioVigencia: Date;
}
