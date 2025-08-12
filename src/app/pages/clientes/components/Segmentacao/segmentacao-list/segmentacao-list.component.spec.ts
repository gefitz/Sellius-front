import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentacaoListComponent } from './segmentacao-list.component';

describe('SegmentacaoListComponent', () => {
  let component: SegmentacaoListComponent;
  let fixture: ComponentFixture<SegmentacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentacaoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
