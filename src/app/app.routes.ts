import { Routes } from '@angular/router';
import { ClienteRoutes } from './pages/clientes/cliente.routes';
import { ProdutoRoutes } from './pages/produtos/produto.routes';
import { PedidoRoutes } from './pages/pedido/pedido.routes';
import { SidenavComponent } from './shared/sidenav/component/sidenav/sidenav.component';
import { AuthenticationComponent } from './shared/authentication/authentication.component';
import { LoginComponent } from './pages/login/components/login/login.component';
import { Usuarioroutes } from './pages/usuario/usario.routes';
import { Empresaroutes } from './pages/empresa/empresa.route';
import { FornecedorRoutes } from './pages/fornecedores/fornecedor.route';
import { AuthGuardService } from './core/services/AuthGuard/auth-guard.service';
import { MenuRoutes } from './pages/menu/menu.route';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      ...ClienteRoutes,
      ...ProdutoRoutes,
      ...PedidoRoutes,
      ...Usuarioroutes,
      ...FornecedorRoutes,
      ...MenuRoutes,
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: 'Login',
        component: LoginComponent,
        data: { title: 'Entrar / Login no Sistema' },
      },
      ...Empresaroutes,
    ],
  },
  { path: '**', redirectTo: 'Login' },
];
