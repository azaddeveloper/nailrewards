import { Component, OnInit, OnDestroy } from "@angular/core";
import { NotifierService } from "angular-notifier";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { SharedService } from "src/app/shared.service";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { ApiResponse } from "src/app/models/api-response.model";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  otpForm: FormGroup;
  resetForm: FormGroup;
  showOtpForm: boolean = true;
  submitted: boolean = false;
  resetFormSubmitted: boolean = false;
  subscription: any = [];
  constructor(
    private readonly notifier: NotifierService,
    private formBuilder: FormBuilder,
    public sharedService: SharedService,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.sharedService.forgetUserEmailId == "") {
      this.router.navigate(["login"]);
    }
  }

  passwordConfirming(c: AbstractControl): { confirmPasword: boolean } {
    if (
      c.value.confirm_password !== "" &&
      c.value.password !== c.value.confirm_password
    ) {
      return { confirmPasword: true };
    }
    // return { confirmPasword: false };
  }

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      otp: ["", [Validators.required]],
    });

    this.resetForm = this.formBuilder.group(
      {
        password: ["", [Validators.required,Validators.minLength(8)]],
        confirm_password: ["", [Validators.required]],
      },
      { validators: this.passwordConfirming }
    );
  }
  get f() {
    return this.otpForm.controls;
  }
  get f1() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.otpForm.invalid) {
      //return false if validation failed
      return;
    }
    let s1 = this.authService
      .verifyPasswordOTP(
        this.sharedService.forgetUserEmailId,
        this.f.otp.value.trim()
      )
      .subscribe(
        (result) => {
          var apiResponse: ApiResponse = result;
          if (apiResponse.status_code == 200) {
            this.notifier.notify("success", apiResponse.message);
            this.showOtpForm = false;
          } else {
            this.notifier.notify("error", apiResponse.message);
          }
        },
        (error) => {
          if (error.error.message != undefined) {
            this.notifier.notify("error", error.error.message);
          } else {
            this.notifier.notify("error", "Something went wrong!");
          }
        }
      );
    this.subscription.push(s1);
  }

  onResetFormSubmit() {
    this.resetFormSubmitted = true;
    if (this.resetForm.invalid) {
      return;
    }
    var body={};
    body["email"]=this.sharedService.forgetUserEmailId;
    body["otp"]=this.f.otp.value.trim();
    body["password"]=this.f1.password.value.trim();

    let s1 = this.authService
      .resetPasswordUsingEmailOTP(
       body
      )
      .subscribe(
        (result) => {
          var apiResponse: ApiResponse = result;
          if (apiResponse.status_code == 200) {
            this.notifier.notify("success", apiResponse.message);
            setTimeout(() => {
              this.router.navigate(["login"]);
            }, 2000);
          } else {
            this.notifier.notify("error", apiResponse.message);
          }
        },
        (error) => {
          if (error.error.message != undefined) {
            this.notifier.notify("error", error.error.message);
          } else {
            this.notifier.notify("error", "Something went wrong!");
          }
        }
      );
    this.subscription.push(s1);

  }

  onClick() {
    this.notifier.notify("error", "justcheck");
  }

  ngOnDestroy() {
    this.subscription.forEach((s) => {
      s.unsubscribe();
    });
  }
}
