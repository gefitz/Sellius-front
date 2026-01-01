import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoModel } from '../../model/estado.model';
import { ResponseApiModel } from '../../model/ResponseApi.model';
import { CidadeModel } from '../../model/cidade.model';
import { ApiService } from '../Api/api.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Viacep {
  constructor(public http: HttpClient, private apiInterna: ApiService) {}

  static async BuscaCep(cep: string) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error('Erro ao buscar CEP');
    }
    const ret = await response.json();
    let estados: EstadoModel[] = [];
    await this.BuscaEstados()
      .then((data) => {
        estados = data;
      })
      .catch((error) => {
        throw error;
      });

    const estado = estados.find((estado) => estado.sigla === ret.uf);
    let cidades: CidadeModel[] = [];
    await this.BuscaCidade(estado?.id || 0).then((data) => {
      cidades = data;
    });
    const cidade = cidades.find(
      (cidade) =>
        cidade.cidade.toLocaleLowerCase() == ret.localidade.toLocaleLowerCase()
    );
    return { estado: estado?.id, cidade: cidade?.id, rua: ret.logradouro };
  }
  static async BuscaEstados() {
    const response = await fetch(
      environment.apiUrl + '/api/recuperaTodosEstados'
    );

    const respo: ResponseApiModel<EstadoModel[]> = await response.json();
    if (respo.success) {
      return respo.data;
    }
    throw new Error(respo.errorMessage);
  }
  static async BuscaCidade(estadoId: number) {
    const response = await fetch(
      environment.apiUrl + '/api/recuperaCidades?idEstado=' + estadoId
    );
    const respo: ResponseApiModel<CidadeModel[]> = await response.json();
    if (respo.success) {
      return respo.data;
    }
    throw new Error(respo.errorMessage);
  }
}
