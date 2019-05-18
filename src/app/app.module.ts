import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule, NgbDatepicker, NgbActiveModal, NgbDateNativeAdapter, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SprintListComponent } from './sprint-list/sprint-list.component';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: 'sprints', component: SprintListComponent},
  {path: '', redirectTo: '/sprints', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    SprintListComponent,
    SprintFormComponent
  ],
  imports: [
    NgbModule,
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
