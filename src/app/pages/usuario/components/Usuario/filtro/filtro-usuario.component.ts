import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsuarioFiltro } from '../../../models/Filtros/usuario-filtro.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { FormGroupModule } from '../../../../../shared/components/Module/form.module';
import { CidadeComponent } from '../../../../../shared/components/cidade/cidade.component';
import { EstadoComponent } from '../../../../../shared/components/estado/estado.component';
import { CepComponent } from '../../../../../shared/components/cep/cep.component';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TpUsuarioService } from '../../../services/tp-usuario.service';
import { TpUsuario } from '../../../models/tipo-usuario.model';

@Component({
  selector: 'filtro-usuario',
  templateUrl: './filtro-usuario.component.html',
  styleUrls: [
    './filtro-usuario.component.css',
    '../../../../../shared/styles/modal-styles.css',
  ],
  imports: [SharedModule, FormGroupModule, EstadoComponent],
  standalone: true,
})
export class FiltroUsuarioComponent {
  filtro: FormGroup;
  listaTipoUsuario!: TpUsuario[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: UsuarioFiltro,
    private ref: MatDialogRef<FiltroUsuarioComponent>,
    private serviceTpUsuario: TpUsuarioService,
  ) {
    if (data) {
      this.filtro = new FormGroup({
        nome: new FormControl(data.nome ? data.nome : ''),
        tpUsuario: new FormControl(data.tpUsuario),
        cpf: new FormControl(data.cpf ? data.cpf : ''),
        cidade: new FormControl(data.cidade ? data.cidade : -1),
        estado: new FormControl(data.estado ? data.estado : -1),
        fAtivo: new FormControl(data.fAtivo ? data.fAtivo : -1),
      });
    } else {
      this.filtro = new FormGroup({
        nome: new FormControl(''),
        // tpUsuario: new FormControl(data.tpUsuario),
        cpf: new FormControl(''),
        cidade: new FormControl(-1),
        estado: new FormControl(-1),
        fAtivo: new FormControl(-1),
      });
    }
    this.carregaTpUsuario();
  }
  carregaTpUsuario() {
    this.serviceTpUsuario.carregaTpUsuario().subscribe({
      next: (ret) => {
        this.listaTipoUsuario = ret;
      },
    });
  }
}
