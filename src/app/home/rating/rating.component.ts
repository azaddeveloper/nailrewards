import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AvgRating, RecentRating } from 'src/app/models/store-rating.model';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnDestroy {
  avgData:boolean=false;
  recentData:boolean=false;
  avgRating:AvgRating=new AvgRating();

  recentRating:RecentRating;
  subscription: any = [];
  constructor(private apiService:ApiService) {
    this.storeAverageRating();
    this.getRecentRating();
   }

  ngOnInit() {
  }

  storeAverageRating(){
    let s1 = this.apiService.storeAverageRating().subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.avgRating=apiResponse.data;
        this.avgData=true;
      },
      error => {
     //   this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

  getRecentRating(stars=0){
    var body={};
    body["stars"]=stars;
    let s1 = this.apiService.getRecentRating(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.recentRating=apiResponse.data;
        this.recentData=true;
      
      },
      error => {
     //   this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

  arrayOne(n: any): any[] {
    return [...Array(Number(n)).keys()];
  }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
    
  }

}
