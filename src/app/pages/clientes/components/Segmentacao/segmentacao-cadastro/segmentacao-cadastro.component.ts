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
import { SegmentacaoModel } from '../../../models/segmentacao.model';
import { SegmentacaoService } from '../../../services/segmentacao.service';

@Component({
    selector: 'app-segmentacao-cadastro',
    imports: [
        MatDialogModule,
        MatInput,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
    ],
    templateUrl: './segmentacao-cadastro.component.html',
    styleUrl: './segmentacao-cadastro.component.css'
})
export class SegmentacaoCadastroComponent implements OnInit {
  segmentacaoForm!: FormGroup;
  titulo: string = 'Nova Segmentação';

  constructor(
    private service: SegmentacaoService,
    private dialogRef: MatDialogRef<SegmentacaoCadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public segmentacaoEdit: SegmentacaoModel
  ) {}

  ngOnInit(): void {
    this.preencherCampos();
  }

  salvar() {
    if (this.segmentacaoForm.valid) {
      const segmentacao: SegmentacaoModel = this.segmentacaoForm.value;
      if (segmentacao.id != 0) {
        this.service.editarSegmentacao(segmentacao).subscribe({
          next: (ret) => {
            this.dialogRef.close(true);
          },
        });
      } else {
        this.service.cadastrarSegmentacao(segmentacao).subscribe({
          next: (ret) => {
            if (ret) {
              this.dialogRef.close(true);
            }
          },
        });
      }
    }
  }

  preencherCampos() {
    if (this.segmentacaoEdit) {
      this.titulo = 'Editar Segmentação';
      this.segmentacaoForm = new FormGroup({
        id: new FormControl(this.segmentacaoEdit.id),
        segmento: new FormControl(
          this.segmentacaoEdit.segmento,
          Validators.required
        ),
        fAtivo: new FormControl(this.segmentacaoEdit.fAtivo),
      });
    } else {
      this.segmentacaoForm = new FormGroup({
        id: new FormControl(0),
        segmento: new FormControl('', Validators.required),
        fAtivo: new FormControl(1),
      });
    }
  }
}
