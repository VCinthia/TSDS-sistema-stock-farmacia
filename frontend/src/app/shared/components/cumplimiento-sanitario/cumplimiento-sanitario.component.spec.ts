import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CumplimientoSanitarioComponent } from './cumplimiento-sanitario.component';

describe('CumplimientoSanitarioComponent', () => {
  let component: CumplimientoSanitarioComponent;
  let fixture: ComponentFixture<CumplimientoSanitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CumplimientoSanitarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CumplimientoSanitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
