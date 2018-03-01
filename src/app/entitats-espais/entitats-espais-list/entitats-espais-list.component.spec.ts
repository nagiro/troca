import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitatsEspaisListComponent } from './entitats-espais-list.component';

describe('EntitatsEspaisListComponent', () => {
  let component: EntitatsEspaisListComponent;
  let fixture: ComponentFixture<EntitatsEspaisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitatsEspaisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitatsEspaisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
