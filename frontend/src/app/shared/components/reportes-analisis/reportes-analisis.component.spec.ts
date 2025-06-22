import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesAnalisisComponent } from './reportes-analisis.component';

describe('RepotesAnalisisComponent', () => {
  let component: ReportesAnalisisComponent;
  let fixture: ComponentFixture<ReportesAnalisisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesAnalisisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesAnalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
