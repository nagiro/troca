import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHelperComponent } from './select-helper.component';

describe('SelectHelperComponent', () => {
  let component: SelectHelperComponent;
  let fixture: ComponentFixture<SelectHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
