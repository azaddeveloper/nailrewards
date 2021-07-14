import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoggedInGuard } from "./auth/logged-in.guard";
import { GuestGuard } from "./auth/guest.guard";
import { HomeComponent } from './home/home.component';
import { GuestSalonComponent } from './auth/guest-salon/guest-salon.component';

export const APP_ROUTES: Routes = [
   {
      path: '',
      component: LoginComponent,

   },
   {
      path: 'login',
      component: LoginComponent,

   },
   {
      path: 'home',
      component: HomeComponent,
   },
   {  path: ':id',
      component: GuestSalonComponent
   },
   {
      path: '**',
      redirectTo: "login",
   },
];
export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES);