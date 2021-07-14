import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSalonComponent } from './guest-salon.component';

describe('GuestSalonComponent', () => {
  let component: GuestSalonComponent;
  let fixture: ComponentFixture<GuestSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
