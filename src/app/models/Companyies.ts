import { TableRow, NumberType, TextType, TableModelListData, TableRowList, TableSearchList, FieldConfig } from '../helpers/type-helper.object';

export class CompanyiaFields {
    c_idCompanyia = new TextType( new FieldConfig('c_idCompanyia', 'Id', 'Input', false, 1 ) );
    c_Nom = new TextType( new FieldConfig('c_Nom', 'Nom', 'Input', true, 3 ) );
    c_Responsable = new TextType( new FieldConfig('c_Responsable', 'Responsable', 'Input', true, 3 ) );
    c_Telefon = new TextType( new FieldConfig('c_Telèfon', 'Telèfon', 'Input', true, 2 ));
    c_Email = new TextType( new FieldConfig('c_Email', 'Email', 'Input', true, 2 ));
    c_NIF = new TextType( new FieldConfig('c_NIF', 'NIF Representant', 'Input', true, 1 ));
    c_CCC = new TextType( new FieldConfig('c_CCC', 'Compte corrent', 'Input', true, 4 ));
    c_NIFCompanyia = new TextType( new FieldConfig('c_NIFCompanyia', 'NIF companyia', 'Input', true, 1 ) );
}

export class CompanyiaRow extends TableRow<CompanyiaFields> {
  constructor() { super(CompanyiaFields); }
}
export class CompanyiesList extends TableRowList<CompanyiaRow, CompanyiaFields> {}

export class CompanyiesSearchList extends TableSearchList<CompanyiaRow, CompanyiaFields> {
  constructor(J: any = {}) { super(CompanyiaRow, J); }
}
