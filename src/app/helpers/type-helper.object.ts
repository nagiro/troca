import { DateAdapter } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface NoParamConstructor<T> {
    new (): T;
}

export class FieldConfig {
  FieldTitol = '';
  FieldName = '';
  FieldType = 'Input';  // Input, Select
  Visible = true;
  Cols = 2;

  constructor($FieldName = '', $FieldTitol = '', $FieldType = 'Input', $Visible = true, $Cols = 2) {
    this.FieldTitol = $FieldTitol;
    this.FieldName = $FieldName;
    this.FieldType = $FieldType;
    this.Visible = $Visible;
    this.Cols = $Cols;
  }

}

/* Mètodes abstractes que ha de tenir cada camp d'una taula */
export abstract class DatabaseTypeBase {
  Val: any;
  Extres: ElementExtra[];
  FieldConfig: FieldConfig;

  abstract toBDD(): string;
  abstract fromBDD(a: any): void;
  abstract toString(): string;

}

/* Mètodes abstractes que ha de tenir una camp de tipus d'una taula */
export abstract class DatabaseType<T> extends DatabaseTypeBase {
  Val: T;
  Extres = [];
  FieldConfig = new FieldConfig();
}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class DateType implements DatabaseType<Date> {
  Val: Date = null;
  Extres = [];
  FieldConfig = new FieldConfig();

  constructor( $FieldConfig?: FieldConfig, $default = true) {
    if ($default) { this.Val = new Date(); }
    if ($FieldConfig) { this.FieldConfig = $FieldConfig; }
    else { this.FieldConfig.FieldType = 'Date'; }
  }

  toBDD() { return (this.Val) ? this.Val.getFullYear() + '-' + ( Number(this.Val.getMonth()) + 1 ) + '-' + this.Val.getDate() : null; }
  fromBDD(v: string) { if (v) { this.Val = new Date(v); } }
  toString() { return (this.Val) ? this.Val.getDate() + '/' + (this.Val.getMonth() + 1) + '/' + this.Val.getFullYear() : ''; }
  get getString(): string { return this.toString(); }

}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class HoraType implements DatabaseType<string> {
  Val: string = null;
  Extres = [];
  FieldConfig = new FieldConfig();

  constructor($FieldConfig?: FieldConfig, $default = true) {
    if ($default) { this.Val = '00:00'; }
    if ($FieldConfig) { this.FieldConfig = $FieldConfig; }
    else { this.FieldConfig.FieldType = 'Input'; }
  }

  toBDD() { return (this.Val) ? this.Val : null; }
  fromBDD(v: string) { if (v) { this.Val = v; } }
  toString() { return (this.Val) ? this.Val : ''; }
  get getString(): string { return this.toString(); }

}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class NumberType implements DatabaseType<number> {
  Val = 0;
  Extres = [];
  FieldConfig = new FieldConfig();

  constructor($FieldConfig?: FieldConfig, $Extres: ElementExtra[] = []) {
    this.Extres = $Extres;
    if ($FieldConfig) { this.FieldConfig = $FieldConfig; }
  }

  toBDD() { return this.Val.toString(); }
  fromBDD(v: string) { if (v) { this.Val = Number(v); } }
  toString() { return this.Val.toString(); }

}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class TextType implements DatabaseType<string> {
  Val = '';
  Extres = [];
  FieldConfig = new FieldConfig();

  constructor($FieldConfig?: FieldConfig, $Extres?: string[]) {
    if ($FieldConfig) { this.FieldConfig = $FieldConfig; }
    if ($Extres) { this.Extres = $Extres; }
  }


  toBDD() { return this.Val; }
  fromBDD(v: string) { if (v && v !== null) { this.Val = v; } }
  toString() { return this.Val; }

}


export class TextTypeMultiple implements DatabaseType<string[]> {
  Val: string[];
  Extres = [];
  FieldConfig = new FieldConfig();

  constructor($FieldConfig?: FieldConfig, $Extres?: string[]) {
    if ($FieldConfig) { this.FieldConfig = $FieldConfig; }
    if ($Extres) { this.Extres = $Extres; }
  }


