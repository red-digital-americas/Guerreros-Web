import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaEstudiosClinicosComponent } from './actualiza-estudios-clinicos.component';

describe('ActualizaEstudiosClinicosComponent', () => {
  let component: ActualizaEstudiosClinicosComponent;
  let fixture: ComponentFixture<ActualizaEstudiosClinicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaEstudiosClinicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaEstudiosClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
