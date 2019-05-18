import { Injectable } from '@angular/core';
import Sprint, { Status } from './model/sprint';
import {of, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  sprints:Sprint[];
  private key = 'sprints-data';
  constructor() {
    const array = JSON.parse(localStorage.getItem(this.key));
    if (!array) {
      this.sprints = [
        new Sprint('5', 'Sprint 5', new Date(2019, 3, 1), new Date(2019, 3, 15), Status.IN_PROGRESS, 30, 4),
        new Sprint('4', 'Sprint 4', new Date(2019, 2, 16), new Date(2019, 2, 28), Status.COMPLETED, 28, 29),
        new Sprint('3', 'Sprint 3', new Date(2019, 2, 1), new Date(2019, 2, 15), Status.COMPLETED, 30, 29),
        new Sprint('2', 'Sprint 2', new Date(2019, 1, 16), new Date(2019, 1, 30), Status.COMPLETED, 30, 32),
        new Sprint('1', 'Sprint 1', new Date(2019, 1, 1), new Date(2019, 1, 15), Status.COMPLETED, 30, 28),
      ];
    } else {
      this.sprints = array.map(item => new Sprint(item.id, item.title, item.startDate, item.endDate, item.status, item.goal, item.velocity));
    }
  }


  getSprints(): Observable<Sprint[]> {
    return of(this.sprints);
  }

  addSprint(sprint: Sprint): void {
    this.sprints.unshift(sprint);
    this.save();
  }

  private save(): void {
    localStorage.setItem(this.key, JSON.stringify(this.sprints));
  }
}
