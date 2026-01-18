import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Menu } from '../../model/menu.model';
import { MenuModalEditarCadastrarComponent } from '../menu-modal-editar-cadastrar/menu-modal-editar-cadastrar.component';
import { SharedModule } from '../../../../shared/components/Module/shared.module';
import { MenuService } from '../../services/menu.service';
import { Paginacao } from '../../../../core/model/paginacao.mode';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MenuFiltro } from '../../model/menu-filtro.model';
import { CustomPaginator } from '../../../../core/services/Utils/paginator-edit';

@Component({
  selector: 'app-menu-lista',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './menu-lista.component.html',
  styleUrl: './menu-lista.component.css',
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: CustomPaginator,
    },
  ],
})
export class MenuListaComponent implements OnInit {
  displayedColumns: string[] = [
    'btnEditar',
    'id',
    'fAtivo',
    'deMenu',
    'url',
    'idMenuPai',
    'dtCadastro',
    'dtAtualizacao',
  ];
  paginacaoMenu: Paginacao<Menu, MenuFiltro> = new Paginacao<
    Menu,
    MenuFiltro
  >();
  dataSource: MatTableDataSource<Menu> = new MatTableDataSource<Menu>();
  menuFiltro!: MenuFiltro;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Menu>;

  constructor(
    public _pipe: DatePipe,
    private dialog: MatDialog,
    private serviceMenu: MenuService
  ) {}
  ngOnInit(): void {
    this.carregFiltro(this.menuFiltro);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacaoMenu.paginaAtual = event.pageIndex;
      this.paginacaoMenu.tamanhoPagina = event.pageSize;
      this.carregFiltro(this.menuFiltro);
    });
  }

  carregFiltro(filtro: MenuFiltro) {
    if (filtro != null) {
      this.menuFiltro = filtro;
    } else {
      this.menuFiltro = {
        deMenu: ``,
        fAtivo: -1,
      };
    }
    this.carregarMenu();
  }
  async carregarMenu() {
    this.paginacaoMenu.filtro = this.menuFiltro;
    this.serviceMenu.listarMenus(this.paginacaoMenu).subscribe({
      next: (ret) => {
        // this.paginacaoMenu = ret;
        this.paginacaoMenu.totalRegistros = ret.totalRegistros;
        this.paginacaoMenu.totalPaginas = ret.totalPaginas;
        this.paginacaoMenu.tamanhoPagina = ret.tamanhoPagina;
        this.paginacaoMenu.paginaAtual = ret.paginaAtual;
        this.paginacaoMenu.dados = ret.dados;
        this.dataSource.data = this.paginacaoMenu.dados;
        this.paginacaoToPaginator();
        this.table.renderRows();
        // this.dataSource = new MatTableDataSource<Menu>(
        //   this.paginacaoMenu.dados
        // );
      },
    });
  }
  private paginacaoToPaginator() {
    this.paginator.pageIndex = this.paginacaoMenu.paginaAtual;
    this.paginator.length = this.paginacaoMenu.totalRegistros;
  }
  editarMenu(menu?: Menu) {
    this.serviceMenu.abrirModalCadastro(menu).subscribe({
      next: (ret) => {
        this.carregFiltro(this.menuFiltro);
      },
    });
  }

  abrirModalPesquisa() {}

  inativarMenu(menu: Menu) {}
}
