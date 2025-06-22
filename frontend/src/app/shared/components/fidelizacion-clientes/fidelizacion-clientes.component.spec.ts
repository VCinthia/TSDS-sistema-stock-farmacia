import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelizacionClientesComponent } from './fidelizacion-clientes.component';

describe('FidelizacionClientesComponent', () => {
  let component: FidelizacionClientesComponent;
  let fixture: ComponentFixture<FidelizacionClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FidelizacionClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FidelizacionClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
