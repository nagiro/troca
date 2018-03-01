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
import { FormEditComponent } from './form-helper/form-edit/form-edit.component';
import { FormHelperModule } from './form-helper/form-helper.module';
import { DbObject } from './models/DbObject.object';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntitatsEspaisListComponent } from './entitats-espais/entitats-espais-list/entitats-espais-list.component';
import { ContractesListComponent } from './contractes/contractes-list/contractes-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ContractesMainComponent } from './contractes/contractes-main/contractes-main.component';
import { ContractesFuncionsComponent } from './contractes/contractes-funcions/contractes-funcions.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

const appRoutes: Routes = [
  { path: '', redirectTo: 'NotFound', pathMatch: 'full'},
  { path: 'Comercial', component: ContactesMainComponent },
  { path: 'Espais', component: EntitatsEspaisListComponent },
  { path: 'Contractes', component: ContractesMainComponent },
  { path: 'Companyies', component: CompanyiesEspectaclesListComponent },
  
];


@NgModule({
  declarations: [
    AppComponent,
    ContactesMainComponent,
    ContactesListComponent,
    ContactesFormComponent,
    CompanyiesEspectaclesListComponent,
    CompanyiesEspectaclesFormComponent,
    EntitatsEspaisListComponent,
    ContractesListComponent,
    ContractesMainComponent,
    ContractesFuncionsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes, {enableTracing: false, useHash: true } ),
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    FormHelperModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
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