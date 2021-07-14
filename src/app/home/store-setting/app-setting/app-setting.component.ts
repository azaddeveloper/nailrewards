import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/shared.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { AppMenu } from 'src/app/models/store-details.model';

@Component({
  selector: 'app-app-setting',
  templateUrl: './app-setting.component.html',
  styleUrls: ['./app-setting.component.css']
})
export class AppSettingComponent implements OnInit, OnDestroy {
  public appSettingForm: FormGroup;
  public submitted: boolean = false;
  subscription: any = [];
  appColor: any = "";
  appMenu: AppMenu;
  constructor(
    private formBuilder: FormBuilder,
    private readonly notifier: NotifierService,
    private apiService: ApiService,
    public sharedService: SharedService

  ) { this.showExistingAppSetting(); }
  showExistingAppSetting() {
    this.appColor = this.sharedService.loggedInUser.storeDetails.storeSettings.app_color;
    this.appMenu = this.sharedService.loggedInUser.storeDetails.app_menu;
    if (this.appColor == undefined) {
      this.appColor = "";
    }
  }

  ngOnInit() {
    this.appSettingForm = this.formBuilder.group({
      app_color: ['#FF4E08', [Validators.required]],
      reward_count: [true, []],
      spa_menu: [true, []],
      social_media: [true, []],
      news_promotion: [true, []],
      service_rating: [true, []],
      schedule_appointment: [true, []],
    });
    this.appSettingForm.patchValue({
      app_color: this.appColor,
      reward_count: this.appMenu.reward_count,
      spa_menu: this.appMenu.spa_menu,
      social_media: this.checkSocialLinks(false),
      news_promotion: this.appMenu.news_promotion,
      service_rating: this.appMenu.service_rating,
      schedule_appointment: this.appMenu.schedule_appointment,
    });
  }
  get f() { return this.appSettingForm.controls; }
  checkSpanMenu() {
    var spa_menu = this.sharedService.loggedInUser.storeDetails.storeSettings.spa_menu_pdf;
    if (spa_menu == null || spa_menu == "") {
      this.notifier.notify("error", "Please upload spa menu to show this option in app.")
      this.appSettingForm.patchValue({
        spa_menu: false,
      });
      return false;
    }
    return true;
  }
  checkSocialLinks(showMsg=true) {
    if(!this.f.social_media.value){
      return;
    }
    var twitter_link = this.sharedService.loggedInUser.storeDetails.twitter_link;
    var facebook_link = this.sharedService.loggedInUser.storeDetails.facebook_link;
    var instagram_link = this.sharedService.loggedInUser.storeDetails.instagram_link;
    var google_link = this.sharedService.loggedInUser.storeDetails.google_link;
    if (twitter_link != null && twitter_link != "") {
      this.appSettingForm.patchValue({
        social_media: true,
      });
      return true;
    }
    else if (facebook_link != null && facebook_link != "") {
      this.appSettingForm.patchValue({
        social_media: true,
      });
      return true;
    }
    else if (instagram_link != null && instagram_link != "") {
      this.appSettingForm.patchValue({
        social_media: true,
      });
      return true;
    }
    else if (google_link != null && google_link != "") {
      this.appSettingForm.patchValue({
        social_media: true,
      });
      return true;
    } else {
      if(showMsg){
        this.notifier.notify("error", "Please enter atleast one social media link to show this option in app.");
      }
      this.appSettingForm.patchValue({
        social_media: false,
      });
      return false;
    }
 }
  onSubmit() {
    this.submitted = true
    if (this.appSettingForm.invalid) {
      return;
    }
    var body = {};

    body["app_color"] = this.f.app_color.value;
    var appMenu = {};
    appMenu["reward_count"] = this.f.reward_count.value;
    appMenu["spa_menu"] = this.f.spa_menu.value;
    appMenu["social_media"] = this.f.social_media.value;
    appMenu["news_promotion"] = this.f.news_promotion.value;
    appMenu["service_rating"] = this.f.service_rating.value;
    appMenu["schedule_appointment"] = this.f.schedule_appointment.value;
    body["app_menu"] = JSON.stringify(appMenu);
    let s1 = this.apiService.updateAppearanceSettings(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.notifier.notify("success", apiResponse.message);
        this.submitted = false;
        this.sharedService.loggedInUser = apiResponse.data;
        this.showExistingAppSetting();
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
