import { LoginModel } from '../../login/models/login.model';
import { UsuarioModel } from '../../usuario/models/usuario.model';
import { Empresa } from './empresa.model';

export interface CadastroEmpresaModel {
  empresa: Empresa;
  usuario: UsuarioModel;
  login: LoginModel;
}
