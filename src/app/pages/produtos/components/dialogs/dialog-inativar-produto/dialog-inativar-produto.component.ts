import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ProdutoModel } from '../../../models/produto.model';
import { ProdutoFiltro } from '../../../models/produtoFiltro.model';

@Component({
  selector: 'app-dialog-inativar-produto',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-inativar-produto.component.html',
  styleUrl: './dialog-inativar-produto.component.css',
  standalone: true,
})
export class DialogInativarProdutoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public produto: ProdutoModel) {}
}
