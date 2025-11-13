import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoModalComponent } from '../components/produto-modal/produto-modal.component';
import { ProdutoModel } from '../models/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutoModalService {
  constructor(private dialog: MatDialog) {}

  /**
   * Abre a modal para cadastrar um novo produto
   */
  abrirModalCadastro(): Observable<boolean> {
    const dialogRef = this.dialog.open(ProdutoModalComponent, {
      width: '90vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: {},
    });

    return dialogRef.afterClosed();
  }

  /**
   * Abre a modal para editar um produto existente
   */
  abrirModalEdicao(produto: ProdutoModel): Observable<boolean> {
    const dialogRef = this.dialog.open(ProdutoModalComponent, {
      width: '90vw',
      maxWidth: '800px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      data: { produto },
    });

    return dialogRef.afterClosed();
  }

  /**
   * Abre a modal (cadastro ou edição baseado no parâmetro)
   */
  abrirModal(produto?: ProdutoModel): Observable<boolean> {
    if (produto) {
      return this.abrirModalEdicao(produto);
    } else {
      return this.abrirModalCadastro();
    }
  }
}
