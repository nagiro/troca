import { FormEditComponent } from '../../form-helper/form-edit/form-edit.component';
import { NumberType } from '../../helpers/type-helper.object';
import { DbObject } from '../../models/DbObject.object';
import { EntitatRow } from '../../models/Entitats';
import { EntitatsEspaisObject, EntitatEspaiOneObject } from '../../models/EntitatsEspais';
import { EspaiRow } from '../../models/Espais';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-entitats-espais-list',
  templateUrl: './entitats-espais-list.component.html',
  styleUrls: ['./entitats-espais-list.component.css']
})
export class EntitatsEspaisListComponent implements OnInit {

  @Input() CercaFromContracte = false;
  @Output() EntitatEspaiForContracte = new EventEmitter<EntitatEspaiOneObject>();

  Search: any;
  Params = new HttpParams();
  EntitatsEspais = new EntitatsEspaisObject();
  HttpEE = new BehaviorSubject<HttpParams>(new HttpParams());

  constructor(private _db: DbObject, private _dialog: MatDialog) {
    this.HttpEE.subscribe( (X => this.reload(X) ));
  }

  ngOnInit() {  }

  reload( X?: HttpParams ) {
    let H = (X) ? X : new HttpParams();
    this._db.getAllTableRows<any>('entitatsespais', H )
      .subscribe( Y => { this.EntitatsEspais = new EntitatsEspaisObject(Y); console.log(this.EntitatsEspais)});
  }

  FilterEspaisEntitats($text: string) {
    let H = this.HttpEE.value;
    H = H.set('filter1', "e_Nom like '%" + $text + "%' OR e_Responsable like '%" + $text + "%' OR e_Ciutat like '%" + $text + "%'");
    this.HttpEE.next(H);
  }

  showEntitat(Row: EntitatRow) {
    let E = Row;
    if (!Row) { E = new EntitatRow(); E.getNew(); } else { E.tmp_action = 'U'; }
    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [E, 'entitats'] }).afterClosed()
      .subscribe( (R: EntitatRow ) => { this.reload(); });
  }

  showEspai(Row: EspaiRow, idEntitat: NumberType) {
    let E = Row;
    if (!Row) { E = new EspaiRow(); E.getNew(idEntitat.Val); } else { E.tmp_action = 'U'; }
    let dialogRef = this._dialog.open(FormEditComponent, { width: '1024px', data: [E, 'espais'] }).afterClosed()
      .subscribe( (R: EspaiRow ) => { this.reload(); });
  }

  addToContract(Row: EspaiRow) {
    let EE = new EntitatEspaiOneObject();
    EE.Espai = Row;
    EE.Entitat = this.EntitatsEspais.getEntitatById( Row.Fields.es_idAjuntament );
    this.EntitatEspaiForContracte.emit(EE);
  }

}
