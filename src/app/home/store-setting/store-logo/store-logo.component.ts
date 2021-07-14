import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { strictEqual } from 'assert';
import { ApiService } from 'src/app/api.service';
import { NotifierService } from 'angular-notifier';
import { SharedService } from 'src/app/shared.service';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-store-logo',
  templateUrl: './store-logo.component.html',
  styleUrls: ['./store-logo.component.css']
})
export class StoreLogoComponent implements OnInit, OnDestroy {
  public storeLogoForm: FormGroup;
  public submitted: boolean = false;
  subscription: any = [];
  fileToUpload: File = null;
  formdata = new FormData();
  store_logo: any = "";
  constructor(private formBuilder: FormBuilder,
    public apiService: ApiService,
    private readonly notifier: NotifierService,
    public sharedService: SharedService,
  ) {
    if (this.sharedService.loggedInUser.storeDetails.store_logo !== "") {
      this.store_logo = this.sharedService.loggedInUser.storeDetails.store_logo;
    }
  }

  bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }

  ngOnInit() {
    this.storeLogoForm = this.formBuilder.group({
      userfile: ['', [Validators.required]],
    })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.type.substring(0, 5) == "image") {
      if (this.fileToUpload.size > 1048576) {
        this.notifier.notify("error", "Logo file size must be less then 1MB.");
        return;
      }
      this.formdata.append("userfile", this.fileToUpload, this.fileToUpload.name);
      const reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload);
      reader.onload = () => {
        this.store_logo = reader.result;
      };
      
    } else {
      this.notifier.notify("error", "Please select image file for logo.");
      return;
    }
  }
  get f() { return this.storeLogoForm.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.storeLogoForm.invalid) {
      return;
    }
    let s1 = this.apiService.uploadStoreLogo(this.formdata).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.notifier.notify("success", apiResponse.message);
        this.submitted = false;
        this.sharedService.loggedInUser=apiResponse.data;
        this.storeLogoForm.reset();
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
