import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Subject } from 'rxjs';
import { ApiService } from '../../../core/services/Api/api.service';
import { EstadoModel } from '../../../core/model/estado.model';

@Component({
  selector: 'app-estado-select',
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EstadoComponent,
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: EstadoComponent,
    },
  ],
  imports: [MatFormFieldModule, MatSelectModule],
  standalone: true,
})
export class EstadoComponent
  implements
    ControlValueAccessor,
    MatFormFieldControl<number | null>,
    OnDestroy,
    OnInit
{
  estados: EstadoModel[] = [];
  private _value: number | null = null;

  disabled = false;
  focused = false;
  stateChanges = new Subject<void>();
  private destroy$ = new Subject<void>();

  readonly id = `estado-select-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
  placeholder = 'Estado';

  // Propriedades obrigatórias do MatFormFieldControl
  ngControl: NgControl | null = null; // não injetamos manualmente
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

  constructor(private api: ApiService) {
    this.carregarEstados();
  }
  required!: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  disableAutomaticLabeling?: boolean | undefined;

  ngOnInit(): void {}
  private carregarEstados(): void {
    this.value = null;
    this.estados = [];

    this.api.get<EstadoModel[]>('/recuperaTodosEstados').subscribe({
      next: (estados) => {
        this.estados = estados ?? [];
      },
      error: () => {
        this.estados = [];
        console.error('Erro ao carregar estados');
      },
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
    this.stateChanges.next();
  }

  // ─── MatFormFieldControl mínimos necessários ─────────────────────
  onContainerClick(event: MouseEvent): void {
    // Opcional: focar o select se quiser
  }

  setDescribedByIds(ids: string[]): void {
    this.userAriaDescribedBy = ids.join(' ');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stateChanges.complete();
  }
}