  toBDD() { return this.Val.join('#'); }
  fromBDD(v: string) { if (v && v !== null) { this.Val = v.split('#'); } }
  toString() { return this.Val.join('#'); }

}


/* Funció que diu si un string és un json o no */
function isJson(item) {
    item = typeof item !== 'string' ? JSON.stringify(item) : item;
    try { item = JSON.parse(item); } catch (e) { return false; }
    if (typeof item === 'object' && item !== null) { return true; }
    return false;
}

export class ElementExtra {
  id = new TextType();
  idn = new NumberType();
  nom = new TextType();

  constructor(id: any, nom: string) {
    this.id.fromBDD( id );
    this.idn.fromBDD( id );
    this.nom.fromBDD( nom );
  }

}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class BooleanType implements DatabaseType<number> {
  Val = 0;
  Extres = [];
  FieldConfig = new FieldConfig();

  constructor($FieldConfig?: FieldConfig) {
    this.Extres = [new ElementExtra(0, 'No'), new ElementExtra(1, 'Sí')];
    if ($FieldConfig) { this.FieldConfig = $FieldConfig; }
  }

  toBDD() { return String(this.Val); }
  fromBDD(v: string) { if (v && v !== null) { this.Val = Number(v); } }
  toString() { return (this.Val ? 'Sí' : 'No'); }

}

export class CampsMultiplesFields {
  cm_idExtern = new NumberType();
  cm_Camp = new TextType();
  cm_idForeignKey = new NumberType();
  cm_Taula = new TextType();
  cm_Text = new TextType();
  cm_isText = new BooleanType();
  tmp_action = '-';
  tmp_exist_in_bdd = false;

  constructor( idExtern = 0, camp = '', idforeignkey = 0, taula = '', action = '-', tmp_exist_in_bdd = false, isText = false , Text = '' ) {
    this.cm_idExtern.Val = idExtern;
    this.cm_Camp.Val = camp;
    this.cm_idForeignKey.Val = idforeignkey;
    this.cm_Taula.Val = taula;
    this.tmp_action = action;
    this.tmp_exist_in_bdd = tmp_exist_in_bdd;
    this.cm_isText.Val = (isText) ? 1 : 0 ;
    this.cm_Text.Val = Text;
  }

}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class MultipleType implements DatabaseType<CampsMultiplesFields[]> {
  Val: CampsMultiplesFields[] = [];
  Extres = [];
  FieldConfig: FieldConfig = new FieldConfig();
  Taula = '';
  NomCamp = '';


  constructor(T: string, N: string, $FieldConfig?: FieldConfig) {
    this.Taula = T; this.NomCamp = N; this.FieldConfig = $FieldConfig;
  }

  toBDD() { return JSON.stringify(this.Val);  } /* Aquesta no va ... i no cal que vagi */
  toString() { return JSON.stringify(this.Val); } /* Aquesta no va ... i no cal que vagi */

  fromBDD(CM: CampsMultiplesFields[]) {
    // Només carrego els que es diuen el nom del meu camp
    for (let e of CM) { if (e.cm_Camp.Val.localeCompare(this.NomCamp) === 0) { this.Val.push(e); } }
  }

  whereElement(id: number) {
    return this.Val.findIndex( X => X.cm_idForeignKey.Val === id );
  }
  getElement(id: number) {
    const i = this.whereElement(id);
    if (i > -1) { return this.Val[i]; } else { return null; }
  }
  hasElement(id: number, idExtern: number) {
    return (this.Val.findIndex( X => (X.cm_idExtern.Val === idExtern && X.cm_idForeignKey.Val === id) ) > -1);
  }

  getNew(idExtern: number, idfkKey: number) {
    return new CampsMultiplesFields( idExtern, this.NomCamp, idfkKey, this.Taula, 'A', false );
  }

  getNewText(idExtern: number) {
    let max = 0;
    this.Val.forEach( (X) => { if (X.cm_idForeignKey.Val > max) { max = X.cm_idForeignKey.Val; } });
    return new CampsMultiplesFields( idExtern, this.NomCamp, (max + 1) , this.Taula, 'A', false, true );
  }

  // L'afegeix si no està repetit
  update( CM: CampsMultiplesFields ) {
    let i = this.whereElement(CM.cm_idForeignKey.Val);

    if ( i === -1 ) {
      switch ( CM.tmp_action ) {
        case 'A': this.Val.push(CM); break;   // Element no existeix, però ha marcat una A
        case 'D': {} break;                   // Element no existeix, però ha marcat una D, no fem res...
      }
    } else {

      if (this.Val[i].tmp_exist_in_bdd) {
        switch ( CM.tmp_action ) {
          case 'A': this.Val[i].tmp_action = '-'; break;    // Existeix aquí i a la bdd, el deixem igual.
          case 'D': this.Val[i].tmp_action = 'D'; break;    // Existeix aquí i a la base de dades, marquem esborrat
        }
      } else {
        switch ( CM.tmp_action ) {
          case 'A': this.Val[i].tmp_action = 'A'; break;    // Existeix aquí, però no a la base de dades, li posem una A
          case 'D': this.Val.splice(i, 1); break;           // Existeix aquí, però no a la base de dades, l'eliminem de la llista
        }

      }
    }
  }

}


