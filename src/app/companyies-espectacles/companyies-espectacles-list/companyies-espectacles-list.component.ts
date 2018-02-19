import { TableModelListData, DatabaseTypeBase, TableRow } from '../../helpers/type-helper.object';
import { DbObject } from '../../models/DbObject.object';
import { CompanyiesEspectaclesListRows, CompanyiesEspectaclesRows } from '../../models/companyies';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-companyies-espectacles-list',
  templateUrl: './companyies-espectacles-list.component.html',
  styleUrls: ['./companyies-espectacles-list.component.css']
})
export class CompanyiesEspectaclesListComponent implements OnInit, AfterViewInit {

  CompanyiesEspectacles = new CompanyiesEspectaclesListRows(null);
  DisplayedColumns: DatabaseTypeBase[] = [];
  Params = new HttpParams();

  constructor(private _db: DbObject) {
    const T = new CompanyiesEspectaclesRows();
    this.DisplayedColumns = T.Fields;
    this._db.getCompanyiesEspectaclesList(new HttpParams()).subscribe(X => {
      this.CompanyiesEspectacles = new CompanyiesEspectaclesListRows(X);
    });
  }

  ngOnInit() {  }
  ngAfterViewInit() {  }

  applyFilter() {}
  getRowValue($id) {

  }

}
