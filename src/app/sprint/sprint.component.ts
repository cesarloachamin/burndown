import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  sprintForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
  }

  isFormControlInValid(name: string): boolean {
    const control = this.sprintForm.controls[name];
    return !control.valid && control.touched;
  }

}
