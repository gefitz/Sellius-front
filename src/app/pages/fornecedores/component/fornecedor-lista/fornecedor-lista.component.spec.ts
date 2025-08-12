import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorListaComponent } from './fornecedor-lista.component';

describe('FornecedorListaaComponent', () => {
  let component: FornecedorListaComponent;
  let fixture: ComponentFixture<FornecedorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedorListaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FornecedorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
