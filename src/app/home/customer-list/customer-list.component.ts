import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { RecentCustomers } from 'src/app/models/dashboard.model';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  birthday_min: any = new Date();
  birthday_max: any = new Date();
  lastVisit_min: any = new Date();
  lastVisit_max: any = new Date();
  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};

  subscription: any = [];
  customerList: Array<RecentCustomers> = [];
  imageUrl: String = "";
  isFilterEnabled: boolean = false;
  constructor(
    private apiService: ApiService,
    private readonly notifier: NotifierService,
    private router: Router,

  ) {
    this.getCustomerList();
  }

  getCustomerList() {
    const body = {};
    body["sort_by"] = "";
    body["number_of_records"] = "1000000"; // TODO : make it for all data. Need changes in api 
    body["offset"] = "0";
    body["filter"] = "";
    let s1 = this.apiService.customerList(body).subscribe(
      result => {
        const apiResponse: ApiResponse = result;
        this.customerList = apiResponse.data["customer_list"];
        this.imageUrl = apiResponse.data["image_url"];
      },
      error => {
        this.notifier.notify("error", "No record found");
        this.router.navigate(['/home']);
      })
    this.subscription.push(s1);
  }

  showFilter() {
    console.error($.fn['dataTable'].ext.search);
    this.isFilterEnabled = !this.isFilterEnabled;
    if (this.isFilterEnabled) {
      this.setFilter();
    } else {
      $.fn['dataTable'].ext.search = [];
    }
  }
  getDobDateString(d) {
    return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
  }
  setFilter() {
    $.fn['dataTable'].ext.search.push((settings, aData, dataIndex) => {
      var iFini = this.birthday_min;
      var iFfin = this.birthday_max;
      var iStartDateCol = 3;
      iFini = iFini.getFullYear() + "" + (iFini.getMonth() + 1) + "" + iFini.getDate();
      iFfin = iFfin.getFullYear() + "" + (iFfin.getMonth() + 1) + "" + iFfin.getDate();
      var datofini = parseInt(aData[iStartDateCol].substring(6, 10)) + "" + parseInt(aData[iStartDateCol].substring(3, 5)) + "" + parseInt(aData[iStartDateCol].substring(0, 2));
      var datoffin = parseInt(aData[iStartDateCol].substring(6, 10)) + "" + parseInt(aData[iStartDateCol].substring(3, 5)) + "" + parseInt(aData[iStartDateCol].substring(0, 2));
      if (iFini === "" && iFfin === "") {
        return true;
      }
      else if (iFini <= datofini && iFfin === "") {
        return true;
      }
      else if (iFfin >= datoffin && iFini === "") {
        return true;
      }
      else if (iFini <= datofini && iFfin >= datoffin) {
        return true;
      }
      return false;
    });

    $.fn['dataTable'].ext.search.push((settings, aData, dataIndex) => {
      var iFini = this.lastVisit_min;
      var iFfin = this.lastVisit_max;
      var iStartDateCol = 4;
      iFini = iFini.getFullYear() + "" + (iFini.getMonth() + 1) + "" + iFini.getDate();
      iFfin = iFfin.getFullYear() + "" + (iFfin.getMonth() + 1) + "" + iFfin.getDate();
      var datofini = parseInt(aData[iStartDateCol].substring(6, 10)) + "" + parseInt(aData[iStartDateCol].substring(3, 5)) + "" + parseInt(aData[iStartDateCol].substring(0, 2));
      var datoffin = parseInt(aData[iStartDateCol].substring(6, 10)) + "" + parseInt(aData[iStartDateCol].substring(3, 5)) + "" + parseInt(aData[iStartDateCol].substring(0, 2));
      if (iFini === "" && iFfin === "") {
        return true;
      }
      else if (iFini <= datofini && iFfin === "") {
        return true;
      }
      else if (iFfin >= datoffin && iFini === "") {
        return true;
      }
      else if (iFini <= datofini && iFfin >= datoffin) {
        return true;
      }
      return false;
    });

    // $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
    //   const id = parseFloat(data[5]) || 0; // use data for the id column
    //   if ((isNaN(this.min) && isNaN(this.max)) ||
    //     (isNaN(this.min) && id <= this.max) ||
    //     (this.min <= id && isNaN(this.max)) ||
    //     (this.min <= id && id <= this.max)) {
    //     return true;
    //   }
    //   return false;
    // });
  }

  ngOnInit() {
    this.dtOptions = {
      dom: 'lrfBtip',
      buttons: [
        { extend: 'excel', text: 'Export', title: 'store_customers' },
        { extend: 'print', text: 'Print', title: 'Store Customers' },
      ],
      language: {
        searchPlaceholder: "Search...",
        search: "",
        lengthMenu: "Show _MENU_ entries"
      },
      columns: [{
        title: 'Name',
        data: 'name'
      }, {
        title: 'Email',
        data: 'email'
      },
      {
        title: 'Contact No',
        data: 'contactno'
      },
      {
        title: 'Birthday',
        data: 'birthday'
      },
      {
        title: 'Last visit',
        data: 'lastvisit'
      },
      {
        title: 'Point total',
        data: 'pointtotal'
      },
      ]
    };
  }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
    $.fn['dataTable'].ext.search = [];
  }

  filterByBirthday(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  filterByLastVisit(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }


}
