import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonSecundarioComponent } from './boton-secundario.component';

describe('BotonSecundarioComponent', () => {
  let component: BotonSecundarioComponent;
  let fixture: ComponentFixture<BotonSecundarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonSecundarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonSecundarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
