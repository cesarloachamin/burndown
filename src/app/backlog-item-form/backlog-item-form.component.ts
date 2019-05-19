import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BacklogItem } from '../model/backlog.item';

@Component({
  selector: 'app-backlog-item-form',
  templateUrl: './backlog-item-form.component.html',
  styleUrls: ['./backlog-item-form.component.css']
})
export class BacklogItemFormComponent implements OnChanges {

  itemForm: FormGroup;
  @Input()
  item: BacklogItem;
  @Output()
  saved = new EventEmitter<BacklogItem>();

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.updateForm();
    }
  }

  save(): void {
    if (this.itemForm.valid) {
      this.saved.emit(new BacklogItem(this.item ? this.item.id : '',
                                        this.itemForm.controls['title'].value,
                                        this.itemForm.controls['value'].value,
                                        this.itemForm.controls['type'].value));
      this.item = undefined;
      this.updateForm();
    } else {
      Object.keys(this.itemForm.controls).forEach(key => this.itemForm.controls[key].markAsTouched());
    }
  }

  isFormControlInValid(name: string): boolean {
    const control = this.itemForm.controls[name];
    return !control.valid && control.touched;
  }

  updateForm(): void {
    this.itemForm = this.fb.group({
      'title': [this.item ? this.item.title : '', Validators.required],
      'type': [this.item ? this.item.type : 0, Validators.required],
      'value': [this.item ? this.item.value : '', Validators.required]
    });
  }
}
