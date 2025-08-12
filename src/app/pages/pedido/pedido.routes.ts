import { Routes } from "@angular/router";
import { PedidosComponent } from "./components/pedidos/pedidos.component";
import { PedidoNovoComponent } from "./components/pedido-novo/pedido-novo.component";
export const PedidoRoutes: Routes = [
{
  path:"Pedido",
  component:PedidosComponent,
  data:{title:"Pedidos"}
},
{
  path:"Pedido/Novo",
  component:PedidoNovoComponent,
  data:{title:"Novo Pedido"}
},
]
