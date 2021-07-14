import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import * as introJs from 'intro.js/intro.js';
import { ApiResponse } from 'src/app/models/api-response.model';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('auto', { static: false }) auto;
  data = [];
  keyword = 'email';
  subscription: any = [];
  imageUrl="";
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logOut() {
    localStorage.removeItem("AUTH_TOKEN");
    this.authService.isLogged.next(false);
    this.router.navigate(['login']);
  }

  startTour() {
    introJs()
      .setOption("showProgress", true)
      .setOption("hidePrev", true)
      .setOption("hideNext", true)
      .setOption("showStepNumbers", false)
      .setOption("keyboardNavigation", true)
      .setOption("disableInteraction", true)
      .start();
  }
  selectEvent(e) {
    this.sharedService.selectedCustomer=e.customer_id;
    this.router.navigate(['/home/customerDetails'],{queryParams:{customer_id:e.customer_id}});
  }
  onChangeSearch(e) {
    this.getSearchResult(e);
  }

  getSearchResult(e = "") {
    const body = {};
    body["sort_by"] = "first_name";
    body["number_of_records"] = "3";
    body["offset"] = "0";
    body["filter"] = JSON.stringify({ "email": e });
    let s1 = this.apiService.customerList(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.data = apiResponse.data["customer_list"];
        this.imageUrl = apiResponse.data["image_url"];
      },
      error => {
        // this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }
  onFocused(e) {
    this.getSearchResult(e.target.value);
  }

  inputCleared(e) {
    this.auto.close();
  }
  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }


}
