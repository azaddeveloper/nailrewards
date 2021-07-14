import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from '../environments/environment';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders();
  constructor(private http: HttpClient,
    private router: Router,
  ) { }

  getHeader() {
    this.headers = new HttpHeaders({
      'Content-Type': environment.contentType,
      'Authorization': environment.authorization,
      "AUTH_TOKEN": localStorage.getItem("AUTH_TOKEN")
    });

    return this.headers;
  }
  getHeaderForUpload() {
    this.headers = new HttpHeaders({
      'Authorization': environment.authorization,
      "AUTH_TOKEN": localStorage.getItem("AUTH_TOKEN")
    });
    return this.headers;
  }

  getCustomerDetails(value){
    var body = {};
    body['phone_number'] = value.phone_number;
    body['country_code'] = value.country_code;
    body['store_id'] = value.storeId;

    body['from'] = 'customer';

    const headers = new HttpHeaders({ 'Content-Type': environment.contentType, 'Authorization': environment.authorization }).set("Access-Control-Allow-Origin","*");
    return this.http.post(environment.apiUrl + environment.apiEndPoints.getCustomerDetials,
      body,
      { headers: headers }
    );
  }
  getStrodeDetails(store_id){
    var body = {};
    body['store_code'] = store_id;

    console.log(store_id,'aaaaaaaaa')
    const headers = new HttpHeaders({ 'Content-Type': environment.contentType, 'Authorization': environment.authorization }).set("Access-Control-Allow-Origin","*");
    return this.http.post(environment.apiUrl + environment.apiEndPoints.getStoreDetials,
      body,
      { headers: headers }
    );
  }
  


  

}
