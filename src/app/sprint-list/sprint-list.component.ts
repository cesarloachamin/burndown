import { Component, OnInit } from '@angular/core';
import { SprintService } from '../sprint.service';
import Sprint from '../model/sprint';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {

  sprints: Sprint[];
  constructor(private service:SprintService) { }

  ngOnInit() {
    this.service.getSprints()
                .subscribe(sprints => this.sprints = sprints);
  }

}
