import { ElementExtra, NumberType } from '../../helpers/type-helper.object';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-helper',
  templateUrl: './select-helper.component.html',
  styleUrls: ['./select-helper.component.css']
})
export class SelectHelperComponent implements OnInit {

  @Input() Titol: string = '';
  @Input() Dada: NumberType = new NumberType();
  @Output() DadaChange = new EventEmitter<NumberType>();
  @Input() isCO = false;
  @Input() CampsObligats = false;
  @Output() CampsObligatsChange = new EventEmitter<boolean>();

  @Input() Nom: string = '';
  @Input() Extres: ElementExtra[] = [];

  constructor() { }

  update($event: number) { this.Dada.Val = $event; this.DadaChange.emit(this.Dada); }
  updateObligat($event) { this.CampsObligatsChange.emit($event); }

  ngOnInit() {
  }


}
