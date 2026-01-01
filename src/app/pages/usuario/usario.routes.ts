import { Routes } from '@angular/router';
import { ListaUsuairoComponent } from './components/lista-usuario/lista-usuario.component';
import { ListaTipoUsuario } from './components/lista-tipo-usuario/lista-tipo-usuario.component';

export const Usuarioroutes: Routes = [
  {
    path: 'Usuario',
    component: ListaUsuairoComponent,
    data: { title: 'Cadastro de Usuario' },
  },
  {
    path: 'Usuario/TpUsuario',
    component: ListaTipoUsuario,
    data: { title: 'Cadastro Tipo de Usuario' },
  },
];
