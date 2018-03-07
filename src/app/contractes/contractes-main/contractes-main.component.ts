import { FormEditComponent } from '../../form-helper/form-edit/form-edit.component';
import { ToBDDObject } from '../../helpers/type-helper.object';
import { CompanyiaEspectaclePreusObject, CompanyiaEspectaclePreuOneObject } from '../../models/CompanyiesEspectaclesPreus';
import { ContractesObject } from '../../models/Contractes';
import { ContracteControlRow } from '../../models/ContractesControl';
import { ContractesEspectaclesList, ContracteEspectacleRow } from '../../models/ContractesEspectacles';
import { ContracteFuncioRow } from '../../models/ContractesFuncions';
import { DbObject } from '../../models/DbObject.object';
import { EntitatsEspaisObject, EntitatEspaiOneObject } from '../../models/EntitatsEspais';
import { EspaiRow } from '../../models/Espais';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-contractes-main',
  templateUrl: './contractes-main.component.html',
  styleUrls: ['./contractes-main.component.css']
})
export class ContractesMainComponent implements OnInit {

  Contractes = new ContractesObject();
  ContracteControl = new ContracteControlRow();
  ContracteEspectacle = new ContracteEspectacleRow();
  ContracteFuncio = new ContracteFuncioRow();
  CompanyiesEspectacles = new CompanyiaEspectaclePreuOneObject();
  EntitatsEspais = new EntitatEspaiOneObject();
  SeleccionoEspectacleDisabled = true;
  SeleccionoEspaiDisabled = true;
  TabIndex = 0;
  idProjecte = 0;
  whenReload = 0;

  constructor(private db: DbObject, private _dialog: MatDialog) { }

  ngOnInit() {
  }

  nouContracte(idProjecte: number) {
    this.idProjecte = idProjecte;
    this.TabIndex = 1;
    this.ContracteControl.tmp_action = 'A';
  }

  EsculloCompanyiaEspectacle($CE: CompanyiaEspectaclePreuOneObject) {
    this.CompanyiesEspectacles = $CE;
    this.TabIndex = 2;
  }

  nouEspectacle(CC: ContracteControlRow) {
    this.TabIndex = 1;
    this.ContracteControl = CC;
  }

  nouFuncio(CE: [ContracteControlRow, ContracteEspectacleRow]) {
    this.ContracteControl = CE[0];
    this.ContracteEspectacle = CE[1];

    this.ContracteFuncio = new ContracteFuncioRow();
    this.db.getNewId('ctf_idFuncio', 'ContractesFuncions').subscribe(
        X => {
          this.db.getOneTableRow('Espais', 'es_idEspai', this.ContracteEspectacle.Fields.cte_idEspai.Val).subscribe(E => {
            let EE = new EspaiRow();
            EE.fromBDD(E, [], true);
            this.ContracteFuncio.getNew( X.Max, this.ContracteEspectacle.Fields.cte_idContracteEspectacle.Val );
            this.ContracteFuncio.Fields.ctf_Adreca_Arribada.Val = EE.Fields.es_Adreca.Val + '(' + EE.Fields.es_Poblacio.Val + ')';
            this.ContracteFuncio.Fields.ctf_Aparcament.Val = EE.Fields.es_Aparcament_Text.Val;
            this.ContracteFuncio.Fields.ctf_CarregaDescarrega.Val = EE.Fields.es_CarregaDescarrega_Text.Val;
            this.ContracteFuncio.Fields.ctf_On_Canviarse.Val = EE.Fields.es_Lloc_Canviarse_text.Val;
          });

        });

    let dialogRef = this._dialog.open(FormEditComponent, { width: '800px', data: [this.ContracteFuncio, 'ContractesFuncions'] }).afterClosed()
      .subscribe( (R: ContracteFuncioRow) => { this.TabIndex = 0; this.whenReload += 1; });

  }

  doSaveContracteEspectacle() {

    this.db.getNewId('cte_idContracteEspectacle', 'ContracteEspectacles').subscribe(
      X => {
        this.ContracteEspectacle = new ContracteEspectacleRow();
        this.ContracteEspectacle.getNew(
          X.Max,
          this.ContracteControl.Fields.ctc_idContracte.Val,
          this.CompanyiesEspectacles.Espectacle.Fields.ep_idEspectacle.Val,
          this.EntitatsEspais.Espai.Fields.es_idEspai.Val
        );
        this.ContracteEspectacle.Fields.cte_IVAAC.Val = 21;
        this.ContracteEspectacle.Fields.cte_IVASC.Val = 21;
        this.ContracteEspectacle.Fields.cte_PreuAC.Val = this.CompanyiesEspectacles.Preu.Fields.p_PreuAC.Val;
        this.ContracteEspectacle.Fields.cte_PreuSC.Val = this.CompanyiesEspectacles.Preu.Fields.p_PreuSC.Val;
        this.ContracteEspectacle.Fields.cte_TotalAC.Val = (this.CompanyiesEspectacles.Preu.Fields.p_PreuAC.Val * 1,21);
        this.ContracteEspectacle.Fields.cte_TotalSC.Val = (this.CompanyiesEspectacles.Preu.Fields.p_PreuSC.Val * 1,21);
        let T = new ToBDDObject();
        T.addRowUpdate(this.ContracteEspectacle.toBDD('ContracteEspectacles'));
        this.db.doSave(T).subscribe(
          Y => {
            this.ContracteEspectacle.tmp_action = 'U';
            this.nouFuncio([this.ContracteControl, this.ContracteEspectacle]);
          },
          E => {}
        );
      }
    );
  }

  EsculloEntitatEspai($EE: EntitatEspaiOneObject) {

    this.EntitatsEspais = $EE;

    // Si he marcat que és un nou contracte, començo el procediment
    if (this.ContracteControl.tmp_action === 'A') {
      this.db.getNewId('ctc_idContracte', 'ContractesControl').subscribe(
        X => {
          this.ContracteControl = new ContracteControlRow();
          this.ContracteControl.getNew(X.Max, this.idProjecte, $EE.Entitat.Fields.e_idAjuntament.Val);
          let T = new ToBDDObject();
          T.addRowUpdate(this.ContracteControl.toBDD('ContractesControl'));
          this.db.doSave(T).subscribe(
            Y => { 
              this.ContracteControl.tmp_action = 'U';
              this.doSaveContracteEspectacle();
            },
            E => {}
          );
        }
      );
    } else {
      this.doSaveContracteEspectacle();
    }
  }

}
