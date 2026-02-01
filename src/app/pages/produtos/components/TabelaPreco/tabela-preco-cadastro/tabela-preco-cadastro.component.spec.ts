import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPrecoCadastroComponent } from './tabela-preco-cadastro.component';

describe('TabelaPrecoCadastroComponent', () => {
  let component: TabelaPrecoCadastroComponent;
  let fixture: ComponentFixture<TabelaPrecoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaPrecoCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaPrecoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
