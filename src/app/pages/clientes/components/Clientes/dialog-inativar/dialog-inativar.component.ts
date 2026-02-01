import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ClienteModel } from '../../../models/cliente.model';

@Component({
  selector: 'app-dialog-inativar',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-inativar.component.html',
  styleUrl: './dialog-inativar.component.css',
  standalone: true,
})
export class DialogInativarComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public cliente: ClienteModel) {}
}
