import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFiltroSegmentacaoComponent } from './dialog-filtro-segmentacao.component';

describe('DialogFiltroComponent', () => {
  let component: DialogFiltroSegmentacaoComponent;
  let fixture: ComponentFixture<DialogFiltroSegmentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFiltroSegmentacaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFiltroSegmentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
