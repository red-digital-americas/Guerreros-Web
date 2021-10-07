import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistaProgramasApoyoComponent } from './enlista-programas-apoyo.component';

describe('EnlistaProgramasApoyoComponent', () => {
  let component: EnlistaProgramasApoyoComponent;
  let fixture: ComponentFixture<EnlistaProgramasApoyoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistaProgramasApoyoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlistaProgramasApoyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
