import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractesFuncionsComponent } from './contractes-funcions.component';

describe('ContractesFuncionsComponent', () => {
  let component: ContractesFuncionsComponent;
  let fixture: ComponentFixture<ContractesFuncionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractesFuncionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractesFuncionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
