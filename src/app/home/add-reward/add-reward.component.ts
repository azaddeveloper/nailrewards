import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ApiService } from 'src/app/api.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.css']
})
export class AddRewardComponent implements OnInit {
  rewardForm: FormGroup;
  subscription: any = [];
  submitted = false;
  public min = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private readonly notifier:NotifierService,
    private router :Router
  ) { }
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
      points_required: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      reward_description: ['', [Validators.required]],
      term_condition: ['', [Validators.required]],
      start_date_time: [this.min, [Validators.required]],
      end_date_time: [this.min, [Validators.required]],
      enabled: [true],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.rewardForm.invalid) {
      console.error(this.rewardForm);
      
      return;
    }
    var body = {};
    body['reward_title'] = this.f.reward_title.value;
    body['points_required'] = this.f.points_required.value;
    body['reward_description'] = this.f.reward_description.value;
    body['term_condition'] = this.f.term_condition.value;
    body['start_date_time'] = this.getDateString(this.f.start_date_time.value);
    body['end_date_time'] = this.getDateString(this.f.end_date_time.value);
    body['enabled'] = this.f.enabled.value;
    
    
    let s1 = this.apiService.addStoreRewards(body).subscribe(

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

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }


}
