import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Sprint from '../model/sprint';
import { SprintService } from '../sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  sprint:Sprint;
  constructor(private route: ActivatedRoute, private service: SprintService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getSprint(id).subscribe(sprint => this.sprint = sprint);
    });
  }

}
