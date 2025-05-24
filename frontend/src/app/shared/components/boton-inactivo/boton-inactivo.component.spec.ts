import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonInactivoComponent } from './boton-inactivo.component';

describe('BotonInactivoComponent', () => {
  let component: BotonInactivoComponent;
  let fixture: ComponentFixture<BotonInactivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonInactivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonInactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
