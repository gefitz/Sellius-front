import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { TpProdutoModel } from '../../models/tpProduto.model';
import { TpProdutoService } from '../../services/tp-produto.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tp-produto-cadastro',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInput,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './tp-produto-cadastro.component.html',
  styleUrls: [
    './tp-produto-cadastro.component.css',
    '/src/app/shared/styles/modal-styles.css',
  ],
})
export class TpProdutoCadastroComponent implements OnInit {
  tpProdutoForm!: FormGroup;
  titulo: string = 'Novo Tipo Produto';
  isLoading: boolean = false;

  constructor(
    private service: TpProdutoService,
    private dialogRef: MatDialogRef<TpProdutoCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public tpProdutoEdit: TpProdutoModel
  ) {}
  ngOnInit(): void {
    this.preencherCampos();
  }
  salvar() {
    if (this.tpProdutoForm.valid) {
      const tpProduto: TpProdutoModel = this.tpProdutoForm.value;
      if (tpProduto.id != 0) {
        this.service.editTpProduto(tpProduto).subscribe({
          next: (ret) => {
            this.dialogRef.close(true);
          },
        });
      } else {
        this.service.cadastrarTpProduto(tpProduto).subscribe({
          next: (ret) => {
            if (ret) {
              this.dialogRef.close(true);
            }
          },
        });
      }
    }
  }
  preencherCampos() {
    if (this.tpProdutoEdit) {
      this.titulo = 'Editar Tipo Produto';
      this.tpProdutoForm = new FormGroup({
        id: new FormControl(this.tpProdutoEdit.id),
        tipo: new FormControl(this.tpProdutoEdit.tipo, Validators.required),
        descricao: new FormControl(
          this.tpProdutoEdit.descricao,
          Validators.required
        ),
        fAtivo: new FormControl(this.tpProdutoEdit.fAtivo),
      });
    } else {
      this.tpProdutoForm = new FormGroup({
        id: new FormControl(0),
        tipo: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),
        fAtivo: new FormControl(0),
      });
    }
  }
  fechar() {
    this.dialogRef.close();
  }
}
