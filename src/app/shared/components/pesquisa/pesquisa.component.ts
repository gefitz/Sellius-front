import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
import { Observable, Subject } from 'rxjs';

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
  ],
  standalone: true,
})
export class PesquisaComponent<tabela, filtro> implements OnInit {
  protected paginacao: Paginacao<tabela, filtro> = new Paginacao<
    tabela,
    filtro
  >();
  dataSource!: MatTableDataSource<any>;
  modelFiltro!: filtro;
  eventFiltro!: Observable<filtro>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private api: ApiService,
    private dialogRef: MatDialogRef<PesquisaComponent<tabela, filtro>>,
    @Inject(MAT_DIALOG_DATA) public pesquisa: PesquisaModel,
  ) {}
  ngOnInit(): void {
    this.modelFiltro = this.pesquisa.modelFiltro;
    // const eventFiltro = this.pesquisa.eventFiltro;
    this.paginacao.filtro = this.modelFiltro;

    this.eventFiltro = this.pesquisa.eventFiltro as Subject<filtro>;

    if (this.eventFiltro) {
      this.eventFiltro.subscribe((filtro) => {
        this.modelFiltro = filtro;
        this.carregarTabela();
      });
    }
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
  abrirModalFiltro() {
    (this.eventFiltro as Subject<filtro>).next(this.modelFiltro);
  }
}
