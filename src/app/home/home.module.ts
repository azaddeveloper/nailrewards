import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'ngx-owl-carousel';
import { Routes, RouterModule } from '@angular/router';
import { NotifierModule } from "angular-notifier";
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { AgmCoreModule } from '@agm/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { ChartCustomerComponent } from './chart-customer/chart-customer.component';
import { DashboardCountersComponent } from './dashboard-counters/dashboard-counters.component';
import { DashboardRecentcustomersComponent } from './dashboard-recentcustomers/dashboard-recentcustomers.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RewardListComponent } from './reward-list/reward-list.component';
import { NewsListComponent } from './news-list/news-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { StoreSettingComponent } from './store-setting/store-setting.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmationDialogService } from './confirm-dialog/confirmation-dialog.service';
import { EditStoreNewsComponent } from './edit-store-news/edit-store-news.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { environment } from 'src/environments/environment';
import { AddRewardComponent } from './add-reward/add-reward.component';
import { EditRewardComponent } from './edit-reward/edit-reward.component';
import { StoreHoursComponent } from './store-setting/store-hours/store-hours.component';
import { StoreInfoComponent } from './store-setting/store-info/store-info.component';
import { StoreLogoComponent } from './store-setting/store-logo/store-logo.component';
import { StoreMenuComponent } from './store-setting/store-menu/store-menu.component';
import { RewardSettingComponent } from './store-setting/reward-setting/reward-setting.component';
import { AppSettingComponent } from './store-setting/app-setting/app-setting.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { SocialMediaLinksComponent } from './store-setting/social-media-links/social-media-links.component';
import { AmountChartComponent } from './amount-chart/amount-chart.component';
import { RedeemRewardDialogComponent } from './redeem-reward-dialog/redeem-reward-dialog.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { AutomationComponent } from './automation/automation.component';
import { RatingComponent } from './rating/rating.component';
import { PinComponent } from './pin/pin.component';

const appRoutes: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [LoggedInGuard], children: [
      {
        path: 'home', component: DashboardComponent
      },
      {
        path: 'pin', component: PinComponent
      },
      {
        path: 'customerList',
        component: CustomerListComponent
      },
      {
        path: 'customerDetails',
        component: CustomerDetailsComponent
      },
      {
        path: 'rewards',
        component: RewardListComponent
      },
      {
        path: 'news',
        component: NewsListComponent
      },
      {
        path: 'news/add',
        component: AddNewsComponent,
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'settings',
        component: StoreSettingComponent,
      },
      {
        path: 'news/edit',
        component: EditStoreNewsComponent,
      },
      {
        path: 'rewards/add',
        component: AddRewardComponent,
      },
      {
        path: 'rewards/edit',
        component: EditRewardComponent,
      },
      {
        path: 'automation',
        component: AutomationComponent,
      },
      {
        path: 'ratings',
        component: RatingComponent,
      },
      {
        path: '**',
        component: DashboardComponent,
      },
    ]
  }
];

export const MY_NATIVE_FORMATS = {
  fullPickerInput: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true },
  datePickerInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  timePickerInput: { hour: 'numeric', minute: 'numeric', hour12: true },
  monthYearLabel: { year: 'numeric', month: 'short' },
  dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
  monthYearA11yLabel: { year: 'numeric', month: 'long' },

};
export const MY_MOMENT_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'YYYY-MM-DD HH:mm',
  datePickerInput: 'l',
  timePickerInput: 'hh:mm a',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};





@NgModule({
  declarations: [
    ChartCustomerComponent,
    DashboardCountersComponent,
    DashboardRecentcustomersComponent,
    FooterComponent,
    SideBarComponent,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
    CustomerListComponent,
    RewardListComponent,
    NewsListComponent,
    UserProfileComponent,
    AddNewsComponent,
    StoreSettingComponent,
    ConfirmDialogComponent,
    EditStoreNewsComponent,
    ChangePasswordComponent,
    AddRewardComponent,
    EditRewardComponent,
    StoreHoursComponent,
    StoreInfoComponent,
    StoreLogoComponent,
    StoreMenuComponent,
    RewardSettingComponent,
    AppSettingComponent,
    CustomerDetailsComponent,
    SocialMediaLinksComponent,
    AmountChartComponent,
    RedeemRewardDialogComponent,
    SendNotificationComponent,
    AutomationComponent,
    RatingComponent,
    PinComponent,
    


  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OwlModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AutocompleteLibModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: environment.google_map_api_key
    }),
    NotifierModule.withConfig({
      theme: "material",
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease',
        },
        overlap: 150
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ], providers: [
    ConfirmationDialogService,
    { provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS },
  ],
  entryComponents: [ConfirmDialogComponent,RedeemRewardDialogComponent,SendNotificationComponent],
})
export class HomeModule { }
