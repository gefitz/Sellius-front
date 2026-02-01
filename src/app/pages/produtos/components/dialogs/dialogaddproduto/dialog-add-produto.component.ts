import { Component, inject, Inject, model, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PedidoXProdutoModel } from '../../../../pedido/models/pedidoxproduto.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from '../../../../../core/services/Utils/paginator-edit';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { ProdutoTabela } from '../../../models/produto-tabela.model';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { ProdutoFiltro } from '../../../models/produtoFiltro.model';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ProdutoService } from '../../../services/produto.service';

@Component({
    selector: 'app-dialog-add-produto',
    imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    SharedModule
],
    templateUrl: './dialog-add-produto.component.html',
    styleUrls: [
        './dialog-add-produto.component.css',
        '/src/app/shared/styles/modal-styles.css',
    ],
    providers: [
        {
            provide: MatPaginatorIntl,
            useFactory: CustomPaginator,
        },
    ]
})
export class DialogaddprodutoComponent {
  pedidoXProdutoForm!: FormGroup;
  paginacaoProduto: Paginacao<ProdutoTabela, ProdutoFiltro> = new Paginacao<
    ProdutoTabela,
    ProdutoFiltro
  >();
  produtoFiltro!: ProdutoFiltro;
  dataSourceProduto = new MatTableDataSource<ProdutoTabela>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly dialog = inject(MatDialogRef<DialogaddprodutoComponent>);

  displayedColumnsProduto = [
    'btnAcao',
    'nome',
    'tipoProduto',
    'marca',
    'qtd',
    'valor',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PedidoXProdutoModel,
    private serviceProduto: ProdutoService
  ) {
    this.carregFiltro();
  }
  add(produto: ProdutoTabela) {
    if (this.pedidoXProdutoForm.valid) {
      this.data.qtd = this.pedidoXProdutoForm.value.qtdProduto;
      this.data.valorVenda = this.pedidoXProdutoForm.value.vlrProduto;
      this.dialog.close(this.data);
    }
  }
  carregFiltro(filtro?: ProdutoFiltro) {
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

  async carregarProduto() {
    this.paginacaoProduto.filtro = this.produtoFiltro;
    this.serviceProduto.listProduto(this.paginacaoProduto).subscribe({
      next: (ret) => {
        this.paginacaoProduto = ret;
        this.paginacaoToPaginator();
        this.dataSourceProduto = new MatTableDataSource<ProdutoTabela>(
          this.paginacaoProduto.dados
        );
      },
    });
  }
  private paginacaoToPaginator() {
    this.paginator.pageIndex = this.paginacaoProduto.paginaAtual - 1;
    this.paginator.length = this.paginacaoProduto.totalRegistros;
  }
  salvar() {}
}
