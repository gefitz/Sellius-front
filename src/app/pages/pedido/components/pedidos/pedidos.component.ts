import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PedidoModel } from '../../models/pedido.model';
import { StatusPedido } from '../../models/statuspedido.enum';
import { Paginacao } from '../../../../core/model/paginacao.mode';
import { SharedModule } from '../../../../shared/components/Module/shared.module';
import { PedidoService } from '../../service/pedido-service.service';
import { PedidoFiltro } from '../../models/pedido-filtro.model';
import { MatDialog } from '@angular/material/dialog';
import { PedidoNovoComponent } from '../pedido-novo/pedido-novo.component';

@Component({
    selector: 'app-pedidos',
    imports: [SharedModule],
    templateUrl: './pedidos.component.html',
    styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'cliente',
    'produto',
    'status',
    'dthPedido',
  ];
  paginacao: Paginacao<PedidoModel, PedidoFiltro> = new Paginacao<
    PedidoModel,
    PedidoFiltro
  >();
  dataSource = new MatTableDataSource<PedidoModel>();
  statusPedido = StatusPedido;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pedidoService: PedidoService,
    public _pipe: DatePipe,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.carregarFiltro();
    this.carregarTabela();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacao.paginaAtual = event.pageIndex + 1;
      this.paginacao.tamanhoPagina = event.pageSize;
      this.carregarTabela();
    });
  }
  carregarTabela() {
    this.pedidoService.listarPedido(this.paginacao).subscribe({
      next: (ret) => {
        this.paginacao = ret;
        this.paginacaoToPaginator();
        this.dataSource = new MatTableDataSource<PedidoModel>(
          this.paginacao.dados
        );
      },
    });
  }
  carregarFiltro() {
    this.paginacao.filtro = {
      clienteId: 0,
      dthPedido: new Date(),
      usuarioId: 0,
    };
  }
  abrirModalPesquisa() {}
  private paginacaoToPaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = this.paginacao.paginaAtual - 1;
      this.paginator.length = this.paginacao.totalRegistros;
      this.paginator.pageSize = this.paginacao.tamanhoPagina;
    }
  }
  novoPedido() {
    var ret = this.dialog.open(PedidoNovoComponent, {
      panelClass: 'md-large',
    });
    ret.afterClosed().subscribe({
      next: (ret) => {
        this.carregarTabela();
      },
    });
  }
}
