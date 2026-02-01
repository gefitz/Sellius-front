import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { CadastroEmpresaModel } from '../../models/cadastro-empresa.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  MatTabChangeEvent,
  MatTabGroup,
  MatTabsModule,
} from '@angular/material/tabs';
import { UsuarioCadastroComponent } from '../../../usuario/components/Usuario/usuario-cadastro/usuario-cadastro.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CidadeModel } from '../../../../core/model/cidade.model';
import { EstadoModel } from '../../../../core/model/estado.model';

import { TipoLicenca } from '../../../../core/enums/tipo-licenca.enum';
import { RouterLink } from '@angular/router';
import { Viacep } from '../../../../core/services/Utils/consome-api.serivce';
@Component({
  selector: 'app-empresa-cadastro',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    UsuarioCadastroComponent,
    RouterLink,
  ],
  templateUrl: './empresa-cadastro.component.html',
  styleUrl: './empresa-cadastro.component.css',
  standalone: true,
})
export class EmpresaCadastroComponent implements OnInit {
  formEmpresa!: FormGroup;
  selectTabs: number = 0;
  @ViewChild(UsuarioCadastroComponent)
  usuarioCadastro!: UsuarioCadastroComponent;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  selectTabIndex: number = 0;
  ignoreTabChange: boolean = false;
  listCidades: CidadeModel[] = [];
  listEstados: EstadoModel[] = [];

  tipoLicenca = TipoLicenca;
  listaTipoLicenca = Object.keys(TipoLicenca)
    .filter((key) => isNaN(Number(key))) // remove as chaves numéricas
    .map((key) => ({
      key: TipoLicenca[key as keyof typeof TipoLicenca],
      value: key,
    }));
  constructor(
    private service: EmpresaService,
    private snack: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.montaForm();
    this.carregaCombo();
    this.carregaEstado();
  }
  carregaCombo() {}
  salvar() {
    if (this.formEmpresa.valid && this.usuarioCadastro.formUsuario.valid) {
      const cadastroEmpresa: CadastroEmpresaModel = {
        login: {
          email: this.usuarioCadastro.formUsuario.get('email')?.value,
          password: this.usuarioCadastro.formUsuario.get('password')?.value,
        },
        empresa: this.formEmpresa.value,
        usuario: this.usuarioCadastro.formUsuario.value,
      };
      this.service.cadastrarEmpresa(cadastroEmpresa);
    } else {
      this.usuarioCadastro.formUsuario.markAllAsTouched();
      this.formEmpresa.markAllAsTouched();
      this.snack.open('Formularios não estão corretamente preenchidos', 'Ok', {
        duration: 5000,
      });
    }
  }
  nextTab(index: number) {
    this.selectTabs = index;
  }
  montaForm() {
    this.formEmpresa = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cidadeId: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      rua: new FormControl('', Validators.required),
      estado: new FormControl(''),
      tipoLicenca: new FormControl('', Validators.required),
    });
  }
  validaFormulario() {
    if (!this.usuarioCadastro.formUsuario.valid && this.selectTabIndex == 0) {
      this.snack.open(
        'Para seguir com o restante do cadastro deve completar o formulario de usuario',
        'Ok',
        { duration: 5000 },
      );
      this.tabGroup.selectedIndex = this.selectTabIndex;
      this.ignoreTabChange = true;
      this.usuarioCadastro.formUsuario.markAllAsTouched();
      return;
    }
    this.selectTabIndex = this.tabGroup.selectedIndex || 0;
  }
  buscarCep() {
    const cep = this.formEmpresa.get('cep')?.value;
    if (cep && cep.length === 8) {
      Viacep.BuscaCep(cep)
        .then(async (data) => {
          await this.buscarCidades(data.estado || 0);
          this.formEmpresa.patchValue({
            estado: data.estado,
            cidadeId: data.cidade,
            rua: data.rua,
          });
        })
        .catch((error) => {
          console.error('Erro ao buscar CEP:', error);
        });
    }
  }
  carregaEstado() {
    Viacep.BuscaEstados()
      .then((data) => {
        this.listEstados = data;
      })
      .catch((error) => {
        console.error('Erro ao buscar estados:', error);
      });
  }
  async buscarCidades(estadoId: number) {
    await Viacep.BuscaCidade(estadoId)
      .then((data) => {
        this.listCidades = data;
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  }
}
