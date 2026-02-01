import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-filtro',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './dialog-filtro-segmentacao.component.html',
  styleUrl: './dialog-filtro-segmentacao.component.css',
  standalone: true,
})
export class DialogFiltroSegmentacaoComponent {
  segmentacaoForm: FormGroup;
  constructor() {
    this.segmentacaoForm = new FormGroup({
      segmentacao: new FormControl(''),
      fAtivo: new FormControl(''),
      dtAtualizacao: new FormControl(''),
    });
  }
}
