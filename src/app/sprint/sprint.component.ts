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
        if (!this.sprint.items) {
          this.sprint.items = [];
          this.sprint.items.push(new BacklogItem('1a', 'Create an admin page', 5, BacklogItemType.HISTORY_TYPE));
        }
      });
    });
  }

  onBacklogItemSelected(item: BacklogItem) : boolean {
    this.selectedItem = item;
    return false;
  }

  onBacklogItemSaved(item: BacklogItem) : void {
    item.id = (Math.random() * 10000).toFixed(0);
    this.sprint.items.push(item);
  }

}
