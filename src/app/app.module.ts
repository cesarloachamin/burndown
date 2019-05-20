import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule, NgbDatepicker, NgbActiveModal, NgbDateNativeAdapter, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SprintComponent } from './sprint/sprint.component';
import { BacklogItemFormComponent } from './backlog-item-form/backlog-item-form.component';
import { BurndowChartComponent } from './burndow-chart/burndow-chart.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sprints', component: SprintListComponent},
  {path: 'sprint/:id', component: SprintComponent},
  {path: '', redirectTo: '/sprints', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    SprintListComponent,
    SprintFormComponent,
    SprintComponent,
    BacklogItemFormComponent,
    BurndowChartComponent,
    LoginComponent
  ],
  imports: [
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    NgbActiveModal,
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}
  ],
  bootstrap: [AppComponent],
  entryComponents: [SprintFormComponent]
})
export class AppModule { }
