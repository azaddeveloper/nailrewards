import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NotifierService } from "angular-notifier";



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders();
  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private readonly notifier: NotifierService
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

  homePage(): Observable<any> {
    return this.http.get(environment.apiUrl + environment.apiEndPoints.homePage, { headers: this.getHeader() });
  }
  addStoreNews(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.addStoreNews,
      body,
      { headers: this.getHeader() }

    );
  }
  updateStoreNews(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.updateStoreNews,
      body,
      { headers: this.getHeader() }

    );
  }

  getStoreNews(): Observable<any> {
    return this.http.get(environment.apiUrl + environment.apiEndPoints.getStoreNews, { headers: this.getHeader() });
  }
  deleteStoreNews(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.deleteStoreNews,
      body,
      { headers: this.getHeader() }

    );
  }
  getOneStoreNews(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.getOneStoreNews,
      body,
      { headers: this.getHeader() }

    );
  }
  getOneStoreReward(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.getOneStoreReward,
      body,
      { headers: this.getHeader() }

    );
  }

  getStoreRewards(): Observable<any> {
    return this.http.get(environment.apiUrl + environment.apiEndPoints.getStoreRewards, { headers: this.getHeader() });
  }
  updateUserProfile(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.updateUserProfile,
      body,
      { headers: this.getHeader() }

    );
  }
  changePassword(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.changePassword,
      body,
      { headers: this.getHeader() }

    );
  }
  addStoreRewards(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.addStoreRewards,
      body,
      { headers: this.getHeader() }

    );
  }
  updateStoreRewards(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.updateStoreRewards,
      body,
      { headers: this.getHeader() }

    );
  }
  deleteStoreReward(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.deleteStoreReward,
      body,
      { headers: this.getHeader() }

    );
  }
  updateStoreHours(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.updateStoreHours,
      body,
      { headers: this.getHeader() }

    );
  }
  uploadStoreLogo(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.uploadStoreLogo,
      body,
      { headers: this.getHeaderForUpload() }

    );
  }
  uploadStoreMenu(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.uploadStoreMenu,
      body,
      { headers: this.getHeaderForUpload() }

    );
  }
  updateRewardSettings(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.updateRewardSettings,
      body,
      { headers: this.getHeader() }
    );
  }
  updateAppearanceSettings(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.updateAppearanceSettings,
      body,
      { headers: this.getHeader() }
    );
  }
  customerList(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.customerList,
      body,
      { headers: this.getHeader() }
    );
  }
  customerDetail(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.customerDetail,
      body,
      { headers: this.getHeader() }
    );
  }
  redeemReward(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.redeemReward,
      body,
      { headers: this.getHeader() }
    );
  }
  customerTransaction(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.customerTransaction,
      body,
      { headers: this.getHeader() }
    );
  }
  updateStoreInformation(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.updateStoreInformation,
      body,
      { headers: this.getHeader() }
    );
  }
  updateSocialLinks(body): Observable<any> {
    return this.http.post(environment.apiUrl + environment.apiEndPoints.updateSocialLinks,
      body,
      { headers: this.getHeader() }
    );
  }



  testLocaiton(): Observable<any> {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway&key=" + environment.google_map_api_key);
  }
 


  handleError(error) {
    console.log(error);
    switch (error.status) {
      case 401:
        localStorage.removeItem("AUTH_TOKEN");
        this.authService.isLogged.next(false);
        this.router.navigate(['login']);
        break;
      case 500:
        this.notifier.notify("error", "Something went wrong!");
        break;
      case 404:
        this.notifier.notify("error", error.error.message);
        break;
      default:
        this.notifier.notify("error", "Something went wrong!");
        break;
    }

  }

}
