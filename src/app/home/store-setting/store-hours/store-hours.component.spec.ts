import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHoursComponent } from './store-hours.component';

describe('StoreHoursComponent', () => {
  let component: StoreHoursComponent;
  let fixture: ComponentFixture<StoreHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
