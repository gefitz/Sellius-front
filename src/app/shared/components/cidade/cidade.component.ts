import {
  Component,
  Input,
  OnChanges,
  Optional,
  Self,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../../core/services/Api/api.service';
import { CidadeModel } from '../../../core/model/cidade.model';

import { FormGroupModule } from '../Module/form.module';
import { Viacep } from '../../../core/services/Utils/consome-api.serivce';

@Component({
  selector: 'app-cidade-select',
  templateUrl: './cidade.component.html',
  styleUrl: './cidade.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CidadeComponent),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => CidadeComponent),
    },
  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule
],
  standalone: true,
})
export class CidadeComponent
  implements ControlValueAccessor, MatFormFieldControl<number | null>, OnChanges
{
  @Input() idEstado: number = 0;

  cidades: CidadeModel[] = [];
  private _value: number | null = null;

  disabled = false;
  focused = false;
  stateChanges = new Subject<void>();
  private destroy$ = new Subject<void>();

  // MatFormFieldControl props mínimas necessárias
  readonly id = `cidade-select-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
  placeholder = 'Cidade';
  ngControl: NgControl | null = null;
  focusedChange = false;
  errorState = false;
  userAriaDescribedBy?: string;

  get empty() {
    return this._value == null;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get value(): number | null {
    return this._value;
  }
  set value(v: number | null) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
      this.stateChanges.next();
    }
  }

  required!: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  disableAutomaticLabeling?: boolean | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idEstado'] && this.idEstado && this.idEstado != -1) {
      this.carregarCidades();
    } else if (changes['idEstado'] && !this.idEstado) {
      this.cidades = [];
      this.value = null;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stateChanges.complete();
  }

  private carregarCidades(): void {
    // Reset antes de carregar novas cidades
    this.value = null;
    Viacep.BuscaCidade(this.idEstado).then((rep) => {
      this.cidades = rep;
    });
  }

  // ─── ControlValueAccessor ────────────────────────────────────────
  onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this._value = value;
    this.stateChanges.next();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ─── MatFormFieldControl mínimos necessários ─────────────────────
  onContainerClick(event: MouseEvent): void {
    // Pode deixar vazio ou focar o select se quiser
  }

  setDescribedByIds(ids: string[]): void {
    this.userAriaDescribedBy = ids.join(' ');
  }
}
