import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { RecentCustomers } from 'src/app/models/dashboard.model';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SendNotificationComponent } from '../send-notification/send-notification.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  dtOptions: any = {};
  subscription: any = [];
  customerList: Array<RecentCustomers> = [];
  



  //filters options //
  isFilterEnabled: boolean = false; // initial filter option hidden
  cust_info: boolean = false;
  reward_point: boolean = false;
  birth_day: boolean = false;
  last_visit: boolean = false;

  //filter initial values for birthday
  birthday_min: any = new Date();
  birthday_max: any = new Date();
  //filter initial values for last visit
  lastVisit_min: any = new Date();
  lastVisit_max: any = new Date();
  //filter initial values for reward point
  point_min: number = 0;
  point_max: number = 10;
  //filter initial values for customer information like name, email and contact number
  name: String = "";
  contactNumber: string = "";
  cust_email: string = "";
  //filters options //



  constructor(
    private apiService: ApiService,
    private readonly notifier: NotifierService,
    private router: Router,
    private modalService: NgbModal


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
      },
      error => {
       // this.notifier.notify("error", "No record found");
        this.router.navigate(['/home']);
      })
    this.subscription.push(s1);
  }

  showFilter() {
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

  getTwoDigitNumber(str){
    if (str.toString().length == 1) {
      return  "0" + str;
    }
    return str;
  }

  setBirthDayFilter() {
    $.fn['dataTable'].ext.search.push((settings, aData, dataIndex) => {
      var iFini = this.birthday_min;
      var iFfin = this.birthday_max;
      var iStartDateCol = 4;
      var date=new Date(aData[iStartDateCol].toString());
      iFini = 2020 + "" + this.getTwoDigitNumber(iFini.getMonth() + 1) + "" + this.getTwoDigitNumber(iFini.getDate());
      iFfin = 2020 + "" + this.getTwoDigitNumber(iFfin.getMonth() + 1) + "" + this.getTwoDigitNumber(iFfin.getDate());
      var datofini = 2020 + "" + this.getTwoDigitNumber(date.getMonth()+1) + "" + this.getTwoDigitNumber(date.getDate());
      var datoffin = 2020 + "" + this.getTwoDigitNumber(date.getMonth()+1) + "" + this.getTwoDigitNumber(date.getDate());
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
  }

  setVisitFilter() {
    $.fn['dataTable'].ext.search.push((settings, aData, dataIndex) => {
      var iFini = this.lastVisit_min;
      var iFfin = this.lastVisit_max;
      var iStartDateCol = 5;
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
  }

  setCutomerInfoFilter() {
    $.fn['dataTable'].ext.search.push((settings, aData, dataIndex) => {
      var searchCollumn = 1;
      if (this.name === "") {
        return true;
      }
      else if (aData[searchCollumn].indexOf(this.name) >= 0) {
        return true;
      }
      return false;
    });
    $.fn['dataTable'].ext.search.push((settings, aData, dataIndex) => {
      var searchCollumn = 3;
      var check = aData[searchCollumn].indexOf(this.contactNumber)
      console.error(aData[searchCollumn]);

      if (this.contactNumber == "") {
        return true;
      }
      else if (check >= 0) {
        return true;
      }
      return false;
    });
    $.fn['dataTable'].ext.search.push((settings, aData, dataIndex) => {
      var searchCollumn = 2;
      var check = aData[searchCollumn].indexOf(this.cust_email)
      if (this.cust_email == "") {
        return true;
      }
      else if (check >= 0) {
        return true;
      }
      return false;
    });
  }
  setRewardPointFilter() {
    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      const id = parseFloat(data[6]) || 0; // use data for the id column
      if ((isNaN(this.point_min) && isNaN(this.point_max)) ||
        (isNaN(this.point_min) && id <= this.point_max) ||
        (this.point_min <= id && isNaN(this.point_max)) ||
        (this.point_min <= id && id <= this.point_max)) {
        return true;
      }
      return false;
    });
  }
  setFilter() {
    $.fn['dataTable'].ext.search = [];
    if (this.cust_info) {
      this.setCutomerInfoFilter();
    }
    if (this.reward_point) {
      this.setRewardPointFilter();
    }
    if (this.birth_day) {
      this.setBirthDayFilter();
    }
    if (this.last_visit) {
      this.setVisitFilter();
    }
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }
  
  openNotificationDialog(customers,that){
    if(customers.length<1){
      that.notifier.notify("error", "You don't have selected any customer.");
      return;
    }
    const modalRef = that.modalService.open(SendNotificationComponent);
    modalRef.componentInstance.customers = customers;
    modalRef.result
      .then((result) => {
        if(result==true){
          
        }
      })
      .catch((error) => {
        // console.log(error);
      });
    
  }

  ngOnInit() {
    var that=this;
    this.dtOptions = {
      dom: 'lrfBtip',
      order:[],
      select: {
        style: 'multi',
        info:false,
        selector: 'td:first-child'
      },
      buttons: [
        { extend: 'excel', text: 'Export', title: 'store_customers' },
        { extend: 'print', text: 'Print', title: 'Store Customers' },
        {extend:'selectAll',text:'Select All'},
        {extend:'selectNone',text:'Deselect All'},
        {
          text: 'Send Lightning Notification',
          action: function ( e, dt, node, config ) {
            var rows = dt.rows( {selected: true} ).data().toArray();
            var x=CustomerListComponent.prototype;
            x.openNotificationDialog(rows,that);
          }
        },
        
      ],
      language: {
        searchPlaceholder: "Search...",
        search: "",
        lengthMenu: "Show _MENU_ entries"
      },
      columns: [
      {
        title:"",
        className: 'select-checkbox',
        data: 'select',
        orderable:false
      },
      {
        title: 'Name',
        data: 'name',
        orderable:false
      }, {
        title: 'Email',
        data: 'email',
        orderable:false
      },
      {
        title: 'Contact No',
        data: 'contactno',
        orderable:false
      },
      {
        title: 'Birthday',
        data: 'birthday',
        orderable:false
      },
      {
        title: 'Last visit',
        data: 'lastvisit',
        orderable:false
      },
      {
        title: 'Point total',
        data: 'pointtotal',
        orderable:false
      },
      {
        title: 'Notification',
        data: 'notification_status',
        orderable:true
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

  filterData(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  navigateToUserDetails(customer){
    this.router.navigate(['home/customerDetails'],{queryParams:{customer_id:customer.customer_id}});
  }

}
