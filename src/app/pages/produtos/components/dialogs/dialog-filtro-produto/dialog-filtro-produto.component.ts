import { Component, inject, model, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProdutoModel } from '../../../models/produto.model';
import { MatIconModule } from '@angular/material/icon';
import { Cookie } from '../../../../../core/services/cookie/cookie.service';
import { TpProdutoService } from '../../../services/tp-produto.service';
import { FornecedorService } from '../../../../fornecedores/services/fornecedor.service';
import { TpProdutoModel } from '../../../models/tpProduto.model';
import { FornecedorModel } from '../../../../fornecedores/models/forncedor.model';

@Component({
    selector: 'app-dialog-filtro-produto',
    imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
],
    templateUrl: './dialog-filtro-produto.component.html',
    styleUrl: './dialog-filtro-produto.component.css'
})
export class DialogFiltroProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  tpProduto!: TpProdutoModel[];
  fornecedores!: FornecedorModel[];
  constructor(
    private tpProdutoService: TpProdutoService,
    private fornecedorService: FornecedorService
  ) {
    this.produtoForm = new FormGroup({
      nome: new FormControl(''),
      tipoProduto: new FormControl(''),
      marca: new FormControl(''),
      fAtivo: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.tpProdutoService.carregarTpProdutoCombo().subscribe({
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
