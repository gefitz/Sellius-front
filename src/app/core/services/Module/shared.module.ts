import { NgModule } from '@angular/core';
import { FormGroupModule } from './form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { CustomPaginator } from '../Utils/paginator-edit';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CepComponent } from '../../../shared/components/cep/cep.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PermissaoDirective } from '../AuthGuard/PermissaoDirective';

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
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: CustomPaginator,
    },
  ],
})
export class SharedModule {}
