import { DateAdapter } from '@angular/material';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class DateToJs {
  D = '';

  constructor() {}

  public convertFromNgbDateStructToDate( n: NgbDateStruct ): Date {
    return new Date(n.year, ( n.month - 1 ), n.day);
  }

  // Agafem una data amb format 2107-12-01 i hi passem a format javascript 2107-11-01
  public convertFromBDD( d: string ): Date {
    let e = new Date(d);
    e.setMonth( e.getMonth() );
    return e;
  }

  public convertToBDD( T: Date ): string {
    return T.getFullYear() + '-' + (T.getMonth() + 1) + '-' + T.getDate();
  }

  public convertToString( D: Date ): string {
    return D.getDate() + '-' + ( D.getMonth() + 1) + '-' + D.getFullYear();
  }

}

