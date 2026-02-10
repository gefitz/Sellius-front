import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/components/Module/shared.module';
import { TabelaPaginada } from '../../../../core/Abstract/TabelaPaginada';
import { ForncedorXCliente } from '../../models/fornecedor-x-cliente.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Paginacao } from '../../../../core/model/paginacao.mode';
import { FornecedorService } from '../../services/fornecedor.service';
import { DatePipe } from '@angular/common';
import { ForncedorXClienteFiltro } from '../../models/forncedor-x-cliente-filtro.model';
import { FornecedorModel } from '../../models/forncedor.model';
import { FornecedorFiltro } from '../../models/forncedor-filtro.model';
import { PesquisaComponent } from '../../../../shared/components/pesquisa/pesquisa.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fornecedor-x-cliente',
  imports: [SharedModule],
  templateUrl: './fornecedor-x-cliente.component.html',
  styleUrl: './fornecedor-x-cliente.component.css',
  standalone: true,
})
export class FornecedorXClienteComponent
  extends TabelaPaginada<ForncedorXCliente, ForncedorXClienteFiltro>
  implements OnInit
{
  @Input() idCliente: number = 0;
  @Input() idFornecedor: number = 0;
  constructor(
    private service: FornecedorService,
    public pipe: DatePipe,
    private snack: MatSnackBar,
  ) {
    super();
  }
  ngOnInit(): void {
    if (this.idFornecedor != 0) {
    } else if (this.idCliente != 0) {
      this.displayedColumns = [
        'btnEditar',
        'fAtivo',
        'nome',
        'cnpj',
        'telefone',
        'email',
        'Cidade',
        'dthCadastro',
        'dthAlteracao',
      ];
    }
    this.iniciarFiltro();
  }
  override carregarDados(): void {
    this.paginacao.filtro = this.filtroPagina;
    this.service.obterFornecedorXClientePagina(this.paginacao).subscribe({
      next: (ret) => {
        this.atualizouDados(ret);
      },
    });
  }
  override iniciarFiltro(): void {
    this.filtroPagina = {
      idCliente: this.idCliente,
      idFornecedor: this.idFornecedor,
    };
    this.carregarDados();
  }
  override editar(dado?: ForncedorXCliente | undefined): void {
    throw new Error('Method not implemented.');
  }
  override inativar(dado: ForncedorXCliente): void {
    this.service.removerVinculoFornecedorXCliente(dado).subscribe({
      next: (ret) => {
        this.carregarDados();
      },
    });
  }
  override abrirModalPesquisa(): void {
    throw new Error('Method not implemented.');
  }
  pesquisaFornecedor() {
    this.service.pesquisaFornecedor().subscribe({
      next: (ret) => {
        var fornecedorXCliente: ForncedorXClienteFiltro = {
          idCliente: this.idCliente,
          idFornecedor: ret.id,
        };
        this.service.adicionarFornecedorXCliente(fornecedorXCliente).subscribe({
          next: (ret) => {
            this.snack.open('Vinculado com sucesso', 'Ok', { duration: 5000 });
            this.carregarDados();
          },
        });
      },
    });
  }
}
