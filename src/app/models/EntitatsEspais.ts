import { TableRow, TextType, FieldConfig, TableRowList, TableSearchList, NumberType } from '../helpers/type-helper.object';
import { EntitatRow, EntitatFields } from './Entitats';
import { EspaiRow, EspaiFields } from './Espais';

export class EntitatEspaiOneObject {

  Entitat = new EntitatRow();
  Espai = new EspaiRow();
  
}

export class EntitatsEspaisObject {

  Entitats = new TableRowList<EntitatRow, EntitatFields>();
  Espais = new TableRowList<EspaiRow, EspaiFields>();
  c = 0;

  /* c: number, List: CompanyiaEspectaclePreusObject */
  constructor(J?: any) {
    if (J) {
      this.c = J.c;
      let L: any[] = J.List;
      L.forEach( X => {
        let T = new EntitatRow(); T.fromBDD(X, [], true);
        this.Entitats.addModelNoRepeat( T , 'e_idAjuntament');

        let E = new EspaiRow(); E.fromBDD(X, [], true);
        this.Espais.addModelNoRepeat( E , 'es_idEspai');
      });
    }
  }

  getEntitatById(valor: NumberType): EntitatRow { let T = this.Entitats.getById('e_idAjuntament', valor.Val); return (T) ? T : new EntitatRow(); }  

}

