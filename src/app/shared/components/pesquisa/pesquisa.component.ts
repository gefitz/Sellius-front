import {
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EventEmitter } from 'stream';
import { ApiService } from '../../../core/services/Api/api.service';
import { Paginacao } from '../../../core/model/paginacao.mode';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PesquisaModel } from './model/pesquisa.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { CustomPaginator } from '../../../core/services/Utils/paginator-edit';
import { SharedModule } from '../Module/shared.module';

@Component({
    selector: 'pesquisa-component',
    templateUrl: './pesquisa.component.html',
    styleUrls: ['./pesquisa.component.css'],
    imports: [SharedModule, MatDialogModule, MatTableModule, MatPaginatorModule],
    providers: [
        {
            provide: MatPaginatorIntl,
            useFactory: CustomPaginator,
        },
    ]
})
export class PesquisaComponent<tabela, filtro> implements OnInit {
  paginacao: Paginacao<tabela, filtro> = new Paginacao<tabela, filtro>();
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    private dialogRef: MatDialogRef<PesquisaComponent<tabela, filtro>>,
    @Inject(MAT_DIALOG_DATA) public pesquisa: PesquisaModel
  ) {}
  ngOnInit(): void {
    this.carregarTabela();
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.paginacao.paginaAtual = event.pageIndex + 1;
      this.paginacao.tamanhoPagina = event.pageSize;
      this.carregarTabela();
    });
  }
  carregarTabela() {
    this.api
      .post<Paginacao<tabela, filtro>>(this.pesquisa.urlChamada, this.paginacao)
      .subscribe({
        next: (ret) => {
          this.paginacao = ret;
          this.paginacaoToPaginator();
          this.dataSource = new MatTableDataSource(this.paginacao.dados);
        },
      });
  }
  private paginacaoToPaginator() {
    if (this.paginator) {
      this.paginator.pageIndex = this.paginacao.paginaAtual - 1;
      this.paginator.length = this.paginacao.totalRegistros;
      this.paginator.pageSize = this.paginacao.tamanhoPagina;
    }
  }
  closeDialog(row: any) {
    this.dialogRef.close(row);
  }
}
