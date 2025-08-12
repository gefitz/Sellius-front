import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../../core/services/Module/shared.module';

@Component({
  selector: 'grupo-filtro',
  templateUrl: 'grupo-filtro.component.html',
  styleUrls: ['grupo-filtro.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class GrupoFiltroComponent {
  grupoForm: FormGroup;
  constructor() {
    this.grupoForm = new FormGroup({
      grupo: new FormControl(''),
      fAtivo: new FormControl(-1),
      dtAtualizacao: new FormControl(''),
    });
  }
}
