import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit {
  @Input() customers:any;
  notificationForm:FormGroup;
  submitted:boolean=false;
  subscription: any = [];
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private readonly notifier:NotifierService
  ) { 
   
    
  }

  ngOnInit() {
    this.notificationForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      notification: ['', [Validators.required]],
    });
    // console.log(this.customers);
    
    
    
  }
  
  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  get f() { return this.notificationForm.controls; }


  public onSubmit(){
    this.submitted = true;
    if(!this.notificationForm.valid){
      return;
    }
    var body = this.notificationForm.value;
    var emails = this.customers.map(function(item){ return item.email });
    body['emails'] = JSON.stringify(emails);
    let s1 = this.apiService.sendNotification(body).subscribe(
      (result) => {
        const apiResponse: ApiResponse = result;
        
        this.submitted = false;
        this.notifier.notify("success", apiResponse.message);
        this.activeModal.close(true);
      },
      (error) => {
        this.apiService.handleError(error);
      }
    );
    this.subscription.push(s1);
  }

}
