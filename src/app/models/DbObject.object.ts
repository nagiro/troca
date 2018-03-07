import { GlobalVarsService } from '../helpers/global-vars.service';
import { NotificationService } from '../helpers/notification.service';
import { ToBDDObject } from '../helpers/type-helper.object';
import { ContractesObject, ContracteWord } from './Contractes';
import { EspectaclesSearchList } from './Espectacles';
import { CompanyiaFields, CompanyiesSearchList } from './companyies';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DbObject {

  private base = GlobalVarsService.API_ENDPOINT;

  // Injectem el httpClient
  constructor(private http: HttpClient, private _n: NotificationService) {}

  public getNewId($camp, $taula): Observable<{Max: number}> {
    let P = new HttpParams();
    P = P.set('taula', $taula);
    P = P.append('camp', $camp);
    return this.http.get<{Max: number}>( this.base + '/getNew', { params: P }  );
  }

  public getOneTableRow<T>($Taula, $Camp, $Id): Observable<T> {
    let P = new HttpParams();
    P = P.append('taula', $Taula);
    P = P.set('camp', $Camp);
    P = P.set('id', $Id);
    return this.http.post<T>( this.base + '/getDadesTaulaById', P );
  }

  public getAllTableRows<T>($Taula, P: HttpParams): Observable<T> {
    P = P.append('taula', $Taula);
    return this.http.post<T>( this.base + '/getDadesTaulaAll', P );
  }

  public doContracte( O: number ) {
    return this.http.post<string>( this.base + '/GenWord', O );
  }

  public doSave( O: ToBDDObject ) {
    return this.http.post<Response>( this.base + '/doSave', O );
  }

}
