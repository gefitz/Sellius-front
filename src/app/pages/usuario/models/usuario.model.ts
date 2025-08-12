import { CidadeModel } from '../../../core/model/cidade.model';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

export interface UsuarioModel {
  id: number;
  nome: string;
  documento: string;
  email: string;
  cidadeId: number;
  cep: string;
  rua: string;
  empresaId: number;
  tipoUsuario: TipoUsuario;
  fAtivo: number;
}
