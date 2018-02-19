import { DialogResponse } from '../../helpers/DialogResponse.object';
import { ElementExtra } from '../../helpers/type-helper.object';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatRadioChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.css']
})
export class SelectSearchComponent implements OnInit {

  Extres: ElementExtra[];
  Field: string = '';
  DR: DialogResponse<ElementExtra> = new DialogResponse<ElementExtra>();

  constructor(public dialogRef: MatDialogRef<SelectSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: ElementExtra[] ) {
    this.Extres = Data;
  }

  ngOnInit() {}

  onNoClick(): void { this.DR.setValue( new ElementExtra('0', '0') ); }

  onChange(event: MatRadioChange) {
    let E: ElementExtra = event.value;
    this.DR.setValue(E); this.doClose();
  }

  doClose(): void { this.dialogRef.close( this.DR ); }

}

