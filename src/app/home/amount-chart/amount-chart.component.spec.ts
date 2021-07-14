import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountChartComponent } from './amount-chart.component';

describe('AmountChartComponent', () => {
  let component: AmountChartComponent;
  let fixture: ComponentFixture<AmountChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
