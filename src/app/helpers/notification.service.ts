import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs/Rx';

export class Message {
  tipus: string;
  titol: string;
  detall: string;
  detallOwn: string;

  constructor(se, su, de) {
    this.tipus = se;
    this.titol = su;
    this.detall = de;
    this.detallOwn = de;
  }

  setDetallOwn(de: string) {
    this.detallOwn = de;
  }
}

@Injectable()
export class NotificationService {
    public messageS: Subject<Message>;

    constructor() {
        this.messageS = new Subject<Message>();
    }

    success(titol: string, detall?: string): void {
        this.messageS.next(new Message('alert alert-success', titol, detall));
    }

    info(titol: string, detall?: string): void {
        this.messageS.next(new Message('alert alert-info', titol, detall));
    }

    warning(titol: string, detall?: string): void {
        this.messageS.next(new Message('alert alert-warning', titol, detall));
    }

    error(titol: string, detall?: string): void {

        let A = titol.split('||');
        let M = new Message('alert alert-danger', A[0], detall);
        if (A.length === 3) { M.setDetallOwn('Error at function ' + A[1] + ' in object ' + A[2]); }

        this.messageS.next( M );
    }
}
