import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Dashboard } from 'src/app/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public dashboadData: Dashboard = new Dashboard();
  subscription: any = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let s1 = this.apiService.homePage().subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.dashboadData = apiResponse.data;
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);

   
  }



  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

}
