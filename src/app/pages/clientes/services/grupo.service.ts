import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { GrupoModel } from '../models/grupo.model';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { Observable } from 'rxjs';
import { GrupoTabela } from '../models/grupo-tabela.model';
import { GrupoFiltro } from '../models/grupo-filtro.model';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private apiUrl = '/GrupoCliente';
  constructor(private api: ApiService) {}

  listarGrupos(paginacao: Paginacao<GrupoTabela, GrupoFiltro>) {
    return this.api.post<Paginacao<GrupoTabela, GrupoFiltro>>(
      this.apiUrl + '/listaGrupo',
      paginacao
    );
  }

  cadastrarGrupo(grupo: GrupoModel) {
    return this.api.post<GrupoModel>(this.apiUrl + '/novo', grupo);
  }

  editarGrupo(grupo: GrupoModel) {
    return this.api.put<GrupoModel>(this.apiUrl, grupo);
  }

  inativarGrupo(id: number) {
    return this.api.delete<any>(`${this.apiUrl}?id=${id}`);
  }

  obterGrupoPorId(id: number) {
    return this.api.get<GrupoModel>(`${this.apiUrl}?id=${id}`);
  }
}
