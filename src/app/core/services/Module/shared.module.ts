import { NgModule } from '@angular/core';
import { FormGroupModule } from './form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [FormGroupModule, MatDialogModule, CommonModule],
  exports: [FormGroupModule, MatDialogModule, CommonModule],
})
export class SharedModule {}
