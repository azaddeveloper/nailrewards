import { Component, OnInit, Input } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-amount-chart',
  templateUrl: './amount-chart.component.html',
  styleUrls: ['./amount-chart.component.css']
})
export class AmountChartComponent implements OnInit {

  @Input() data: any = {
    "x": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "y": [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000]
  };
  @Input() chartTitle:string="";
  // private dataPlace:any =[0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000];
  private dataLabel: any = this.data.x;

  title = 'admin';
  public lineChartData: ChartDataSets[] = [
    { data: this.data.y, label: 'Customers' },

  ];
  public lineChartLabels: Label[] = this.dataLabel;
  public lineChartOptions: (ChartOptions & {}) = {
    // responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'day'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return '$' + value;
            // return value;
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }]
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function (tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': $' + tooltipItem.yLabel;
          // return datasetLabel + ': ' + tooltipItem.yLabel;
        }
      }
    }

  };
  public lineChartColors: Color[] = [
    {
      borderColor: "rgba(241,141,0, 1)",
      backgroundColor: 'transparent',
      pointRadius: 3,
      pointBackgroundColor: "rgba(241,141,0, 1)",
      pointBorderColor: "rgba(241,141,0, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,

    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor() { }

  ngOnInit() {
    // this.dataLabel=this.data.x;
    // this.dataPlace=;
    this.lineChartData = [
      { data: this.data.y, label: this.chartTitle },
    ];

  }

}
