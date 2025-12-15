import { Routes } from '@angular/router';
import { MenuListaComponent } from './component/menu-lista/menu-lista.component';

export const MenuRoutes: Routes = [
  {
    path: 'Menu',
    component: MenuListaComponent,
    data: { title: 'Cadastro de Menus' },
  },
];
