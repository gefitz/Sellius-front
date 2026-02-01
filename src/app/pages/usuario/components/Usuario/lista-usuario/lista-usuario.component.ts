import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { UsuarioserviceService } from '../../../services/usuarioservice.service';
import { UsuarioModel } from '../../../models/Cadastro/usuario.model';
import { Paginacao } from '../../../../../core/model/paginacao.mode';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TabelaPaginada } from '../../../../../core/Abstract/TabelaPaginada';
import { UsuarioFiltro } from '../../../models/Filtros/usuario-filtro.model';
import { UsuarioTabela } from '../../../models/Tabela/usuario-tabela.model';

@Component({
  selector: 'lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
  imports: [SharedModule],
  standalone: true,
})
export class ListaUsuairoComponent
  extends TabelaPaginada<UsuarioTabela, UsuarioFiltro>
  implements OnInit
{
  constructor(
    private serivce: UsuarioserviceService,
    public _pipe: DatePipe,
  ) {
    super();
  }
  override displayedColumns: string[] = [
    `btnEditar`,
    `fAtivo`,
    `nome`,
    `tpUsuario`,
    `email`,
    `cidade`,
    `dtCadastro`,
    `dtAlteracao`,
  ];

  ngOnInit(): void {
    this.iniciarFiltro();
  }

  override carregarDados(): void {
    this.paginacao.filtro = this.filtroPagina;
    this.serivce.obterUsuarios(this.paginacao).subscribe({
      next: (ret) => {
        this.atualizouDados(ret);
      },
    });
  }

  override iniciarFiltro(): void {
    if (!this.filtroPagina) {
      this.filtroPagina = {
        nome: '',
        cidade: -1,
        estado: -1,
        cpf: '',
        fAtivo: -1,
        tpUsuario: -1,
      };
    }
    this.carregarDados();
  }

  override editar(dado?: UsuarioTabela): void {
    if (dado) {
      this.serivce.obterUsuarioById(dado).subscribe({
        next: (ret) => {
          this.serivce.abrirModalCadastro(ret);
        },
      });
    } else {
      this.serivce.abrirModalCadastro();
    }
  }

  override inativar(dado: UsuarioTabela): void {
    throw new Error('Method not implemented.');
  }

  override abrirModalPesquisa(): void {
    this.serivce.AbrirmodalPesquisa(this.filtroPagina).subscribe({
      next: (ret) => {
        if (ret) {
          this.filtroPagina = ret;
        }
        this.carregarDados();
      },
    });
  }
}
