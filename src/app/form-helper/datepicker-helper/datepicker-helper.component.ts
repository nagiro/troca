import { DatabaseTypeBase, DateType } from '../../helpers/type-helper.object';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker-helper',
  templateUrl: './datepicker-helper.component.html',
  styleUrls: ['./datepicker-helper.component.css']
})
export class DatepickerHelperComponent implements OnInit {

  @Input() Titol: string = '';
  @Input() Dada: DateType = new DateType();
  @Output() DadaChange = new EventEmitter<DateType>();
  @Input() isCO = false;
  @Input() CampsObligats = false;
  @Output() CampsObligatsChange = new EventEmitter<boolean>();

  @Input() Nom: string = '';

  constructor() { }

  ngOnInit() {
  }

  update($event) { this.Dada.Val = $event; this.DadaChange.emit(this.Dada); }
  updateObligat($event) { this.CampsObligatsChange.emit($event); }

}
