import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-recentcustomers',
  templateUrl: './dashboard-recentcustomers.component.html',
  styleUrls: ['./dashboard-recentcustomers.component.css']
})
export class DashboardRecentcustomersComponent implements OnInit {
  @Input() recent_customers;
  dtOptions: any = {};

  //public customersData:Array<any>=[];
  constructor() {


  }

  ngOnInit() {
    this.dtOptions = {
      dom: 'lrfBtip',
      buttons: [
        {extend:'excel',text :'Export',title:'recent_customers'},
        'print',
       
      ],
      language: {
        searchPlaceholder: "Search...",
        search:"",
        lengthMenu:"Show _MENU_ entries"
      }
    };
  }

}
