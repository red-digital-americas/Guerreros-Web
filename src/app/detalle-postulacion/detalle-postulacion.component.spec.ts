import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePostulacionComponent } from './detalle-postulacion.component';

describe('DetallePostulacionComponent', () => {
  let component: DetallePostulacionComponent;
  let fixture: ComponentFixture<DetallePostulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePostulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
