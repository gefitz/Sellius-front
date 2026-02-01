import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPrecoXProdutoListaComponent } from './tabela-preco-x-produto-lista.component';

describe('TabelaPrecoXProdutoListaComponent', () => {
  let component: TabelaPrecoXProdutoListaComponent;
  let fixture: ComponentFixture<TabelaPrecoXProdutoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaPrecoXProdutoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaPrecoXProdutoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
