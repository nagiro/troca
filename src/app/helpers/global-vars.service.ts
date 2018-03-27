import { PermisosObject } from './permisos';
import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalVarsService {

  Permisos: PermisosObject = new PermisosObject();
  alive = true;

  constructor() {}

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {

          setTimeout(() => {
            this.alive = false;
            resolve();
          }, 1000);
        });
  }

  loadComponent(a: string) {
    switch (a) {
    }
  }

}
