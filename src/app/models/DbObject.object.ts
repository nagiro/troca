import { GlobalVarsService } from '../helpers/global-vars.service';
import { NotificationService } from '../helpers/notification.service';
import { ToBDDObject } from '../helpers/type-helper.object';
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

  public getNewId($camp, $taula): Observable<number> {
    let P = new HttpParams();
    P = P.set('taula', $taula);
    P = P.append('camp', $camp);
    return this.http.get<number>( this.base + '/getNew', { params: P }  );
  }

  public getAllTableRows<T>($Taula, P: HttpParams): Observable<T> {
    P = P.append('taula', $Taula);
    return this.http.post<T>( this.base + '/getDadesTaulaAll', P );
  }
  
  public getCompanyiesEspectaclesPreu(P: HttpParams) {
    P = P.append('taula', 'CompanyiesEspectaclesPreus');
    return this.http.post<CompanyiaEspectaclePreusSearchList>( this.base + '/getDadesTaulaAll', P );
  }
  
  public getCompanyies(P: HttpParams) {
    P = P.append('taula', 'Companyies');
    return this.http.post<CompanyiesSearchList>( this.base + '/getDadesTaulaAll', P );
  }
  public getEspectacles(P: HttpParams) {
    P = P.append('taula', 'Espectacles');
    return this.http.post<EspectaclesSearchList>( this.base + '/getDadesTaulaAll', P );
  }
  
  public getCompanyiaById(id) {
    let P = new HttpParams();
    P = P.append('taula', 'Companyies');
    P = P.append('camp', 'c_idCompanyia');
    P = P.append('id', String(id));
    return this.http.post<CompanyiaFields>( this.base + '/getDadesTaulaById', P );
  }
  
  public doSave( O: ToBDDObject ) {
    return this.http.post<Response>( this.base + '/doSave', O );
  }

  // Fem consulta i envio els paràmetres que és un observable combinat
/*  public getUsuarisCercador( Par: HttpParams ): Observable<UsuarisCercadorListData> {
    return this.http.post<UsuarisCercadorListData>(this.base + '/getUsuaris', Par);
  }

  public getUsuarisCercadorOferta( Par: HttpParams ): Observable<UsuarisCercadorModelList> {
    return this.http.get<UsuarisCercadorModelList>(this.base + '/getUsuaris', { 'params': Par } );
  }

  public getOfertesUsuari(idU: number): Observable<UsuarisOfertesFields[]> {
    let P = new HttpParams(); P = P.set('idu', String(idU));
    return this.http.get<UsuarisOfertesFields[]>( this.base + '/getUsuariOfertes', { 'params': P });
  }

  public addSeguiment( EL: SeguimentModel ): Observable<Response> {
    let T = new ToBDDObject();
    T.addRowUpdate(EL.toBDD('seguiment'));
    return this.http.post<Response>( this.base + '/doSave', T );
  }


  public uploadFile(fileToUpload: File, TipusArxiu: ElementExtra, idU: number): Observable<Response> {
    let P = new FormData();
    P.append('file', fileToUpload);
    P.append('TipusArxiuNom', TipusArxiu.nom.toString());
    P.append('TipusArxiuId', TipusArxiu.idn.toString());
    P.append('idU', String(idU) );
    return this.http.post<Response>(
      this.base + '/uploadFile',
      P
    );
  }
*/
}



/*
 
  CREATE VIEW ContactesComercialsLlistat AS
Select ccco.*, e.e_Nom, ep.ep_Nom, pr.pr_Nom from ContactesComercials ccco 
  LEFT JOIN Entitats e ON (e.e_idAjuntament = ccco.ccco_idAjuntament ) 
  LEFT JOIN Espectacles ep ON (ep.ep_idEspectacle = ccco.ccco_idEspectacle)
  LEFT JOIN Projectes pr ON ( pr.pr_idProjecte = ccco.ccco_idProjecte )
  
CREATE VIEW CompanyiesEspectaclesLlistat AS
Select c.*, ep.ep_Nom from Companyies c 
  LEFT JOIN Espectacles ep ON (ep.ep_idCompanyia = c.c_idCompanyia)
  
CREATE VIEW ContractesControlLlistat AS
Select ctc.*, pr.pr_Nom, e.e_Nom from ContractesControl ctc 
  LEFT JOIN Projectes pr ON (pr.pr_idProjecte = ctc.ctc_idprojecte)
  LEFT JOIN Entitats e ON (ctc.ctc_idEntitat = e.e_idAjuntament)
 * 
CREATE VIEW ContractesEspectaclesLlistat AS
Select cte.*, ep.ep_Nom, es.es_Nom from ContracteEspectacles cte 
  LEFT JOIN Espectacles ep ON (cte.cte_idespectacle = ep.ep_idEspectacle)
  LEFT JOIN Espais es ON (cte.cte_idEspai = es.es_idEspai)
  
 *  
 * */