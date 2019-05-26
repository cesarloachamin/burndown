import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Sprint from '../model/sprint';
import { SprintService } from '../sprint.service';
import { BacklogItem, BacklogItemType } from '../model/backlog.item';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  sprint:Sprint;
  selectedItem: BacklogItem;

  constructor(private route: ActivatedRoute, private service: SprintService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getSprint(id).subscribe(sprint => {
        this.sprint = sprint;
      });
    });
  }

  onBacklogItemSelected(item: BacklogItem) : boolean {
    this.selectedItem = item;
    return false;
  }

  onBacklogItemSaved(item: BacklogItem) : void {
    let subscriber;
    if (item.isNew()) {
      subscriber = this.service.addBacklogItem(this.sprint, item);
    } else {
      subscriber = this.service.editBacklogItem(this.sprint, item);
    }
    subscriber.then(() => console.log('dsfasf'));
  }

  onBacklogItemDeleted(item: BacklogItem): void {
    this.service.deleteBacklogItem(this.sprint, item).subscribe(sprint => this.sprint = sprint);
  }

}
