import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardSettingComponent } from './reward-setting.component';

describe('RewardSettingComponent', () => {
  let component: RewardSettingComponent;
  let fixture: ComponentFixture<RewardSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
