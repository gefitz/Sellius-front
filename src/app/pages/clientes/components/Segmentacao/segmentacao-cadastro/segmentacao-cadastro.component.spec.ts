import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentacaoCadastroComponent } from './segmentacao-cadastro.component';

describe('SegmentacaoCadastroComponent', () => {
  let component: SegmentacaoCadastroComponent;
  let fixture: ComponentFixture<SegmentacaoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentacaoCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
