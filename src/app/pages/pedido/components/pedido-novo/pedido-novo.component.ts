import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { PedidoXProdutoModel } from '../../models/pedidoxproduto.model';
import { DialogaddprodutoComponent } from '../dialogaddproduto/dialogaddproduto.component';
import { PedidoModel } from '../../models/pedido.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogFiltroProdutoComponent } from '../../../produtos/components/dialog-filtro-produto/dialog-filtro-produto.component';
import { PesquisaComponent } from '../../../../shared/components/pesquisa/pesquisa.component';
import { ClienteTabela } from '../../../clientes/models/cliente-tabela.model';
import { ClienteFiltro } from '../../../clientes/models/cliente-filtro.model';
import { PesquisaModel } from '../../../../shared/components/pesquisa/model/pesquisa.model';
import { ProdutoService } from '../../../produtos/services/produto.service';
import { Paginacao } from '../../../../core/model/paginacao.mode';
import { ProdutoTabela } from '../../../produtos/models/produto-tabela.model';
import { ProdutoFiltro } from '../../../produtos/models/produtoFiltro.model';
import { CustomPaginator } from '../../../../core/services/Utils/paginator-edit';
import { PedidoService } from '../../service/pedido-service.service';

@Component({
  selector: 'app-pedido-novo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './pedido-novo.component.html',
  styleUrl: './pedido-novo.component.css',
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: CustomPaginator,
    },
  ],
})
export class PedidoNovoComponent implements OnInit {
  //Formularios
  pedidoForm!: FormGroup;
  produtoFiltro!: ProdutoFiltro;
  pedidoModel!: PedidoModel;
  //ColunasTabelas
  displayedColumns = [
    'btnAcao',
    'nome',
    'tipoProduto',
    'marca',
    'qtd',
    'vlrProduto',
  ];
  displayedColumnsPedidoXProduto = [
    'btnAcao',
    'nome',
    'tipoProduto',
    'marca',
    'qtd',
    'vlrProduto',
    'vlrTotal',
  ];
  paginacaoProduto: Paginacao<ProdutoTabela, ProdutoFiltro> = new Paginacao<
    ProdutoTabela,
    ProdutoFiltro
  >();
  paginacaoPedidoXProduto: Paginacao<PedidoXProdutoModel, PedidoXProdutoModel> =
    new Paginacao<PedidoXProdutoModel, PedidoXProdutoModel>();

  produtos = new MatTableDataSource<ProdutoTabela>();

  pedidoXProduto = new MatTableDataSource<PedidoXProdutoModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private serviceProduto: ProdutoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.pedidoForm = new FormGroup({
      id: new FormControl(0),
      cliente: new FormControl(null),
      status: new FormControl(0),
      dthPedido: new FormControl(''),
    });

    this.iniciaFiltro();

    this.carregarTabelaProduto();
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacaoProduto.paginaAtual = event.pageIndex + 1;
      this.paginacaoProduto.tamanhoPagina = event.pageSize;
      this.carregarTabelaProduto();
    });
  }

  addProdutoXPedido(produto: ProdutoTabela) {
    //verefica se existe o produto na lista
    const validaProduto = this.paginacaoPedidoXProduto.dados?.find(
      (p) => p.produto.id === produto.id
    );

    if (!validaProduto) {
      let pedido: PedidoModel = this.pedidoForm.value;

      let pedidoXProduto: PedidoXProdutoModel = {
        id: 0,
        qtd: 0,
        produto: produto,
        valorVenda: 0,
      };

      const retDialog = this.dialog.open(DialogaddprodutoComponent, {
        data: pedidoXProduto,
      });

      retDialog.afterClosed().subscribe((pedidoxProduto) => {
        if (pedidoxProduto) {
          this.paginacaoPedidoXProduto.dados.push(pedidoxProduto);

          this.pedidoXProduto = new MatTableDataSource<PedidoXProdutoModel>(
            this.paginacaoPedidoXProduto.dados
          );

          this.paginacaoProduto.dados = this.paginacaoProduto.dados.filter(
            (p) => p.id !== produto.id
          );

          this.produtos = new MatTableDataSource<ProdutoTabela>(
            this.paginacaoProduto.dados
          );
        }
      });
    }
  }

  removerProdutoXPedido(produto: PedidoXProdutoModel) {
    const validaProduto = this.produtos.data.find(
      (p) => p.id === produto.produto.id
    );
    if (!validaProduto) {
      this.paginacaoProduto.dados.push(produto.produto);

      this.produtos = new MatTableDataSource<ProdutoTabela>(
        this.paginacaoProduto.dados
      );

      this.paginacaoPedidoXProduto.dados =
        this.paginacaoPedidoXProduto.dados.filter((p) => p.id !== produto.id);
      this.pedidoXProduto = new MatTableDataSource<PedidoXProdutoModel>(
        this.paginacaoPedidoXProduto.dados
      );
    }
  }

  salvarPedido() {
    if (
      this.pedidoForm.valid &&
      this.paginacaoPedidoXProduto.dados.length > 0
    ) {
      this.pedidoModel = this.pedidoForm.value;
      this.pedidoModel.clienteId = this.pedidoForm.value?.cliente?.id;
      this.pedidoModel.produtos = this.paginacaoPedidoXProduto.dados;
      this.pedidoModel.dthPedido = new Date();
      this.pedidoService.novoPedido(this.pedidoModel);
    }
  }

  abrirModalPesquisProduto() {
    const dialog = this.dialog.open(DialogFiltroProdutoComponent);
  }
  abrirModalPesquisaCliente() {
    var pesquisaModel: PesquisaModel = {
      urlChamada: '/Cliente/obterClientes',
      tituloPesquisa: 'Selecionar Cliente',
      colunas: ['nome', 'documento'],
      nomeColunas: ['Nome', 'CPF / CNPJ'],
    };
    var retDialog = this.dialog.open(
      PesquisaComponent<ClienteTabela, ClienteFiltro>,
      { data: pesquisaModel, panelClass: `md-large` }
    );
    retDialog.afterClosed().subscribe({
      next: (ret) => {
        this.pedidoForm.value.cliente = ret;
      },
    });
  }

  carregarTabelaProduto() {
    this.paginacaoProduto.filtro = this.produtoFiltro;
    this.serviceProduto.listProduto(this.paginacaoProduto).subscribe({
      next: (ret) => {
        this.paginacaoProduto = ret;
        this.paginacaoToPaginator();
        this.produtos = new MatTableDataSource<ProdutoTabela>(
          this.paginacaoProduto.dados
        );
      },
    });
  }
  private paginacaoToPaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = this.paginacaoProduto.paginaAtual - 1;
      this.paginator.length = this.paginacaoProduto.totalRegistros;
      this.paginator.pageSize = this.paginacaoProduto.tamanhoPagina;
    }
  }
  iniciaFiltro() {
    this.produtoFiltro = {
      nome: ``,
      tipoProdutoId: 0,
      fornecedorId: 0,
      fAtivo: 1,
    };
  }
}
