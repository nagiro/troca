import { TableRowFieldList, TableRow, ToBDDObject } from '../../helpers/type-helper.object';
import { DbObject } from '../../models/DbObject.object';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent<T> implements OnInit {

  E = new TableRowFieldList();
  R: TableRow<T>;
  NomTaula = '';

  constructor(
    private _db: DbObject,
    public dialogRef: MatDialogRef<FormEditComponent<T>>,
    @Inject(MAT_DIALOG_DATA)
      public P: [TableRow<T>, string]) {
      this.E = P[0].toTableRowFieldList();
      this.R = P[0];
      this.NomTaula = P[1];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  doSave(): void {
    if (this.R.tmp_action === 'A') { this.R.tmp_action = 'A'; }
    else { this.R.tmp_action = 'U'; }
    let BDD = new ToBDDObject();
    BDD.addRowUpdate( this.R.toBDD(this.NomTaula) );
    this._db.doSave( BDD ).subscribe( X => console.log(X));
    this.dialogRef.close(this.P);
  }

  doDelete(): void {
    if (this.R.tmp_action === 'A') { this.R.tmp_action = '-'; }
    else { this.R.tmp_action = 'D'; }
    let BDD = new ToBDDObject();
    BDD.addRowUpdate( this.R.toBDD(this.NomTaula) );
    this._db.doSave( BDD ).subscribe(X => console.log(X));
    this.dialogRef.close(this.P);
  }

  /* Retorno i no guardo res */
  doCancel(): void {
    this.dialogRef.close(this.P);
  }

}
