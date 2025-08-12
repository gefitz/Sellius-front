import { Component, inject, model } from '@angular/core';
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
import { ProdutoModel } from '../../models/produto.model';
import { MatIconModule } from '@angular/material/icon';
import { Cookie } from '../../../../core/services/cookie/cookie.service';
@Component({
  selector: 'app-dialog-filtro-produto',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './dialog-filtro-produto.component.html',
  styleUrl: './dialog-filtro-produto.component.css',
})
export class DialogFiltroProdutoComponent {
  produtoForm: FormGroup;
  constructor(private cookie: Cookie) {
    this.produtoForm = new FormGroup({
      nome: new FormControl(''),
      tipoProduto: new FormControl(''),
      marca: new FormControl(''),
      fAtivo: new FormControl(''),
    });
  }
  gerarCookieFiltro() {
    this.cookie.guardaCookie('filtroProduto', this.produtoForm.value);
  }
}
