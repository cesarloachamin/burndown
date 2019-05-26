import { Injectable } from '@angular/core';
import Sprint, { Status } from './model/sprint';
import {of, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { BacklogItem } from './model/backlog.item';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  sprints:Sprint[];
  private sprintsCollection: AngularFirestoreCollection<Sprint>;
  private key = 'sprints-data';

  constructor(private afs: AngularFirestore) {
    // const array = JSON.parse(localStorage.getItem(this.key));
    // if (!array) {
    //   this.sprints = [
    //     new Sprint('5', 'Sprint 5', new Date(2019, 3, 1), new Date(2019, 3, 15), Status.IN_PROGRESS, 30, 4),
    //     new Sprint('4', 'Sprint 4', new Date(2019, 2, 16), new Date(2019, 2, 28), Status.COMPLETED, 28, 29),
    //     new Sprint('3', 'Sprint 3', new Date(2019, 2, 1), new Date(2019, 2, 15), Status.COMPLETED, 30, 29),
    //     new Sprint('2', 'Sprint 2', new Date(2019, 1, 16), new Date(2019, 1, 30), Status.COMPLETED, 30, 32),
    //     new Sprint('1', 'Sprint 1', new Date(2019, 1, 1), new Date(2019, 1, 15), Status.COMPLETED, 30, 28),
    //   ];
    // } else {
    //   this.sprints = array.map(item => {
    //     const sprint = new Sprint(item.id, item.title, new Date(item.startDate), new Date(item.endDate), item.status, item.goal, item.velocity);
    //     sprint.items = item.items || [];
    //     return sprint;
    //   });
    // }
    this.sprintsCollection = afs.collection<Sprint>('sprints');
  }


  getSprints(): Observable<Sprint[]> {
    return this.sprintsCollection.snapshotChanges().pipe(
      map(sprints => {
        return sprints.map(s => {
          const data = s.payload.doc.data() as Sprint;
          data.uid = s.payload.doc.id;
          return data;
        });
      })
    );
    //.valueChanges();//.pipe(map(array => array.map((item: any) => {debugger; return new Sprint(item.title, item.starDate, item.endDate, item.status, item.goal, item.velocity, item.uid);})));
  }

  getSprint(id: string): Observable<Sprint> {
    return this.sprintsCollection.doc<Sprint>(id).valueChanges();
  }

  addSprint(sprint: Sprint): void {
    this.sprintsCollection.add(JSON.parse(JSON.stringify(sprint)));
  }

  addBacklogItem(sprint: Sprint, item: BacklogItem): Observable<Sprint> {
    item.id = sprint.items.length + '';
    sprint.items.push(item);
    this.save();
    return of(sprint);
  }

  editBacklogItem(sprint: Sprint, item: BacklogItem): Observable<Sprint> {
    const idx = sprint.items.findIndex(i => i.id === item.id);
    sprint.items[idx] = item;
    this.save();
    return of(sprint);
  }

  deleteBacklogItem(sprint: Sprint, item: BacklogItem): Observable<Sprint> {
    sprint.items = sprint.items.filter(i => i.id !== item.id);
    this.save();
    return of(sprint);
  }

  private save(): void {
    localStorage.setItem(this.key, JSON.stringify(this.sprints));
  }
}
