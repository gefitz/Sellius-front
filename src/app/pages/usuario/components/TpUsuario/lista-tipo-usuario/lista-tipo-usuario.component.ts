import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UsuarioserviceService } from '../../../services/usuarioservice.service';
import { DatePipe } from '@angular/common';
import { TpUsuario } from '../../../models/tipo-usuario.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { tpUsuairoFiltro } from '../../../models/tp-usuario-filtro.model';
import { TpUsuarioService } from '../../../services/tp-usuario.service';

@Component({
    selector: 'lista-tipo-usuario',
    templateUrl: './lista-tipo-usuario.component.html',
    styleUrls: ['./lista-tipo-usuario.component.css'],
    imports: [SharedModule]
})
export class ListaTipoUsuario implements OnInit {
  displayedColumns: string[] = [
    'btnEditar',
    'fAtivo',
    'tpUsuario',
    'dtCadastro',
    'dtAlteracao',
  ];
  paginacaoTpUsuario: Paginacao<TpUsuario, tpUsuairoFiltro> = new Paginacao<
    TpUsuario,
    tpUsuairoFiltro
  >();
  dataSource: MatTableDataSource<TpUsuario> =
    new MatTableDataSource<TpUsuario>();
  filtroTpUsuario!: tpUsuairoFiltro;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<TpUsuario>;

  constructor(private service: TpUsuarioService, public _pipe: DatePipe) {}
  ngOnInit(): void {
    this.carregarFiltro();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacaoTpUsuario.paginaAtual = event.pageIndex;
      this.paginacaoTpUsuario.tamanhoPagina = event.pageSize;
      this.carregarTpUsuario();
    });
  }
  carregarFiltro(tpUsuairoFiltro?: tpUsuairoFiltro) {
    if (tpUsuairoFiltro) {
      this.filtroTpUsuario = {
        tpUsuario: tpUsuairoFiltro.tpUsuario,
        fAtivo: tpUsuairoFiltro.fAtivo,
      };
    } else {
      this.filtroTpUsuario = {
        tpUsuario: '',
        fAtivo: -1,
      };
    }
    this.carregarTpUsuario();
  }

  carregarTpUsuario() {
    this.paginacaoTpUsuario.filtro = this.filtroTpUsuario;
    this.service.listarMenus(this.paginacaoTpUsuario).subscribe({
      next: (ret) => {
        // this.paginacaoMenu = ret;
        this.paginacaoTpUsuario.totalRegistros = ret.totalRegistros;
        this.paginacaoTpUsuario.totalPaginas = ret.totalPaginas;
        this.paginacaoTpUsuario.tamanhoPagina = ret.tamanhoPagina;
        this.paginacaoTpUsuario.paginaAtual = ret.paginaAtual;
        this.paginacaoTpUsuario.dados = ret.dados;
        this.dataSource.data = this.paginacaoTpUsuario.dados;
        this.paginacaoToPaginator();
        this.table.renderRows();
        // this.dataSource = new MatTableDataSource<Menu>(
        //   this.paginacaoMenu.dados
        // );
      },
    });
  }
  private paginacaoToPaginator() {
    this.paginator.pageIndex = this.paginacaoTpUsuario.paginaAtual;
    this.paginator.length = this.paginacaoTpUsuario.totalRegistros;
  }
  editarTipoUsuario(tipoUsuario?: TpUsuario) {
    this.service.abrirModalCadastroTpUsuario(tipoUsuario).subscribe({
      next: (ret) => {
        if (ret) {
          this.carregarTpUsuario();
        }
      },
    });
  }
  inativarTipoUsuario(tipoUsuario: TpUsuario) {
    this.service
      .inativarTpUsuario(tipoUsuario)
      .subscribe(() => this.carregarFiltro());
  }
  abrirModalPesquisa() {
    this.service.abrirModalPesquisaTpUsuario(this.filtroTpUsuario).subscribe({
      next: (ret: TpUsuario | null | undefined) => {
        console.log('Valor retornado da dialog:', ret); // ← veja aqui

        if (ret) {
          // só se for um objeto válido
          this.filtroTpUsuario = ret; // atualiza o filtro atual
          this.carregarFiltro(ret);
        } else {
          console.log('Modal fechado sem aplicar filtro');
          // não faz nada, ou reseta o filtro se quiser
        }
      },
    });
  }
}
