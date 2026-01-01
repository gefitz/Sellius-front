import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../core/services/Module/shared.module';
import { UsuarioserviceService } from '../../services/usuarioservice.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TpUsuario } from '../../models/tipo-usuario.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Menu } from '../../../menu/model/menu.model';
import { Paginacao } from '../../../../core/model/paginacao.mode';
import { MenuFiltro } from '../../../menu/model/menu-filtro.model';
import { MatPaginator } from '@angular/material/paginator';
import { MenuService } from '../../../menu/services/menu.service';
import { TpUsuarioXMenu } from '../../models/tp-usario-x-menu.model';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'lista-tipo-usuario',
  templateUrl: './cadastro-tipo-usuario.component.html',
  styleUrls: [
    './cadastro-tipo-usuario.component.css',
    '/src/app/shared/styles/modal-styles.css',
  ],
  standalone: true,
  imports: [SharedModule, MatCheckboxModule],
})
export class TpUsuarioCadastroComponent implements OnInit {
  formTpUsuario!: FormGroup;
  tpUsuarioEditar!: TpUsuario;

  //Variaveis para tabela Menu
  displayedColumns: string[] = ['check', 'deMenu', 'menuPai'];
  dataSourceMenu: MatTableDataSource<Menu> = new MatTableDataSource<Menu>();
  menuFiltro!: MenuFiltro;
  listaMenuAdicionado: Menu[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Menu>;

  constructor(
    private service: UsuarioserviceService,
    @Inject(MAT_DIALOG_DATA) public data: TpUsuario,
    private refDialog: DialogRef,
    private menuService: MenuService
  ) {
    this.tpUsuarioEditar = data;
    this.menuFiltro = {
      deMenu: '',
      fAtivo: -1,
    };
  }

  ngOnInit(): void {
    this.preencherForm();
    this.buscarMenus();
  }
  buscarMenus() {
    this.menuService.buscarTodosMenus(this.menuFiltro).subscribe({
      next: (ret) => {
        this.dataSourceMenu = new MatTableDataSource<Menu>(ret);
      },
    });
  }

  preencherForm() {
    if (this.tpUsuarioEditar) {
      this.formTpUsuario = new FormGroup({
        id: new FormControl(this.tpUsuarioEditar.id),
        tpUsuario: new FormControl(
          this.tpUsuarioEditar.tpUsuario,
          Validators.required
        ),
        fAtivo: new FormControl(
          this.tpUsuarioEditar.fAtivo,
          Validators.required
        ),
        flPodeCriar: new FormControl(
          this.tpUsuarioEditar.tpUsuarioConfiguracao &&
          this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeCriar != null
            ? this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeCriar
            : false
        ),
        flPodeExcluir: new FormControl(
          this.tpUsuarioEditar.tpUsuarioConfiguracao &&
          this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeExcluir != null
            ? this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeExcluir
            : false
        ),
        flPodeEditar: new FormControl(
          this.tpUsuarioEditar.tpUsuarioConfiguracao &&
          this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeEditar != null
            ? this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeEditar
            : false
        ),
        flPodeInativar: new FormControl(
          this.tpUsuarioEditar.tpUsuarioConfiguracao &&
          this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeInativar != null
            ? this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeInativar
            : false
        ),
        flPodeAprovar: new FormControl(
          this.tpUsuarioEditar.tpUsuarioConfiguracao &&
          this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeAprovar != null
            ? this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeAprovar
            : false
        ),
        flPodeExportar: new FormControl(
          this.tpUsuarioEditar.tpUsuarioConfiguracao &&
          this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeExportar != null
            ? this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeExportar
            : false
        ),
        flPodeGerenciarUsuarios: new FormControl(
          this.tpUsuarioEditar.tpUsuarioConfiguracao &&
          this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeGerenciarUsuarios !=
            null
            ? this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeGerenciarUsuarios
            : false
        ),
      });
      this.listaMenuAdicionado = this.tpUsuarioEditar.menu;
    } else {
      this.formTpUsuario = new FormGroup({
        id: new FormControl(0),
        tpUsuario: new FormControl('', Validators.required),
        fAtivo: new FormControl(1, Validators.required),
        // flPodeCriar: new FormControl(0),
        // flPodeExcluir: new FormControl(0),
        // flPodeEditar: new FormControl(0),
        // flPodeInativar: new FormControl(0),
        // flPodeAprovar: new FormControl(0),
        // flPodeExportar: new FormControl(0),
        // flPodeGerenciarUsuarios: new FormControl(0),
      });
    }
  }
  submitCadastro() {
    this.montaEnvio();
    if (this.tpUsuarioEditar.id) {
      this.service.updateTpUsuario(this.formTpUsuario.value).subscribe({
        next: (ret) => {
          this.refDialog.close(true);
        },
      });
    } else {
      this.service.salvarTpUsuario(this.formTpUsuario.value).subscribe({
        next: (next) => {
          this.refDialog.close(true);
        },
      });
    }
  }
  adicionarMenu(menu: Menu) {
    if (!this.listaMenuAdicionado.find((m) => m == menu)) {
      this.listaMenuAdicionado.push(menu);
    }
  }
  removerMenu(menu: Menu) {
    if (this.listaMenuAdicionado.find((m) => m == menu)) {
      this.listaMenuAdicionado = this.listaMenuAdicionado.filter(
        (m) => m !== menu
      );
    }
  }
  validarMenuAdicionado(menu: Menu) {
    return (
      this.listaMenuAdicionado &&
      this.listaMenuAdicionado.some((t) => t.id === menu.id)
    );
  }
  montaEnvio() {
    this.tpUsuarioEditar = this.formTpUsuario.value;
    this.tpUsuarioEditar.tpUsuarioConfiguracao = {
      flPodeAprovar: this.formTpUsuario.value.flPodeAprovar,
      flPodeCriar: this.formTpUsuario.value.flPodeAprovar,
      flPodeEditar: this.formTpUsuario.value.flPodeEditar,
      flPodeExcluir: this.formTpUsuario.value.flPodeExcluir,
      flPodeExportar: this.formTpUsuario.value.flPodeExportar,
      flPodeGerenciarUsuarios: this.formTpUsuario.value.flPodeGerenciarUsuarios,
      flPodeInativar: this.formTpUsuario.value.flPodeInativar,
      idTpUsuario: this.tpUsuarioEditar.id,
    };
    this.tpUsuarioEditar.menu = this.listaMenuAdicionado;
  }
}
