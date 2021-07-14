import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAppInitialized: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  login(email: String, password: String): Observable<any> {
    var body = {};
    body['email'] = email;
    body['password'] = password;
    const headers = new HttpHeaders({ 'Content-Type': environment.contentType, 'Authorization': environment.authorization });
    return this.http.post(environment.apiUrl + environment.apiEndPoints.login,
      body,
      { headers: headers }
    );
  }

  isLoggedIn() {
    const headers = new HttpHeaders({ 'Content-Type': environment.contentType, 'Authorization': environment.authorization,"AUTH_TOKEN":localStorage.getItem("AUTH_TOKEN")});
    return this.http.get(environment.apiUrl + environment.apiEndPoints.isLoggedIn, { headers: headers }).pipe(
      map(
        (response: any) => {
          this.isLogged.next(response.status);
          return response;
        }
      )
    );
  }
  getStrodeDetails(store_id){
    var body = {};
    body['store_code'] = store_id;
    const headers = new HttpHeaders({ 'Content-Type': environment.contentType, 'Authorization': environment.authorization }).set("Access-Control-Allow-Origin","*");
    return this.http.post(environment.apiUrl + environment.apiEndPoints.getStoreDetials,
      body,
      { headers: headers }
    );
  }
  getCustomerDetails(phone_number){
    var body = {};
    body['phone_number'] = phone_number;
    body['from'] = 'salon';
    const headers = new HttpHeaders({ 'Content-Type': environment.contentType, 'Authorization': environment.authorization }).set("Access-Control-Allow-Origin","*");
    return this.http.post(environment.apiUrl + environment.apiEndPoints.getCustomerDetials,
      body,
      { headers: headers }
    );
  }
 
  initializeApp(){
    return  this.isAppInitialized.next(true);
  }
}
