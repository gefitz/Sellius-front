import { Component, Inject, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/components/Module/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { url } from 'inspector';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
    selector: 'app-menu-modal-editar-cadastrar',
    imports: [SharedModule],
    templateUrl: './menu-modal-editar-cadastrar.component.html',
    styleUrls: [
        '/src/app/shared/styles/modal-styles.css',
        './menu-modal-editar-cadastrar.component.css',
    ]
})
export class MenuModalEditarCadastrarComponent implements OnInit {
  MenuForm!: FormGroup;
  listaMenus: Menu[] = [];
  constructor(
    private service: MenuService,
    @Inject(MAT_DIALOG_DATA) private menuEditar: Menu,
    private dialogRef: DialogRef<MenuModalEditarCadastrarComponent>
  ) {}
  ngOnInit(): void {
    this.preencherCamposFormulario(this.menuEditar);
    this.carregaCombo();
  }
  preencherCamposFormulario(menuEditar: Menu) {
    if (menuEditar) {
      this.MenuForm = new FormGroup({
        id: new FormControl(menuEditar.id),
        deMenu: new FormControl(menuEditar.deMenu, Validators.required),
        urlMenu: new FormControl(menuEditar.urlMenu),
        icone: new FormControl(menuEditar.icone, Validators.required),
        idMenuPai: new FormControl(menuEditar.idMenuPai),
        fMenuExclusivo: new FormControl(
          menuEditar.fMenuExclusivo,
          Validators.required
        ),
        fAtivo: new FormControl(menuEditar.fAtivo, Validators.required),
        dtCadastro: new FormControl(menuEditar.dtCadastro),
        dtAtualizacao: new FormControl(menuEditar.dtAtualizacao),
        idEmpresa: new FormControl(menuEditar.idEmpresa),
      });
    } else {
      this.MenuForm = new FormGroup({
        id: new FormControl(0),
        deMenu: new FormControl(``, Validators.required),
        urlMenu: new FormControl(``),
        icone: new FormControl(``, Validators.required),
        idMenuPai: new FormControl(0),
        fMenuExclusivo: new FormControl(0, Validators.required),
        fAtivo: new FormControl(1, Validators.required),
        dtCadastro: new FormControl(new Date()),
        dtAtualizacao: new FormControl(new Date()),
        idEmpresa: new FormControl(0),
      });
    }
  }

  salvarProduto() {
    if (this.menuEditar && this.menuEditar.id) {
      this.service.updateMenu(this.MenuForm.value).subscribe({
        next: (ret) => {
          this, this.dialogRef.close();
        },
      });
    } else {
      this.service.salvarMenu(this.MenuForm.value).subscribe({
        next: (ret) => {
          this.dialogRef.close();
        },
      });
    }
  }

  async carregaCombo() {
    this.listaMenus = await this.service.carregaCombo();
  }
}
