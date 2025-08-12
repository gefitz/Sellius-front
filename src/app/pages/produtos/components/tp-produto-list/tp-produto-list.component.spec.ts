import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpProdutoListComponent } from './tp-produto-list.component';

describe('TpProdutoListComponent', () => {
  let component: TpProdutoListComponent;
  let fixture: ComponentFixture<TpProdutoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpProdutoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpProdutoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
