import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Viacep } from '../../../../core/services/Utils/consome-api.serivce';
import { CidadeModel } from '../../../../core/model/cidade.model';
import { EstadoModel } from '../../../../core/model/estado.model';
import { SharedModule } from '../../../../shared/components/Module/shared.module';

@Component({
    selector: 'app-fonecedor-filtro',
    imports: [SharedModule],
    templateUrl: './fonecedor-filtro.component.html',
    styleUrls: [
        '/src/app/shared/styles/modal-styles.css',
        './fonecedor-filtro.component.css',
    ]
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
    Viacep.BuscaEstados().then((result) => {
      this.listEstados = result;
    });
  }
  carregarCidade(idEstado: number) {
    Viacep.BuscaCidade(idEstado).then((result) => {
      this.listCidades = result;
    });
  }
}
