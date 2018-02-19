import { TableRow, NumberType, TextType, TableModel, TableModelArray, TableModelList, TableModelListData } from '../helpers/type-helper.object';

export class CompanyiesRows extends TableRow {
  Fields = [
    new NumberType('c_idCompanyia', ''),
    new TextType('c_Nom', 'Nom'),
    new TextType('c_Responsable', 'Responsable'),
    new TextType('c_Telèfon', 'Telèfon'),
    new TextType('c_Email', 'Email'),
    new TextType('c_NIF', 'NIF Representant'),
    new TextType('c_CCC', 'Compte corrent'),
    new TextType('c_NIFCompanyia', 'NIF companyia')
  ];
  
  get F(nom: string) { return this.Fields.find(X => { X.FieldName === nom }); }
  get I(nom: string) { return this.Fields.findIndex(X => { X.FieldName === nom }); }
}

export class CompanyiesEspectaclesRows extends CompanyiesRows {
  
  constructor() {
    super();
    this.Fields.push( new TextType('ep_Nom', 'Nom espectacle' ) );
  }
}


export class CompanyiesEspectaclesListRows extends TableModelList {}
