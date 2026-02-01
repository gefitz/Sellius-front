import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { UsuarioModel } from '../../../models/Cadastro/usuario.model';
import { UsuarioserviceService } from '../../../services/usuarioservice.service';
import { CidadeModel } from '../../../../../core/model/cidade.model';
import { EstadoModel } from '../../../../../core/model/estado.model';
import { MatSelect } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { Viacep } from '../../../../../core/services/Utils/consome-api.serivce';
import { TpUsuario } from '../../../models/tipo-usuario.model';
import { TpUsuarioService } from '../../../services/tp-usuario.service';
import { FormGroupModule } from '../../../../../shared/components/Module/form.module';
import { EstadoComponent } from '../../../../../shared/components/estado/estado.component';

@Component({
    selector: 'app-usuario-cadastro',
    imports: [SharedModule, FormGroupModule, EstadoComponent],
    templateUrl: './usuario-cadastro.component.html',
    styleUrls: [
        './usuario-cadastro.component.css',
        '/src/app/shared/styles/modal-styles.css',
    ]
})
export class UsuarioCadastroComponent implements OnInit {
  formUsuario!: FormGroup;
  listaTipoUsuario!: TpUsuario[];
  listEstados: EstadoModel[] = [];
  listCidades: CidadeModel[] = [];
  @Input() telaCadastroEmpresa: boolean = false;

  @ViewChild('tipoUsuario') selectTipoUsuario!: MatSelect;
  @Input() origem: string = '';
  cidade: CidadeModel[] = [];
  estado: EstadoModel[] = [];

  senhasNaoCoincidem: boolean = false;
  constructor(
    private service: UsuarioserviceService,
    private serviceTpUsuario: TpUsuarioService,
    @Inject(MAT_DIALOG_DATA) public usuario: UsuarioModel,
    private refMatDialog: MatDialogRef<UsuarioCadastroComponent>,
  ) {
    this.preencherFormulario(usuario);
  }
  ngOnInit(): void {
    this.carregaEstado();
    this.carregaTpUsuario();
  }
  ngAfterViewInit(): void {
    if (this.origem.includes('cadastroEmpresa')) {
      this.selectTipoUsuario.disabled = true;
      this.formUsuario.get('tipoUsuario')?.setValue(1);
    }
  }
  submitCadastro() {
    if (this.formUsuario.valid) {
      const usuairo: UsuarioModel = this.formUsuario.value;

      usuairo.login = {
        email: this.formUsuario.value.email,
        password: this.formUsuario.value.password,
      };
      if (usuairo.id) {
        this.service.upDateUsuario(usuairo).subscribe({
          next: (ret) => {
            this.refMatDialog.close();
          },
        });
      } else {
        this.service.createUsuario(usuairo).subscribe({
          next: (response) => {
            if (response) {
              this.refMatDialog.close();
            }
          },
        });
      }
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

  preencherFormulario(usuario: UsuarioModel) {
    if (usuario) {
      this.formUsuario = new FormGroup(
        {
          id: new FormControl(usuario.id),
          nome: new FormControl(usuario.nome, Validators.required),
          email: new FormControl(usuario.email, Validators.required),
          documento: new FormControl(usuario.documento, Validators.required),
          password: new FormControl(''),
          confirmaPassword: new FormControl(''),
          estado: new FormControl(usuario.cidade.estado.id),
          cidadeId: new FormControl(usuario.cidade.id, Validators.required),
          cep: new FormControl(usuario.cep, Validators.required),
          rua: new FormControl(usuario.rua, Validators.required),
          tipoUsuario: new FormControl(
            usuario.tipoUsuario,
            Validators.required,
          ),
          fAtivo: new FormControl(usuario.fAtivo),
        },
        { validators: this.confirmaSenha() },
      );
    } else {
      this.formUsuario = new FormGroup(
        {
          id: new FormControl(0),
          nome: new FormControl('', Validators.required),
          email: new FormControl('', Validators.required),
          documento: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required),
          confirmaPassword: new FormControl('', Validators.required),
          estado: new FormControl(''),
          cidadeId: new FormControl(null, Validators.required),
          cep: new FormControl('', Validators.required),
          rua: new FormControl('', Validators.required),
          tipoUsuario: new FormControl('', Validators.required),
          fAtivo: new FormControl(1),
        },
        { validators: this.confirmaSenha() },
      );
    }
  }
  async preencherEndereco(data: any) {
    await this.buscarCidades(data.estado);
    this.formUsuario.patchValue({
      estado: data.estado,
      cidadeId: data.cidade,
      rua: data.rua,
    });
  }
  carregaTpUsuario() {
    this.serviceTpUsuario.carregaTpUsuario().subscribe({
      next: (ret) => {
        this.listaTipoUsuario = ret;
      },
    });
  }
  confirmaSenha(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const senha = control.parent?.get('password')?.value;
      const confirmacao = control.value;

      if (!senha || !confirmacao) {
        return null;
      }
      this.senhasNaoCoincidem = senha === confirmacao;
      return senha === confirmacao ? null : { senhasDiferentes: true };
    };
  }
}
