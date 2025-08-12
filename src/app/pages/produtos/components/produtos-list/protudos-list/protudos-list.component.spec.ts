import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtudosListComponent } from './protudos-list.component';

describe('ProtudosListComponent', () => {
  let component: ProtudosListComponent;
  let fixture: ComponentFixture<ProtudosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProtudosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtudosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
