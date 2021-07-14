import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {
  storeDetails: any = [];

  storeDefaultpin:any;
  storeId:any;

  constructor(private apiService:ApiService,
    private readonly notifier: NotifierService,
    ) { }

  ngOnInit() {
    this.getStoreDetails()
  }

  getStoreDetails(){
    let s1 = this.apiService.getLoggedUser().subscribe(
      (result:any) => {
        this.storeDetails.pin = result.data.storeDetails.store_pin;
        this.storeDefaultpin = result.data.storeDetails.store_pin;
        this.storeId =result.data.storeDetails.store_id;
      },
      error => {
     //   this.apiService.handleError(error);
      })
    // this.subscription.push(s1);
  }
  numericOnly(event): boolean {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
  onStoreSubmit() {
    this.apiService.updatestorePIN(this.storeDetails.pin,this.storeId).subscribe(result => {
      const apiResponse: any = result;
      if (apiResponse.status_code == 200) {
        this.notifier.notify("success", apiResponse.message);
      } else {
        this.notifier.notify("error", apiResponse.message);
        
      }
    }, error => {
      if (error.error.message != undefined) {
        this.notifier.notify("error", error.error.message);
      } else {
        this.notifier.notify("error", "Something went wrong!");
      }
    });
  }

}
