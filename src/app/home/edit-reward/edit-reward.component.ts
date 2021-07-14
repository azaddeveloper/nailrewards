import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { NotifierService } from 'angular-notifier';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreReward } from 'src/app/models/store-reward.model';

@Component({
  selector: 'app-edit-reward',
  templateUrl: './edit-reward.component.html',
  styleUrls: ['./edit-reward.component.css']
})
export class EditRewardComponent implements OnInit, OnDestroy {

  rewardForm: FormGroup;
  subscription: any = [];
  submitted = false;
  public min = new Date();
  rewardId: any;
  public storeRewardDetails: StoreReward = new StoreReward();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private readonly notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.route.queryParams.subscribe(params => {
      this.rewardId = params['reward_id'];
    });
  }


  get f() { return this.rewardForm.controls; }
  changeDate(event) {
    if (this.f.end_date_time.value < event.value) {
      this.f.end_date_time.setValue(event.value)
    }
  }
  getDateString(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  }

  ngOnInit() {
    this.rewardForm = this.formBuilder.group({
      reward_title: ['', [Validators.required, Validators.maxLength(100)]],
      points_required: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      reward_description: ['', [Validators.required]],
      term_condition: ['', [Validators.required]],
      start_date_time: [this.min, [Validators.required]],
      end_date_time: [this.min, [Validators.required]],
      enabled: [true],
    });
    this.getDataForUpdate();

  }
  onSubmit() {
    this.submitted = true;
    if (this.rewardForm.invalid) {
      console.error(this.rewardForm);

      return;
    }
    var body = {};
    body['reward_id'] = this.rewardId;
    body['reward_title'] = this.f.reward_title.value;
    body['points_required'] = this.f.points_required.value;
    body['reward_description'] = this.f.reward_description.value;
    body['term_condition'] = this.f.term_condition.value;
    body['start_date_time'] = this.getDateString(this.f.start_date_time.value);
    body['end_date_time'] = this.getDateString(this.f.end_date_time.value);
    body['enabled'] = this.f.enabled.value;

    let s1 = this.apiService.updateStoreRewards(body).subscribe(

      result => {
        const apiResponse: ApiResponse = result;
        this.notifier.notify("success", apiResponse.message);
        this.router.navigate(['home/rewards']);
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }
  //getOneStoreReward
  getDataForUpdate() {
    var body = {};
    body['reward_id'] = this.rewardId;

    this.apiService.getOneStoreReward(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.storeRewardDetails = apiResponse.data;

        this.setDefaultValue();
      },
      error => {
        this.apiService.handleError(error);
      });
  }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

  setDefaultValue() {
    this.rewardForm.patchValue({
      reward_title: this.storeRewardDetails.reward_title,
      points_required: this.storeRewardDetails.points_required,
      reward_description: this.storeRewardDetails.reward_description,
      term_condition: this.storeRewardDetails.term_condition,
      start_date_time: new Date(this.storeRewardDetails.start_date_time),
      end_date_time: new Date(this.storeRewardDetails.end_date_time),
      enabled: this.storeRewardDetails.enabled == "1" ? true : false,
    });
    this.min=new Date(this.storeRewardDetails.start_date_time);
  }


}
