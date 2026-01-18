import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Paginacao } from '../model/paginacao.mode';
import { AfterViewInit, Directive, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Directive()
export abstract class TabelaPaginada<model, filtro> implements AfterViewInit {
  paginacao: Paginacao<model, filtro> = new Paginacao<model, filtro>();
  dataSource: MatTableDataSource<model> = new MatTableDataSource<model>();
  displayedColumns: string[] = [];
  filtroPagina!: filtro;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<model>;

  //Metodos que seram implementados dentro classe.
  abstract carregarDados(): void;
  abstract iniciarFiltro(): void;
  abstract editar(dado?: model): void;
  abstract inativar(dado: model): void;
  abstract abrirModalPesquisa(): void;

  //Metodos parti daqui ficaram com logica concentrada nessa classe sendo possivel fazer somente o chamado dela.
  ngAfterViewInit(): void {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacao.paginaAtual = event.pageIndex;
      this.paginacao.tamanhoPagina = event.pageSize;
      this.carregarDados();
    });
  }

  protected atualizouDados(data: Paginacao<model, filtro>): void {
    this.paginacao = data;
    this.paginacaoToPaginator();
    if (data.dados.length > 0) {
      this.dataSource.data = data.dados;
      this.table?.renderRows();
    }
  }
  protected configurarPaginator() {
    this.dataSource.paginator = this.paginator;
  }
  private paginacaoToPaginator() {
    this.paginator.pageIndex = this.paginacao.paginaAtual;
    this.paginator.length = this.paginacao.totalRegistros;
  }
}
