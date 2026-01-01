import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { Menu } from '../model/menu.model';
import { lastValueFrom } from 'rxjs';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { MenuFiltro } from '../model/menu-filtro.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MenuModalEditarCadastrarComponent } from '../component/menu-modal-editar-cadastrar/menu-modal-editar-cadastrar.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private endPoint = '/menu';

  constructor(private api: ApiService, private dialog: MatDialog) {}

  async recuperaMenus(): Promise<Menu[]> {
    let menu: Menu[] = [];
    const observableMenu = this.api.get<Menu[]>(
      this.endPoint + '/recuperaMenus'
    );
    menu = await lastValueFrom(observableMenu);

    return menu;
  }
  listarMenus(paginacao: Paginacao<Menu, MenuFiltro>) {
    return this.api.post<Paginacao<Menu, MenuFiltro>>(
      this.endPoint + '/listarMenus',
      paginacao
    );
  }
  abrirModalCadastro(menu?: Menu) {
    const retDialog = this.dialog.open(MenuModalEditarCadastrarComponent, {
      data: menu,
      panelClass: 'md-large',
    });

    return retDialog.afterClosed();
  }
  salvarMenu(menu: Menu) {
    return this.api.post(this.endPoint + '/salvarMenu', menu);
  }
  updateMenu(menu: Menu) {
    return this.api.put(this.endPoint, menu);
  }
  async carregaCombo() {
    let menu: Menu[] = [];
    const observableMenu = this.api.get<Menu[]>(
      this.endPoint + '/recuperaMenus'
    );
    menu = await lastValueFrom(observableMenu);

    return menu;
  }

  buscarTodosMenus(menu: MenuFiltro) {
    return this.api.post<Menu[]>(this.endPoint + '/obterTodosMenus', menu);
  }
}
