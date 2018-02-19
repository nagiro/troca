import { NumberType, TextType, TableModel, TableModelArray, DateType, BooleanType, HoraType } from '../helpers/type-helper.object';

export class ContractesFuncionsFields {
  ctf_idFuncio = new NumberType();
  ctf_idContracteEspectacle = new NumberType();
  ctf_Hora_inici = new HoraType();
  ctf_Hora_arribada = new HoraType();
  ctf_Hora_Recollida= new HoraType();
  ctf_Adreca_Arribada= new TextType();
  ctf_Aparcament = new TextType();
  ctf_CarregaDescarrega = new TextType();
  ctf_On_Canviarse = new TextType();
  ctf_Acords_tecnics= new TextType();
  ctf_Data = new DateType();
}

export class ContractesFuncionsModel extends TableModel<ContractesFuncionsFields> {}
export class ContractesFuncionsList extends TableModelArray<ContractesFuncionsModel, ContractesFuncionsFields> {}