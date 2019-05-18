import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogItemFormComponent } from './backlog-item-form.component';

describe('BacklogItemFormComponent', () => {
  let component: BacklogItemFormComponent;
  let fixture: ComponentFixture<BacklogItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
