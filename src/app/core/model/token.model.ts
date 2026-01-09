import { TpUsuarioConfiguracao } from '../../pages/usuario/models/tp-usuario-configuracao.model';

export interface TokenModel {
  user: string;
  tipoUsuario: string;
  id: number;
  empresa: number;
  config: TpUsuarioConfiguracao;
}
