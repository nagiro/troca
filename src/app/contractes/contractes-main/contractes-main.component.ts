import { ToBDDObject } from '../../helpers/type-helper.object';
import { CompanyiaEspectaclePreusObject, CompanyiaEspectaclePreuOneObject } from '../../models/CompanyiesEspectaclesPreus';
import { ContractesObject } from '../../models/Contractes';
import { ContracteControlRow } from '../../models/ContractesControl';
import { ContractesEspectaclesList, ContracteEspectacleRow } from '../../models/ContractesEspectacles';
import { ContracteFuncioRow } from '../../models/ContractesFuncions';
import { DbObject } from '../../models/DbObject.object';
import { EntitatsEspaisObject, EntitatEspaiOneObject } from '../../models/EntitatsEspais';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  CompanyiesEspectacles = new CompanyiaEspectaclePreuOneObject();
  EntitatsEspais = new EntitatEspaiOneObject();
  SeleccionoEspectacleDisabled = true;
  SeleccionoEspaiDisabled = true;
  TabIndex = 0;
  idProjecte = 0;

  constructor(private db: DbObject) { }

  ngOnInit() {
  }

  nouContracte(idProjecte: number) {
    this.idProjecte = idProjecte;
    this.TabIndex = 1;
  }

  EsculloCompanyiaEspectacle($CE: CompanyiaEspectaclePreuOneObject) {
    this.CompanyiesEspectacles = $CE;
    this.TabIndex = 2;
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
            this.TabIndex = 3;
          },
          E => {}
        );
      }
    );
  }

  EsculloEntitatEspai($EE: EntitatEspaiOneObject) {

    this.EntitatsEspais = $EE;

    // Guardo el contracte control ( en el cas que no ho hagi fet )
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
  }

  EsculloSessions( $CF: ContracteFuncioRow ) {
    
  }

}
