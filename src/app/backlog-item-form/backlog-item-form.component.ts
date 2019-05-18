import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-backlog-item-form',
  templateUrl: './backlog-item-form.component.html',
  styleUrls: ['./backlog-item-form.component.css']
})
export class BacklogItemFormComponent implements OnInit {

  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.itemForm = fb.group({
      'title': ['', Validators.required],
      'type': ['1', Validators.required],
      'value': ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  save(): void {
    if (this.itemForm.valid) {

    } else {
      Object.keys(this.itemForm.controls).forEach(key => this.itemForm.controls[key].markAsTouched());
    }
  }

  isFormControlInValid(name: string): boolean {
    const control = this.itemForm.controls[name];
    return !control.valid && control.touched;
  }
}
