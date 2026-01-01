import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../core/services/Module/shared.module';
import { UsuarioserviceService } from '../../services/usuarioservice.service';
import { UsuarioModel } from '../../models/usuario.model';
import { Paginacao } from '../../../../core/model/paginacao.mode';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
  standalone: true,
  imports: [SharedModule],
})
export class ListaUsuairoComponent implements OnInit {
  displayedColumns: string[] = [
    'btnEditar',
    'fAtivo',
    'nome',
    'tipoProduto',
    'descricao',
    'marca',
    'qtd',
    'dthCadastro',
  ];
  paginacaoProduto: Paginacao<UsuarioModel, UsuarioModel> = new Paginacao<
    UsuarioModel,
    UsuarioModel
  >();
  dataSource!: MatTableDataSource<UsuarioModel>;

  constructor(private service: UsuarioserviceService, public _pipe: DatePipe) {}
  ngOnInit(): void {}
  editarUsuario(usuairo?: UsuarioModel) {
    this.service.abrirModalCadastro(usuairo);
  }
  inativarUsuario(usuairo: UsuarioModel) {}
  abrirModalPesquisa() {}
}
