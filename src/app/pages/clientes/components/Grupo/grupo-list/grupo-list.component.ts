import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { GrupoModel } from '../../../models/grupo.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInativacaoComponent } from '../../../../../shared/dialog-inativacao/dialog-inativacao.component';
import { GrupoService } from '../../../services/grupo.service';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { GrupoFiltro } from '../../../models/grupo-filtro.model';
import { GrupoTabela } from '../../../models/grupo-tabela.model';
import { GrupoCadastroComponent } from '../grupo-cadastro/grupo-cadastro.component';
import { CustomPaginator } from '../../../../../core/services/Utils/paginator-edit';
import { GrupoFiltroComponent } from '../grupo-filtro/grupo-filtro.component';

@Component({
    selector: 'app-grupo-list',
    imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIcon,
    MatIconModule
],
    providers: [
        {
            provide: MatPaginatorIntl,
            useFactory: CustomPaginator,
        },
    ],
    templateUrl: './grupo-list.component.html',
    styleUrl: './grupo-list.component.css'
})
export class GrupoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'btnEditar',
    'id',
    'nome',
    'fAtivo',
    'dthCriacao',
  ];
  paginacaoGrupo: Paginacao<GrupoTabela, GrupoFiltro> = new Paginacao<
    GrupoTabela,
    GrupoFiltro
  >();
  dataSource!: MatTableDataSource<GrupoTabela>;
  grupoFiltro: GrupoFiltro = {
    nome: '',
    fAtivo: -1,
    empresaId: 0,
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private grupoService: GrupoService,
    public pipe: DatePipe
  ) {}

  ngOnInit() {
    this.carregarFiltro(this.grupoFiltro);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacaoGrupo.paginaAtual = event.pageIndex + 1;
      this.paginacaoGrupo.tamanhoPagina = event.pageSize;
      this.carregarTabela();
    });
  }

  abrirModalCadastro(grupo?: GrupoModel) {
    const retDialog = this.dialog.open(GrupoCadastroComponent, {
      data: grupo,
    });
    retDialog.afterClosed().subscribe({
      next: (ret) => {
        if (ret) {
          this.carregarTabela();
        }
      },
      error: (error) => new Error(error.errorMessage),
    });
  }

  abrirModalPesquisa() {
    var retFiltro = this.dialog.open(GrupoFiltroComponent);
    retFiltro.afterClosed().subscribe({
      next: (ret) => this.carregarFiltro(ret),
    });
  }

  inativarGrupo(grupo: GrupoModel) {
    const dialog = this.dialog.open(DialogInativacaoComponent, {
      data: grupo,
    });
    dialog.afterClosed().subscribe((result) => {
      this.grupoService.inativarGrupo(grupo.id).subscribe({
        next: () => this.carregarTabela(),
      });
    });
  }

  carregarTabela() {
    this.paginacaoGrupo.filtro = this.grupoFiltro;
    this.grupoService.listarGrupos(this.paginacaoGrupo).subscribe({
      next: (ret) => {
        this.paginacaoGrupo = ret;
        this.paginacaoToPaginator();
        this.dataSource = new MatTableDataSource<GrupoTabela>(
          this.paginacaoGrupo.dados
        );
      },
    });
  }

  carregarFiltro(filtro: GrupoFiltro) {
    if (filtro != null) {
      this.grupoFiltro = filtro;
    } else {
      this.grupoFiltro = {
        nome: '',
        fAtivo: -1,
        empresaId: 0,
      };
    }
    this.carregarTabela();
  }

  private paginacaoToPaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = this.paginacaoGrupo.paginaAtual - 1;
      this.paginator.length = this.paginacaoGrupo.totalRegistros;
      this.paginator.pageSize = this.paginacaoGrupo.tamanhoPagina;
    }
  }
}
