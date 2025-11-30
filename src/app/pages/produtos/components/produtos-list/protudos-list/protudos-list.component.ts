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
import { Router } from '@angular/router';
import { ProdutoModel } from '../../../models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogInativarProdutoComponent } from '../../dialogs/dialog-inativar-produto/dialog-inativar-produto.component';
import { CommonModule, DatePipe } from '@angular/common';
import { EtiquetaComponent } from '../../etiqueta/etiqueta.component';
import { EtiquetaModel } from '../../../models/etiqueta.model';
import { ProdutoService } from '../../../services/produto.service';
import { ProdutoFiltro } from '../../../models/produtoFiltro.model';
import { CustomPaginator } from '../../../../../core/services/Utils/paginator-edit';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { ProdutoTabela } from '../../../models/produto-tabela.model';
import { ProdutoModalService } from '../../../services/produto-modal.service';
import { DialogFiltroProdutoComponent } from '../../dialogs/dialog-filtro-produto/dialog-filtro-produto.component';
@Component({
  selector: 'app-protudos-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIcon,
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
  templateUrl: './protudos-list.component.html',
  styleUrls: [
    './protudos-list.component.css',
    '/src/app/shared/styles/modal-styles.css',
  ],
})
export class ProtudosListComponent implements OnInit {
  displayedColumns: string[] = [
    'btnEditar',
    'fAtivo',
    'nome',
    'tipoProduto',
    'descricao',
    'marca',
    'qtd',
    'dthCadastro',
  ];
  paginacaoProduto: Paginacao<ProdutoTabela, ProdutoFiltro> = new Paginacao<
    ProdutoTabela,
    ProdutoFiltro
  >();
  dataSource!: MatTableDataSource<ProdutoTabela>;
  produtoFiltro!: ProdutoFiltro;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  _pipe: DatePipe;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: ProdutoService,
    private pipe: DatePipe,
    private modalProduto: ProdutoModalService
  ) {
    this._pipe = pipe;
  }
  ngOnInit() {
    this.carregFiltro(this.produtoFiltro);
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      if (event.pageIndex > this.paginacaoProduto.paginaAtual) {
        this.paginacaoProduto.paginaAtual = event.pageIndex++;
      } else {
        this.paginacaoProduto.paginaAtual = event.pageIndex--;
      }
      this.paginacaoProduto.tamanhoPagina = event.pageSize;
      this.carregFiltro(this.produtoFiltro);
    });
  }

  editarProduto(produto?: ProdutoModel) {
    this.modalProduto.abrirModalCadastro(produto);
  }
  abrirModalPesquisa() {
    const dialog = this.dialog.open(DialogFiltroProdutoComponent);

    dialog.afterClosed().subscribe((result) => {
      //adicionar o metodo que carrega a tabela com parametros do filtro
      if (result) {
        this.produtoFiltro = result;
      }
    });
  }
  inativarProduto(produto: ProdutoModel) {
    const dialog = this.dialog.open(DialogInativarProdutoComponent, {
      data: produto,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.service.inativarProduto(produto).subscribe({
          next: () => this.carregFiltro(this.produtoFiltro),
        });
      }
    });
  }
  imprimirEtiqueta(produto: ProdutoModel) {
    const etiqueta: EtiquetaModel = {
      nomeProduto: produto.nome,
      codigo: 'asdasd',
      preco: 1.5,
    };
    this.dialog.open(EtiquetaComponent, {
      data: etiqueta,
    });
  }
  async carregarProduto() {
    this.paginacaoProduto.filtro = this.produtoFiltro;
    this.service.listProduto(this.paginacaoProduto).subscribe({
      next: (ret) => {
        this.paginacaoProduto = ret;
        this.paginacaoToPaginator();
        this.dataSource = new MatTableDataSource<ProdutoTabela>(
          this.paginacaoProduto.dados
        );
      },
    });
  }
  carregFiltro(filtro: ProdutoFiltro) {
    if (filtro != null) {
      this.produtoFiltro = filtro;
    } else {
      this.produtoFiltro = {
        nome: ``,
        tipoProdutoId: 0,
        fornecedorId: 0,
        fAtivo: -1,
      };
    }
    this.carregarProduto();
  }
  private paginacaoToPaginator() {
    this.paginator.pageIndex = this.paginacaoProduto.paginaAtual - 1;
    this.paginator.length = this.paginacaoProduto.totalRegistros;
  }
}
