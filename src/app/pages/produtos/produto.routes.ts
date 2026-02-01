import { Routes } from '@angular/router';
import { ProtudosListComponent } from './components/produtos-list/protudos-list/protudos-list.component';
import { ProdutoCadastroComponent } from './components/produtos-cadastro/produto-cadastro/produto-cadastro.component';
import { TpProdutoListComponent } from './components/tp-produto-list/tp-produto-list.component';
import { TabelaPrecoComponent } from './components/TabelaPreco/tabela-preco/tabela-preco.component';

export const ProdutoRoutes: Routes = [
  {
    path: 'Produto',
    component: ProtudosListComponent,
    data: { title: 'Produtos' },
  },
  {
    path: 'Produto/Cadastro',
    component: ProdutoCadastroComponent,
    data: { title: 'Novo Produto' },
  },
  {
    path: 'Produto/Editar',
    component: ProdutoCadastroComponent,
    data: { title: 'Editar Produto' },
  },
  {
    path: 'Produto/TpProduto',
    component: TpProdutoListComponent,
    data: { title: 'Tipos de Produto' },
  },
  {
    path: 'Produto/TabelaPreco',
    component: TabelaPrecoComponent,
    data: { title: 'Tabela Preço' },
  },
];
