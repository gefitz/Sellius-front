import { MatTableDataSource } from '@angular/material/table';

export class Paginacao<model, filtroModel> {
  paginaAtual: number = 0;
  totalPaginas: number = 0;
  totalRegistros: number = 10;
  tamanhoPagina: number = 10;
  dados: model[] = [];
  filtro!: filtroModel;
  testeDados!: MatTableDataSource<model>;
}
