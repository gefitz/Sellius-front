import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModalEditarCadastrarComponent } from './menu-modal-editar-cadastrar.component';

describe('MenuModalEditarCadastrarComponent', () => {
  let component: MenuModalEditarCadastrarComponent;
  let fixture: ComponentFixture<MenuModalEditarCadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuModalEditarCadastrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuModalEditarCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
