import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotifierService } from 'angular-notifier';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit, OnDestroy {
  forgetForm: FormGroup;
  email:String="";
  subscription: any = [];
  submitted:boolean=false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private readonly notifier: NotifierService,
    public sharedService:SharedService

    
  ) { }

  get f() { return this.forgetForm.controls; }

  ngOnInit() {
    if (localStorage.getItem("AUTH_TOKEN") != undefined) {
      this.router.navigate(["/home"]);
    }
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  onSubmit(){
    
    this.submitted = true;

    if (this.forgetForm.invalid) {
      //return false if validation failed
      return;
    }
    this.email = this.f.email.value.trim();
    let s1 = this.authService.forgetPasswordUsingEmailOTP(this.email).subscribe(result => {
      var apiResponse: ApiResponse = result;
      if (apiResponse.status_code == 200) {
        this.sharedService.forgetUserEmailId=this.email;
        this.router.navigate(["resetPassword"]);
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
    this.subscription.push(s1);
  }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

}
