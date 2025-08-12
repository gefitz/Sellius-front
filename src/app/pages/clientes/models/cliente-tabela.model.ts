export interface ClienteTabela {
  id: number;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
  cidadeEstado: string;
  rua: string;
  dthCadastro: Date;
  dthAlteracao: Date;
  fAtivo: number;
}
