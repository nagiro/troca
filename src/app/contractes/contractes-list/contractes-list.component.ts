import { FormEditComponent } from '../../form-helper/form-edit/form-edit.component';
import { NumberType, TableRowList } from '../../helpers/type-helper.object';
import { CompanyiaEspectaclePreusObject } from '../../models/CompanyiesEspectaclesPreus';
import { ContractesObject } from '../../models/Contractes';
import { ContracteControlRow } from '../../models/ContractesControl';
import { ContracteEspectacleRow, ContractesEspectaclesList } from '../../models/ContractesEspectacles';
import { ContracteFuncioRow, ContractesFuncionsList } from '../../models/ContractesFuncions';
import { DbObject } from '../../models/DbObject.object';
import { EntitatsEspaisObject } from '../../models/EntitatsEspais';
import { ProjectesSearchList, ProjecteRow } from '../../models/Projectes';
import { CompanyiaFields } from '../../models/companyies';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-contractes-list',
  templateUrl: './contractes-list.component.html',
  styleUrls: ['./contractes-list.component.css']
})
export class ContractesListComponent implements OnInit {

  @Output() whenNewContracte = new EventEmitter<number>();
  Contractes = new ContractesObject();
  Projectes = new ProjectesSearchList();
  Params = new HttpParams();

  HttpCEP = new BehaviorSubject<HttpParams>(new HttpParams());
  ContractesSearch = '';

  constructor(private _db: DbObject, private _dialog: MatDialog) {
    this.HttpCEP.subscribe( (X => this.reload(X) ));
    this._db.getAllTableRows('projectes', new HttpParams()).subscribe( X => this.Projectes = new ProjectesSearchList(X));
  }

  ngOnInit() {  }

  reload( X?: HttpParams ) {
    let H = (X) ? X : new HttpParams();
    this._db.getAllTableRows<any>('Contractes', H )
      .subscribe( X => { this.Contractes = new ContractesObject(X); });
  }

  newContracte(idProjecte: number) {
    this.whenNewContracte.emit(idProjecte);
  }

  editProjecte(Row: ProjecteRow) {
    let E = Row;
    if (!Row) { E = new ProjecteRow(); E.getNew(); } else { E.tmp_action = 'U'; }
    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'Projectes'] }).afterClosed()
      .subscribe( (R: ProjecteRow) => { this.reload(); });
  }
  
  editControl(Row: ContracteControlRow) {
    let E = Row;
    if (Row) { E.tmp_action = 'U';
      let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'ContractesControl'] }).afterClosed()
        .subscribe( (R: ContracteControlRow) => { this.reload(); });
    }
  }
  
  editEspectacle(Row: ContracteEspectacleRow) {
    let E = Row;
    if (Row) { E.tmp_action = 'U';
      let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'ContracteEspectacles'] }).afterClosed()
        .subscribe( (R: ContracteEspectacleRow) => { this.reload(); });
    }
  }
  
  editFuncio(Row: ContracteFuncioRow) {
    let E = Row;
    if (Row) { E.tmp_action = 'U';
      let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'ContractesFuncions'] }).afterClosed()
        .subscribe( (R: ContracteFuncioRow) => { this.reload(); });
    }
  }

  
  FilterContracteControl($event: string) {
    let T = this.HttpCEP.value.set('filter1', '1 = 1');
    this.HttpCEP.next(T);
  }
  
}
