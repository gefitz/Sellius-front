import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoModel } from '../models/produto.model';
import { Observable } from 'rxjs';
import { ProdutoModalComponent } from '../components/dialogs/produto-modal/produto-modal.component';
import { DialogaddprodutoComponent } from '../components/dialogs/dialogaddproduto/dialog-add-produto.component';

@Injectable({
  providedIn: 'root',
})
export class ProdutoModalService {
  constructor(private dialog: MatDialog) {}

  /**
   * Abre a modal para cadastrar um novo produto
   */
  abrirModalCadastro(produto?: ProdutoModel): Observable<boolean> {
    const dialogRef = this.dialog.open(ProdutoModalComponent, {
      panelClass: `md-large`,
      disableClose: true,
      autoFocus: false,
      data: { produto },
    });

    return dialogRef.afterClosed();
  }
  abrirModalTabelaProduto() {
    const dialogRef = this.dialog.open(DialogaddprodutoComponent, {
      panelClass: `md-large`,
    });
  }
}
