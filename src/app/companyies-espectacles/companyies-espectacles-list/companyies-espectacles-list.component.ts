import { TableModelListData } from '../../helpers/type-helper.object';
import { DbObject } from '../../models/DbObject.object';
import { CompanyiesEspectaclesCercadorFields, CompanyiesEspectaclesCercadorModel } from '../../models/companyies';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-companyies-espectacles-list',
  templateUrl: './companyies-espectacles-list.component.html',
  styleUrls: ['./companyies-espectacles-list.component.css']
})
export class CompanyiesEspectaclesListComponent implements OnInit, AfterViewInit {

  CompanyiesEspectacles = new CompanyiesEspectaclesCercadorModelList();
  DataSource = new MatTableDataSource<CompanyiesEspectaclesCercadorModel>([]);
  DisplayedColumns: string[] = [];
  Params = new HttpParams();

  constructor(private _db: DbObject) {
    Object.keys(new CompanyiesEspectaclesCercadorFields()).forEach(X => { this.DisplayedColumns.push(X); });
    this._db.getCompanyiesEspectaclesList(new HttpParams()).subscribe(X => {
      this.CompanyiesEspectacles = new CompanyiesEspectaclesCercadorModelList(X);
      this.DataSource.data = this.CompanyiesEspectacles.List;
    });
  }

  ngOnInit() {  }
  ngAfterViewInit() {  }

  applyFilter() {}
  getRowValue($id) {

  }

}
