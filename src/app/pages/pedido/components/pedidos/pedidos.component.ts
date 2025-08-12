import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PedidoModel } from '../../models/pedido.model';
import { ClienteModel } from '../../../clientes/models/cliente.model';
import { ProdutoModel } from '../../../produtos/models/produto.model';
import { StatusPedido } from '../../models/statuspedido.enum';
import { EstadoModel } from '../../../../core/model/estado.model';
import { CidadeModel } from '../../../../core/model/cidade.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent {
  displayedColumns: string[] = [
    'id',
    'cliente',
    'produto',
    'status',
    'dthPedido',
  ];
  dataSource = new MatTableDataSource<PedidoModel>(pedido);
  statusPedido = StatusPedido;
  abrirModalPesquisa() {}
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
var cliente: ClienteModel = {
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
};
const pedido: PedidoModel[] = [
  {
    id: 1,
    status: 1,
    cliente: cliente,
    // produtos: produto,
    dthPedido: new Date(),
  },
];
