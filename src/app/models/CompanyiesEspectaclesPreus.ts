import { TableRow, TextType, FieldConfig, TableRowList, TableSearchList, NumberType } from '../helpers/type-helper.object';
import { EspectacleFields, EspectacleRow } from './Espectacles';
import { PreuFields, PreuRow } from './Preus';
import { CompanyiaFields, CompanyiaRow } from './companyies';

export class CompanyiaEspectaclePreuOneObject {
  Companyia = new CompanyiaRow();
  Espectacle = new EspectacleRow();
  Preu = new PreuRow();
}

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

  getCompanyiaById(valor: NumberType): CompanyiaRow { let T = this.Companyies.getById('c_idCompanyia', valor.Val); return (T) ? T : new CompanyiaRow(); }
  getPreuById(valor: NumberType): PreuRow { let T = this.Preus.getById('p_idPreu', valor.Val); return (T) ? T : new PreuRow(); }
  getPreusFromEspectacle(valor: NumberType): PreuRow[] { return (valor.Val > 0) ? this.Preus.getByFk('p_idEspectacle', valor.Val) : []; }

}

