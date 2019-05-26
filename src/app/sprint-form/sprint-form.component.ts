import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Sprint from '../model/sprint';
import { SprintService } from '../sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css']
})
export class SprintFormComponent implements OnInit {

  sprintForm: FormGroup;

  constructor(private fb: FormBuilder, private service: SprintService, public activeModal: NgbActiveModal) {
    this.sprintForm = this.fb.group({
      'title': ['', Validators.required],
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
      'goal': [0, Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.sprintForm.valid) {

      const sprint = new Sprint(this.sprintForm.controls['title'].value,
        this.sprintForm.controls['startDate'].value,
        this.sprintForm.controls['endDate'].value,
        this.sprintForm.controls['goal'].value);
      this.service.addSprint(sprint);
      this.activeModal.close('saved sprint');
    } else {
      Object.keys(this.sprintForm.controls).forEach(key => this.sprintForm.controls[key].markAsTouched());
    }
  }

  isFormControlInValid(name: string): boolean {
    const control = this.sprintForm.controls[name];
    return !control.valid && control.touched;
  }

}
