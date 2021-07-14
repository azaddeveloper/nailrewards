import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
import { NotifierService } from 'angular-notifier';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-store-menu',
  templateUrl: './store-menu.component.html',
  styleUrls: ['./store-menu.component.css']
})
export class StoreMenuComponent implements OnInit, OnDestroy {
  public storeMenuForm: FormGroup;
  public submitted: boolean = false;
  subscription: any = [];
  fileToUpload: File = null;
  formdata = new FormData();
  store_logo: any = "";
  label = "Choose a file...";
  storeMenu = "";
  constructor(private formBuilder: FormBuilder,
    public apiService: ApiService,
    private readonly notifier: NotifierService,
    public sharedService: SharedService, ) {

    this.showExistingStoreMenu();

  }

  showExistingStoreMenu(){
    this.storeMenu = this.sharedService.loggedInUser.storeDetails.storeSettings.spa_menu_pdf;
    if (this.storeMenu == undefined) {
      this.storeMenu = "";
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.storeMenuForm.invalid) {
      return;
    }
    let s1 = this.apiService.uploadStoreMenu(this.formdata).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.notifier.notify("success", apiResponse.message);
        this.submitted = false;
        this.resetForm();
        this.sharedService.loggedInUser = apiResponse.data;
        this.showExistingStoreMenu();
      },
      error => {
        this.apiService.handleError(error);
      })
    this.subscription.push(s1);
  }
  bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  resetForm() {
    this.storeMenuForm.reset();
    this.label = "Choose a file...";
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.size > 2097152) {
      this.resetForm();
      this.notifier.notify("error", "File size must be less then 2MB.");
      return;
    }
    if (this.fileToUpload.type.substring(0, 5) == "image") {
      this.label = "1 file selected";
      this.formdata.append("userfile", this.fileToUpload, this.fileToUpload.name);
    }
    else if (this.fileToUpload.type == "application/pdf") {
      this.label = "1 file selected";
      this.formdata.append("userfile", this.fileToUpload, this.fileToUpload.name);
    } else {
      this.resetForm();
      this.notifier.notify("error", "Please select pdf or image file for store menu.");
      return;
    }


    // if (this.fileToUpload.type.substring(0, 5) == "image") {
    //  
    //   this.formdata.append("userfile", this.fileToUpload, this.fileToUpload.name);
    // } else {
    //   this.notifier.notify("error", "Please select image file for logo.");
    //   return;
    // }
  }
  get f() { return this.storeMenuForm.controls; }


  ngOnInit() {
    this.storeMenuForm = this.formBuilder.group({
      userfile: ['', [Validators.required]],
    })
  }
  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }

}
