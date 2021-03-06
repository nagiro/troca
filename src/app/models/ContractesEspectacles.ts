import { NumberType, TextType, DateType, BooleanType, FieldConfig, TableRow, TableSearchList, TableRowList } from '../helpers/type-helper.object';

export class ContracteEspectacleFields {

  cte_PreuSC = new NumberType(new FieldConfig('cte_PreuSC', 'Preu SC', 'Input', true, 2 ) );
  cte_PreuAC = new NumberType(new FieldConfig('cte_PreuAC', 'Preu AC', 'Input', true, 2 ) );
  cte_IVASC = new NumberType(new FieldConfig('cte_IVASC', 'IVA SC', 'Input', true, 2 ) );
  cte_IVAAC = new NumberType(new FieldConfig('cte_IVAAC', 'IVA AC', 'Input', true, 2 ) );
  cte_TotalSC = new NumberType(new FieldConfig('cte_TotalSC', 'Total SC', 'Input', true, 2 ) );
  cte_TotalAC = new NumberType(new FieldConfig('cte_TotalAC', 'Total AC', 'Input', true, 2 ) );
  cte_idContracteEspectacle = new NumberType(new FieldConfig('cte_idContracteEspectacle', 'Id', 'Input', false, 1 ) );
  cte_idContracte = new NumberType(new FieldConfig('cte_idContracte', 'Id contracte', 'Input', false, 1 ) );
  cte_idEspectacle = new NumberType(new FieldConfig('cte_idEspectacle', 'Id espectacle', 'Input', false, 1 ) );
  cte_idEspai = new NumberType(new FieldConfig('cte_idEspai', 'Id espai', 'Input', false, 1 ) );
  cte_DataModificacio = new DateType(new FieldConfig('cte_DataModificacio', 'Data mod.', 'Date', false, 3), true );

}

export class ContracteEspectacleRow extends TableRow<ContracteEspectacleFields> {
  constructor() { super(ContracteEspectacleFields); }

  getNew(idContracteEspectacle: number, idContracteControl: number, idEspectacle: number, idEspai: number) {
    this.tmp_action = 'A';
    this.Fields.cte_idContracte.Val = idContracteControl;
    this.Fields.cte_idEspai.Val = idEspai;
    this.Fields.cte_idContracteEspectacle.Val = idContracteEspectacle;
    this.Fields.cte_idEspectacle.Val = idEspectacle;
  }
}
export class ContractesEspectaclesList extends TableRowList<ContracteEspectacleRow, ContracteEspectacleFields> {}

export class ContractesEspectaclesSearchList extends TableSearchList<ContracteEspectacleRow, ContracteEspectacleFields> {
  constructor(J: any) { super(ContracteEspectacleRow, J); }
}
