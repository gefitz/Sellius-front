import { Component } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProdutoModel } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';

import { TpProdutoModel } from '../../../models/tpProduto.model';
import { TpProdutoService } from '../../../services/tp-produto.service';
import { FornecedorModel } from '../../../../fornecedores/models/forncedor.model';
import { FornecedorService } from '../../../../fornecedores/services/fornecedor.service';

@Component({
    selector: 'app-produto-cadastro',
    imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatSelectModule,
    FlexLayoutModule
],
    templateUrl: './produto-cadastro.component.html',
    styleUrls: [
        '/src/app/shared/styles/modal-styles.css',
        './produto-cadastro.component.css',
    ]
})
export class ProdutoCadastroComponent {
  produtoForm!: FormGroup;
  tpProduto!: TpProdutoModel[];
  fornecedores!: FornecedorModel[];
  constructor(
    private router: Router,
    private service: ProdutoService,
    private tpService: TpProdutoService,
    private fornecedorService: FornecedorService
  ) {
    const nav = router.getCurrentNavigation();
    const produtoEditar: ProdutoModel = nav?.extras.state?.['produto'];
    this.carregarCombos();
    this.preencherCamposFormulario(produtoEditar);
  }
  salvarProduto() {
    if (this.produtoForm.valid) {
      this.produtoForm.value.dthCriacao = new Date(
        this.produtoForm.value.dthCriacao
      ).toISOString();
      const produto: ProdutoModel = this.produtoForm.value;
      produto.tipoProdutoId = this.produtoForm.value.tipoProduto;
      produto.fornecedorId = this.produtoForm.value.marca;
      if (produto.id == 0) {
        this.service.cadastrarProduto(produto);
      } else {
        this.service.editarProduto(produto);
      }
    }
  }
  preencherCamposFormulario(produtoEditar: ProdutoModel) {
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
  carregarCombos() {
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
