import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { StoreUser } from 'src/app/models/store-user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public userProfile: StoreUser;
  profileForm: FormGroup;
  subscription: any = [];
  submitted = false;
  userImage: any = "";
  constructor(
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private readonly notifier: NotifierService) { }

  ngOnInit() {
    this.userProfile = this.sharedService.loggedInUser;
    this.profileForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      contact_number: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required]],
      image: [null, []],
    });

    this.profileForm.patchValue({
      first_name: this.userProfile.first_name.trim(),
      last_name: this.userProfile.last_name.trim(),
      dob: new Date(this.userProfile.dob),
      contact_number: this.userProfile.contact_number.trim(),
      email: this.userProfile.email.trim(),
    });
    this.userImage=this.userProfile.image;
  }
  get f() { return this.profileForm.controls; }

  getDobDateString(d) {
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }
  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      console.error(this.profileForm);

      //return false if validation failed
      return;
    }
    var body = {};
    body = this.profileForm.value;
    body["dob"] = this.getDobDateString(this.f.dob.value);
    let s1 = this.apiService.updateUserProfile(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.sharedService.loggedInUser = apiResponse.data;
        this.notifier.notify("success", apiResponse.message);
        // this.router.navigate(['home/news']);
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);

  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.profileForm.patchValue({
          image: reader.result
        });
        this.userImage = reader.result;

        // need to run CD since file load runs outside of zone
        //this.cd.markForCheck();
      };
    }
  }


}
