import { Component, OnInit } from '@angular/core';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { TabelaPaginada } from '../../../../../core/Abstract/TabelaPaginada';
import { TabelaPrecoModel } from '../../../models/TabelaPreco/tabela-preco.model';
import { FiltroTabelaPreco } from '../../../models/TabelaPreco/tabela-preco-filtro.model';
import { TabelaPrecoService } from '../../../services/tabela-preco.service';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { DatePipe } from '@angular/common';
import {
  enumToArrayOrigemTabelaPreco,
  OrigemTabelaPreco,
} from '../../../Enum/OrigemTabelaPreco.enum';

@Component({
    selector: 'app-tabela-preco',
    imports: [SharedModule],
    templateUrl: './tabela-preco.component.html',
    styleUrl: './tabela-preco.component.css'
})
export class TabelaPrecoComponent
  extends TabelaPaginada<TabelaPrecoModel, FiltroTabelaPreco>
  implements OnInit
{
  constructor(
    private service: TabelaPrecoService,
    public _pipe: DatePipe,
  ) {
    super();
  }

  override displayedColumns: string[] = [
    'btn',
    'descTabelaPreco',
    'dtInicioVigencia',
    'dtFimVigencia',
    'idOrigemTabelaPreco',
    // 'idReferenciaOrigem',
    'dtCadastro',
    'dtAtualizacao',
  ];
  origemTabelaPreco = OrigemTabelaPreco;
  ngOnInit(): void {
    this.iniciarFiltro();
  }
  override carregarDados(): void {
    this.paginacao.filtro = this.filtroPagina;
    this.service.buscarTabelaPrecoPaginada(this.paginacao).subscribe({
      next: (ret) => {
        this.atualizouDados(ret);
      },
    });
  }
  override iniciarFiltro(): void {
    if (!this.filtroPagina) {
      this.filtroPagina = {
        descTabelaPreco: '',
        idOrigemTabelaPreco: -1,
        dtInicialPesquisaInicioVigencia: new Date(),
        dtFimPesquisaInicioVigencia: new Date(),
      };
      this.filtroPagina.dtFimPesquisaInicioVigencia.setMonth(2);
    }
    this.carregarDados();
  }
  override editar(dado?: TabelaPrecoModel | undefined): void {
    this.service.abrirModalCadastroTabelaPreco(dado).subscribe({
      next: (ret) => {
        this.carregarDados();
      },
    });
  }
  override inativar(dado: TabelaPrecoModel): void {
    this.service.abrirModalInativarTabela(dado).subscribe({
      next: (ret) => {
        if (ret) {
          this.service.inativarTabelaPreco(dado).subscribe({
            next: (ret) => {
              this.iniciarFiltro();
            },
          });
        }
      },
    });
  }
  override abrirModalPesquisa(): void {
    this.service.abrirModalPesquisaTabela(this.filtroPagina).subscribe({
      next: (ret) => {
        if (ret) {
          this.filtroPagina = ret;
        }
        this.carregarDados();
      },
    });
  }
}
