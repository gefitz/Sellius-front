import { TipoLicenca } from '../../../core/enums/tipo-licenca.enum';

export interface Empresa {
  id: number;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  cidadeId: number;
  cep: string;
  rua: string;
  dthCadastro: Date;
  dthAlteracao: Date;
  fAtivo: number;
  tipoLicencao: TipoLicenca;
}
