import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPrecoFiltroComponent } from './tabela-preco-filtro.component';

describe('TabelaPrecoFiltroComponent', () => {
  let component: TabelaPrecoFiltroComponent;
  let fixture: ComponentFixture<TabelaPrecoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaPrecoFiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaPrecoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
