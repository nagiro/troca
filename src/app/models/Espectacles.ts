import { NumberType, TextType, TableModel, TableModelArray, DateType, BooleanType, HoraType } from '../helpers/type-helper.object';

export class EspectaclesFields {
  ep_idEspectacle = new NumberType();
  ep_idCompanyia = new NumberType();
  ep_Nom = new TextType();
  ep_Tècnic = new TextType();
  ep_Requeriments = new TextType();
  ep_TipusEspectacle = new TextType();
}

export class EspectaclesModel extends TableModel<EspectaclesFields> {}
export class EspectaclesList extends TableModelArray<EspectaclesModel, EspectaclesFields> {}
