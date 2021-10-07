import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlistaNewsComponent } from './enlista-news.component';

describe('EnlistaNewsComponent', () => {
  let component: EnlistaNewsComponent;
  let fixture: ComponentFixture<EnlistaNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnlistaNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlistaNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
