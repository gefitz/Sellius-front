import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { UsuarioserviceService } from '../../../services/usuarioservice.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TpUsuario } from '../../../models/tipo-usuario.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Menu } from '../../../../menu/model/menu.model';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { MenuFiltro } from '../../../../menu/model/menu-filtro.model';
import { MatPaginator } from '@angular/material/paginator';
import { MenuService } from '../../../../menu/services/menu.service';
import { TpUsuarioXMenu } from '../../../models/tp-usario-x-menu.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TpUsuarioService } from '../../../services/tp-usuario.service';

@Component({
  selector: 'lista-tipo-usuario',
  templateUrl: './cadastro-tipo-usuario.component.html',
  styleUrls: ['./cadastro-tipo-usuario.component.css'],
  imports: [SharedModule, MatCheckboxModule],
  standalone: true,
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
    private service: TpUsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: TpUsuario,
    private refDialog: DialogRef,
    private menuService: MenuService,
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
    setTimeout(() => {
      if (this.tpUsuarioEditar) {
        this.formTpUsuario = new FormGroup({
          id: new FormControl(this.tpUsuarioEditar.id),
          tpUsuario: new FormControl(
            this.tpUsuarioEditar.tpUsuario,
            Validators.required,
          ),
          fAtivo: new FormControl(
            this.tpUsuarioEditar.fAtivo,
            Validators.required,
          ),
          flPodeCriar: new FormControl(
            this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeCriar,
          ),
          flPodeExcluir: new FormControl(
            this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeExcluir,
          ),
          flPodeEditar: new FormControl(
            this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeEditar,
          ),
          flPodeInativar: new FormControl(
            this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeInativar,
          ),
          flPodeAprovar: new FormControl(
            this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeAprovar,
          ),
          flPodeExportar: new FormControl(
            this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeExportar,
          ),
          flPodeGerenciarUsuarios: new FormControl(
            this.tpUsuarioEditar.tpUsuarioConfiguracao.flPodeGerenciarUsuarios,
          ),
        });
        this.listaMenuAdicionado = this.tpUsuarioEditar.menu;
      } else {
        this.formTpUsuario = new FormGroup({
          id: new FormControl(0),
          tpUsuario: new FormControl('', Validators.required),
          fAtivo: new FormControl(1, Validators.required),
          flPodeCriar: new FormControl(false),
          flPodeExcluir: new FormControl(false),
          flPodeEditar: new FormControl(false),
          flPodeInativar: new FormControl(false),
          flPodeAprovar: new FormControl(false),
          flPodeExportar: new FormControl(false),
          flPodeGerenciarUsuarios: new FormControl(false),
        });
      }
    }, 0);
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
        (m) => m !== menu,
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
      flPodeCriar: this.formTpUsuario.value.flPodeCriar,
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
