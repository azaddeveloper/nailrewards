import { Component, OnInit, OnDestroy, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Rx';
import { NotifierService } from 'angular-notifier';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}