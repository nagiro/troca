import { NumberType, TextType, DateType, BooleanType, TableModelListData, FieldConfig, TableRow, TableSearchList } from '../helpers/type-helper.object';

export class ContacteComercialFields {
  ccco_idContacteComercial = new NumberType(new FieldConfig('ccco_idContacteComercial', 'Contracte ID', 'Input', false, 1 ) );
  ccco_idAjuntament = new NumberType(new FieldConfig('ccco_idAjuntament', 'Id Entitat', 'Input', false, 1 ) );
  ccco_idEspectacle = new NumberType(new FieldConfig('ccco_idEspectacle', 'Id Espectacle', 'Input', false, 1 ) );
  ccco_DataContacte = new DateType(new FieldConfig('ccco_DataContacte', 'Data contacte', 'Input', true, 2 ) );
  ccco_Resposta = new TextType(new FieldConfig('ccco_Resposta', 'Resposta', 'Input', true, 12 ) );
  ccco_idProjecte = new NumberType(new FieldConfig('ccco_idProjecte', 'Projecte', 'Select', true, 2 ), [] );
  ccco_Tancat = new BooleanType(new FieldConfig('ccco_Tancat', 'Tancat?', 'Select', true, 2 ) );
  ccco_DataModificacio = new DateType(new FieldConfig('ccco_DataModificacio', 'Data mod.', 'Date', false, 3), true );
}


export class ContacteComercialRow extends TableRow<ContacteComercialFields> {
  constructor() { super(ContacteComercialFields); }
}

export class ContactesComercialsSearchList extends TableSearchList<ContacteComercialRow, ContacteComercialFields> {
  constructor(J: any) { super(ContacteComercialRow, J); }
}
