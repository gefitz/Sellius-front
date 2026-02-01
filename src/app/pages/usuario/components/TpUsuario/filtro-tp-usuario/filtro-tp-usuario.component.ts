import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { FormControl, FormGroup } from '@angular/forms';
import { TpUsuario } from '../../../models/tipo-usuario.model';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filtro-tp-usuario',
  imports: [SharedModule],
  templateUrl: './filtro-tp-usuario.component.html',
  styleUrls: ['./filtro-tp-usuario.component.css'],
  standalone: true,
})
export class FiltroTpUsuarioComponent implements OnInit {
  formTpUsuario!: FormGroup;
  tpUsuarioEditar!: TpUsuario;
  constructor(
    private refDialog: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: TpUsuario,
  ) {}

  ngOnInit(): void {
    this.tpUsuarioEditar = this.data;
    this.preencherForm();
  }

  preencherForm() {
    if (this.tpUsuarioEditar) {
      this.formTpUsuario = new FormGroup({
        tpUsuario: new FormControl(this.tpUsuarioEditar.tpUsuario),
        fAtivo: new FormControl(this.tpUsuarioEditar.fAtivo),
      });
    } else {
      this.formTpUsuario = new FormGroup({
        tpUsuario: new FormControl(''),
        fAtivo: new FormControl(-1),
      });
    }
  }

  submitCadastro() {
    this.tpUsuarioEditar = this.formTpUsuario.value;
    console.log(this.tpUsuarioEditar);
    this.refDialog.close(this.tpUsuarioEditar); // retorna o objeto completo
  }
}
