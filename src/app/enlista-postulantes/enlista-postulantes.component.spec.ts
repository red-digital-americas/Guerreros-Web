import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistaPostulantesComponent } from './enlista-postulantes.component';

describe('EnlistaPostulantesComponent', () => {
  let component: EnlistaPostulantesComponent;
  let fixture: ComponentFixture<EnlistaPostulantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistaPostulantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlistaPostulantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