/* Model de dades de la consulta de llistat rebuts de la base de dades */
export class TableModelListData<T> {
  c = 0;
  List: T[] = [];

  // a és un any perquè entra un json que s'ha de convertir al format que entrem
  constructor(FieldsModel: NoParamConstructor<T>, Rows?: any) {
    if (Rows) {
      for ( let index of Object.keys(Rows.List) ) {
        this.List[index].fromBDD( Rows.List[index] );
      }
    }
  }

}



/* Funcions per guardar a la base de dades un objecte sencer */
export class CampValor {

  Camp: string;
  Valor: any;

  constructor(C, V) {
    this.Camp = C;
    this.Valor = V;
  }

}

export class RowValorMultiples {
  Taula = 'campsmultiples';
  tmp_action: string = '-';
  Fields: CampValor[] = [];

  add(R: CampValor) { this.Fields.push( R ); }
  setAction( A: string ) { this.tmp_action = A; }
}

export class RowValor {

  Taula = '';  // Nom de la taula
  Fields: CampValor[] = [];
  Multiples: RowValorMultiples[] = [];
  tmp_action = '-';

  constructor(Taula) { this.Taula = Taula; }

  addRowMultiple( R: RowValorMultiples ) { this.Multiples.push(R); }
  addRowField( R: CampValor ) { this.Fields.push(R); }
  setAction( A: string ) { this.tmp_action = A; }
}

export class ToBDDObject {

  RowUpdates: RowValor[] = [];

  addRowUpdate( R: RowValor ) { this.RowUpdates.push( R ) ; }

}

export class TableRowFieldList {
  FieldList: DatabaseTypeBase[] = [];
}

export class TableRow<T> {
  Fields: T;
  tmp_action = '-'; // (A)dd, (U)pdate, (D)elete
  tmp_exist_in_bdd = false; // Informa si aquest registre és de bdd o generat pel formulari

  constructor(nou: new() => T) {
    this.Fields = new nou();
  }

  toBDD( nomTaula: string, returnOnlyUpdates = true ): RowValor {

    let Row = new RowValor( nomTaula );
    Row.setAction( this.tmp_action );

    /* Per cada camp a la fila */
    Object.keys(this.Fields).forEach( camp => {

      /* Si el camp és múltiple ho guardo com a subcamps */
      if (this.Fields[camp] instanceof MultipleType) {

        /* Per cada entrada a camps múltiples */
        this.Fields[camp].Val.forEach( (X: CampsMultiplesFields) => {

          let RowMultiples = new RowValorMultiples();

          /* Per cada camp de la taula CampsMultiples de l'entrada si és tmp_action el guardem a part */
          Object.keys(X).forEach( nomCamp => {

            if (nomCamp !== 'tmp_action' && nomCamp !== 'tmp_exist_in_bdd') RowMultiples.add( new CampValor( nomCamp, X[nomCamp].toBDD() ) );
            else RowMultiples.setAction( X.tmp_action );

          });

          /* Guardo el camp a multiples a bdd si és una acció A o D */
          if ( returnOnlyUpdates && ( RowMultiples.tmp_action === 'A' || RowMultiples.tmp_action === 'D') ) Row.addRowMultiple( RowMultiples );
          else Row.addRowMultiple( RowMultiples );

        });
      } else {

        Row.addRowField( new CampValor( camp, this.Fields[camp].toBDD() ) );

      }
    });

    return Row;
  }

