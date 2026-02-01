import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TabelaPrecoModel } from '../../../models/TabelaPreco/tabela-preco.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  enumToArrayOrigemTabelaPreco,
  OrigemTabelaPreco,
} from '../../../Enum/OrigemTabelaPreco.enum';
import { SharedModule } from '../../../../../shared/components/Module/shared.module';
import { TabelaPrecoService } from '../../../services/tabela-preco.service';
import { FornecedorService } from '../../../../fornecedores/services/fornecedor.service';
import { GrupoService } from '../../../../clientes/services/grupo.service';
import { TpProdutoService } from '../../../services/tp-produto.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  BRAZIL_DATE_FORMATS,
  MY_DATE_FORMATS,
} from '../../../../../core/Abstract/BrasilDateFormats';

@Component({
    selector: 'app-tabela-preco-cadastro',
    imports: [SharedModule, MatDatepickerModule],
    templateUrl: './tabela-preco-cadastro.component.html',
    styleUrls: [
        './tabela-preco-cadastro.component.css',
        '/src/app/shared/styles/modal-styles.css',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // ← importante!
        { provide: MY_DATE_FORMATS, useValue: BRAZIL_DATE_FORMATS },
    ]
})
export class TabelaPrecoCadastroComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TabelaPrecoModel,
    private service: TabelaPrecoService,
    private ref: MatDialogRef<TabelaPrecoCadastroComponent>,
    private serviceFornecedor: FornecedorService,
    private serviceGrupoCliente: GrupoService,
    private serviceTpProduto: TpProdutoService,
    private _pipe: DatePipe,
  ) {
    this.iniciarForm(data);
  }
  formTabelaPreco!: FormGroup;
  listaReferencia: { id: number; label: string }[] = [];
  listaOrigemTabelaPreco = enumToArrayOrigemTabelaPreco();

  iniciarForm(tabela: TabelaPrecoModel) {
    if (tabela) {
      this.formTabelaPreco = new FormGroup({
        id: new FormControl(tabela.id),
        descTabelaPreco: new FormControl(
          tabela.descTabelaPreco,
          Validators.required,
        ),
        dtInicioVigencia: new FormControl(
          tabela.dtInicioVigencia,
          Validators.required,
        ),
        dtFimVigencia: new FormControl(tabela.dtFimVigencia),
        idOrigemTabelaPreco: new FormControl(
          tabela.idOrigemTabelaPreco,
          Validators.required,
        ),
        idReferenciaOrigem: new FormControl(
          tabela.idReferenciaOrigem,
          Validators.required,
        ),
        dtCadastro: new FormControl(tabela.dtCadastro),
        dtAtualizodo: new FormControl(tabela.dtAtualizado),
      });
    } else {
      this.formTabelaPreco = new FormGroup({
        id: new FormControl(0),
        descTabelaPreco: new FormControl('', Validators.required),
        dtInicioVigencia: new FormControl(null, Validators.required),
        dtFimVigencia: new FormControl(null),
        idOrigemTabelaPreco: new FormControl(0, Validators.required),
        idReferenciaOrigem: new FormControl(0, Validators.required),
        dtCadastro: new FormControl(new Date()),
        dtAtualizodo: new FormControl(new Date()),
      });
    }
  }

  submitCadastro() {
    if (this.formTabelaPreco.value.id) {
      this.service.updateTabelaPreco(this.formTabelaPreco.value).subscribe({
        next: (ret) => {
          this.ref.close(true);
        },
      });
    } else {
      this.service.criarTabelaPreco(this.formTabelaPreco.value).subscribe({
        next: (ret) => {
          this.ref.close(true);
        },
      });
    }
  }

  preencherListaReferencia(event: any) {
    this.listaReferencia = [];
    const idOrigem = event.source.value;
    switch (idOrigem) {
      case OrigemTabelaPreco.Fornecedor:
        this.serviceFornecedor.carregarCombo().subscribe({
          next: (ret) => {
            ret.forEach((fornecedor) => {
              var referencia: { id: number; label: string };
              referencia = {
                id: fornecedor.id,
                label: fornecedor.nome,
              };

              this.listaReferencia.push(referencia);
            });
          },
        });
        break;
      case OrigemTabelaPreco.Grupo_Cliente:
        this.serviceGrupoCliente.carregarGrupo().subscribe({
          next: (ret) => {
            ret.forEach((grupo) => {
              var referencia: { id: number; label: string };
              referencia = {
                id: grupo.id,
                label: grupo.nome,
              };

              this.listaReferencia.push(referencia);
            });
          },
        });
        break;
      case OrigemTabelaPreco.Tipo_Produto:
        this.serviceTpProduto.carregarTpProdutoCombo().subscribe({
          next: (ret) => {
            ret.forEach((fornecedor) => {
              var referencia: { id: number; label: string };
              referencia = {
                id: fornecedor.id,
                label: fornecedor.descricao,
              };

              this.listaReferencia.push(referencia);
            });
          },
        });
        break;
    }
  }
}
