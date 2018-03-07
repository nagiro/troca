import { TableRow, NumberType, TextType, TableModelListData, TableRowList, TableSearchList, FieldConfig } from '../helpers/type-helper.object';

export class CompanyiaFields {
    c_idCompanyia = new TextType( new FieldConfig('c_idCompanyia', 'Id', 'Input', false, 1 ) );
    c_NIFCompanyia = new TextType( new FieldConfig('c_NIFCompanyia', 'NIF companyia', 'Input', true, 3 ) );
    c_Nom = new TextType( new FieldConfig('c_Nom', 'Nom', 'Input', true, 8 ) );

    c_NIF = new TextType( new FieldConfig('c_NIF', 'NIF Representant', 'Input', true, 2 ));
    c_Responsable = new TextType( new FieldConfig('c_Responsable', 'Representant', 'Input', true, 4 ) );
    c_Telefon = new TextType( new FieldConfig('c_Telèfon', 'Telèfon Representant', 'Input', true, 2 ));
    c_Email = new TextType( new FieldConfig('c_Email', 'Email Representant', 'Input', true, 4 ));

    c_Responsable2 = new TextType( new FieldConfig('c_Responsable2', 'Nom tècnic', 'Input', true, 4 ) );
    c_Telefon2 = new TextType( new FieldConfig('c_Telèfon2', 'Telèfon tècnic', 'Input', true, 4 ));
    c_Email2 = new TextType( new FieldConfig('c_Email2', 'Email tècnic', 'Input', true, 4 ));

}

export class CompanyiaRow extends TableRow<CompanyiaFields> {
  constructor() { super(CompanyiaFields); }
}
export class CompanyiesList extends TableRowList<CompanyiaRow, CompanyiaFields> {}

export class CompanyiesSearchList extends TableSearchList<CompanyiaRow, CompanyiaFields> {
  constructor(J: any = {}) { super(CompanyiaRow, J); }
}
