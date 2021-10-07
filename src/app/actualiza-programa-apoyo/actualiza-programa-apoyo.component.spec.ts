import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaProgramaApoyoComponent } from './actualiza-programa-apoyo.component';

describe('ActualizaProgramaApoyoComponent', () => {
  let component: ActualizaProgramaApoyoComponent;
  let fixture: ComponentFixture<ActualizaProgramaApoyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizaProgramaApoyoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizaProgramaApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
