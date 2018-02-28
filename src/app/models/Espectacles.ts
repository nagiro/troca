import { NumberType, TextType, DateType, BooleanType, HoraType, TableRow, TableRowList, TableSearchList, FieldConfig } from '../helpers/type-helper.object';
import { CompanyiaFields, CompanyiaRow, CompanyiesList } from './companyies';

export class EspectacleFields {
  ep_idEspectacle = new NumberType(new FieldConfig('ep_idEspectacle', 'Id Espectacle', 'Input', false, 1 ));
  ep_idCompanyia = new NumberType(new FieldConfig('ep_idCompanyia', 'Id Companyia', 'Input', false, 1 ));
  ep_Nom = new TextType(new FieldConfig('ep_Nom', 'Nom espectacle', 'Input', true, 3 ));
  ep_Tecnic = new TextType(new FieldConfig('ep_Tecnic', 'Nom tècnic', 'Input', true, 3 ));
  ep_Requeriments = new TextType(new FieldConfig('ep_Requeriments', 'Requeriments', 'Input', true, 5 ));
  ep_TipusEspectacle = new TextType(new FieldConfig('ep_TipusEspectacle', 'Tipus d\'espectacle', 'Input', true, 2 ));
}

export class EspectacleRow extends TableRow<EspectacleFields> {
  constructor() { super(EspectacleFields); }
  
  getNew(idCompanyia: NumberType) {
    this.tmp_action = 'A';
    this.Fields.ep_idCompanyia.Val = idCompanyia.Val;
  }
  
}
export class EspectaclesList extends TableRowList<EspectacleRow, EspectacleFields> {}

export class EspectaclesSearchList extends TableSearchList<EspectacleRow, EspectacleFields> {
  constructor(J: any = {}) { super(EspectacleRow, J); }
}
