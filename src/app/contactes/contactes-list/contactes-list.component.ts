import { DbObject } from '../../models/DbObject.object';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactes-list',
  templateUrl: './contactes-list.component.html',
  styleUrls: ['./contactes-list.component.css']
})
export class ContactesListComponent implements OnInit {

  constructor( private _db: DbObject ) {
    
  }

  ngOnInit() {
  }

}
