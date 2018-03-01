import { NumberType, TextType, DateType, BooleanType, HoraType, TableSearchList, TableRow, FieldConfig } from '../helpers/type-helper.object';

export class EntitatFields {
  e_idAjuntament = new NumberType(new FieldConfig('e_idAjuntament', 'Entitat ID', 'Input', false, 1 ) );
  e_Nom = new TextType(new FieldConfig('e_Nom', 'Nom', 'Input', true, 3 ) );
  e_Responsable = new TextType(new FieldConfig('e_Responsable', 'Nom Responsable', 'Input', true, 3 ) );
  e_Telefon = new TextType(new FieldConfig('e_Telefon', 'Tel. Resp.', 'Input', true, 3 ) );
  e_Email = new TextType(new FieldConfig('e_Email', 'Email Resp.', 'Input', true, 3 ) );
  e_Adreca = new TextType(new FieldConfig('e_Adreca', 'Adreça', 'Input', true, 3 ) );
  e_CodiPostal = new TextType(new FieldConfig('e_CodiPostal', 'Codi Post.', 'Input', true, 3 ) );
  e_Ciutat = new TextType(new FieldConfig('e_Ciutat', 'Ciutat', 'Input', true, 3 ) );
  e_CIF = new TextType(new FieldConfig('e_CIF', 'NIF', 'Input', true, 3 ) );
}

export class EntitatRow extends TableRow<EntitatFields> {
  constructor() { super(EntitatFields); }
}
export class EntitatsSearchList extends TableSearchList<EntitatRow, EntitatFields> {
  constructor(J: any) { super(EntitatRow, J); }
}
