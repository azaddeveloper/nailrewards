import { Component, OnInit, OnDestroy, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Rx';
import { NotifierService } from 'angular-notifier';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountdownComponent } from 'ngx-countdown';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  title = 'customer-nailreward';
  customerDetails: any = [];
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  loginForm: FormGroup;
  subscription: any = [];
  salonDetails: any = [];
  submitted = false;
  custPhonenumber: any = {};
  customer: boolean = false;
  screenHeight: number;

  constructor(
    public appService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private elementRef: ElementRef,
    private readonly notifier: NotifierService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) {
    let storeId;
    this.screenHeight = window.innerHeight;
    this.route.params.subscribe(params => {
      console.log('params',params)
      storeId = params['id'];
    });
    this.custPhonenumber.country_code = 213
    this.appService.getStrodeDetails(storeId).subscribe(result => {
      this.spinner.hide();
      const apiResponse: any = result;
      if (apiResponse.status_code == 200) {
        if (apiResponse.data.status == 1) {
          this.salonDetails = apiResponse.data.store;

        } else {
          // this.salonDetails = apiResponse.data.store;
          this.toastr.error(apiResponse.message);
        }
      } else {
        this.toastr.error(apiResponse.message);
      }
    }, error => {
      if (error.error.message != undefined) {
        this.toastr.error(error.error.message);
      } else {
        this.toastr.error("Something went wrong!");
      }
    });
  }
  @HostListener('window:resize', ['$event'])


  startTimer(display) {
    this.countdown.begin();
    return;
    this.screenHeight = window.innerHeight;

    var timer = 150;
    var minutes;
    var seconds;

    let s1 = Observable.interval(1000).subscribe(x => {
      minutes = Math.floor(timer / 60);
      seconds = Math.floor(timer % 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      // --timer;
      if (--timer < 0) {
        console.log('timeup');
        // display.textContent = '';
        location.reload()
        // this.customer=false;
        // return
        // this.custPhonenumber.country_code=213
        // this.custPhonenumber.phone_number=''

      }
    })
  }

  timerTime(e) {
    console.log("e", e)
    if (e.left == 0) {
      location.reload()
    }
  }

  onStoreSubmit() {

    this.spinner.show()
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.custPhonenumber))
    // return;
    let body = {
      storeId: this.salonDetails.store_id,
      phone_number: this.custPhonenumber.phone_number,
      country_code: this.custPhonenumber.country_code,

    }
    console.log(body);
    // return
    this.appService.getCustomerDetails(body).subscribe(result => {
      const apiResponse: any = result;
      this.screenHeight = window.innerHeight;
      this.spinner.hide()

      if (apiResponse.status_code == 200) {
        if (apiResponse.data.status == 1) {
          this.customer = true;
          this.screenHeight = window.innerHeight;

          this.customerDetails = apiResponse.data;
          setTimeout(() => {
            var callDuration = this.elementRef.nativeElement.querySelector('#time');
            this.startTimer(callDuration);

          }, 500);
        } else {

          this.toastr.error(apiResponse.data.message);

        }

      } else {
        this.toastr.error(apiResponse.data.message);


      }
    }, error => {
      if (error.error.message != undefined) {
        // this.notifier.notify("error", error.error.message);
      } else {
        // this.notifier.notify("error", "Something went wrong!");
      }
    });
  }
  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
}
