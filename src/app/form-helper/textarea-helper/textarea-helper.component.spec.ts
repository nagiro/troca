import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaHelperComponent } from './textarea-helper.component';

describe('TextareaHelperComponent', () => {
  let component: TextareaHelperComponent;
  let fixture: ComponentFixture<TextareaHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
