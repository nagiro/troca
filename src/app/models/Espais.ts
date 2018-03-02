import { NumberType, TextType, DateType, BooleanType, HoraType, TableSearchList, TableRow, FieldConfig } from '../helpers/type-helper.object';

export class EspaiFields {
  es_idEspai = new NumberType( new FieldConfig('es_idEspai', 'Espai ID', 'Input', false, 1 ) );
  es_idAjuntament = new NumberType(new FieldConfig('es_idAjuntament', 'Entitat ID', 'Input', false, 1 ) );
  es_Nom = new TextType(new FieldConfig('es_Nom', 'Nom espai', 'Input', true, 3 ) );
  es_Poblacio = new TextType(new FieldConfig('es_Poblacio', 'Població', 'Input', true, 3 ) );
  es_Adreca = new TextType(new FieldConfig('es_Adreca', 'Adreça', 'Input', true, 4 ) );
  es_TeFitxaTecnica = new BooleanType(new FieldConfig('es_TeFitxaTecnica', 'Té fitxa tècnica', 'Select', true, 2 ) );
  es_TeCaixaNegra = new BooleanType(new FieldConfig('es_TeCaixaNegra', 'Té caixa negra', 'Select', true, 2 ) );
  es_TeAparcament = new BooleanType(new FieldConfig('es_TeAparcament', 'Té aparcament', 'Select', true, 2 ) );
  es_TeCarregaDescarrega = new BooleanType(new FieldConfig('es_TeCarregaDescarrega', 'Té càrrega/descàrrega', 'Select', true, 2 ) );
  es_Lloc_canviarse = new BooleanType(new FieldConfig('es_Lloc_canviarse', 'LLoc on canviar-se', 'Select', true, 2 ) );
  es_Responsable_nom = new TextType(new FieldConfig('es_Responsable_nom', 'Nom Responsable', 'Input', true, 3 ) );
  es_Responsable_mobil = new TextType(new FieldConfig('es_Responsable_mobil', 'Mòbil Resp.', 'Input', true, 3 ) );
  es_Aparcament_Text = new TextType(new FieldConfig('es_Aparcament_Text', 'Info aparcament', 'Textarea', true, 12 ) );
  es_CarregaDescarrega_Text = new TextType(new FieldConfig('es_CarregaDescarrega_Text', 'Info càrrega/descàrrega', 'Textarea', true, 12 ) );
  es_Lloc_Canviarse_text = new TextType(new FieldConfig('es_Lloc_Canviarse_text', 'Info lloc canviar-se', 'Textarea', true, 12 ) );
}

export class EspaiRow extends TableRow<EspaiFields> {
  constructor() { super(EspaiFields); }

  getNew(idEntitat: number) {
    this.tmp_action = 'A';
    this.Fields.es_idAjuntament.Val = idEntitat;
  }
}
export class EspaiSearchList extends TableSearchList<EspaiRow, EspaiFields> {
  constructor(J: any) { super(EspaiRow, J); }
}
