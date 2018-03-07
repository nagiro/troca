import { NumberType, TextType, DateType, BooleanType, FieldConfig, TableRow, TableSearchList, TableRowList } from '../helpers/type-helper.object';

export class ContracteEspectacleFields {

  cte_PreuSC = new NumberType(new FieldConfig('cte_PreuSC', 'Preu SC', 'Input', true, 2 ) );
  cte_PreuAC = new NumberType(new FieldConfig('cte_PreuAC', 'Preu AC', 'Input', true, 2 ) );
  cte_IVASC = new NumberType(new FieldConfig('cte_IVASC', 'IVA SC', 'Input', true, 2 ) );
  cte_IVAAC = new NumberType(new FieldConfig('cte_IVAAC', 'IVA AC', 'Input', true, 2 ) );
  cte_TotalSC = new NumberType(new FieldConfig('cte_TotalSC', 'Total SC', 'Input', true, 2 ) );
  cte_TotalAC = new NumberType(new FieldConfig('cte_TotalAC', 'Total AC', 'Input', true, 2 ) );
  cte_idContracteEspectacle = new NumberType(new FieldConfig('cte_idContracteEspectacle', 'Id', 'Input', false, 1 ) );
  cte_idcontracte = new NumberType(new FieldConfig('cte_idcontracte', 'Id contracte', 'Input', false, 1 ) );
  cte_idespectacle = new NumberType(new FieldConfig('cte_idespectacle', 'Id espectacle', 'Input', false, 1 ) );
  cte_idEspai = new NumberType(new FieldConfig('cte_idEspai', 'Id espai', 'Input', false, 1 ) );

}

export class ContracteEspectacleRow extends TableRow<ContracteEspectacleFields> {
  constructor() { super(ContracteEspectacleFields); }

  getNew(idContracteEspectacle: number, idContracteControl: number, idEspectacle: number, idEspai: number) {
    this.tmp_action = 'A';
    this.Fields.cte_idcontracte.Val = idContracteControl;
    this.Fields.cte_idEspai.Val = idEspai;
    this.Fields.cte_idContracteEspectacle.Val = idContracteEspectacle;
    this.Fields.cte_idespectacle.Val = idEspectacle;
  }
}
export class ContractesEspectaclesList extends TableRowList<ContracteEspectacleRow, ContracteEspectacleFields> {}

export class ContractesEspectaclesSearchList extends TableSearchList<ContracteEspectacleRow, ContracteEspectacleFields> {
  constructor(J: any) { super(ContracteEspectacleRow, J); }
}
