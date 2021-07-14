import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-social-media-links',
  templateUrl: './social-media-links.component.html',
  styleUrls: ['./social-media-links.component.css']
})
export class SocialMediaLinksComponent implements OnInit {
  socialLinkForm: FormGroup;
  submitted: boolean = false;
  subscription: any = [];
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private readonly notifier: NotifierService
  ) { }

  ngOnInit() {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    this.socialLinkForm = this.formBuilder.group({
      twitter_link: ["", [Validators.pattern(urlRegex)]],
      facebook_link: ["", [Validators.pattern(urlRegex)]],
      instagram_link: ["", [Validators.pattern(urlRegex)]],
      google_link: ["", [Validators.pattern(urlRegex)]],
    });
    this.socialLinkForm.patchValue({
      twitter_link: this.sharedService.loggedInUser.storeDetails.twitter_link,
      facebook_link: this.sharedService.loggedInUser.storeDetails.facebook_link,
      instagram_link: this.sharedService.loggedInUser.storeDetails.instagram_link,
      google_link: this.sharedService.loggedInUser.storeDetails.google_link,
    });
  }

  get f() { return this.socialLinkForm.controls; }


  onSubmit() {
    this.submitted=true
    if (this.socialLinkForm.invalid) {
      return;
    }
    var body = {};
    body = this.socialLinkForm.value;
    let s1 = this.apiService.updateSocialLinks(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.notifier.notify("success", apiResponse.message);
        this.submitted = false;
        this.sharedService.loggedInUser = apiResponse.data;
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

}
