export class Paginacao<model, filtroModel> {
  paginaAtual: number = 1;
  totalPaginas: number = 0;
  totalRegistros: number = 0;
  tamanhoPagina: number = 10;
  dados!: model[];
  filtro!: filtroModel;
}
