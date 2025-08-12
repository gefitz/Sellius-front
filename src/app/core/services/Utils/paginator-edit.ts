import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator(): MatPaginatorIntl {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Mostrar por página'; // ⬅️ Altere aqui
  customPaginatorIntl.nextPageLabel = 'Próxima';
  customPaginatorIntl.previousPageLabel = 'Anterior';
  customPaginatorIntl.firstPageLabel = 'Primeira página';
  customPaginatorIntl.lastPageLabel = 'Última página';
  customPaginatorIntl.getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0 || pageSize === 0) {
      return 'Nenhum registro encontrado';
    }

    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} – ${endIndex} de ${length}`;
  };
  return customPaginatorIntl;
}
