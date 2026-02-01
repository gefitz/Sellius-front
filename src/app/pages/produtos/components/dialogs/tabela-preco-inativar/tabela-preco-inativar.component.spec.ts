import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPrecoInativarComponent } from './tabela-preco-inativar.component';

describe('TabelaPrecoInativarComponent', () => {
  let component: TabelaPrecoInativarComponent;
  let fixture: ComponentFixture<TabelaPrecoInativarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaPrecoInativarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaPrecoInativarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
