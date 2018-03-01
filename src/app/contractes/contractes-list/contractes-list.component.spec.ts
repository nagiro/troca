import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractesListComponent } from './contractes-list.component';

describe('ContractesListComponent', () => {
  let component: ContractesListComponent;
  let fixture: ComponentFixture<ContractesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
