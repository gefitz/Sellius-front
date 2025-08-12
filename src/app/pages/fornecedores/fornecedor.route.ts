import { Routes } from '@angular/router';
import { FornecedorCadastroComponent } from './component/fornecedor-cadastro/fornecedor-cadastro.component';
import { FornecedorListaComponent } from './component/fornecedor-lista/fornecedor-lista.component';

export const FornecedorRoutes: Routes = [
  {
    path: 'Fornecedor',
    component: FornecedorListaComponent,
    data: { title: 'Fornecedores' },
  },
];
