import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioserviceService } from '../../services/usuarioservice.service';
import { CommonModule } from '@angular/common';
import { CidadeModel } from '../../../../core/model/cidade.model';
import { EstadoModel } from '../../../../core/model/estado.model';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { TipoUsuario } from '../../enums/tipo-usuario.enum';
import { TipoLicenca } from '../../../../core/enums/tipo-licenca.enum';
import { ConsumirApi } from '../../../../core/services/Utils/consome-api.serivce';

@Component({
  selector: 'app-usuario-cadastro',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    MatIconModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css'],
})
export class UsuarioCadastroComponent implements OnInit {
  formUsuario: FormGroup;
  tipoUsuario = TipoUsuario;
  listaTipoUsuario = Object.keys(TipoUsuario)
    .filter((key) => isNaN(Number(key))) // remove as chaves numéricas
    .map((key) => ({
      key: TipoUsuario[key as keyof typeof TipoUsuario],
      value: key,
    }));
  listEstados: EstadoModel[] = [];
  listCidades: CidadeModel[] = [];
  @Input() telaCadastroEmpresa: boolean = false;

  @ViewChild('tipoUsuario') selectTipoUsuario!: MatSelect;
  @Input() origem: string = '';
  cidade: CidadeModel[] = [];
  estado: EstadoModel[] = [];
  constructor(private service: UsuarioserviceService) {
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
  ngOnInit(): void {
    this.carregaEstado();
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
    ConsumirApi.BuscaEstados()
      .then((data) => {
        this.listEstados = data;
      })
      .catch((error) => {
        console.error('Erro ao buscar estados:', error);
      });
  }
  async buscarCidades(estadoId: number) {
    await ConsumirApi.BuscaCidade(estadoId)
      .then((data) => {
        this.listCidades = data;
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  }
  buscarCep() {
    const cep = this.formUsuario.get('cep')?.value;
    if (cep && cep.length === 8) {
      ConsumirApi.BuscaCep(cep)
        .then(async (data) => {
          await this.buscarCidades(data.estado || 0);
          this.formUsuario.patchValue({
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
}
