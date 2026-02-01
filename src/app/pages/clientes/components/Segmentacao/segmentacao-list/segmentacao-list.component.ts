import { CommonModule, DatePipe } from '@angular/common';
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
import { SegmentacaoModel } from '../../../models/segmentacao.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInativacaoComponent } from '../../../../../shared/dialog-inativacao/dialog-inativacao.component';
import { SegmentacaoService } from '../../../services/segmentacao.service';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { SegmentacaoFiltro } from '../../../models/segmentacao-filtro.model';
import { SegmentacaoTabela } from '../../../models/segmentacao-tabela.model';
import { SegmentacaoCadastroComponent } from '../segmentacao-cadastro/segmentacao-cadastro.component';
import { CustomPaginator } from '../../../../../core/services/Utils/paginator-edit';
import { DialogFiltroSegmentacaoComponent } from '../dialog-filtro-segmentacao/dialog-filtro-segmentacao.component';

@Component({
    selector: 'app-segmentacao-list',
    imports: [
        MatPaginatorModule,
        MatTableModule,
        MatButtonModule,
        MatIcon,
        MatIconModule,
        CommonModule,
    ],
    providers: [
        {
            provide: MatPaginatorIntl,
            useFactory: CustomPaginator,
        },
    ],
    templateUrl: './segmentacao-list.component.html',
    styleUrl: './segmentacao-list.component.css'
})
export class SegmentacaoListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'btnEditar',
    'id',
    'segmento',
    'fAtivo',
    'dthCriacao',
  ];
  paginacaoSegmentacao: Paginacao<SegmentacaoTabela, SegmentacaoFiltro> =
    new Paginacao<SegmentacaoTabela, SegmentacaoFiltro>();
  dataSource!: MatTableDataSource<SegmentacaoTabela>;
  segmentacaoFiltro: SegmentacaoFiltro = {
    segmento: '',
    fAtivo: -1,
    empresaId: 0,
  };

  filtro!: SegmentacaoFiltro;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private segmentacaoService: SegmentacaoService,
    public pipe: DatePipe
  ) {}

  ngOnInit() {
    this.carregarFiltro(this.segmentacaoFiltro);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacaoSegmentacao.paginaAtual = event.pageIndex + 1;
      this.paginacaoSegmentacao.tamanhoPagina = event.pageSize;
      this.carregarTabela();
    });
  }

  abrirModalCadastro(segmentacao?: SegmentacaoModel) {
    const retDialog = this.dialog.open(SegmentacaoCadastroComponent, {
      data: segmentacao,
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
    const retDialog = this.dialog.open(DialogFiltroSegmentacaoComponent);
    retDialog.afterClosed().subscribe({
      next: (ret) => {
        this.filtro = ret;
      },
    });
  }

  inativarSegmentacao(segmentacao: SegmentacaoModel) {
    const dialog = this.dialog.open(DialogInativacaoComponent, {
      data: segmentacao,
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.segmentacaoService.inativarSegmentacao(segmentacao.id).subscribe({
          next: () => this.carregarTabela(),
        });
      }
    });
  }

  carregarTabela() {
    this.paginacaoSegmentacao.filtro = this.segmentacaoFiltro;
    this.segmentacaoService
      .listarSegmentacoes(this.paginacaoSegmentacao)
      .subscribe({
        next: (ret) => {
          this.paginacaoSegmentacao = ret;
          this.paginacaoToPaginator();
          this.dataSource = new MatTableDataSource<SegmentacaoTabela>(
            this.paginacaoSegmentacao.dados
          );
        },
      });
  }

  carregarFiltro(filtro: SegmentacaoFiltro) {
    if (filtro != null) {
      this.segmentacaoFiltro = filtro;
    } else {
      this.segmentacaoFiltro = {
        segmento: '',
        fAtivo: -1,
        empresaId: 0,
      };
    }
    this.carregarTabela();
  }

  private paginacaoToPaginator() {
    this.paginator.pageIndex = this.paginacaoSegmentacao.paginaAtual - 1;
    this.paginator.length = this.paginacaoSegmentacao.totalRegistros;
    this.paginator.pageSize = this.paginacaoSegmentacao.tamanhoPagina;
  }
}
