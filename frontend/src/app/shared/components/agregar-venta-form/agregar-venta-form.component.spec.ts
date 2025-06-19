import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVentaFormComponent } from './agregar-venta-form.component';

describe('AgregarVentaFormComponent', () => {
  let component: AgregarVentaFormComponent;
  let fixture: ComponentFixture<AgregarVentaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarVentaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarVentaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
