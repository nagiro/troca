import { PermisosObject } from './permisos';
import { Injectable, Injector, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GlobalVarsService {

  public static API_ENDPOINT = 'http://localhost:8285';
  // public static API_ENDPOINT = 'php/';


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
