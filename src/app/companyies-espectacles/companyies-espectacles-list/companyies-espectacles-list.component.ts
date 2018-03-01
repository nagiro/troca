import { FormEditComponent } from '../../form-helper/form-edit/form-edit.component';
import { TableModelListData, DatabaseTypeBase, TableRow, TableRowList, TableSearchList, NumberType } from '../../helpers/type-helper.object';
import { CompanyiaEspectaclePreusObject, CompanyiaEspectaclePreuOneObject } from '../../models/CompanyiesEspectaclesPreus';
import { DbObject } from '../../models/DbObject.object';
import { EspectacleFields, EspectacleRow, EspectaclesSearchList } from '../../models/Espectacles';
import { PreuRow, PreusSearchList } from '../../models/Preus';
import { CompanyiaFields, CompanyiaRow, CompanyiesSearchList } from '../../models/companyies';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-companyies-espectacles-list',
  templateUrl: './companyies-espectacles-list.component.html',
  styleUrls: ['./companyies-espectacles-list.component.css']
})
export class CompanyiesEspectaclesListComponent implements OnInit, AfterViewInit {

  @Input() CercaFromContracte = false;
  @Output() CompanyiaEspectaclePreuForContracte = new EventEmitter<CompanyiaEspectaclePreuOneObject>();

  Params = new HttpParams();
  CompanyiesEspectaclesPreus = new CompanyiaEspectaclePreusObject();
  HttpCEP = new BehaviorSubject<HttpParams>(new HttpParams());
  EspectaclesSearch = '';
  CompanyiesSearch = '';

  constructor(private _db: DbObject, private _dialog: MatDialog) {
    this.HttpCEP.subscribe( (X => this.reload(X) ));
  }

  ngOnInit() {  }
  ngAfterViewInit() {  }

  reload( X?: HttpParams ) {
    let H = (X) ? X : new HttpParams();
    this._db.getAllTableRows<any>('CompanyiesEspectaclesPreus', H )
      .subscribe( X => { this.CompanyiesEspectaclesPreus = new CompanyiaEspectaclePreusObject(X); });
  }

  FilterEspectacles($text: string) {
    let H = this.HttpCEP.value;
    H = H.set('filter1', "ep_Nom like '%" + $text + "%' OR ep_Tecnic like '%" + $text + "%' OR ep_TipusEspectacle like '%" + $text + "%'");
    this.HttpCEP.next(H);
  }
  FilterCompanyies($text: string) {
    let H = this.HttpCEP.value;    
    H = H.set('filter1', "c_Nom like '%" + $text + "%' OR c_Responsable like '%" + $text + "%'" );
    this.HttpCEP.next(H);
  }
  FilterPreuMin($preu) {
    let H = this.HttpCEP.value;
    H = H.set('filter2', "p_PreuSC > " + $preu + " OR p_PreuAC > " + $preu);
    this.HttpCEP.next(H);
  }
  FilterPreuMax($preu) {
    let H = this.HttpCEP.value;
    H = H.set('filter3', "p_PreuSC < " + $preu + " OR p_PreuAC < " + $preu);
    this.HttpCEP.next(H);
  }

  getEspectacles( idCompanyia: NumberType ) {
    let H = this.HttpCEP.value;
    H = H.set('filter4', ' ep_idCompanyia = ' + idCompanyia);
    this.HttpCEP.next(H);
  }

  showCompanyia(Row: CompanyiaRow) {
    let E = Row;
    if (!Row) { E = new CompanyiaRow(); E.getNew(); } else { E.tmp_action = 'U'; }
    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'Companyies'] }).afterClosed()
      .subscribe( (R: CompanyiaRow ) => { this.reload(); });
  }

  showEspectacle(Row: EspectacleRow, idCompanyia: NumberType) {
    let E = Row;
    if (!Row) { E = new EspectacleRow(); E.getNew(idCompanyia); } else { E.tmp_action = 'U'; }
    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'Espectacles'] }).afterClosed()
      .subscribe( (R: EspectacleRow ) => { this.reload(); });
  }

  showPreu(Row: PreuRow, idEspectacle: NumberType ) {
    let E = Row;
    if (!Row) { E = new PreuRow(); E.getNew(idEspectacle); } else { E.tmp_action = 'U'; }
    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'Preus'] }).afterClosed()
      .subscribe( (R: PreuRow ) => { this.reload(); });
  }

  addToContract(P: PreuRow, E: EspectacleRow) {
    let T = new CompanyiaEspectaclePreuOneObject();
    let C = new CompanyiaRow();
    C = this.CompanyiesEspectaclesPreus.getCompanyiaById( E.Fields.ep_idCompanyia );
    T.Preu = P;
    T.Espectacle = E;
    T.Companyia = C;
    this.CompanyiaEspectaclePreuForContracte.emit(T);
  }

}
