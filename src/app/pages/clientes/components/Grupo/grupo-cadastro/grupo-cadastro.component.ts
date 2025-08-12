import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GrupoModel } from '../../../models/grupo.model';
import { GrupoService } from '../../../services/grupo.service';

@Component({
  selector: 'app-grupo-cadastro',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInput,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './grupo-cadastro.component.html',
  styleUrl: './grupo-cadastro.component.css',
})
export class GrupoCadastroComponent implements OnInit {
  grupoForm!: FormGroup;
  titulo: string = 'Novo Grupo';

  constructor(
    private service: GrupoService,
    private dialogRef: MatDialogRef<GrupoCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public grupoEdit: GrupoModel
  ) {}

  ngOnInit(): void {
    this.preencherCampos();
  }

  salvar() {
    if (this.grupoForm.valid) {
      const grupo: GrupoModel = this.grupoForm.value;
      if (grupo.id != 0) {
        this.service.editarGrupo(grupo).subscribe({
          next: (ret) => {
            this.dialogRef.close(true);
          },
        });
      } else {
        this.service.cadastrarGrupo(grupo).subscribe({
          next: (ret) => {
            this.dialogRef.close(true);
          },
        });
      }
    }
  }

  preencherCampos() {
    if (this.grupoEdit) {
      this.titulo = 'Editar Grupo';
      this.grupoForm = new FormGroup({
        id: new FormControl(this.grupoEdit.id),
        nome: new FormControl(this.grupoEdit.nome, Validators.required),
        fAtivo: new FormControl(this.grupoEdit.fAtivo),
      });
    } else {
      this.grupoForm = new FormGroup({
        id: new FormControl(0),
        nome: new FormControl('', Validators.required),
        fAtivo: new FormControl(1),
      });
    }
  }
}
