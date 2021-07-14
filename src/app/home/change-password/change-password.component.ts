import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ApiService } from 'src/app/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('closebtn', { static: false }) closebtn: ElementRef;

  passwordForm: FormGroup;
  subscription: any = [];
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private readonly notifier: NotifierService

  ) { }
  onSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    const body = {};
    body["old_password"] = this.f.old_password.value;
    body["new_password"] = this.f.new_password.value;
    let s1 = this.apiService.changePassword(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        if (apiResponse.status) {
          this.notifier.notify("success", apiResponse.message);
          this.passwordForm.reset();
          this.submitted = false;
          let inputElement: HTMLElement = this.closebtn.nativeElement as HTMLElement;
          inputElement.click();
        } else {

          this.notifier.notify("error", apiResponse.message);
        }
        // this.router.navigate(['home/news']);
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);


  }
  get f() { return this.passwordForm.controls; }
  passwordConfirming(c: AbstractControl): { confirmPasword: boolean } {
    if (c.value.confirm_new_password !== "" && (c.value.new_password !== c.value.confirm_new_password)) {
      return { confirmPasword: true };
    }
    // return { confirmPasword: false };
  }
  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_new_password: ['', [Validators.required]],
    }, { validators: this.passwordConfirming });
  }


}
