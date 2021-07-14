import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreReward } from 'src/app/models/store-reward.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { NotifierService } from 'angular-notifier';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-redeem-reward-dialog',
  templateUrl: './redeem-reward-dialog.component.html',
  styleUrls: ['./redeem-reward-dialog.component.css']
})
export class RedeemRewardDialogComponent implements OnInit {
  @Input() reward: StoreReward;
  redeemForm: FormGroup;
  submitted:boolean=false;
  subscription: any = [];
  customerId:any;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private apiService:ApiService,
    private readonly notifier:NotifierService,
    private route:ActivatedRoute

    ) {
      this.route.queryParams.subscribe((params) => {
        this.customerId = params["customer_id"];
      });
     }

  ngOnInit() {
    this.redeemForm = this.formBuilder.group({
      remark: ['', [Validators.required]],
    });
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  get f() { return this.redeemForm.controls; }

  onSubmit(){
    this.submitted=true
    if(!this.redeemForm.valid){
      return;
    }
    const body = this.redeemForm.value;
    body["customer_id"] = this.customerId;
    body["redeem_code"] = this.reward.redeem_code;
    let s1 = this.apiService.redeemReward(body).subscribe(
      (result) => {
        const apiResponse: ApiResponse = result;
        this.redeemForm.reset();
        this.submitted = false;
        this.notifier.notify("success", apiResponse.message);
        this.activeModal.close(true);
      },
      (error) => {
        this.apiService.handleError(error);
      }
    );
    this.subscription.push(s1);


  }
}
