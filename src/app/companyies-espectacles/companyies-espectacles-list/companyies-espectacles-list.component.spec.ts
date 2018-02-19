import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyiesEspectaclesListComponent } from './companyies-espectacles-list.component';

describe('CompanyiesEspectaclesListComponent', () => {
  let component: CompanyiesEspectaclesListComponent;
  let fixture: ComponentFixture<CompanyiesEspectaclesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyiesEspectaclesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyiesEspectaclesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
