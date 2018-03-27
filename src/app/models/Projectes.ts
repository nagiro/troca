import { NumberType, TextType, DateType, BooleanType, HoraType, FieldConfig, TableRow, TableSearchList, TableRowList } from '../helpers/type-helper.object';

export class ProjecteFields {
  pr_idProjecte = new NumberType(new FieldConfig('pr_idProjecte', 'Id projecte', 'Input', false, 1 ));
  pr_nom = new TextType(new FieldConfig('pr_nom', 'Nom projecte', 'Input', true, 4 ));
  pr_DataModificacio = new DateType(new FieldConfig('pr_DataModificacio', 'Data mod.', 'Date', false, 3), true );
}

export class ProjecteRow extends TableRow<ProjecteFields> {
  constructor() { super(ProjecteFields); }
}

export class ProjectesSearchList extends TableSearchList<ProjecteRow, ProjecteFields> {
  constructor(J?: any) { super(ProjecteRow, J); }
}

export class ProjectesList extends TableRowList<ProjecteRow, ProjecteFields> {}

