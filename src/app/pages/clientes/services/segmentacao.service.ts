import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { SegmentacaoModel } from '../models/segmentacao.model';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { Observable } from 'rxjs';
import { SegmentacaoTabela } from '../models/segmentacao-tabela.model';
import { SegmentacaoFiltro } from '../models/segmentacao-filtro.model';

@Injectable({
  providedIn: 'root',
})
export class SegmentacaoService {
  private apiUrl = '/Segmentacao';
  constructor(private api: ApiService) {}

  listarSegmentacoes(
    paginacao: Paginacao<SegmentacaoTabela, SegmentacaoFiltro>
  ) {
    return this.api.post<Paginacao<SegmentacaoTabela, SegmentacaoFiltro>>(
      this.apiUrl + '/listaSegmentacao',
      paginacao
    );
  }

  cadastrarSegmentacao(segmentacao: SegmentacaoModel) {
    return this.api.post<SegmentacaoModel>(this.apiUrl + '/novo', segmentacao);
  }

  editarSegmentacao(segmentacao: SegmentacaoModel) {
    return this.api.put<SegmentacaoModel>(this.apiUrl, segmentacao);
  }

  inativarSegmentacao(id: number) {
    return this.api.delete<any>(`${this.apiUrl}?id=${id}`);
  }

  obterSegmentacaoPorId(id: number) {
    return this.api.get<SegmentacaoModel>(`${this.apiUrl}?id=${id}`);
  }
  carregarSegmentacao() {
    return this.api.get<SegmentacaoModel[]>(
      this.apiUrl + '/carregarComboSegmentacao'
    );
  }
}
