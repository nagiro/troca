import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutochipsComponent } from './autochips.component';

describe('AutochipsComponent', () => {
  let component: AutochipsComponent;
  let fixture: ComponentFixture<AutochipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutochipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutochipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
