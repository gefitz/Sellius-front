import { Menu } from '../../menu/model/menu.model';
import { TpUsuarioConfiguracao } from './tp-usuario-configuracao.model';

export interface TpUsuario {
  id: number;
  tpUsuario: string;
  idEmpresa: number;
  dtCadastro: Date;
  dtAlteracao: Date;
  fAtivo: number;
  menu: Menu[];
  tpUsuarioConfiguracao: TpUsuarioConfiguracao;
}
