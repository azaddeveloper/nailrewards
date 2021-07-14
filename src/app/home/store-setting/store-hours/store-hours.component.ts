import { Component, OnInit, OnDestroy, Directive, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgControl, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotifierService } from 'angular-notifier';
import { SharedService } from 'src/app/shared.service';
import { StoreHour } from 'src/app/models/store-hour.model';

@Component({
  selector: 'app-store-hours',
  templateUrl: './store-hours.component.html',
  styleUrls: ['./store-hours.component.css']
})

export class StoreHoursComponent implements OnInit, OnDestroy {

  public storeHourForm: FormGroup;
  public min = new Date(null, null, null, 10, 0, null, null);
  public max = new Date(null, null, null, 18, 0, null, null);
  public submitted: boolean = false;
  public operation_hours: Array<StoreHour> = [];
  subscription: any = [];
  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    private readonly notifier: NotifierService,
    public sharedService: SharedService,

  ) {
    this.operation_hours = this.sharedService.loggedInUser.storeDetails.operation_hours;
  }



  ngOnInit() {

    this.storeHourForm = this.formBuilder.group({
      sundayOpen: [{ value: this.min, disabled: false }, [Validators.required]],
      sundayClose: [{ value: this.max, disabled: false }, [Validators.required]],
      sundayEnabled: [true],

      mondayOpen: [{ value: this.min, disabled: false }, [Validators.required]],
      mondayClose: [{ value: this.max, disabled: false }, [Validators.required]],
      mondayEnabled: [true],

      tuesdayOpen: [{ value: this.min, disabled: false }, [Validators.required]],
      tuesdayClose: [{ value: this.max, disabled: false }, [Validators.required]],
      tuesdayEnabled: [true],

      wednesdayOpen: [{ value: this.min, disabled: false }, [Validators.required]],
      wednesdayClose: [{ value: this.max, disabled: false }, [Validators.required]],
      wednesdayEnabled: [true],

      thursdayOpen: [{ value: this.min, disabled: false }, [Validators.required]],
      thursdayClose: [{ value: this.max, disabled: false }, [Validators.required]],
      thursdayEnabled: [true],

      fridayOpen: [{ value: this.min, disabled: false }, [Validators.required]],
      fridayClose: [{ value: this.max, disabled: false }, [Validators.required]],
      fridayEnabled: [true],

      saturdayOpen: [{ value: this.min, disabled: false }, [Validators.required]],
      saturdayClose: [{ value: this.max, disabled: false }, [Validators.required]],
      saturdayEnabled: [true],
    });
    this.setDataForUpdate();
  }
  get f() { return this.storeHourForm.controls; }
  getTimeString(d) {
    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  }
  onSubmit() {
    this.submitted = true;
    if (this.storeHourForm.invalid) {
      return;
    }

    let s1 = this.apiService.updateStoreHours(this.getBody()).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.sharedService.loggedInUser=apiResponse.data;
        this.notifier.notify("success", apiResponse.message);
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
    // console.error(this.storeHourForm.value);
    // console.error(this.getBody());
  }

  setTime(str: String) {
    // console.error(str);

    var arr = str.split(":")
    var d = new Date();
    // console.error("hour",arr);

    d.setHours(Number(arr[0]));
    d.setMinutes(Number(arr[1]));
    // console.error(d);

    return d;
  }

  setDataForUpdate() {
    if (this.operation_hours.length == 7) {
      this.storeHourForm.patchValue({
        
        mondayOpen: this.setTime(this.operation_hours[0].open_at),
        mondayClose: this.setTime(this.operation_hours[0].closed_at),
        mondayEnabled: this.operation_hours[0].closed == "1" ? false : true,

        tuesdayOpen: this.setTime(this.operation_hours[1].open_at),
        tuesdayClose: this.setTime(this.operation_hours[1].closed_at),
        tuesdayEnabled: this.operation_hours[1].closed == "1" ? false : true,

        wednesdayOpen: this.setTime(this.operation_hours[2].open_at),
        wednesdayClose: this.setTime(this.operation_hours[2].closed_at),
        wednesdayEnabled: this.operation_hours[2].closed == "1" ? false : true,

        thursdayOpen: this.setTime(this.operation_hours[3].open_at),
        thursdayClose: this.setTime(this.operation_hours[3].closed_at),
        thursdayEnabled: this.operation_hours[3].closed == "1" ? false : true,

        fridayOpen: this.setTime(this.operation_hours[4].open_at),
        fridayClose: this.setTime(this.operation_hours[4].closed_at),
        fridayEnabled: this.operation_hours[4].closed == "1" ? false : true,

        saturdayOpen: this.setTime(this.operation_hours[5].open_at),
        saturdayClose: this.setTime(this.operation_hours[5].closed_at),
        saturdayEnabled: this.operation_hours[5].closed == "1" ? false : true,

        sundayOpen: this.setTime(this.operation_hours[6].open_at),
        sundayClose: this.setTime(this.operation_hours[6].closed_at),
        sundayEnabled: this.operation_hours[6].closed == "1" ? false : true,
      });
    }
  }



  getBody() {
    const body = {}
    body["days"] = ["1", "2", "3", "4", "5", "6", "7"];
    body["open_at"] = [
      this.getTimeString(this.f.mondayOpen.value),
      this.getTimeString(this.f.tuesdayOpen.value),
      this.getTimeString(this.f.wednesdayOpen.value),
      this.getTimeString(this.f.thursdayOpen.value),
      this.getTimeString(this.f.fridayOpen.value),
      this.getTimeString(this.f.saturdayOpen.value),
      this.getTimeString(this.f.sundayOpen.value),
    ];
    body["closed_at"] = [
      this.getTimeString(this.f.mondayClose.value),
      this.getTimeString(this.f.tuesdayClose.value),
      this.getTimeString(this.f.wednesdayClose.value),
      this.getTimeString(this.f.thursdayClose.value),
      this.getTimeString(this.f.fridayClose.value),
      this.getTimeString(this.f.saturdayClose.value),
      this.getTimeString(this.f.sundayClose.value),
    ];
    body["is_open"] = [
      this.f.mondayEnabled.value.toString(),
      this.f.tuesdayEnabled.value.toString(),
      this.f.wednesdayEnabled.value.toString(),
      this.f.thursdayEnabled.value.toString(),
      this.f.fridayEnabled.value.toString(),
      this.f.saturdayEnabled.value.toString(),
      this.f.sundayEnabled.value.toString(),
    ];
    return body;
  }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

}