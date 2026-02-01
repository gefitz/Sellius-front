import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import {
  AbstractControlDirective,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormField,
  MatLabel,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Viacep } from '../../../core/services/Utils/consome-api.serivce';
import { MatInputModule } from '@angular/material/input';
import { FormGroupModule } from '../Module/form.module';

@Component({
    selector: 'input-cep',
    templateUrl: './cep.component.html',
    styleUrls: ['./cep.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CepComponent),
            multi: true,
        },
        {
            provide: MatFormFieldControl,
            useExisting: forwardRef(() => CepComponent),
        },
    ],
    imports: [MatFormField, MatLabel, FormGroupModule, MatInputModule]
})
export class CepComponent
  implements
    ControlValueAccessor,
    MatFormFieldControl<string>,
    AfterViewInit,
    OnDestroy
{
  // Para armazenar o valor cru (só números) e o valor formatado (para display)
  private _value: string = ''; // Valor cru: '12345678'
  public _displayValue: string = ''; // Valor formatado: '12345-678'

  // Inputs/Outputs
  @Input() cep: string = ''; // Opcional, se quiser binding manual (mas com formControlName não precisa)
  @Output() resposta = new EventEmitter<any>(); // Emite o objeto de endereço

  // Para MatFormFieldControl
  stateChanges = new Subject<void>();
  focused = false;
  id = `cep-${Math.random().toString(36).substr(2, 9)}`;
  private _disabled = false;
  private _required = false;
  private _placeholder = 'CEP';

  @ViewChild('input', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  constructor(
    private _focusMonitor: FocusMonitor,
    private _elRef: ElementRef<HTMLElement>
  ) {}
  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this.inputElement).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }
  ngControl!: NgControl | AbstractControlDirective | null;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this.inputElement);
  }

  // Método de entrada do form (escreve o valor inicial ou patchValue)
  writeValue(value: string | null): void {
    this._value = this.removeFormatacao(value ?? '');
    this._displayValue = this.formatarCep(this._value);
    this.stateChanges.next();
  }

  // Handler do input: formata, atualiza valor, busca se completo
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let val = this.removeFormatacao(input.value); // Remove formatação antiga

    // Limita a 8 dígitos numéricos
    val = val.replace(/\D/g, '').substring(0, 8);

    this._value = val;
    this._displayValue = this.formatarCep(val);
    input.value = this._displayValue; // Atualiza o display no input

    this.onChange(this._displayValue); // Notifica o form (envia formatado ou cru? Aqui envia formatado)
    this.stateChanges.next();

    // Busca automática se tiver exatamente 8 dígitos
    if (val.length === 8) {
      this.buscarCep(val);
    }
  }

  // Função de formatação: adiciona hífen
  private formatarCep(cep: string): string {
    if (cep.length > 5) {
      return cep.substring(0, 5) + '-' + cep.substring(5);
    }
    return cep;
  }

  // Remove hífen e não-dígitos
  private removeFormatacao(cep: string): string {
    return cep.replace(/\D/g, '');
  }

  // Busca o CEP e emite o objeto
  private buscarCep(cep: string): void {
    Viacep.BuscaCep(cep)
      .then((data: any) => {
        // Assumindo que data é { logradouro, bairro, localidade, uf, ... }
        this.resposta.emit(data); // Emite para o pai
      })
      .catch((error) => {
        console.error('Erro ao buscar CEP:', error);
        this.resposta.emit({ erro: 'CEP inválido ou não encontrado' }); // Opcional: emite erro para o pai
      });
  }

  // Métodos do ControlValueAccessor
  onChange: (value: string) => void = () => {};
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouched: () => void = () => {};
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.stateChanges.next();
  }

  // Métodos do MatFormFieldControl
  get value(): string {
    return this._displayValue;
  } // Retorna formatado para o form

  get empty() {
    return !this._value;
  }
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input() get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input() get required() {
    return this._required;
  }
  set required(req: any) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input() get disabled() {
    return this._disabled;
  }
  set disabled(dis: any) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return false;
  } // Implemente se quiser erros (ex: via ngControl)

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this.inputElement.nativeElement.focus();
    }
  }

  setDescribedByIds(ids: string[]): void {
    this.inputElement.nativeElement.setAttribute(
      'aria-describedby',
      ids.join(' ')
    );
  }
}
