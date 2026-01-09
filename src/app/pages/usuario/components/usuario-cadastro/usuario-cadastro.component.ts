import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioserviceService } from '../../services/usuarioservice.service';
import { CidadeModel } from '../../../../core/model/cidade.model';
import { EstadoModel } from '../../../../core/model/estado.model';
import { MatSelect } from '@angular/material/select';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../../core/services/Module/shared.module';
import { Viacep } from '../../../../core/services/Utils/consome-api.serivce';
import { TpUsuario } from '../../models/tipo-usuario.model';

@Component({
  selector: 'app-usuario-cadastro',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: [
    './usuario-cadastro.component.css',
    '/src/app/shared/styles/modal-styles.css',
  ],
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
  constructor(
    private service: UsuarioserviceService,
    @Inject(MAT_DIALOG_DATA) public usuario: UsuarioModel
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
      this.service.createUsuario(usuairo);
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
    this.formUsuario = new FormGroup({
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
    });
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
    this.service.carregaTpUsuario().subscribe({
      next: (ret) => {
        this.listaTipoUsuario = ret;
      },
    });
  }
}
