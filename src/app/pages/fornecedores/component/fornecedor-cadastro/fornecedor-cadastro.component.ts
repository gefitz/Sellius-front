import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import { FornecedorModel } from '../../models/forncedor.model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Viacep } from '../../../../core/services/Utils/consome-api.serivce';
import { EstadoModel } from '../../../../core/model/estado.model';
import { CidadeModel } from '../../../../core/model/cidade.model';
import { FornecedorService } from '../../services/fornecedor.service';
import { FormGroupModule } from '../../../../core/services/Module/form.module';

@Component({
  selector: 'app-fornecedor-cadastro',
  standalone: true,
  imports: [FormGroupModule, CommonModule],
  templateUrl: './fornecedor-cadastro.component.html',
  styleUrls: [
    '/src/app/shared/styles/modal-styles.css',
    './fornecedor-cadastro.component.css',
  ],
})
export class FornecedorCadastroComponent implements OnInit {
  fornecedorForm!: FormGroup;
  titulo: string = 'Novo Fornecedor';
  lisEstados!: EstadoModel[];
  listCidades!: CidadeModel[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public fornecedorEdit: FornecedorModel,
    private service: FornecedorService,
    private dialogRef: MatDialogRef<FornecedorCadastroComponent>
  ) {}
  ngOnInit(): void {
    this.fornecedorForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      telefone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      fAtivo: new FormControl(1), // 1 = ativo
      cidadeId: new FormControl(null, Validators.required),
      cep: new FormControl('', Validators.required),
      rua: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      estado: new FormControl(''),
    });
    this.carregarCombo();
    this.service.obterFornecedor(this.fornecedorEdit.id).subscribe({
      next: (ret) => {
        this.fornecedorEdit = ret;
        this.carregarCidade(this.fornecedorEdit.cidade.estado.id);
        this.carregaEdit();
      },
    });
  }

  onSubmit() {
    if (this.fornecedorForm.valid) {
      this.fornecedorEdit = this.fornecedorForm.value;
      if (this.fornecedorEdit.id != 0) {
        this.service.editarFornecedor(this.fornecedorEdit).subscribe({
          next: (result) => {
            if (result) {
              this.dialogRef.close(true);
            }
          },
        });
      } else {
        this.service.cadastrarFornecedor(this.fornecedorEdit).subscribe({
          next: (result) => {
            if (result) {
              this.dialogRef.close(true);
            }
          },
        });
      }
    }
  }
  carregaEdit() {
    if (this.fornecedorEdit) {
      this.titulo = 'Edita Fornecedo: ' + this.fornecedorEdit.nome;
      this.fornecedorForm = new FormGroup({
        id: new FormControl(this.fornecedorEdit.id),
        nome: new FormControl(this.fornecedorEdit.nome, Validators.required),
        cnpj: new FormControl(this.fornecedorEdit.cnpj, Validators.required),
        telefone: new FormControl(this.fornecedorEdit.telefone),
        email: new FormControl(this.fornecedorEdit.email, [
          Validators.required,
          Validators.email,
        ]),
        fAtivo: new FormControl(this.fornecedorEdit.fAtivo),
        cidadeId: new FormControl(
          this.fornecedorEdit.cidadeId,
          Validators.required
        ),
        cep: new FormControl(this.fornecedorEdit.cep, Validators.required),
        rua: new FormControl(this.fornecedorEdit.rua, Validators.required),
        complemento: new FormControl(this.fornecedorEdit.complemento),
        estado: new FormControl(this.fornecedorEdit.cidade?.estado?.id),
      });
    }
  }
  carregarCombo() {
    Viacep.BuscaEstados().then((result) => {
      this.lisEstados = result;
    });
  }
  carregarCidade(idEstado: number) {
    Viacep.BuscaCidade(idEstado).then((result) => {
      this.listCidades = result;
    });
  }
  buscarCep() {
    console.log('Ola');
    const cep = this.fornecedorForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      Viacep.BuscaCep(cep)
        .then(async (data) => {
          await this.carregarCidade(data.estado || 0);
          this.fornecedorForm.patchValue({
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
