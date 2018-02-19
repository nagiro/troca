import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyiesEspectaclesFormComponent } from './companyies-espectacles-form.component';

describe('CompanyiesEspectaclesFormComponent', () => {
  let component: CompanyiesEspectaclesFormComponent;
  let fixture: ComponentFixture<CompanyiesEspectaclesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyiesEspectaclesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyiesEspectaclesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
