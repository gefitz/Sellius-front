import { NgModule } from '@angular/core';
import { FormGroupModule } from './form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { PermissaoDirective } from '../../../core/services/AuthGuard/PermissaoDirective';
import { CepComponent } from '../cep/cep.component';
import { CustomPaginator } from '../../../core/services/Utils/paginator-edit';
import { CidadeComponent } from '../cidade/cidade.component';
import { EstadoComponent } from '../estado/estado.component';

@NgModule({
  declarations: [PermissaoDirective],
  imports: [
    FormGroupModule,
    MatDialogModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    MatIconModule,
    CepComponent,
    MatCheckboxModule,
    CidadeComponent,
    EstadoComponent,
  ],
  exports: [
    FormGroupModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    MatIconModule,
    CommonModule,
    CepComponent,
    PermissaoDirective,
    CidadeComponent,
    EstadoComponent,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: CustomPaginator,
    },
  ],
})
export class SharedModule {}
