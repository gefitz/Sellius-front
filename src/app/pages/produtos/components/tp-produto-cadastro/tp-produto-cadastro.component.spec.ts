import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpProdutoCadastroComponent } from './tp-produto-cadastro.component';

describe('TpProdutoCadastroComponent', () => {
  let component: TpProdutoCadastroComponent;
  let fixture: ComponentFixture<TpProdutoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpProdutoCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpProdutoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
