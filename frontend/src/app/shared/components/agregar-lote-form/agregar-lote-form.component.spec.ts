import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLoteFormComponent } from './agregar-lote-form.component';

describe('AgregarLoteFormComponent', () => {
  let component: AgregarLoteFormComponent;
  let fixture: ComponentFixture<AgregarLoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarLoteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarLoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
