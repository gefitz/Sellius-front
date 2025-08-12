import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomPaginator } from '../../../../core/services/Utils/paginator-edit';
import { FornecedorModel } from '../../models/forncedor.model';
import { Paginacao } from '../../../../core/model/paginacao.mode';
import { FornecedorService } from '../../services/fornecedor.service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { FornecedorCadastroComponent } from '../fornecedor-cadastro/fornecedor-cadastro.component';
import { FonecedorFiltroComponent } from '../fonecedor-filtro/fonecedor-filtro.component';

@Component({
  selector: 'app-fornecedor-lista',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: CustomPaginator,
    },
  ],
  templateUrl: './fornecedor-lista.component.html',
  styleUrl: './fornecedor-lista.component.css',
})
export class FornecedorListaComponent implements OnInit {
  displayedColumns: string[] = [
    'btnEditar',
    'id',
    'nome',
    'cnpj',
    'telefone',
    'email',
    'Cidade',
    'fAtivo',
    'dthCadastro',
    'dthAlteracao',
  ];
  paginacaoProduto: Paginacao<FornecedorModel, FornecedorModel> = new Paginacao<
    FornecedorModel,
    FornecedorModel
  >();
  dataSource!: MatTableDataSource<FornecedorModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private fornecedorFiltro!: FornecedorModel;
  constructor(
    public pipe: DatePipe,
    private service: FornecedorService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.carregarTabela();
  }

  abrirModalCadastro(fornecedor?: FornecedorModel) {
    const ret = this.dialog.open(FornecedorCadastroComponent, {
      data: fornecedor,
      panelClass: 'md-large',
    });
    ret.afterClosed().subscribe({
      next: (ret) => {
        if (ret) {
          this.carregarTabela();
        }
      },
      error: (error) => new Error(error.errorMessage),
    });
  }

  inativarProduto(fornecedor: FornecedorModel) {}

  abrirModalPesquisa() {
    const retFiltro = this.dialog.open(FonecedorFiltroComponent, {
      panelClass: 'md-medium',
    });
  }
  carregarTabela() {
    this.carregaFiltro();
    this.service.carregaTabelaFornecedor(this.paginacaoProduto).subscribe({
      next: (result) => {
        this.paginacaoProduto = result;
        this.paginacaoToPaginator();
        this.dataSource = new MatTableDataSource<FornecedorModel>(
          this.paginacaoProduto.dados
        );
      },
    });
  }
  private paginacaoToPaginator() {
    this.paginator.pageIndex = this.paginacaoProduto.paginaAtual - 1;
    this.paginator.length = this.paginacaoProduto.totalRegistros;
  }
  private carregaFiltro(filtro?: FornecedorModel) {
    if (filtro != null) {
      this.fornecedorFiltro = filtro;
    } else {
      this.fornecedorFiltro = {
        id: 0,
        nome: '',
        cnpj: '',
        telefone: '',
        email: '',
        fAtivo: -1, // -1 pode representar "todos" ou "sem filtro"
        dthCadastro: new Date(),
        dthAlteracao: new Date(),
        empresaId: 0,
        cidadeId: 0,
        cep: '',
        rua: '',
        complemento: '',
      };
    }
    this.paginacaoProduto.filtro = this.fornecedorFiltro;
  }
}
