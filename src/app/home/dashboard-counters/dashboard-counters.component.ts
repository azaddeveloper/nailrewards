import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-counters',
  templateUrl: './dashboard-counters.component.html',
  styleUrls: ['./dashboard-counters.component.css']
})
export class DashboardCountersComponent implements OnInit {
  @Input() total_customer: any;
  @Input() total_news:any;
  @Input() total_rewards:any;
  @Input() total_visitor:any;
  
  constructor() { }

  ngOnInit() {
    
  }

}
