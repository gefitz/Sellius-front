import { Injectable } from '@angular/core';
import { TpUsuarioConfiguracao } from '../models/tp-usuario-configuracao.model';
import { ApiService } from '../../../core/services/Api/api.service';

@Injectable({ providedIn: 'root' })
export class PermissaoUsuarioSerivce {
  private permissoe?: TpUsuarioConfiguracao;

  constructor(private api: ApiService) {}

  setContext(data: TpUsuarioConfiguracao) {}

  recuperaPermissao() {
    this.api.get('/Login/permissoes').subscribe({
      next: (ret) => {
        console.log(ret);
      },
    });
  }
}
