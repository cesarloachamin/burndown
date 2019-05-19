import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import {Chart} from 'chart.js';
import Sprint from '../model/sprint';
import { DatePipe } from '@angular/common';
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
    const labels = this.createLabels();
    this.chart = new Chart('burndownCanvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Projected',
            borderColor: '#007bff', //danger #dc3545 //warning: #ffc107
            backgroundColor: '#007bff',
            lineTension: 0,
            borderWidth: 2,
            fill: false,
            data: this.createProjectedData(labels.length, this.sprint.goal)
          },
          {
            label: 'Real',
            lineTension: 0,
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            borderWidth: 6,
            fill: false,
            data: [60, 55, 50, 43, 36, 31, 25, 20, 16, 10, 4]
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

  createLabels(): string[] {
    const labels = [];
    const notWorkingDays = [0, 6];
    let currentDate = new Date(this.sprint.startDate.getTime());
    while(currentDate <= this.sprint.endDate) {
      if (notWorkingDays.indexOf(currentDate.getDay()) === -1) {
        labels.push(new DatePipe('en-US').transform(currentDate, 'EEEE d'));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return labels;
  }

  createProjectedData(days: number, goal: number): number[] {
    const data = [];
    const rate = goal / (days - 1);
    let current = goal;
    while (current >= 0) {
      data.push(current);
      current -= rate;
    }
    return data;
  }
}
