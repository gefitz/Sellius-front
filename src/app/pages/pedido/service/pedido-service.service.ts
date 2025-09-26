import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { PedidoModel } from '../models/pedido.model';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { PedidoFiltro } from '../models/pedido-filtro.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private endPoint = '/Pedido';
  constructor(private api: ApiService) {}
  novoPedido(pedido: PedidoModel) {
    var url = this.endPoint + '/novoPedido';
    this.api.post(url, pedido).subscribe({
      next: (ret) => {},
    });
  }
  listarPedido(pedido: Paginacao<PedidoModel, PedidoFiltro>) {
    var url = this.endPoint + '/obterTodosPedidos';
    return this.api.post<Paginacao<PedidoModel, PedidoFiltro>>(url, pedido);
  }
}
