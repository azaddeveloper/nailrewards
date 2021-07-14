import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemRewardDialogComponent } from './redeem-reward-dialog.component';

describe('RedeemRewardDialogComponent', () => {
  let component: RedeemRewardDialogComponent;
  let fixture: ComponentFixture<RedeemRewardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemRewardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemRewardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
