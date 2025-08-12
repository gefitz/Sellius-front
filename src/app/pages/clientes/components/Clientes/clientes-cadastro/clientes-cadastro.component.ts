import { Component, Inject } from '@angular/core';
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

@Component({
  selector: 'app-clientes-cadastro',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './clientes-cadastro.component.html',
  styleUrl: './clientes-cadastro.component.css',
})
export class ClientesCadastroComponent {
  cidade: CidadeModel[] = [
    {
      id: 1,
      cidade: 'Colombo',
      estado: {
        estado: 'Parana',
        sigla: 'PR',
        id: 1,
      },
    },
  ];
  titleModal: string = '';
  clienteForm: FormGroup = undefined!;
  editando: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<ClientesCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public clienteEditar: ClienteModel
  ) {
    this.preencherCamposFormulario(clienteEditar);
    if (clienteEditar) {
      this.editando = true;
    }
  }

  salvarCliente() {
    if (this.clienteForm.valid) {
      const cliente: ClienteModel = this.clienteForm.value;
      if (!this.editando || cliente.id === 0) {
        this.clienteService.cadastrarCliente(cliente).subscribe({
          next: () => {},
        });
      } else {
        this.clienteService.editarCliente(cliente).subscribe({
          next: () => {},
        });
      }
    }
  }

  preencherCamposFormulario(clienteEditar: ClienteModel) {
    if (clienteEditar) {
      this.titleModal = 'Editando ' + clienteEditar.nome;
      this.clienteForm = new FormGroup({
        id: new FormControl(clienteEditar.id),
        nome: new FormControl(clienteEditar.nome, Validators.required),
        razao: new FormControl(clienteEditar.razao, Validators.required),
        cpf_cnpj: new FormControl(clienteEditar.cpf_cnpj, Validators.required),
        telefone: new FormControl(clienteEditar.telefone, Validators.required),
        email: new FormControl(clienteEditar.email, [
          Validators.required,
          Validators.email,
        ]),
        cidade: new FormControl(clienteEditar.cidade, Validators.required),
        rua: new FormControl(clienteEditar.rua, Validators.required),
        cep: new FormControl(clienteEditar.cep, Validators.required),
        fAtivo: new FormControl(clienteEditar.fAtivo, Validators.required),
        dthCadastro: new FormControl(clienteEditar.dthCadastro),
        dthAlteracao: new FormControl(clienteEditar.dthAlteracao),
      });
    } else {
      this.titleModal = 'Novo Cliente';
      this.clienteForm = new FormGroup({
        id: new FormControl(0),
        nome: new FormControl('', Validators.required),
        razao: new FormControl('', Validators.required),
        cpf_cnpj: new FormControl('', Validators.required),
        telefone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        cidade: new FormControl(null, Validators.required),
        rua: new FormControl('', Validators.required),
        cep: new FormControl('', Validators.required),
        fAtivo: new FormControl(1, Validators.required),
        dthCadastro: new FormControl(new Date()),
        dthAlteracao: new FormControl(new Date()),
      });
    }
  }
  close() {
    this.dialogRef.close(this.clienteEditar);
  }
}
