import { FormEditComponent } from '../../form-helper/form-edit/form-edit.component';
import { CompanyiaEspectaclePreuOneObject } from '../../models/CompanyiesEspectaclesPreus';
import { ContracteControlRow } from '../../models/ContractesControl';
import { ContracteEspectacleRow } from '../../models/ContractesEspectacles';
import { ContractesFuncionsList, ContracteFuncioRow, ContractesFuncionsSearchList } from '../../models/ContractesFuncions';
import { DbObject } from '../../models/DbObject.object';
import { EntitatEspaiOneObject } from '../../models/EntitatsEspais';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contractes-funcions',
  templateUrl: './contractes-funcions.component.html',
  styleUrls: ['./contractes-funcions.component.css']
})
export class ContractesFuncionsComponent implements OnInit {

  @Input() EE = new EntitatEspaiOneObject();
  @Input() CE = new CompanyiaEspectaclePreuOneObject();
  @Input() ContracteEspectacle = new ContracteEspectacleRow();
  @Input() ContracteControl = new ContracteControlRow();
  ContractesFuncions = new ContractesFuncionsSearchList(null);
  ContracteFuncio = new ContracteFuncioRow();
  HttpContractesFuncions = new HttpParams();

  constructor(private db: DbObject, private _dialog: MatDialog) { }

  ngOnInit() {
  }

  reload() {
    this.HttpContractesFuncions = this.HttpContractesFuncions.set('filter1', 'ctf_idContracteEspectacle = ' + this.ContracteEspectacle.Fields.cte_idContracteEspectacle.Val);
    this.db.getAllTableRows('ContractesFuncions', this.HttpContractesFuncions ).subscribe( X => this.ContractesFuncions = new ContractesFuncionsSearchList(X) );
  }

  addFuncio(Row: ContracteFuncioRow) {

    if (!Row) {

      this.ContracteFuncio = new ContracteFuncioRow();
      this.db.getNewId('ctf_idFuncio', 'ContractesFuncions').subscribe(
        X => {
          this.ContracteFuncio.getNew( X.Max, this.ContracteEspectacle.Fields.cte_idContracteEspectacle.Val );
          this.ContracteFuncio.Fields.ctf_Adreca_Arribada.Val = this.EE.Espai.Fields.es_Adreca.Val + '(' + this.EE.Espai.Fields.es_Poblacio.Val +')';
          this.ContracteFuncio.Fields.ctf_Aparcament.Val = this.EE.Espai.Fields.es_Aparcament_Text.Val;
          this.ContracteFuncio.Fields.ctf_CarregaDescarrega.Val = this.EE.Espai.Fields.es_CarregaDescarrega_Text.Val;
          this.ContracteFuncio.Fields.ctf_On_Canviarse.Val = this.EE.Espai.Fields.es_Lloc_Canviarse_text.Val;
        });
     } else {
        this.ContracteFuncio = Row;
        this.ContracteFuncio.tmp_action = 'U'; 
    }

    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [this.ContracteFuncio, 'ContractesFuncions'] }).afterClosed()
      .subscribe( (R: ContracteFuncioRow) => { this.reload(); });
  }

}
