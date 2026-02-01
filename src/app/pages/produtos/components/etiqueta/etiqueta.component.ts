import { Component, Inject } from '@angular/core';
import { ProdutoModel } from '../../models/produto.model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { EtiquetaModel } from '../../models/etiqueta.model';

@Component({
    selector: 'app-etiqueta',
    imports: [MatDialogModule],
    templateUrl: './etiqueta.component.html',
    styleUrl: './etiqueta.component.css'
})
export class EtiquetaComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: EtiquetaModel,
    private dialogRef: MatDialogRef<EtiquetaComponent>
  ) {}

  imprimir() {
    window.print(); // Imprime a tela limpa com a etiqueta
  }

  fechar() {
    this.dialogRef.close(); // Fecha o dialog
  }
}
