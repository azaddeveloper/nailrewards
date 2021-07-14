import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ApiService } from 'src/app/api.service';
import { CustomerDetail, StoreRatingDetails, TransactionHistory } from 'src/app/models/customer-detail.model';
import { SharedService } from 'src/app/shared.service';
import { NotifierService } from 'angular-notifier';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customerId = "";
  subscription: any = [];
  customerDetails: CustomerDetail = new CustomerDetail();
  transactionHistory: Array<TransactionHistory> = [];
  ratingDetails: StoreRatingDetails = new StoreRatingDetails();
  rating: number = 0;
  dtOptions: any = {};

  redeemRewardForm: FormGroup;
  transactionHistoryForm: FormGroup;
  rewardSubmitted = false;
  transactionSubmitted = false;
  showDataTable:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public sharedService: SharedService,
    private readonly notifier: NotifierService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.route.queryParams.subscribe(params => {
      this.customerId = params['customer_id'];
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.showDataTable=false;
    const body = {};
    body["customer_id"] = this.customerId;
    let s1 = this.apiService.customerDetail(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.customerDetails = apiResponse.data;
        this.ratingDetails = this.customerDetails.customer_rating;
        this.transactionHistory = this.customerDetails.transaction_history;
        this.rating = parseInt(this.ratingDetails.rating) * 100 / 5;
        this.showDataTable=true;
      },
      error => {
        this.notifier.notify("error", "No record found");
        this.router.navigate(['/home']);
      })
    this.subscription.push(s1);
  }

  setDatatableOptions() {
    this.dtOptions = {
      dom: 'lrfBtip',
      buttons: [
        { extend: 'excel', text: 'Export', title: 'Reward_point_history' },
        { extend: 'print', text: 'Print', title: 'Reward point history' },
      ],
      language: {
        searchPlaceholder: "Search...",
        search: "",
        lengthMenu: "Show _MENU_ entries"
      },
      order: [[0, "desc"]]
    };
  }
  get f1() { return this.redeemRewardForm.controls; }
  get f2() { return this.transactionHistoryForm.controls; }
  ngOnInit() {
    this.setDatatableOptions();
    this.redeemRewardForm=this.formBuilder.group({
      redeem_code: ['', [Validators.required]],
      remark: ['', [Validators.required]],
    });
    this.transactionHistoryForm=this.formBuilder.group({
      spend_amount: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      remark: ['', [Validators.required]],
    });

  }

  redeemReward() {
    this.rewardSubmitted=true;
    if (this.redeemRewardForm.invalid) {
      return;
    }
    const body = this.redeemRewardForm.value;
    body["customer_id"]=this.customerId;
    let s1 = this.apiService.redeemReward(body).subscribe(
      result => {
        const apiResponse:ApiResponse=result;
        this.redeemRewardForm.reset();
        this.rewardSubmitted=false;
        this.notifier.notify("success", apiResponse.message);
        this.getUserDetails();
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }
  addTransaction() {
    this.transactionSubmitted=true;
    if (this.transactionHistoryForm.invalid) {
      return;
    }
    const body = this.transactionHistoryForm.value;
    body["customer_id"]=this.customerId;
    let s1 = this.apiService.customerTransaction(body).subscribe(
      result => {
        const apiResponse:ApiResponse=result;
        this.transactionHistoryForm.reset();
        this.transactionSubmitted=false;
        this.notifier.notify("success", apiResponse.message);
        this.getUserDetails();
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

