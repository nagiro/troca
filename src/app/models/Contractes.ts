import { TableRowList, RowValor } from '../helpers/type-helper.object';
import { ContractesControlSearchList, ContracteControlRow, ContractesControlList } from './ContractesControl';
import { ContracteEspectacleRow, ContractesEspectaclesList } from './ContractesEspectacles';
import { ContracteFuncioRow, ContractesFuncionsList } from './ContractesFuncions';
import { EntitatRow, EntitatFields } from './Entitats';
import { EspaiRow, EspaiFields } from './Espais';
import { EspectaclesList, EspectacleRow } from './Espectacles';
import { ProjectesList, ProjecteRow } from './Projectes';
import { CompanyiesList, CompanyiaRow } from './companyies';

export class ContractesObject {

  ContractesControl = new ContractesControlList();
  ContractesEspectacles = new ContractesEspectaclesList();
  ContractesFuncions = new ContractesFuncionsList();
  Projectes = new ProjectesList();
  Entitats = new TableRowList<EntitatRow, EntitatFields>();
  Espais = new TableRowList<EspaiRow, EspaiFields>();
  Espectacles = new EspectaclesList();
  Companyies = new CompanyiesList();
  c = 0;

  /* c: number, List: CompanyiaEspectaclePreusObject */
  constructor(J?: any) {
    if (J) {
      this.c = J.c;
      let L: any[] = J.List;
      L.forEach( X => {
        let T = new ContracteControlRow(); T.fromBDD(X, [], true);
        this.ContractesControl.addModelNoRepeat( T , 'ctc_idContracte');

        let E = new ContracteEspectacleRow(); E.fromBDD(X, [], true);
        this.ContractesEspectacles.addModelNoRepeat( E , 'cte_idContracteEspectacle');

        let P = new ContracteFuncioRow(); P.fromBDD(X, [], true);
        this.ContractesFuncions.addModelNoRepeat( P, 'ctf_idFuncio' );

        let PR = new ProjecteRow(); PR.fromBDD(X, [], true);
        this.Projectes.addModelNoRepeat(PR, 'pr_idProjecte');

        let EN = new EntitatRow(); EN.fromBDD(X, [], true);
        this.Entitats.addModelNoRepeat(EN, 'e_idAjuntament');

         let ES = new EspaiRow(); ES.fromBDD(X, [], true);
        this.Espais.addModelNoRepeat(ES, 'es_idEspai');

        let EP = new EspectacleRow(); EP.fromBDD(X, [], true);
        this.Espectacles.addModelNoRepeat(EP, 'ep_idEspectacle');

        let C = new CompanyiaRow(); C.fromBDD(X, [], true);
        this.Companyies.addModelNoRepeat(C, 'c_idCompanyia');

      });
    }
  }

  getNomEspai(idE: number) {
    let A = this.getEspaiById(idE);
    if (A) { return A.Fields.es_Nom.toString(); } else { return 'N/D'; }
  }

  getNomEspectacle(idE: number) {
    let A = this.getEspectacleById(idE);
    if (A) { return A.Fields.ep_Nom.toString(); } else { return 'N/D'; }
  }

  getNomCompanyiaFromEspectacleId(idE: number) {
    let A = this.getEspectacleById(idE);
    if (A) {
      let B = this.getCompanyiaById( A.Fields.ep_idCompanyia.Val );
      return (B) ? B.Fields.c_Nom.toString() : 'N/D';
    } else { return 'N/D'; }

  }

  getEntitatById(id: number) { return this.Entitats.getById('e_idAjuntament', id); }
  getProjecteById(id: number) { return this.Projectes.getById('pr_idProjecte', id); }
  getEspaiById(id: number) { return this.Espais.getById('es_idEspai', id); }
  getEspectacleById(id: number) { return this.Espectacles.getById('ep_idEspectacle', id); }
  getCompanyiaById(id: number) { return this.Companyies.getById('c_idCompanyia', id); }
  getContractesEspectaclesFromContracteControl(idCC: number): ContracteEspectacleRow[] { return this.ContractesEspectacles.getByFk('cte_idContracte', idCC);  }
  getContractesFuncionsFromContractesEspectacles(idCE: number): ContracteFuncioRow[] { return this.ContractesFuncions.getByFk('ctf_idContracteEspectacle', idCE); }

}

export class CECFTemp {
  CE: RowValor = new RowValor('contracteespectacles');
  CF: RowValor[] = [];
}

export class ContracteWord {
  ContracteControl = new RowValor('contractescontrol');
  ContracteEspectacles: CECFTemp[] = [];

  constructor(CO: ContractesObject, idContracte: number) {
    let CECF = new CECFTemp();
    this.ContracteControl = CO.ContractesControl.getById('ctc_idContracte', idContracte).toBDD('contractescontrol');
    CO.getContractesEspectaclesFromContracteControl( idContracte ).forEach( CEO => {
      CO.getContractesFuncionsFromContractesEspectacles( CEO.Fields.cte_idContracteEspectacle.Val ).forEach( CFO => {
        CECF.CF.push(CFO.toBDD('contractesfuncions'));
      });
      CECF.CE = CEO.toBDD('contracteespectacles');
      this.ContracteEspectacles.push(CECF);
    });
  }
}
