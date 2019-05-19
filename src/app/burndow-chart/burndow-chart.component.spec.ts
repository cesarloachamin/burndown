import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurndowChartComponent } from './burndow-chart.component';

describe('BurndowChartComponent', () => {
  let component: BurndowChartComponent;
  let fixture: ComponentFixture<BurndowChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurndowChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurndowChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
