import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonecedorFiltroComponent } from './fonecedor-filtro.component';

describe('FonecedorFiltroComponent', () => {
  let component: FonecedorFiltroComponent;
  let fixture: ComponentFixture<FonecedorFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonecedorFiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonecedorFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
