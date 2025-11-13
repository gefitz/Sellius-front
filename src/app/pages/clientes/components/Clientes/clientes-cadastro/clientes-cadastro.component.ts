import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { ClienteModel } from '../../../models/cliente.model';
import { CidadeModel } from '../../../../../core/model/cidade.model';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../../services/cliente.service';
import { SharedModule } from '../../../../../core/services/Module/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SegmentacaoModel } from '../../../models/segmentacao.model';
import { GrupoModel } from '../../../models/grupo.model';
import { SegmentacaoService } from '../../../services/segmentacao.service';
import { GrupoService } from '../../../services/grupo.service';
import { ConsumirApi } from '../../../../../core/services/Utils/consome-api.serivce';
import { EstadoModel } from '../../../../../core/model/estado.model';
import { error } from 'node:console';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-clientes-cadastro',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './clientes-cadastro.component.html',
  styleUrls: [
    '/src/app/shared/styles/modal-styles.css',
    './clientes-cadastro.component.css',
  ],
})
export class ClientesCadastroComponent implements OnInit {
  cidade: CidadeModel[] = [];
  segmentacao: SegmentacaoModel[] = [];
  grupo: GrupoModel[] = [];
  estado: EstadoModel[] = [];
  titleModal: string = '';
  clienteForm: FormGroup = undefined!;
  editando: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<ClientesCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public clienteEditar: ClienteModel,
    private segmentacaoService: SegmentacaoService,
    private grupoService: GrupoService
  ) {
    if (clienteEditar) {
      this.editando = true;
    }
  }
  ngOnInit(): void {
    this.clienteForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', Validators.required),
      documento: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      estado: new FormControl(0),
      cidadeId: new FormControl(0, Validators.required),
      rua: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      fAtivo: new FormControl(1, Validators.required),
      dthCadastro: new FormControl(new Date()),
      dthAlteracao: new FormControl(new Date()),
      idSegmentacao: new FormControl(0),
      idGrupo: new FormControl(0),
      bairro: new FormControl(''),
    });
    if (this.clienteEditar) {
      this.clienteService.obterClientePorId(this.clienteEditar.id).subscribe({
        next: (ret) => {
          console.log(ret);
          this.clienteEditar = ret;
          this.preencherCamposFormulario();
          this.preencherSegmentacao();
          this.preencherGrupo();
          this.carregaEstado();
        },
      });
    } else {
      this.preencherCamposFormulario();
      this.preencherSegmentacao();
      this.preencherGrupo();
      this.carregaEstado();
    }
  }
  ngAfterView() {}
  salvarCliente() {
    if (this.clienteForm.valid) {
      const cliente: ClienteModel = this.clienteForm.value;
      if (!this.editando || cliente.id === 0) {
        this.clienteService.cadastrarCliente(cliente).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
        });
      } else {
        this.clienteService.editarCliente(cliente).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
        });
      }
    }
  }

  preencherCamposFormulario() {
    if (this.clienteEditar) {
      this.titleModal = 'Editando ' + this.clienteEditar.nome;
      this.clienteForm = new FormGroup({
        id: new FormControl(this.clienteEditar.id),
        nome: new FormControl(this.clienteEditar.nome, Validators.required),
        documento: new FormControl(
          this.clienteEditar.documento,
          Validators.required
        ),
        telefone: new FormControl(
          this.clienteEditar.telefone,
          Validators.required
        ),
        email: new FormControl(this.clienteEditar.email, [
          Validators.required,
          Validators.email,
        ]),
        estado: new FormControl(this.clienteEditar.cidade.estado.id),
        cidadeId: new FormControl(
          this.clienteEditar.cidadeId,
          Validators.required
        ),
        rua: new FormControl(this.clienteEditar.rua, Validators.required),
        cep: new FormControl(this.clienteEditar.cep, Validators.required),
        fAtivo: new FormControl(this.clienteEditar.fAtivo, Validators.required),
        dthCadastro: new FormControl(this.clienteEditar.dthCadastro),
        dthAlteracao: new FormControl(this.clienteEditar.dthAlteracao),
        idSegmentacao: new FormControl(this.clienteEditar.idSegmentacao),
        idGrupo: new FormControl(this.clienteEditar.idGrupo),
        bairro: new FormControl(this.clienteEditar.bairro),
      });
    } else {
      console.log('Ola');
      this.titleModal = 'Novo Cliente';
    }
  }
  close() {
    this.dialogRef.close(false);
  }
  preencherSegmentacao() {
    this.segmentacaoService.carregarSegmentacao().subscribe({
      next: (ret) => {
        this.segmentacao = ret;
      },
    });
  }
  preencherGrupo() {
    this.grupoService.carregarSegmentacao().subscribe({
      next: (ret) => {
        this.grupo = ret;
      },
    });
  }
  buscarCep() {
    const cep = this.clienteForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      ConsumirApi.BuscaCep(cep)
        .then(async (data) => {
          await this.buscarCidades(data.estado || 0);
          this.clienteForm.patchValue({
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
    ConsumirApi.BuscaEstados()
      .then((data) => {
        this.estado = data;
        if (this.clienteEditar.id) {
          this.buscarCidades(this.clienteEditar.cidade.estado.id);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar estados:', error);
      });
  }
  async buscarCidades(estadoId: number) {
    await ConsumirApi.BuscaCidade(estadoId)
      .then((data) => {
        this.cidade = data;
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  }
}
