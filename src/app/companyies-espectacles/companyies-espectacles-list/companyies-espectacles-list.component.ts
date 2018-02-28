import { FormEditComponent } from '../../form-helper/form-edit/form-edit.component';
import { TableModelListData, DatabaseTypeBase, TableRow, TableRowList, TableSearchList } from '../../helpers/type-helper.object';
import { CompanyiaEspectaclePreusObject } from '../../models/CompanyiesEspectaclesPreus';
import { DbObject } from '../../models/DbObject.object';
import { EspectacleFields, EspectacleRow, EspectaclesSearchList } from '../../models/Espectacles';
import { CompanyiaFields, CompanyiaRow, CompanyiesSearchList } from '../../models/companyies';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-companyies-espectacles-list',
  templateUrl: './companyies-espectacles-list.component.html',
  styleUrls: ['./companyies-espectacles-list.component.css']
})
export class CompanyiesEspectaclesListComponent implements OnInit, AfterViewInit {

  Params = new HttpParams();
  CEP = new CompanyiaEspectaclePreusObject();
  HttpCEP = new BehaviorSubject<HttpParams>(new HttpParams());

  constructor(private _db: DbObject, private _dialog: MatDialog) {

    this.HttpCEP.subscribe( (X: HttpParams) => this.reload() );

  }

  ngOnInit() {  }
  ngAfterViewInit() {  }

  reload() {
  this._db.getAllTableRows<any>('CompanyiesEspectaclesPreus', new HttpParams())
      .subscribe( X => { this.CEP = new CompanyiaEspectaclePreusObject(X); });
  }

  showCompanyia(Row: CompanyiaRow) {
    let E = Row;
    if (!Row) { E = new CompanyiaRow(); E.getNew(); } else { E.tmp_action = 'U'; }
    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'Companyies'] }).afterClosed()
      .subscribe( (R: CompanyiaRow ) => { this.reload(); });
  }

  showEspectacle(Row: EspectacleRow) {
    let E = Row;
    if (!Row) { E = new EspectacleRow(); E.getNew(); } else { E.tmp_action = 'U'; }
    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'Espectacles'] }).afterClosed()
      .subscribe( (R: EspectacleRow ) => { this.reload(); });
  }

}
