import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/Api/api.service';
import { ClienteModel } from '../models/cliente.model';
import { Paginacao } from '../../../core/model/paginacao.mode';
import { Observable } from 'rxjs';
import { ClienteTabela } from '../models/cliente-tabela.model';
import { ClienteFiltro } from '../models/cliente-filtro.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = '/Cliente';
  constructor(private api: ApiService) {}

  listarClientes(paginacao: Paginacao<ClienteTabela, ClienteFiltro>) {
    return this.api.post<Paginacao<ClienteTabela, ClienteFiltro>>(
      this.apiUrl + '/obterClientes',
      paginacao
    );
  }

  cadastrarCliente(cliente: ClienteModel) {
    return this.api.post<ClienteModel>(this.apiUrl, cliente);
  }

  editarCliente(cliente: ClienteModel) {
    return this.api.put<ClienteModel>(this.apiUrl, cliente);
  }

  inativarCliente(id: number) {
    return this.api.delete<any>(`${this.apiUrl}?id=${id}`);
  }

  obterClientePorId(id: number) {
    return this.api.get<ClienteModel>(`${this.apiUrl}?id=${id}`);
  }
}
