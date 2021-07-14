import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { NotifierService } from "angular-notifier";
import { ApiResponse } from 'src/app/models/api-response.model';
import { AppService } from 'src/app/app.service';
import { SharedService } from 'src/app/shared.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-guest-salon',
  templateUrl: './guest-salon.component.html',
  styleUrls: ['./guest-salon.component.css']
})
export class GuestSalonComponent implements OnInit {
  subscriptionapi: Subscription;

  loginForm: FormGroup;
  subscription: any = [];
  salonDetails: any = [];
  custEnquiry: any = [];
  customerDetails: any = [];

  salon:boolean=false;
  submitted = false;
  customerRewardSuccess:boolean=false;
  rewardConfirm:boolean=false;
  addreward:boolean=false;
  custPhonenumber: any = {};
  custReward: any = {};
  custPIN: any = {};
  selectedRewardId=0;



  constructor(public authService: AuthService,
    private formBuilder: FormBuilder,
    private readonly notifier:NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,

    ) {

     

     


      let storeId;
      this.route.params.subscribe(params => {
        storeId = params['id'];
       });
       console.log("90689",storeId)

       this.subscription = timer(0, 4000).pipe(
        switchMap(() => this.authService.getStrodeDetails(storeId))
      ).subscribe((result:any) => {
        if (result.status_code == 200) {
          if(result.data.status ==  1){
              this.custEnquiry = result.data.customer_enquiry;
          }else{
            this.notifier.notify("error", result.message);
          }
        } else {
          this.notifier.notify("error", result.message);
        }
      });
    
       this.spinner.show();
      this.authService.getStrodeDetails(storeId).subscribe(result => {
        this.spinner.hide();
        // this.notifier.notify("error", "Phone number not found! A text message has been sent with instructions on how to install the Nail Rewards App.");

        const apiResponse: any = result;
        console.log("apiResponse",apiResponse)
        console.log("apiResponse",apiResponse.data)

        if (apiResponse.status_code == 200) {
          if(apiResponse.data.status ==  1){
              this.salon = true;
              this.salonDetails = apiResponse.data.store;
              this.custEnquiry = apiResponse.data.customer_enquiry;

          }else{
            this.notifier.notify("error", apiResponse.message);
          }
        } else {
          this.notifier.notify("error", apiResponse.message);
        }
      }, error => {
        if (error.error.message != undefined) {
          this.notifier.notify("error", error.error.message);
        } else {
          this.notifier.notify("error", "Something went wrong!");
        }
      }); 
  }
  getCustomerDetails(phone_number,store_code){
    this.spinner.show();

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.custPhonenumber))
    this.authService.getCustomerDetails(phone_number,store_code).subscribe(result => {
      const apiResponse: any = result;
      this.spinner.hide();

      if (apiResponse.status_code == 200) {
        if(apiResponse.data.status ==  1){
          this.salon=false; 
          this.customerRewardSuccess=false;
          this.addreward=true;
          this.customerDetails = apiResponse.data;
        }else{
          this.notifier.notify("error", apiResponse.data.message);
        }
      } else {
        this.notifier.notify("error", apiResponse.message);
      }
    }, error => {
      this.spinner.hide();

      if (error.error.message != undefined) {
        this.notifier.notify("error", error.error.message);
      } else {
        this.notifier.notify("error", "Something went wrong!");
      }
    });
  }

  onStoreSubmit() {
    this.getCustomerDetails(this.custPhonenumber.phone_number,this.salonDetails.store_code);
  } 
  numericOnly(event): boolean {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
  onRewardSubmit(rewardId=0){
    // console.log('rewardId',rewardId)
    this.addreward=false;
    this.rewardConfirm=true;
    this.selectedRewardId=rewardId;
  }
  rewardNo(){
    this.rewardConfirm=false
    this.returnToDashboard()

  }
  onRewardPINSubmit(){
    // this.customerRewardSuccess=true;
    // this.rewardConfirm=false
    // console.log(this.custPIN.pin)
    // console.log(this.salonDetails.store_pin)
   
    // console.log("aaaaaaaaaa",this.selectedRewardId)
    // return; 

    if(this.custPIN.pin != this.salonDetails.store_pin){
       this.notifier.notify("error", "You have entered the wrong PIN");
       return;
    } 
    console.log(this.selectedRewardId)
    this.spinner.show();
    if(this.selectedRewardId != 0){
      let parms={
        redeem_code:this.selectedRewardId,
        customer_id:this.customerDetails.customer.customer_id,
        remark:'Allotted by Store',
        store_id:this.salonDetails.store_id,
      }
      this.authService.redeemReward(parms).subscribe(result => {
      this.spinner.hide();

        const apiResponse: any = result;
        if (apiResponse.status_code == 200) {
          this.salon=false;
          // this.customerRewardSuccess=true;
          // this.rewardConfirm=false
          this.notifier.notify("success", apiResponse.message);
          this.returnToDashboard();
          // console.log(apiResponse.data)
          // this.notifier.notify("success", apiResponse.message);
          // this.customerDetails = apiResponse.data;
        } else { 
          this.notifier.notify("error", apiResponse.message);
        }
      }, error => {
        this.spinner.hide();

        if (error.error.message != undefined) {
          this.notifier.notify("error", error.error.message);
        } else {
          this.notifier.notify("error", "Something went wrong!");
        }
      });

    }else{
      // return;
      let parms={
        rewardPoints:this.custReward.reward,
        customerId:this.customerDetails.customer.customer_id,
        storeId:this.salonDetails.store_id,

      } 
      this.authService.addReward(parms).subscribe(result => {
      this.spinner.hide();

        const apiResponse: any = result;
        if (apiResponse.status_code == 200) {
          this.salon=false;
          this.customerRewardSuccess=true;
          this.rewardConfirm=false
          // console.log(apiResponse.data)
          // this.notifier.notify("success", apiResponse.message);
          // this.customerDetails = apiResponse.data;
        } else { 
          this.notifier.notify("error", apiResponse.message);
        }
      }, error => {
      this.spinner.hide();

        if (error.error.message != undefined) {
          this.notifier.notify("error", error.error.message);
        } else {
          this.notifier.notify("error", "Something went wrong!");
        }
      });
    }


    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.custReward))
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.custPIN))


  }
  returnToDashboard(){
    this.salon=true;
    this.customerDetails = [];
    this.submitted = false;
    this.addreward=false;
    this.customerRewardSuccess=false;
    this.rewardConfirm=false;
    this.custPhonenumber = {};
    this.custReward = {};
    this.custPIN = {};
    this.selectedRewardId=0;
  }

  ngOnInit() {
      // this.notifier.notify("error", "Something went wrong!");
  }
  ngOnDestroy() {
    
  }

}
