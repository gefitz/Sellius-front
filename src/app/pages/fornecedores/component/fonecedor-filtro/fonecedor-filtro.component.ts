import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FormGroupModule } from '../../../../core/services/Module/form.module';
import { ConsumirApi } from '../../../../core/services/Utils/consome-api.serivce';
import { CidadeModel } from '../../../../core/model/cidade.model';
import { EstadoModel } from '../../../../core/model/estado.model';

@Component({
  selector: 'app-fonecedor-filtro',
  standalone: true,
  imports: [MatDialogModule, FormGroupModule],
  templateUrl: './fonecedor-filtro.component.html',
  styleUrl: './fonecedor-filtro.component.css',
})
export class FonecedorFiltroComponent implements OnInit {
  filtroForm!: FormGroup;
  listCidades!: CidadeModel[];
  listEstados!: EstadoModel[];
  ngOnInit(): void {
    this.filtroForm = new FormGroup({
      nome: new FormControl(''),
      cnpj: new FormControl(''),
      cidade: new FormControl(''),
    });
    ConsumirApi.BuscaEstados().then((result) => {
      this.listEstados = result;
    });
  }
  carregarCidade(idEstado: number) {
    ConsumirApi.BuscaCidade(idEstado).then((result) => {
      this.listCidades = result;
    });
  }
}
