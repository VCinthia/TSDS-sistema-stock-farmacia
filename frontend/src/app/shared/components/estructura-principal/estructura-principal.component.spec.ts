import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraPrincipalComponent } from './estructura-principal.component';

describe('EstructuraPrincipalComponent', () => {
  let component: EstructuraPrincipalComponent;
  let fixture: ComponentFixture<EstructuraPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstructuraPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstructuraPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
