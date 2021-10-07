import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitoaddusuarioComponent } from './exitoaddusuario.component';

describe('ExitoaddusuarioComponent', () => {
  let component: ExitoaddusuarioComponent;
  let fixture: ComponentFixture<ExitoaddusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitoaddusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitoaddusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
