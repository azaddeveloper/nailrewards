import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAppInitialized: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  login(email: String, password: String): Observable<any> {
    var body = {};
    body["email"] = email;
    body["password"] = password;
    const headers = new HttpHeaders({
      "Content-Type": environment.contentType,
      Authorization: environment.authorization
    });
    return this.http.post(
      environment.apiUrl + environment.apiEndPoints.login,
      body,
      { headers: headers }
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
  getCustomerDetails(phone_number,store_code){
    var body = {};
    body['phone_number'] = phone_number;
    body['from'] = 'salon';
    body['store_code'] = store_code;
    const headers = new HttpHeaders({ 'Content-Type': environment.contentType, 'Authorization': environment.authorization }).set("Access-Control-Allow-Origin","*");
    return this.http.post(environment.apiUrl + environment.apiEndPoints.getCustomerDetials,
      body,
      { headers: headers }
    );
  }
  addReward(body): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": environment.contentType,
      Authorization: environment.authorization
    });
    return this.http.post(
      environment.apiUrl + environment.apiEndPoints.addReward,
      body,
      { headers: headers }
    );
  }
  redeemReward(body): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": environment.contentType,
      Authorization: environment.authorization
    });
    return this.http.post( 
      environment.apiUrl + environment.apiEndPoints.redeemstoreAuthReward,
      body,
      { headers: headers }
    );
  }

  forgetPasswordUsingEmailOTP(email: String): Observable<any> {
    var body = {};
    body["email"] = email;
    const headers = new HttpHeaders({
      "Content-Type": environment.contentType,
      Authorization: environment.authorization
    });
    return this.http.post(
      environment.apiUrl + environment.apiEndPoints.forgetPasswordUsingEmailOTP,
      body,
      { headers: headers }
    );
  }

  
  verifyPasswordOTP(email: String, otp: String): Observable<any> {
    var body = {};
    body["email"] = email;
    body["otp"] = otp;
    const headers = new HttpHeaders({
      "Content-Type": environment.contentType,
      Authorization: environment.authorization
    });
    return this.http.post(
      environment.apiUrl + environment.apiEndPoints.verifyPasswordOTP,
      body,
      { headers: headers }
    );
  }
  
  resetPasswordUsingEmailOTP(body): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": environment.contentType,
      Authorization: environment.authorization
    });
    return this.http.post(
      environment.apiUrl + environment.apiEndPoints.resetPasswordUsingEmailOTP,
      body,
      { headers: headers }
    );
  }

  isLoggedIn() {
    const headers = new HttpHeaders({
      "Content-Type": environment.contentType,
      Authorization: environment.authorization,
      AUTH_TOKEN: localStorage.getItem("AUTH_TOKEN")
    });
    return this.http
      .get(environment.apiUrl + environment.apiEndPoints.isLoggedIn, {
        headers: headers
      })
      .pipe(
        map((response: any) => {
          this.isLogged.next(response.status);
          return response;
        })
      );
  }

  initializeApp() {
    return this.isAppInitialized.next(true);
  }
}
