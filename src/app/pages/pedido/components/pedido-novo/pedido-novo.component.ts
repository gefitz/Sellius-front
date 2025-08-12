import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ClienteModel } from '../../../clientes/models/cliente.model';
import { CidadeModel } from '../../../../core/model/cidade.model';
import { EstadoModel } from '../../../../core/model/estado.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProdutoModel } from '../../../produtos/models/produto.model';
import { PedidoXProdutoModel } from '../../models/pedidoxproduto.model';
import { Dialog } from '@angular/cdk/dialog';
import { DialogaddprodutoComponent } from '../dialogaddproduto/dialogaddproduto.component';
import { PedidoModel } from '../../models/pedido.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogFiltroProdutoComponent } from '../../../produtos/components/dialog-filtro-produto/dialog-filtro-produto.component';

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
})
export class PedidoNovoComponent {
  pedidoForm: FormGroup;
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
  novoPedidoXProduto: PedidoXProdutoModel[] = [];
  produtos = new MatTableDataSource<ProdutoModel>();
  pedidoXProduto = new MatTableDataSource<PedidoXProdutoModel>(
    this.novoPedidoXProduto
  );

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  cliente: ClienteModel[] = [
    {
      id: 0,
      nome: 'string',
      razao: 'string',
      cpf_cnpj: 'string',
      telefone: 'string',
      email: 'string',
      cidade: cidade,
      rua: 'string',
      cep: 'string',
      fAtivo: 1,
      dthCadastro: new Date(),
      dthAlteracao: new Date(),
    },
  ];
  constructor(private dialog: MatDialog) {
    this.pedidoForm = new FormGroup({
      id: new FormControl(''),
      cliente: new FormControl(null),
      status: new FormControl(''),
      dthPedido: new FormControl(''),
    });
  }

  addProdutoXPedido(produto: ProdutoModel) {
    //verefica se existe o produto na lista
    const validaProduto = this.novoPedidoXProduto.find(
      (p) => p.produto.id === produto.id
    );
    if (!validaProduto) {
      let pedido: PedidoModel = this.pedidoForm.value;
      let pedidoXProduto: PedidoXProdutoModel = {
        id: 0,
        qtdProduto: 0,
        pedido: pedido,
        produto: produto,
        vlrProduto: 0,
      };
      const retDialog = this.dialog.open(DialogaddprodutoComponent, {
        data: pedidoXProduto,
      });
      // retDialog.afterClosed().subscribe((pedidoxProduto) => {
      //   if (pedidoxProduto) {
      //     this.novoPedidoXProduto.push(pedidoxProduto);
      //     this.pedidoXProduto = new MatTableDataSource<PedidoXProdutoModel>(
      //       this.novoPedidoXProduto
      //     );
      //     produtos = produtos.filter((p) => p.id !== produto.id);
      //     this.produtos = new MatTableDataSource<ProdutoModel>(produtos);
      //   }
      // });
    }
  }

  removerProdutoXPedido(produto: PedidoXProdutoModel) {
    // const validaProduto = produtos.find((p) => p.id === produto.produto.id);
    // if (!validaProduto) {
    //   produtos.push(produto.produto);
    //   this.produtos = new MatTableDataSource<ProdutoModel>(produtos);
    //   this.novoPedidoXProduto = this.novoPedidoXProduto.filter(
    //     (p) => p.id !== produto.id
    //   );
    //   this.pedidoXProduto = new MatTableDataSource<PedidoXProdutoModel>(
    //     this.novoPedidoXProduto
    //   );
    // }
  }
  salvarPedido() {}

  abrirModalPesquisProduto() {
    const dialog = this.dialog.open(DialogFiltroProdutoComponent);
  }
}

const estado: EstadoModel = {
  id: 1,
  estado: 'Parana',
  sigla: 'PR',
};
const cidade: CidadeModel = {
  id: 1,
  cidade: 'Colombo',
  estado: estado,
};
