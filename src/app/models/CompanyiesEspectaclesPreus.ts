import { TableRow, TextType, FieldConfig, TableRowList, TableSearchList, NumberType } from '../helpers/type-helper.object';
import { EspectacleFields, EspectacleRow } from './Espectacles';
import { PreuFields, PreuRow } from './Preus';
import { CompanyiaFields, CompanyiaRow } from './companyies';

export class CompanyiaEspectaclePreusObject {

  Companyies = new TableRowList<CompanyiaRow, CompanyiaFields>();
  Espectacles = new TableRowList<EspectacleRow, EspectacleFields>();
  Preus = new TableRowList<PreuRow, PreuFields>();
  c = 0;

  /* c: number, List: CompanyiaEspectaclePreusObject */
  constructor(J?: any) {
    if (J) {
      this.c = J.c;
      let L: any[] = J.List;
      L.forEach( X => {
        let T = new CompanyiaRow(); T.fromBDD(X, [], true);
        this.Companyies.addModelNoRepeat( T , 'c_idCompanyia');

        let E = new EspectacleRow(); E.fromBDD(X, [], true);
        this.Espectacles.addModelNoRepeat( E , 'ep_idEspectacle');

        let P = new PreuRow(); P.fromBDD(X, [], true);
        this.Preus.addModel( P );
      });
    }
  }

  getCompanyiaById(valor: NumberType): CompanyiaRow { return this.Companyies.getById('c_idCompanyia', valor.Val); }
  getPreusFromEspectacle(valor: NumberType): PreuRow[] { return this.Preus.getByFk('p_idEspectacle', valor.Val); }

}