  fromOtherTable( TR: TableRow<T> ) {    
    Object.keys(this.Fields).forEach(X => this.Fields[X] = TR.Fields[X]);
  }

  /* J és una estructura que arriba de la bdd en format objectes */
  fromBDD(J: any, CM: CampsMultiplesFields[], existInBDD: boolean) {
      this.tmp_exist_in_bdd = existInBDD;

      for (let i of Object.keys(this.Fields)) {
        if ( this.Fields[i].fromBDD ) {
            if (this.Fields[i] instanceof MultipleType) {
              this.Fields[i].fromBDD(CM);
            } else {
              this.Fields[i].fromBDD(J[i]);
            }
        }
      }
      this.tmp_action = 'L';
  }

  getNew(a?: any, b?: any, c?: any, d?: any) {
    this.tmp_action = 'A';
  }

  hasAction() { return (this.tmp_action !== '-'); }

  toTableRowFieldList() {
    let R = new TableRowFieldList();
    Object.keys(this.Fields).forEach(X => { R.FieldList.push( this.Fields[X] ); });    
    return R;
  }

}

/* Model de dades de la consulta de llistat T1 és el model Taula i T2 els camps (Fields) */
export class TableSearchList<T1 extends TableRow<T2>, T2> {
  c = new NumberType();
  Rows: T1[] = [];
  get getNumSelectedRows() { return this.c; }

  /* Consulta format { c: number, List: TableRows } */
  constructor(TRow: NoParamConstructor<T1>, J: any) {

    if ( J && J.c > 0 ) {
      this.c.Val = J.c;
      J.List.forEach((E: any) => {
        let TR = new TRow(); TR.fromBDD(E, [], true); this.Rows.push(TR);
      });
    }
  }

}

/* Llistat de files d'una taula sense la c de cerca */
export class TableRowList<T1 extends TableRow<T2>, T2> {

  RowList: T1[] = [];

  addModel(DadesTaula: T1) { this.RowList.push( DadesTaula ); }
  addModelNoRepeat(DadesTaula: T1, $Camp) {
    if (this.RowList.findIndex( X => X.Fields[$Camp].Val === DadesTaula.Fields[$Camp].Val) < 0 ) { this.addModel(DadesTaula); }
   }

  getById($Camp: string, $Valor: any): TableRow<T2> {
    return this.RowList.find( X => X.Fields[$Camp].Val === $Valor);
  }

  getByFk($Camp: string, $Valor: any): TableRow<T2>[] {
    return this.RowList.filter( X => X.Fields[$Camp].Val === $Valor);
  }

  update(DadesTaula: T1, IndexExisteix: number) {


    /* Element no existeix */
    if ( IndexExisteix === -1 ) {
      switch ( DadesTaula.tmp_action ) {
        case 'A': this.RowList.push( DadesTaula ); break;   // Element no existeix, però ha marcat una A
        case 'D': {} break;                   // Element no existeix, però ha marcat una D, no fem res...
      }
    } else {

      if ( this.RowList[IndexExisteix].tmp_exist_in_bdd) {
        switch ( DadesTaula.tmp_action ) {
          case 'A': this.RowList[IndexExisteix].tmp_action = 'U'; break;    // Existeix aquí i a la bdd, el deixem igual.
          case 'D': this.RowList[IndexExisteix].tmp_action = 'D'; break;    // Existeix aquí i a la base de dades, marquem esborrat
        }
      } else {
        switch ( DadesTaula.tmp_action ) {
          case 'A': this.RowList[IndexExisteix].tmp_action = 'A'; break;    // Existeix aquí, però no a la base de dades, li posem una A
          case 'D': this.RowList.splice(IndexExisteix, 1); break;           // Existeix aquí, però no a la base de dades, l'eliminem de la llista
        }

      }

    }

  }

  /* Retorna una llista amb una referència nova */
  cloneList(): T1[] {
    let L = [];
    this.RowList.forEach( X => L.push(X) );
    return L;
  }

}
