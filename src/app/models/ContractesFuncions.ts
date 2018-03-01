import { NumberType, TextType, DateType, BooleanType, HoraType, FieldConfig, TableRow, TableSearchList, TableRowList } from '../helpers/type-helper.object';

export class ContracteFuncioFields {

  ctf_idFuncio = new NumberType(new FieldConfig('ctf_idFuncio', 'Id', 'Input', false, 1 ) );
  ctf_idContracteEspectacle = new NumberType(new FieldConfig('ctf_idContracteEspectacle', 'Id cont.esp.', 'Input', false, 1 ) );
  ctf_Hora_inici = new HoraType(new FieldConfig('ctf_Hora_inici', 'Hora inici', 'Hora', true, 3 ) );
  ctf_Hora_arribada = new HoraType(new FieldConfig('ctf_Hora_arribada', 'Hora arribada', 'Hora', true, 3 ) );
  ctf_Hora_Recollida= new HoraType(new FieldConfig('ctf_Hora_Recollida', 'Hora recollida', 'Hora', true, 3 ) );
  ctf_Adreca_Arribada= new TextType(new FieldConfig('ctf_Adreca_Arribada', 'Adreça arribada', 'Input', true, 3 ) );
  ctf_Aparcament = new TextType(new FieldConfig('ctf_Aparcament', 'Aparcament', 'Input', true, 3 ) );
  ctf_CarregaDescarrega = new TextType(new FieldConfig('ctf_CarregaDescarrega', 'Carrega/Descarrega', 'Input', true, 3 ) );
  ctf_On_Canviarse = new TextType(new FieldConfig('ctf_On_Canviarse', 'On canviar-se', 'Input', true, 3 ) );
  ctf_Acords_tecnics= new TextType(new FieldConfig('ctf_Acords_tecnics', 'Acords tècnics', 'Input', true, 3 ) );
  ctf_Data = new DateType(new FieldConfig('ctf_Data', 'Data acte', 'Date', true, 3 ) );
}

export class ContracteFuncioRow extends TableRow<ContracteFuncioFields> {
  constructor() { super(ContracteFuncioFields); }

  getNew(idContracteFuncio: number, idContracteEspectacle: number) {
    this.tmp_action = 'A';
    this.Fields.ctf_idContracteEspectacle.Val = idContracteEspectacle;
    this.Fields.ctf_idFuncio.Val = idContracteFuncio;
  }
}

export class ContractesFuncionsSearchList extends TableSearchList<ContracteFuncioRow, ContracteFuncioFields> {
  constructor(J: any) { super(ContracteFuncioRow, J); }
}
export class ContractesFuncionsList extends TableRowList<ContracteFuncioRow, ContracteFuncioFields> {}
