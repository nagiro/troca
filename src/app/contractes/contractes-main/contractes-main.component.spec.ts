import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractesMainComponent } from './contractes-main.component';

describe('ContractesMainComponent', () => {
  let component: ContractesMainComponent;
  let fixture: ComponentFixture<ContractesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
