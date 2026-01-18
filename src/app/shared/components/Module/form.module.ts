import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FornecedorCadastroComponent } from '../../../pages/fornecedores/component/fornecedor-cadastro/fornecedor-cadastro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CidadeComponent } from '../cidade/cidade.component';
import { EstadoComponent } from '../estado/estado.component';
import { CepComponent } from '../cep/cep.component';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class FormGroupModule {}
