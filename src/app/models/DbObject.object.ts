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

  public doContracte( idC: number ): Observable<string> {
    return this.http.post<string>( this.base + '/GenWord', {'idC': idC } );
  }

  public doContracteEspectacle( idC: number, idCE: number): Observable<string> {
    return this.http.post<string>( this.base + '/GenWord', {'idC': idC, 'idCE': idCE } );
  }

  public doSave( O: ToBDDObject ) {
    return this.http.post<Response>( this.base + '/doSave', O );
  }

}

/*
 *
 *
DROP VIEW companyiesespectaclespreus;
CREATE VIEW companyiesespectaclespreus as
  Select * FROM companyies c
  LEFT JOIN espectacles e ON (c.c_idCompanyia = e.ep_idCompanyia)
  LEFT JOIN preus p ON (p.p_idEspectacle = e.ep_idEspectacle);

DROP VIEW contractes;
CREATE VIEW contractes as
    SELECT * FROM projectes PR
    INNER JOIN contractescontrol CC ON (CC.ctc_idProjecte = PR.pr_idProjecte)
        LEFT JOIN contracteespectacles CE ON (CC.ctc_idContracte = CE.cte_idContracte)
        LEFT JOIN contractesfuncions CF ON (CE.cte_idContracteEspectacle = CF.ctf_idContracteEspectacle)
        LEFT JOIN espais E ON (E.es_idEspai = CE.cte_idEspai)
        LEFT JOIN espectacles ES ON (ES.ep_idEspectacle = CE.cte_idespectacle)
        LEFT JOIN preus P ON (P.p_idEspectacle = ES.ep_idEspectacle)
        LEFT JOIN entitats EN ON (CC.ctc_idEntitat = EN.e_idAjuntament)
        LEFT JOIN companyies C ON (C.c_idCompanyia = ES.ep_idCompanyia);


DROP VIEW entitatsespais;
CREATE VIEW entitatsespais as
    SELECT * FROM entitats E
        LEFT JOIN espais ES ON (ES.es_idAjuntament = E.e_idAjuntament);
 * /
 */
