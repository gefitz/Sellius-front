import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ClienteModel } from '../../../models/cliente.model';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogInativarComponent } from '../dialog-inativar/dialog-inativar.component';
import { ClienteService } from '../../../services/cliente.service';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { ClienteFiltro } from '../../../models/cliente-filtro.model';
import { ClienteTabela } from '../../../models/cliente-tabela.model';
import { DialogFiltroComponent } from '../dialog-filtro/dialog-filtro.component';
import { ClientesCadastroComponent } from '../clientes-cadastro/clientes-cadastro.component';
import { SharedModule } from '../../../../../core/services/Module/shared.module';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, SharedModule],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css',
})
export class ClientesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'btnEditar',
    'fAtivo',
    'nome',
    'razao',
    'cpf_cnpj',
    'telefone',
    'email',
    'cep',
    'cidade',
    'rua',
    'dthCadastro',
    'dthAlteracao',
  ];
  paginacaoCliente: Paginacao<ClienteTabela, ClienteFiltro> = new Paginacao<
    ClienteTabela,
    ClienteFiltro
  >();
  dataSource!: MatTableDataSource<ClienteTabela>;
  clienteFiltro: ClienteFiltro = {
    nome: '',
    documento: '',
    cidadeId: 0,
    fAtivo: -1,
    empresaId: 0,
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.carregarFiltro(this.clienteFiltro);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacaoCliente.paginaAtual = event.pageIndex + 1;
      this.paginacaoCliente.tamanhoPagina = event.pageSize;
      this.carregarFiltro(this.clienteFiltro);
    });
  }

  editarCliente(cliente: ClienteModel) {
    this.router.navigateByUrl('/Cliente/Cadastro', {
      state: { cliente },
    });
  }
  abrirDialog() {
    var ret = this.dialog.open(ClientesCadastroComponent, {
      panelClass: `md-large`,
    });
  }

  inativarCliente(cliente: ClienteModel) {
    const dialog = this.dialog.open(DialogInativarComponent, {
      data: cliente,
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.clienteService.inativarCliente(cliente.id).subscribe({
          next: () => this.carregarFiltro(this.clienteFiltro),
        });
      }
    });
  }

  abrirModalPesquisa() {
    const dialog = this.dialog.open(DialogFiltroComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.clienteFiltro = result;
        this.carregarFiltro(this.clienteFiltro);
      }
    });
  }

  carregarClientes() {
    this.paginacaoCliente.filtro = this.clienteFiltro;
    this.clienteService.listarClientes(this.paginacaoCliente).subscribe({
      next: (ret) => {
        this.paginacaoCliente = ret;
        this.paginacaoToPaginator();
        this.dataSource = new MatTableDataSource<ClienteTabela>(
          this.paginacaoCliente.dados
        );
      },
    });
  }

  carregarFiltro(filtro: ClienteFiltro) {
    if (filtro != null) {
      this.clienteFiltro = filtro;
    } else {
      this.clienteFiltro = {
        nome: '',
        documento: '',
        cidadeId: 0,
        fAtivo: -1,
        empresaId: 0,
      };
    }
    this.carregarClientes();
  }

  private paginacaoToPaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = this.paginacaoCliente.paginaAtual - 1;
      this.paginator.length = this.paginacaoCliente.totalRegistros;
    }
  }
}
