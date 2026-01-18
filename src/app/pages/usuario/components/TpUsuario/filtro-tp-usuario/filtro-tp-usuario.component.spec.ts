import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTpUsuarioComponent } from './filtro-tp-usuario.component';

describe('FiltroTpUsuarioComponent', () => {
  let component: FiltroTpUsuarioComponent;
  let fixture: ComponentFixture<FiltroTpUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroTpUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroTpUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
