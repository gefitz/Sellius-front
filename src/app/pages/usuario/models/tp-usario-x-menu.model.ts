import { Menu } from '../../menu/model/menu.model';
import { TpUsuario } from './tipo-usuario.model';

export interface TpUsuarioXMenu {
  idTpUsuario: number;
  idMenu: number;
  tpUsuario: TpUsuario;
  menu: Menu;
}
