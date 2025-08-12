import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInativacaoComponent } from './dialog-inativacao.component';

describe('DialogInativacaoComponent', () => {
  let component: DialogInativacaoComponent;
  let fixture: ComponentFixture<DialogInativacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInativacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInativacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
