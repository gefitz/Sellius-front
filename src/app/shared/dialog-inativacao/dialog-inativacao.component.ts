import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-inativacao',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-inativacao.component.html',
  styleUrl: './dialog-inativacao.component.css',
})
export class DialogInativacaoComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public obj: any) {}
}
