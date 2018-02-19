import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';


import { AppComponent } from './app.component';
import { ContactesMainComponent } from './contactes/contactes-main/contactes-main.component';
import { ContactesListComponent } from './Contactes/contactes-list/contactes-list.component';
import { ContactesFormComponent } from './Contactes/contactes-form/contactes-form.component';
import { CustomErrorHandler } from './helpers/custom-error-handler';
import { GlobalVarsService } from './helpers/global-vars.service';
import { NotificationService } from './helpers/notification.service';
import { Routes, RouterModule } from '@angular/router';
import { CompanyiesEspectaclesListComponent } from './companyies-espectacles/companyies-espectacles-list/companyies-espectacles-list.component';
import { CompanyiesEspectaclesFormComponent } from './companyies-espectacles/companyies-espectacles-form/companyies-espectacles-form.component';
import { DbObject } from './models/DbObject.object';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', redirectTo: 'NotFound', pathMatch: 'full'},
  { path: 'Comercial', component: ContactesMainComponent },
  { path: 'Companyies', component: CompanyiesEspectaclesListComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    ContactesMainComponent,
    ContactesListComponent,
    ContactesFormComponent,
    CompanyiesEspectaclesListComponent,
    CompanyiesEspectaclesFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes, {enableTracing: false, useHash: true } ),
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    HttpClient,
    DbObject,
    NotificationService,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    GlobalVarsService,
//    { provide: APP_INITIALIZER, useFactory: initFactory, deps: [GlobalVarsService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initFactory(_g: GlobalVarsService) { return () => _g.initializeApp(); }