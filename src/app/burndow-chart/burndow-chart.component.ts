import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Chart} from 'chart.js';
import Sprint from '../model/sprint';
declare var window:any;

@Component({
  selector: 'app-burndow-chart',
  templateUrl: './burndow-chart.component.html',
  styleUrls: ['./burndow-chart.component.css']
})
export class BurndowChartComponent implements OnInit {

  @Input()
  private sprint: Sprint;
  chart = [];

  constructor() { }

  ngOnInit() {
    this.chart = new Chart('burndownCanvas', {
      type: 'line',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Proyected',
            borderColor: '#007bff', //danger #dc3545 //warning: #ffc107
            backgroundColor: '#007bff',
            lineTension: 0,
            borderWidth: 2,
            fill: false,
            data: [60, 50, 40, 30, 20, 10, 0]
          },
          {
            label: 'Real',
            lineTension: 0,
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            borderWidth: 6,
            fill: false,
            data: [60, 55, 45, 35, 22, 17, 8]
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: 'Burndown'
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Days'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Story Points'
            }
          }]
        }
      }
    });
  }
}
