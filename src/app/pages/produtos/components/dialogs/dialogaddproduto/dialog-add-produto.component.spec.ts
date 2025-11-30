import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogaddprodutoComponent } from './dialog-add-produto.component';

describe('DialogaddprodutoComponent', () => {
  let component: DialogaddprodutoComponent;
  let fixture: ComponentFixture<DialogaddprodutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogaddprodutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogaddprodutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
