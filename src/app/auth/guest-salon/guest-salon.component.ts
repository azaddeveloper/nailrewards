import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { NotifierService } from "angular-notifier";
import { ApiResponse } from 'src/app/models/api-response.model';
import { AppService } from 'src/app/app.service';
import { SharedService } from 'src/app/shared.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-guest-salon',
  templateUrl: './guest-salon.component.html',
  styleUrls: ['./guest-salon.component.css']
})
export class GuestSalonComponent implements OnInit {
  private readonly notifier: NotifierService;
  loginForm: FormGroup;
  subscription: any = [];
  salonDetails: any = [];
  customerDetails: any = [];

  salon:boolean=true;
  submitted = false;
  customer:boolean=false;
  rewardConfirm:boolean=false;

  custPhonenumber: any = {};
  custReward: any = {};
  custPIN: any = {};



  constructor(public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    private sharedService: SharedService,
    private modalService: NgbModal
    ) {

    this.notifier = notifierService;
      this.authService.getStrodeDetails('90689').subscribe(result => {
        const apiResponse: any = result;
        console.log("apiResponse",apiResponse)
        if (apiResponse.status_code == 200) {
          this.notifier.notify("success", apiResponse.message);
          this.salonDetails = apiResponse.data;
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
  onStoreSubmit() {
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.custPhonenumber))
    this.authService.getCustomerDetails(this.custPhonenumber.phone_number).subscribe(result => {
      const apiResponse: any = result;
      if (apiResponse.status_code == 200) {
        this.salon=false;
        this.customer=true;
        // console.log(apiResponse.data)
        this.notifier.notify("success", apiResponse.message);
        this.customerDetails = apiResponse.data;
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
  onRewardSubmit(){
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.custReward))
    this.rewardConfirm=true;
  }
  onRewardPINSubmit(){
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.custReward))
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.custPIN))


  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  
  get f() { return this.loginForm.controls; }
  ngOnInit() {
  
  }
  ngOnDestroy() {
    
  }

}
