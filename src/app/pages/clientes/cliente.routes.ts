import { Routes } from '@angular/router';
import { SegmentacaoListComponent } from './components/Segmentacao/segmentacao-list/segmentacao-list.component';
import { GrupoListComponent } from './components/Grupo/grupo-list/grupo-list.component';
import { ClientesListComponent } from './components/Clientes/clientes-list/clientes-list.component';

export const ClienteRoutes: Routes = [
  {
    path: 'Cliente',
    component: ClientesListComponent,
    data: { title: 'Clientes' },
  },
  {
    path: 'Segmentacao',
    component: SegmentacaoListComponent,
    data: { title: 'Segmentações' },
  },
  {
    path: 'Grupo',
    component: GrupoListComponent,
    data: { title: 'Grupo de Cliente' },
  },
];
