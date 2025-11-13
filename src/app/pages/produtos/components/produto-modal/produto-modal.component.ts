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
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TpProdutoModel } from '../../models/tpProduto.model';
import { FornecedorModel } from '../../../fornecedores/models/forncedor.model';
import { ProdutoModel } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { TpProdutoService } from '../../services/tp-produto.service';
import { FornecedorService } from '../../../fornecedores/services/fornecedor.service';

@Component({
  selector: 'app-produto-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './produto-modal.component.html',
  styleUrls: [
    '/src/app/shared/styles/modal-styles.css',
    './produto-modal.component.css',
  ],
})
export class ProdutoModalComponent implements OnInit {
  produtoForm!: FormGroup;
  tpProduto: TpProdutoModel[] = [];
  fornecedores: FornecedorModel[] = [];
  titulo: string = 'Cadastrar Produto';
  isLoading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ProdutoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { produto?: ProdutoModel },
    @Inject(ProdutoService) private service: ProdutoService,
    @Inject(TpProdutoService) private tpService: TpProdutoService,
    @Inject(FornecedorService) private fornecedorService: FornecedorService
  ) {
    if (this.data?.produto) {
      this.titulo = 'Editar Produto';
    }
  }

  ngOnInit(): void {
    this.carregarCombos();
    this.preencherCamposFormulario(this.data?.produto);
  }

  salvarProduto(): void {
    if (this.produtoForm.valid) {
      this.isLoading = true;

      this.produtoForm.value.dthCriacao = new Date(
        this.produtoForm.value.dthCriacao
      ).toISOString();

      const produto: ProdutoModel = this.produtoForm.value;
      produto.tipoProdutoId = this.produtoForm.value.tipoProduto;
      produto.fornecedorId = this.produtoForm.value.marca;

      if (produto.id == 0) {
        this.service.cadastrarProduto(produto).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: () => {
            this.isLoading = false;
          },
        });
      } else {
        this.service.editarProduto(produto).subscribe({
          next: () => {
            this.dialogRef.close(true);
          },
          error: () => {
            this.isLoading = false;
          },
        });
      }
    }
  }

  fechar(): void {
    this.dialogRef.close(false);
  }

  private preencherCamposFormulario(produtoEditar?: ProdutoModel): void {
    if (produtoEditar) {
      this.produtoForm = new FormGroup({
        id: new FormControl(produtoEditar.id),
        Nome: new FormControl(produtoEditar.nome, Validators.required),
        tipoProduto: new FormControl(produtoEditar.tipoProdutoId),
        qtd: new FormControl(produtoEditar.qtd, [
          Validators.required,
          Validators.min(0),
        ]),
        marca: new FormControl(produtoEditar.fornecedorId),
        fAtivo: new FormControl(produtoEditar.fAtivo, Validators.required),
        dthCriacao: new FormControl(
          new Date(produtoEditar.dthCriacao).toISOString().split('T')[0]
        ),
        descricao: new FormControl(produtoEditar.descricao),
        valor: new FormControl(produtoEditar.valor, Validators.required),
      });
    } else {
      this.produtoForm = new FormGroup({
        id: new FormControl(0),
        Nome: new FormControl('', Validators.required),
        tipoProduto: new FormControl(''),
        qtd: new FormControl('', [Validators.required, Validators.min(0)]),
        marca: new FormControl(''),
        fAtivo: new FormControl(1, Validators.required),
        dthCriacao: new FormControl(new Date().toISOString().split('T')[0]),
        descricao: new FormControl(''),
        valor: new FormControl(0, Validators.required),
      });
    }
  }

  private carregarCombos(): void {
    this.tpService.carregarTpProdutoCombo().subscribe({
      next: (ret) => {
        this.tpProduto = ret;
      },
    });
    this.fornecedorService.carregarCombo().subscribe({
      next: (ret) => {
        this.fornecedores = ret;
      },
    });
  }
}
