import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactesListComponent } from './contactes-list.component';

describe('ContactesListComponent', () => {
  let component: ContactesListComponent;
  let fixture: ComponentFixture<ContactesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
