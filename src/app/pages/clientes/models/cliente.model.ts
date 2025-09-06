import { CidadeModel } from '../../../core/model/cidade.model';

export interface ClienteModel {
  id: number;
  nome: string;
  razao: string;
  documento: string;
  telefone: string;
  email: string;
  cidadeId: CidadeModel;
  rua: string;
  cep: string;
  fAtivo: number;
  dthCadastro: Date;
  dthAlteracao: Date;
  idSegmentacao: number;
  idGrupo: number;
  idEstado: number;
  bairro: string;
}
