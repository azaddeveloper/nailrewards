import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { CountdownModule,CountdownGlobalConfig  } from 'ngx-countdown';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
const appRoutes: Routes = [
  { path: ':id', component: CustomerComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent 
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CountdownModule ,
    RouterModule.forRoot(
      appRoutes,

    ),
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
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
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
