import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { StoreNews } from 'src/app/models/store-news.model';
import { ConfirmationDialogService } from '../confirm-dialog/confirmation-dialog.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  public storeNewsData: StoreNews = new StoreNews();
  subscription: any = [];
  isData:boolean=false;
  constructor(
    private apiService: ApiService,
    private confirmationDialogService: ConfirmationDialogService,
    private readonly notifier: NotifierService
  ) { }


  getNewsData() {
    this.isData=false;
    let s1 = this.apiService.getStoreNews().subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.storeNewsData = apiResponse.data;
        this.isData=true;

      },
      error => {
        //this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

  ngOnInit() {
    this.getNewsData();
  }

  public openConfirmationDialog(index, news) {
    this.confirmationDialogService.confirm('Alert', 'Are you sure you want to delete this news/promotion?')
      .then((confirmed) => confirmed ? this.deleteStoreNews(index, news) : "")
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteStoreNews(index, news) {
    var body = {};
    body['id'] = news.id;
    let s1 = this.apiService.deleteStoreNews(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.notifier.notify("success", apiResponse.message);
        this.getNewsData();
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
