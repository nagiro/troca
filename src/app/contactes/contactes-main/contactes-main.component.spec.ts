import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactesMainComponent } from './contactes-main.component';

describe('ContactesMainComponent', () => {
  let component: ContactesMainComponent;
  let fixture: ComponentFixture<ContactesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
