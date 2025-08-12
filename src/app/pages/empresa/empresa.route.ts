import { Routes } from '@angular/router';
import { EmpresaCadastroComponent } from './components/empresa-cadastro/empresa-cadastro.component';

export const Empresaroutes: Routes = [
  {
    path: 'Cadastro',
    component: EmpresaCadastroComponent,
    data: { title: 'Cria Conta' },
  },
];
