import { CidadeModel } from '../../../core/model/cidade.model';

export interface FornecedorModel {
  id: number;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  fAtivo: number;
  dthCadastro: Date;
  dthAlteracao: Date;
  empresaId: number;
  cidadeId: number;
  cep: string;
  rua: string;
  complemento: string;
  cidade: CidadeModel;
}
