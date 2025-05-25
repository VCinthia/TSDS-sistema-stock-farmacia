import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCerrarSesionComponent } from './dialogo-cerrar-sesion.component';

describe('DialogoCerrarSesionComponent', () => {
  let component: DialogoCerrarSesionComponent;
  let fixture: ComponentFixture<DialogoCerrarSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoCerrarSesionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoCerrarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
