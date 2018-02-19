import { NumberType, TextType, TableModel, TableModelArray, DateType, BooleanType, HoraType } from '../helpers/type-helper.object';

export class EntitatsFields {
  e_idAjuntament = new NumberType();
  e_Nom = new TextType();
  e_Responsable = new TextType();
  e_Telèfon = new TextType();
  e_Email = new TextType();
  e_Adreca = new NumberType();
  e_CodiPostal = new NumberType();
  e_Ciutat = new NumberType();
  e_CIF = new TextType();
}

export class EntitatsModel extends TableModel<EntitatsFields> {}
export class EntitatsList extends TableModelArray<EntitatsModel, EntitatsFields> {}