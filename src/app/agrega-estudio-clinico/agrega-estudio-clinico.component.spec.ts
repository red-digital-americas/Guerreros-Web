import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaEstudioClinicoComponent } from './agrega-estudio-clinico.component';

describe('AgregaEstudioClinicoComponent', () => {
  let component: AgregaEstudioClinicoComponent;
  let fixture: ComponentFixture<AgregaEstudioClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaEstudioClinicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaEstudioClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
