import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-reward-setting',
  templateUrl: './reward-setting.component.html',
  styleUrls: ['./reward-setting.component.css']
})
export class RewardSettingComponent implements OnInit, OnDestroy {
  public rewardSettingForm: FormGroup;
  public submitted: boolean = false;
  subscription: any = [];
  rewardSetting:any="";
  constructor(
    private formBuilder: FormBuilder,
    private readonly notifier:NotifierService,
    private apiService:ApiService,
    public sharedService:SharedService
    
  ) { this.showExistingRewardSetting(); }

  ngOnInit() {
    this.rewardSettingForm = this.formBuilder.group({
      points_earn: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
    })
    this.rewardSettingForm.patchValue({
      points_earn:this.rewardSetting
    });
  }
  showExistingRewardSetting(){
    this.rewardSetting = this.sharedService.loggedInUser.storeDetails.storeSettings.points_earn;
    if (this.rewardSetting == undefined) {
      this.rewardSetting = "";
    }
  }
  get f() { return this.rewardSettingForm.controls; }

  onSubmit() {
    this.submitted=true
    if (this.rewardSettingForm.invalid) {
      return;
    }
    let s1 = this.apiService.updateRewardSettings(this.rewardSettingForm.value).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.notifier.notify("success", apiResponse.message);
        this.submitted = false;
        this.sharedService.loggedInUser = apiResponse.data;
        this.showExistingRewardSetting();
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }
  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

}
