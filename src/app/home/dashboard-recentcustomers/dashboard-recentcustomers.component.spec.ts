import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecentcustomersComponent } from './dashboard-recentcustomers.component';

describe('DashboardRecentcustomersComponent', () => {
  let component: DashboardRecentcustomersComponent;
  let fixture: ComponentFixture<DashboardRecentcustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRecentcustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRecentcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
