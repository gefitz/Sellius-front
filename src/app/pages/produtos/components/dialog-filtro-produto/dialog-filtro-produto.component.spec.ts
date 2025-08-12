import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFiltroProdutoComponent } from './dialog-filtro-produto.component';

describe('DialogFiltroProdutoComponent', () => {
  let component: DialogFiltroProdutoComponent;
  let fixture: ComponentFixture<DialogFiltroProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFiltroProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFiltroProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
