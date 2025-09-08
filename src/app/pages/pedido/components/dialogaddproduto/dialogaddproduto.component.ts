import { Component, inject, Inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PedidoXProdutoModel } from '../../models/pedidoxproduto.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialogaddproduto',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './dialogaddproduto.component.html',
  styleUrl: './dialogaddproduto.component.css',
})
export class DialogaddprodutoComponent {
  pedidoXProdutoForm: FormGroup;
  readonly dialog = inject(MatDialogRef<DialogaddprodutoComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: PedidoXProdutoModel
  ) {
    if (data.qtd === 0) {
      this.pedidoXProdutoForm = new FormGroup({
        qtdProduto: new FormControl('', Validators.required),
        vlrProduto: new FormControl('', Validators.required),
      });
    } else {
      this.pedidoXProdutoForm = new FormGroup({
        qtdProduto: new FormControl(data.qtd, Validators.required),
        vlrProduto: new FormControl(data.valorVenda, Validators.required),
      });
    }
  }
  add() {
    if (this.pedidoXProdutoForm.valid) {
      this.data.qtd = this.pedidoXProdutoForm.value.qtdProduto;
      this.data.valorVenda = this.pedidoXProdutoForm.value.vlrProduto;
      this.dialog.close(this.data);
    }
  }
}
