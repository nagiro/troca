import { NumberType, TextType, DateType, BooleanType, HoraType, TableRow, TableRowList, TableSearchList, FieldConfig, TextTypeMultiple } from '../helpers/type-helper.object';
import { CompanyiaFields, CompanyiaRow, CompanyiesList } from './companyies';

export class Categories {
  cat = [
    'Circ',
    'Clown',
    'Contes',
    'Interior',
    'Exterior',
    'Familiar',
    'Màgia',
    'Nadons',
    'Itinerant',
    'Titelles',
    'Animació',
    'Jocs',
    'Música',
    'Teatre',
    'Dansa',
    'Teatre objectes',
    'Altres'
  ];
}

export class EspectacleFields {

  ep_idEspectacle = new NumberType(new FieldConfig('ep_idEspectacle', 'Id Espectacle', 'Input', false, 1 ));
  ep_idCompanyia = new NumberType(new FieldConfig('ep_idCompanyia', 'Id Companyia', 'Input', false, 1 ));
  ep_Nom = new TextType(new FieldConfig('ep_Nom', 'Nom espectacle', 'Input', true, 10 ));
  ep_TipusEspectacle = new TextTypeMultiple(new FieldConfig('ep_TipusEspectacle', 'Tipus d\'espectacle', 'SelectMultiple', true, 8 ), new Categories().cat);
  ep_EdatMin = new NumberType(new FieldConfig('ep_EdatMin', 'Edat min.', 'Input', true, 2 ));
  ep_EdatMax = new NumberType(new FieldConfig('ep_EdatMax', 'Edat màx.', 'Input', true, 2 ));

  ep_Contacte_Nom = new TextType(new FieldConfig('ep_Contacte_Nom', 'Nom contacte', 'Input', true, 4 ));
  ep_Contacte_Telefon = new TextType(new FieldConfig('ep_Contacte_Telefon', 'Telèfon contacte', 'Input', true, 4 ));
  ep_Contacte_Email = new TextType(new FieldConfig('ep_Contacte_Email', 'Email contacte', 'Input', true, 4 ));

  ep_Tecnic_Nom = new TextType(new FieldConfig('ep_Tecnic_Nom', 'Nom tècnic', 'Input', true, 4 ));
  ep_Tecnic_Telefon  = new TextType(new FieldConfig('ep_Tecnic_Telefon', 'Telèfon tècnic', 'Input', true, 4 ));
  ep_Tecnic_Email = new TextType(new FieldConfig('ep_Tecnic_Email', 'Email tècnic', 'Input', true, 4 ));

  ep_Requeriments = new TextType(new FieldConfig('ep_Requeriments', 'Requeriments', 'Textarea', true, 12 ));

  ep_Descripcio = new TextType(new FieldConfig('ep_Descripcio', 'Descripció curta', 'Textarea', true, 12 ));

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
