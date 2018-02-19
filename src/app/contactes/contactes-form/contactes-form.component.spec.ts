import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactesFormComponent } from './contactes-form.component';

describe('ContactesFormComponent', () => {
  let component: ContactesFormComponent;
  let fixture: ComponentFixture<ContactesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
