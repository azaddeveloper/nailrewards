import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


export const APP_ROUTES: Routes = [
  
   {  path: ':id',
      component: AppComponent
   }, 
   
];
export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES);