import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from "angular-notifier";
import { GuestGuard } from './guest.guard';
import { GuestSalonComponent } from './guest-salon/guest-salon.component';



const appRoutes: Routes = [
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [GuestGuard]
  },

];





@NgModule({
  declarations: [LoginComponent, ForgetPasswordComponent, ResetPasswordComponent, GuestSalonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],

})
export class AuthModule { }
