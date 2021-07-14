import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { StoreReward } from 'src/app/models/store-reward.model';
import { NotifierService } from 'angular-notifier';
import { ConfirmationDialogService } from '../confirm-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-reward-list',
  templateUrl: './reward-list.component.html',
  styleUrls: ['./reward-list.component.css']
})
export class RewardListComponent implements OnInit, OnDestroy {
  dtOptions: any = {
    dom: 'lrfBtip',
    buttons: [
      {
        extend: 'excel',
        text: 'Export',
        title: 'Rewards',
        exportOptions: {
          columns: [0, 1, 2, 3]
        }
      },
      {
        extend: 'print',
        text: 'Print',
        title: 'Rewards',
        exportOptions: {
          columns: [0, 1, 2, 3]
        }
      }
    ],
    language: {
      searchPlaceholder: "Search...",
      search: "",
      lengthMenu: "Show _MENU_ entries"
    }
  };
  public storeReward: Array<StoreReward> = [];
  subscription: any = [];
  public tData: boolean = false;
  constructor(
    private apiService: ApiService,
    private readonly notifier: NotifierService,
    private confirmationDialogService: ConfirmationDialogService,
  ) { }

  ngOnInit() {
    let s1 = this.apiService.getStoreRewards().subscribe(
      result => {

        const apiResponse: ApiResponse = result;
        this.storeReward = apiResponse.data;
        this.tData = true;
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }

  enableDisableReward(reward: StoreReward) {
    reward.enabled = reward.enabled == 0 ? 1 : 0;
    let s1 = this.apiService.updateStoreRewards(reward).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        reward = apiResponse.data;
        this.notifier.notify("success", apiResponse.message);
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);

  }

  public openConfirmationDialog(index, reward: StoreReward) {
    this.confirmationDialogService.confirm('Alert', 'Are you sure you want to delete this reward?')
      .then((confirmed) => confirmed ? this.deleteStoreReward(index, reward) : "")
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteStoreReward(index, reward: StoreReward) {
    this.tData = false;
    var body = {};
    body['reward_id'] = reward.reward_id;
    let s1 = this.apiService.deleteStoreReward(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.notifier.notify("success", apiResponse.message);
        this.storeReward.splice(index, 1);
        this.tData = true;
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
