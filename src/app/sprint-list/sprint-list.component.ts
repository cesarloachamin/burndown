import { Component, OnInit } from '@angular/core';
import { SprintService } from '../sprint.service';
import Sprint from '../model/sprint';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SprintFormComponent } from '../sprint-form/sprint-form.component';

@Component({
  selector: 'app-sprint-list',
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css']
})
export class SprintListComponent implements OnInit {

  sprints: Sprint[];
  constructor(private service:SprintService, private modalService: NgbModal) { }

  ngOnInit() {
    this.service.getSprints()
                .subscribe(sprints => this.sprints = sprints);
  }

  create(): void {
    this.modalService.open(SprintFormComponent);
  }

}
