import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistaEstudiosclinicossComponent } from './enlista-estudiosclinicoss.component';

describe('EnlistaEstudiosclinicossComponent', () => {
  let component: EnlistaEstudiosclinicossComponent;
  let fixture: ComponentFixture<EnlistaEstudiosclinicossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistaEstudiosclinicossComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlistaEstudiosclinicossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
