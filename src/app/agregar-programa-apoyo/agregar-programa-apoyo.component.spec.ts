import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProgramaApoyoComponent } from './agregar-programa-apoyo.component';

describe('AgregarProgramaApoyoComponent', () => {
  let component: AgregarProgramaApoyoComponent;
  let fixture: ComponentFixture<AgregarProgramaApoyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarProgramaApoyoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProgramaApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
