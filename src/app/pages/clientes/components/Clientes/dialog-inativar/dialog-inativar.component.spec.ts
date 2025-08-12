import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInativarComponent } from './dialog-inativar.component';

describe('DialogInativarComponent', () => {
  let component: DialogInativarComponent;
  let fixture: ComponentFixture<DialogInativarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogInativarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInativarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
