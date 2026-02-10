import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorXClienteComponent } from './fornecedor-x-cliente.component';

describe('FornecedorXClienteComponent', () => {
  let component: FornecedorXClienteComponent;
  let fixture: ComponentFixture<FornecedorXClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedorXClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedorXClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
