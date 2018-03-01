import { NumberType, TextType, DateType, BooleanType, FieldConfig, TableRow, TableSearchList, TableRowList } from '../helpers/type-helper.object';

export class ContracteControlFields {
  ctc_idContracte = new NumberType(new FieldConfig('ctc_idContracte', 'Id contracte', 'Input', false, 1 ) );
  ctc_idprojecte = new NumberType(new FieldConfig('ctc_idprojecte', 'Id projecte', 'Select', false, 1 ) );
  ctc_idEntitat = new NumberType(new FieldConfig('ctc_idEntitat', 'Id entitat', 'Input', false, 1 ) );
  ctc_EntregatFullRuta = new BooleanType(new FieldConfig('ctc_EntregatFullRuta', 'Entregat Full Ruta?', 'Select', true, 3 ) );
  ctc_EntregatContracte = new BooleanType(new FieldConfig('ctc_EntregatContracte', 'Id', 'Select', true, 3 ) );
  ctc_DataContracte = new DateType(new FieldConfig('ctc_DataContracte', 'Data contracte', 'Date', true, 3 ) );
  ctc_Observacions = new TextType(new FieldConfig('ctc_Observacions', 'Observacions', 'Textarea', true, 12 ) );
}

export class ContracteControlRow extends TableRow<ContracteControlFields> {
  constructor() { super(ContracteControlFields); }

  getNew($id: number, idProjecte: number, idEntitat: number) {
    this.tmp_action = 'A';
    this.Fields.ctc_idContracte.Val = $id;
    this.Fields.ctc_idprojecte.Val = idProjecte;
    this.Fields.ctc_idEntitat.Val = idEntitat;
  }
}

export class ContractesControlList extends TableRowList<ContracteControlRow, ContracteControlFields> {}

export class ContractesControlSearchList extends TableSearchList<ContracteControlRow, ContracteControlFields> {
  constructor(J: any) { super(ContracteControlRow, J); }
}
