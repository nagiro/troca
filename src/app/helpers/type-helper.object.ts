import { DateAdapter } from '@angular/material';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface NoParamConstructor<T> {
    new (): T;
}

/* Mètodes abstractes que ha de tenir cada camp d'una taula */
export abstract class DatabaseTypeBase {
  Val: any;
  FieldTitol: string;
  FieldName: string;
  abstract toBDD(): string;
  abstract fromBDD(a: any): void;
  abstract toString(): string;
}

/* Mètodes abstractes que ha de tenir una camp de tipus d'una taula */
export abstract class DatabaseType<T> extends DatabaseTypeBase {
  Val: T;
}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class DateType implements DatabaseType<Date> {
  Val: Date = null;
  FieldTitol = '';
  FieldName = '';

  constructor( $FieldName = '', $FieldTitol = '', $default = true) {
    if ($default) { this.Val = new Date(); }
    this.FieldTitol = $FieldTitol;
    this.FieldName = $FieldName;
  }

  toBDD() { return (this.Val) ? this.Val.getFullYear() + '-' + ( Number(this.Val.getMonth()) + 1 ) + '-' + this.Val.getDate() : null; }
  fromBDD(v: string) { if (v) { this.Val = new Date(v); } }
  toString() { return (this.Val) ? this.Val.getDate() + '/' + (this.Val.getMonth() + 1) + '/' + this.Val.getFullYear() : ''; }
  get getString(): string { return this.toString(); }

}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class HoraType implements DatabaseType<string> {
  Val: string = null;
  FieldTitol = '';
  FieldName = '';

  constructor($FieldName = '', $FieldTitol = '', $default = true) {
    if ($default) { this.Val = '00:00'; }
    this.FieldTitol = $FieldTitol;
    this.FieldName = $FieldName;
  }

  toBDD() { return (this.Val) ? this.Val : null; }
  fromBDD(v: string) { if (v) { this.Val = v; } }
  toString() { return (this.Val) ? this.Val : ''; }
  get getString(): string { return this.toString(); }

}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class NumberType implements DatabaseType<number> {
  Val = 0;
  FieldTitol = '';
  FieldName = '';

  constructor($FieldName = '', $FieldTitle = '') {
    this.FieldTitol = $FieldTitle;
    this.FieldName = $FieldName;
  }

  toBDD() { return this.Val.toString(); }
  fromBDD(v: string) { if (v) { this.Val = Number(v); } }
  toString() { return this.Val.toString(); }

}

/* Implementació de classe de camp que hi ha a una taula en formats */
export class TextType implements DatabaseType<string> {
  Val = '';
  FieldTitol = '';
  FieldName = '';

  constructor($FieldName = '', $FieldTitle = '') {
    this.FieldTitol = $FieldTitle;
    this.FieldName = $FieldName;
  }

  toBDD() { return this.Val; }
  fromBDD(v: string) { if (v && v !== null) { this.Val = v; } }
  toString() { return this.Val; }

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
  FieldTitol = '';
  FieldName = '';

  constructor($FieldName = '', $FieldTitle = '') {
    this.FieldTitol = $FieldTitle;
    this.FieldName = $FieldName;
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
  FieldTitol = '';
  FieldName = '';
  Taula = '';
  NomCamp = '';

  constructor(T: string, N: string, $FieldName = '', $FieldTitol = '') {
    this.Taula = T; this.NomCamp = N; this.FieldTitol = $FieldTitol; this.FieldName = $FieldName;
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


export class TableRow {
  Fields: DatabaseTypeBase[] = [];
  tmp_action = '-'; // (A)dd, (U)pdate, (D)elete
  tmp_exist_in_bdd = false; // Informa si aquest registre és de bdd o generat pel formulari

  constructor() {}

  toBDD( nomTaula: string, returnOnlyUpdates = true ): RowValor {

    let Row = new RowValor( nomTaula );
    Row.setAction( this.tmp_action );

    this.Fields.forEach( camp => {
        Row.addRowField( new CampValor( camp.FieldName, camp.toBDD() ) );
    });

    return Row;
  }

  /* J és una estructura que arriba de la bdd en format objectes */
  fromBDD(J: any, existInBDD: boolean) {

      this.tmp_exist_in_bdd = existInBDD;

      this.Fields.forEach( F => {
        F.fromBDD(J[F.FieldName]);
      });
      this.tmp_action = '-';
  }

  getNew(a?: any, b?: any, c?: any, d?: any) {
    this.tmp_action = 'A';
  }

  hasAction() { return (this.tmp_action !== '-'); }

}

/* Model de dades de la consulta de llistat T1 és el model Taula i T2 els camps (Fields) */
export class TableModelList {
  c = new NumberType();
  Rows: TableRow[] = [];
  get getNumSelectedRows() { return this.c; }

  /* Consulta format { c: number, List: TableRows } */
  constructor(J: any) {

    if ( J && J.c > 0 ) {
      this.c.Val = J.c;
      J.List.forEach((E: any) => {
        let ET = new TableRow(); ET.fromBDD(E, true); this.Rows.push(ET);
      });
    }
  }

}

export class TableModelArray {

  Rows: TableRow[] = [];

  addModel(DadesTaula: TableRow) { this.Rows.push( DadesTaula ); }

  update(DadesTaula: TableRow, IndexExisteix: number) {


    /* Element no existeix */
    if ( IndexExisteix === -1 ) {
      switch ( DadesTaula.tmp_action ) {
        case 'A': this.Rows.push( DadesTaula ); break;   // Element no existeix, però ha marcat una A
        case 'D': {} break;                   // Element no existeix, però ha marcat una D, no fem res...
      }
    } else {

      if ( this.Rows[IndexExisteix].tmp_exist_in_bdd) {
        switch ( DadesTaula.tmp_action ) {
          case 'A': this.Rows[IndexExisteix].tmp_action = 'U'; break;    // Existeix aquí i a la bdd, el deixem igual.
          case 'D': this.Rows[IndexExisteix].tmp_action = 'D'; break;    // Existeix aquí i a la base de dades, marquem esborrat
        }
      } else {
        switch ( DadesTaula.tmp_action ) {
          case 'A': this.Rows[IndexExisteix].tmp_action = 'A'; break;    // Existeix aquí, però no a la base de dades, li posem una A
          case 'D': this.Rows.splice(IndexExisteix, 1); break;           // Existeix aquí, però no a la base de dades, l'eliminem de la llista
        }

      }

    }

  }

  /* Retorna una llista amb una referència nova */
  cloneList(): TableRow[] {
    let L = [];
    this.Rows.forEach( X => L.push(X) );
    return L;
  }

}
