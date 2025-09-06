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
  dataSource = new MatTableDataSource<PedidoModel>();
  statusPedido = StatusPedido;
  abrirModalPesquisa() {}
}
