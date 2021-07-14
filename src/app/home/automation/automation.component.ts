import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ConfirmationDialogService } from '../confirm-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class AutomationComponent implements OnInit ,OnDestroy{
  
  automationForm:FormGroup;
  submitted:boolean=false;
  subscription: any = [];
  ifData:boolean=false;
  autoNotification:Array<AutoNotification>;
  constructor(
    private readonly formBuilder:FormBuilder,
    private apiService:ApiService,
    private confirmationDialogService: ConfirmationDialogService,
    ) {
      this.autoNotificationList();
     }

  ngOnInit() {
    this.automationForm = this.formBuilder.group({
      notification_type: ['1', [Validators.required, Validators.maxLength(100)]],
      days: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      message: ['', [Validators.required,Validators.maxLength(255),Validators.minLength(50)]],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.automationForm.invalid) {
      console.error(this.automationForm);
      return;
    }
    var body = {};
    body['notification_type'] = this.f.notification_type.value;
    body['days'] = this.f.days.value;
    body['message'] = this.f.message.value;
    let s1 = this.apiService.autoNotification(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.autoNotificationList();
        this.resetForm();
        this.submitted=false;
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

  autoNotificationList(){
    this.ifData=false;
    let s1 = this.apiService.autoNotificationList().subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.autoNotification=apiResponse.data;
        this.ifData=true;
      },
      error => {
     //   this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

  public openConfirmationDialog(notification:AutoNotification) {
    this.confirmationDialogService.confirm('Alert', 'Are you sure you want to delete?')
      .then((confirmed) => confirmed ? this.deleteAutoNotificaiton(notification) : "")
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  resetForm(){
    this.automationForm.patchValue({
      notification_type: "1",
      days: "",
      message: "",
    });
    this.submitted=false;
  }

  deleteAutoNotificaiton(notification:AutoNotification){
    var body = {};
    body['id'] = notification.id;
    let s1 = this.apiService.deleteAutoNotificaiton(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.autoNotification=apiResponse.data;
        this.autoNotificationList();
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }


  editNotification(notification:AutoNotification){
    this.automationForm.patchValue({
      notification_type: notification.notification_type,
      days: notification.days,
      message: notification.message,
    });
  }
  

  get f() { return this.automationForm.controls; }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
    
  }

}
