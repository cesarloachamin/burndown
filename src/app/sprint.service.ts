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
    this.sprintsCollection = afs.collection<Sprint>('sprints');
  }


  getSprints(): Observable<Sprint[]> {
    return this.sprintsCollection.snapshotChanges().pipe(
      map(sprints => {
        return sprints.map(s => this.mapToSprint(s));
      })
    );
    //.valueChanges();//.pipe(map(array => array.map((item: any) => {debugger; return new Sprint(item.title, item.starDate, item.endDate, item.status, item.goal, item.velocity, item.uid);})));
  }

  getSprint(id: string): Observable<Sprint> {
    return this.sprintsCollection.doc<Sprint>(id).snapshotChanges().pipe(map(s => this.mapToSprint(s)));
  }

  addSprint(sprint: Sprint): void {
    this.sprintsCollection.add(this.serialize(sprint));
  }

  addBacklogItem(sprint: Sprint, item: BacklogItem): Promise<void> {
    sprint.items.push(item);
    return this.sprintsCollection.doc(sprint.uid).set(this.serialize(sprint));
  }

  editBacklogItem(sprint: Sprint, item: BacklogItem): Observable<Sprint> {
    const idx = sprint.items.findIndex(i => i.id === item.id);
    sprint.items[idx] = item;
    this.sprintsCollection.doc(sprint.uid).set(sprint);
    return of(sprint);
  }

  deleteBacklogItem(sprint: Sprint, item: BacklogItem): Observable<Sprint> {
    sprint.items = sprint.items.filter(i => i.id !== item.id);
    this.sprintsCollection.doc(sprint.uid).set(sprint);
    return of(sprint);
  }

  private serialize(sprint: Sprint): Sprint {
    return JSON.parse(JSON.stringify(sprint));
  }

  private mapToSprint(sprintRef) {
    const doc = sprintRef.payload.doc || sprintRef.payload;
    const data = doc.data() ;
    data.uid = doc.id;
    return data;
  }
}
