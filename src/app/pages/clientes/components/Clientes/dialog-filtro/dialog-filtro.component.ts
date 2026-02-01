import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CidadeModel } from '../../../../../core/model/cidade.model';

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
  templateUrl: './dialog-filtro.component.html',
  styleUrl: './dialog-filtro.component.css',
  standalone: true,
})
export class DialogFiltroComponent {
  clienteForm: FormGroup;
  cidade: CidadeModel[] = [];
  constructor() {
    this.clienteForm = new FormGroup({
      nome: new FormControl(''),
      fAtivo: new FormControl(''),
      cidade: new FormControl(null),
      cpf_cnpj: new FormControl(''),
    });
  }
}
