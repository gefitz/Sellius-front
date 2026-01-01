export interface Menu {
  id: number;
  deMenu: string;
  urlMenu: string;
  icone: string;
  idMenuPai: number;
  fMenuExclusivo: number;
  idEmpresa?: number | null;
  fAtivo: number;
  dtCadastro: Date | string;
  dtAtualizacao: Date | string;
  menuFilhos: Menu[];
  sMenuPai: string;
  menuPai: Menu;
}
