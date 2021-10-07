import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaPostulacionComponent } from './actualiza-postulacion.component';

describe('ActualizaPostulacionComponent', () => {
  let component: ActualizaPostulacionComponent;
  let fixture: ComponentFixture<ActualizaPostulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaPostulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaPostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
