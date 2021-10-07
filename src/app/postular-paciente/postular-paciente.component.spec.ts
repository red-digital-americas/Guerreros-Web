import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostularPacienteComponent } from './postular-paciente.component';

describe('PostularPacienteComponent', () => {
  let component: PostularPacienteComponent;
  let fixture: ComponentFixture<PostularPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostularPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostularPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
