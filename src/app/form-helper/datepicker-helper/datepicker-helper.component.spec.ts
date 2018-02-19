import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerHelperComponent } from './datepicker-helper.component';

describe('DatepickerHelperComponent', () => {
  let component: DatepickerHelperComponent;
  let fixture: ComponentFixture<DatepickerHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
