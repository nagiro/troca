import { NumberType, TextType, DateType, BooleanType, HoraType, TableRow, FieldConfig, TableSearchList } from '../helpers/type-helper.object';

export class PreuFields {
  p_idPreu = new NumberType( new FieldConfig('p_idPreu', 'Id', 'Input', false, 1 ) );
  p_idEspectacle = new NumberType( new FieldConfig('p_idEspectacle', 'Id', 'Input', false, 1 ) );
  p_PreuSC = new NumberType( new FieldConfig('p_PreuSC', 'Sense Comis.', 'Input', true, 3 ) );
  p_PreuAC = new NumberType( new FieldConfig('c_idCompanyia', 'Amb Comis.', 'Input', true, 3 ) );
  p_Text = new TextType( new FieldConfig('p_Text', 'Text', 'Input', true, 3 ) );
  p_DataModificacio = new DateType(new FieldConfig('p_DataModificacio', 'Data mod.', 'Date', false, 3), true );
}

export class PreuRow extends TableRow<PreuFields> {
  constructor() {
    super(PreuFields);
  }
  
  getNew(idEspectacle: NumberType) {
    this.tmp_action = 'A';
    this.Fields.p_idEspectacle.Val = idEspectacle.Val;
  }
  
}

export class PreusSearchList extends TableSearchList<PreuRow, PreuFields> {
  constructor(J: any = {}) { super(PreuRow, J); }
  
  getFromEspectacle(idE: NumberType) {
    return this.Rows.filter( X => X.Fields.p_idEspectacle.Val === idE.Val );
  }
}

