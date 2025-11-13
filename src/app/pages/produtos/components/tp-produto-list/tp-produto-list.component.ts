import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { TpProdutoModel } from '../../models/tpProduto.model';
import { ProdutoService } from '../../services/produto.service';
import { Paginacao } from '../../../../core/model/paginacao.mode';
import { CustomPaginator } from '../../../../core/services/Utils/paginator-edit';
import { MatDialog } from '@angular/material/dialog';
import { TpProdutoCadastroComponent } from '../tp-produto-cadastro/tp-produto-cadastro.component';
import { error } from 'console';
import { TpProdutoService } from '../../services/tp-produto.service';
import { DialogInativacaoComponent } from '../../../../shared/dialog-inativacao/dialog-inativacao.component';

@Component({
  selector: 'app-tp-produto-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: CustomPaginator,
    },
  ],
  templateUrl: './tp-produto-list.component.html',
  styleUrl: './tp-produto-list.component.css',
})
export class TpProdutoListComponent implements OnInit {
  displayedColumns: string[] = [
    'btnEditar',
    'id',
    'tipo',
    'descricao',
    'fAtivo',
    'dthCadastro',
  ];
  paginacaoProduto: Paginacao<TpProdutoModel, TpProdutoModel> = new Paginacao<
    TpProdutoModel,
    TpProdutoModel
  >();
  dataSource!: MatTableDataSource<TpProdutoModel>;
  tpProdutoFiltro!: TpProdutoModel;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private service: TpProdutoService,
    public pipe: DatePipe,
    private dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.carregaFiltro(this.tpProdutoFiltro);
    this.carregarTabela();
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacaoProduto.paginaAtual = event.pageIndex++;
      this.paginacaoProduto.tamanhoPagina = event.pageSize;
      this.carregarTabela();
    });
  }
  inativarProduto(tp: TpProdutoModel) {
    const retDialog = this.dialog.open(DialogInativacaoComponent);
    retDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.service.inativarTpProduto(tp).subscribe({
          next: (ret) => {
            if (ret) {
              this.carregarTabela();
            }
          },
        });
      }
    });
  }
  abrirModalPesquisa() {}
  carregarTabela() {
    this.paginacaoProduto.filtro = this.tpProdutoFiltro;
    this.service.buscarTpProduto(this.paginacaoProduto).subscribe({
      next: (ret) => {
        this.paginacaoProduto = ret;
        this.paginacaoToPaginator();
        this.dataSource = new MatTableDataSource<TpProdutoModel>(
          this.paginacaoProduto.dados
        );
      },
    });
  }
  abrirModalCadastro(tpPoduto?: TpProdutoModel) {
    const retDialog = this.dialog.open(TpProdutoCadastroComponent, {
      width: '90vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: tpPoduto,
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
  private paginatorToPaginacao() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacaoProduto.paginaAtual = event.pageIndex++;
      this.paginacaoProduto.tamanhoPagina = event.pageSize;
      this.carregarTabela();
    });
  }
  private paginacaoToPaginator() {
    this.paginator.pageIndex = this.paginacaoProduto.paginaAtual - 1;
    this.paginator.length = this.paginacaoProduto.totalRegistros;
  }
  private carregaFiltro(filtro: TpProdutoModel): TpProdutoModel {
    if (filtro != null) {
      this.tpProdutoFiltro = filtro;
    } else {
      this.tpProdutoFiltro = {
        descricao: '',
        tipo: '',
        id: 0,
        fAtivo: -1,
      };
    }
    return this.tpProdutoFiltro;
  }
}
