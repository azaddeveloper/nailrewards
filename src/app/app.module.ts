import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppService } from './app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GuestGuard } from './auth/guest.guard';
import { LoggedInGuard } from './auth/logged-in.guard';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { NgxSpinnerModule } from "ngx-spinner";

export function app_init(appService: AppService) {
  return () => appService.initializeApp();
}
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    HomeModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

    ],
  providers: [GuestGuard, LoggedInGuard, AppService,
    {
      provide: APP_INITIALIZER, useFactory: app_init, deps: [AppService], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
