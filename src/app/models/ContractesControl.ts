import { NumberType, TextType, TableModel, TableModelArray, DateType, BooleanType } from '../helpers/type-helper.object';

export class ContractesControlFields {
  ctc_idContracte = new NumberType();
  ctc_idprojecte = new NumberType();
  ctc_EntregatFullRuta = new BooleanType();
  ctc_Observacions = new TextType();
  ctc_idEntitat = new NumberType();
  ctc_DataContracte = new DateType();
  ctc_EntregatContracte = new BooleanType();
}

export class ContractesControlModel extends TableModel<ContractesControlFields> {}
export class ContractesControlList extends TableModelArray<ContractesControlModel, ContractesControlFields> {}