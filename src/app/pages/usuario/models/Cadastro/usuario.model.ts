import { CidadeModel } from '../../../../core/model/cidade.model';
import { LoginModel } from '../../../login/models/login.model';
import { TpUsuario } from '../tipo-usuario.model';

export interface UsuarioModel {
  id: number;
  nome: string;
  documento: string;
  email: string;
  cidadeId: number;
  cep: string;
  rua: string;
  empresaId: number;
  tipoUsuario: TpUsuario;
  fAtivo: number;
  login: LoginModel;
  cidade: CidadeModel;
}
