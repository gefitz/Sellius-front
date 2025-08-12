import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoCadastroComponent } from './grupo-cadastro.component';

describe('GrupoCadastroComponent', () => {
  let component: GrupoCadastroComponent;
  let fixture: ComponentFixture<GrupoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GrupoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
