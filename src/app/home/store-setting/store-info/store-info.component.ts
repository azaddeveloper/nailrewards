import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/shared.service';
import { StoreDetails } from 'src/app/models/store-details.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.css']
})
export class StoreInfoComponent implements OnInit {
  // initial center position for the map
  zoom: number = 18;
  lat: number;
  lng: number;
  markers: marker[] = [
    {
      lat: this.lat,
      lng: this.lng,
      label: 'A',
      draggable: true
    }
  ];

  storeDetails: StoreDetails;
  storeInfoForm: FormGroup;
  submitted: boolean = false;
  subscription: any = [];

  constructor(
    private apiService: ApiService,
    public sharedService: SharedService,
    private formBuilder: FormBuilder,
    private readonly notifier: NotifierService
  ) {
    this.storeDetails = this.sharedService.loggedInUser.storeDetails;
  }
  get f() { return this.storeInfoForm.controls; }

  ngOnInit() {
    this.lat = this.storeDetails.latitude == "" ? 22.7124499 : parseFloat(this.storeDetails.latitude);
    this.lng = this.storeDetails.longitude == "" ? 75.8650035 : parseFloat(this.storeDetails.longitude);
    this.markers[0].lat = this.lat
    this.markers[0].lng = this.lng

    this.storeInfoForm = this.formBuilder.group({
      store_name: ['', [Validators.required]],
      store_owner: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      // land_mark: ['', [Validators.required]],
      zip_code: ['', [Validators.required, Validators.maxLength(8)]],
      // latitude: ['', [Validators.required]],
      // longitude: ['', [Validators.required]],
    });
    this.setStoreInfo();
  }
  setStoreInfo() {
    this.storeInfoForm.patchValue({
      store_name: this.storeDetails.store_name,
      store_owner: this.storeDetails.store_owner,
      email: this.storeDetails.email,
      phone_number: this.storeDetails.phone_number,
      address: this.storeDetails.address,
      city: this.storeDetails.city,
      state: this.storeDetails.state,
      // land_mark: this.storeDetails.land_mark,
      zip_code: this.storeDetails.zip_code,
      // latitude: this.storeDetails.latitude == "" ? this.lat : this.storeDetails.latitude,
      // longitude: this.storeDetails.longitude == "" ? this.lng : this.storeDetails.longitude,
    });

  }

  onSubmit() {
    this.submitted = true;
    if (this.storeInfoForm.invalid) {
      //return false if validation failed
      return;
    }
    var body = {};

    body = this.storeInfoForm.value;
    // console.error(body);

    let s1 = this.apiService.updateStoreInformation(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.sharedService.loggedInUser = apiResponse.data;
        this.storeDetails = this.sharedService.loggedInUser.storeDetails;
        this.notifier.notify("success", apiResponse.message);
        // this.router.navigate(['home/news']);
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

  changeLoation() {
    var x = document.getElementById("demo");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setCurrentLocation(position.coords.latitude, position.coords.longitude);
      });
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  protected map: any;
  public mapReady(map) {
    this.map = map;
  }
  setCurrentLocation(lat, lng) {
    this.lat = lat;
    this.lng = lng;
    this.map.panTo({ lat: this.lat, lng: this.lng });
    this.markers = [{
      lat: this.lat,
      lng: this.lng,
      label: 'A',
      draggable: true
    }];
    this.storeInfoForm.patchValue({
      latitude: this.lat,
      longitude: this.lng,
    });
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.setCurrentLocation($event.coords.lat, $event.coords.lng);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    this.setCurrentLocation($event.coords.lat, $event.coords.lng);
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

