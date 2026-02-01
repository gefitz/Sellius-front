import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FiltroTabelaPreco } from '../../../models/TabelaPreco/tabela-preco-filtro.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { enumToArrayOrigemTabelaPreco } from '../../../Enum/OrigemTabelaPreco.enum';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  BRAZIL_DATE_FORMATS,
  MY_DATE_FORMATS,
} from '../../../../../core/Abstract/BrasilDateFormats';

@Component({
    selector: 'app-tabela-preco-filtro',
    imports: [SharedModule, MatDialogModule, MatDatepickerModule],
    templateUrl: './tabela-preco-filtro.component.html',
    styleUrls: [
        './tabela-preco-filtro.component.css',
        '/src/app/shared/styles/modal-styles.css',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // ← importante!
        { provide: MY_DATE_FORMATS, useValue: BRAZIL_DATE_FORMATS },
    ]
})
export class TabelaPrecoFiltroComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private date: FiltroTabelaPreco,
    private matRef: MatDialogRef<TabelaPrecoFiltroComponent>,
  ) {}
  formFiltro!: FormGroup;
  listaOrigemTabelaPreco = enumToArrayOrigemTabelaPreco();

  ngOnInit(): void {
    this.inicarFiltro();
  }
  inicarFiltro() {
    this.formFiltro = new FormGroup({
      descTabelaPreco: new FormControl(this.date.descTabelaPreco),
      idOrigemTabelaPreco: new FormControl(this.date.idOrigemTabelaPreco),
      dtInicialPesquisaInicioVigencia: new FormControl(
        this.date.dtInicialPesquisaInicioVigencia,
      ),
      dtFimPesquisaInicioVigencia: new FormControl(
        this.date.dtFimPesquisaInicioVigencia,
      ),
    });
  }
}
