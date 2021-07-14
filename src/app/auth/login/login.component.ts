import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { NotifierService } from "angular-notifier";
import { ApiResponse } from 'src/app/models/api-response.model';
import { AppService } from 'src/app/app.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly notifier: NotifierService;
  loginForm: FormGroup;
  subscription: any = [];
  submitted = false;

  public email: string = "";
  public password: string = "";
  public rememberMe: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    notifierService: NotifierService,
    private sharedService: SharedService,
    ) {
    this.notifier = notifierService;

  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      //return false if validation failed
      return;
    }
    this.email = this.f.email.value.trim();
    this.password = this.f.password.value;
    localStorage.clear();
    if (this.f.rememberMe.value === true) {
      this.rememberMe = this.f.rememberMe.value;
      localStorage.setItem("email", this.email);
      localStorage.setItem("password", this.password);
      localStorage.setItem("rememberMe", this.rememberMe.toString());
    }

    // this.loginForm.value
    let s1 = this.authService.login(this.email, this.password).subscribe(result => {
      const apiResponse: ApiResponse = result;
      if (apiResponse.status_code == 200) {
        this.notifier.notify("success", apiResponse.message);
        this.sharedService.loggedInUser = apiResponse.data;
        localStorage.setItem("AUTH_TOKEN", this.sharedService.loggedInUser.AUTH_TOKEN);
        this.authService.isLogged.next(true);
        this.router.navigate(["home"]);
      } else {
        this.notifier.notify("error", apiResponse.message);
      }
      // this.router.navigate(["/home"]);
    }, error => {
      if (error.error.message != undefined) {
        this.notifier.notify("error", error.error.message);
      } else {
        this.notifier.notify("error", "Something went wrong!");
      }
    });
    this.subscription.push(s1);
  }
  get f() { return this.loginForm.controls; }
  ngOnInit() {
    if (localStorage.getItem("AUTH_TOKEN") != undefined) {
      this.router.navigate(["/home"]);
    }
    this.loginForm = this.formBuilder.group({
      email: [localStorage.getItem("email"), [Validators.required]],
      password: [localStorage.getItem("password"), [Validators.required]],
      rememberMe: [localStorage.getItem("rememberMe")=="true" ? true : false, []],
    });
  }
  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

}
