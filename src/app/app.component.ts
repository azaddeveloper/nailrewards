import { Component } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'admin';
  data = [{ "name": "satanand", "email": "safdas@sadf.com", "age": "23", "city": "asdf" }];
  
  constructor() { }

  ngOnInit() {
  }
}

