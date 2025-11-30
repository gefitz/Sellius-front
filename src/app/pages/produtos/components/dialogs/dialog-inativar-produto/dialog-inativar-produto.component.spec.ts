import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInativarProdutoComponent } from './dialog-inativar-produto.component';

describe('DialogInativarProdutoComponent', () => {
  let component: DialogInativarProdutoComponent;
  let fixture: ComponentFixture<DialogInativarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInativarProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInativarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
