import { ElementExtra, NumberType, TextType, TextTypeMultiple } from '../../helpers/type-helper.object';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-helper-multiple',
  templateUrl: './select-helper-multiple.component.html',
  styleUrls: ['./select-helper-multiple.component.css']
})
export class SelectHelperMultipleComponent implements OnInit {

  @Input() Titol: string = '';
  @Input() Dada: TextTypeMultiple = new TextTypeMultiple();
  @Output() DadaChange = new EventEmitter<TextTypeMultiple>();
  @Input() isCO = false;
  @Input() CampsObligats = false;
  @Output() CampsObligatsChange = new EventEmitter<boolean>();

  @Input() Nom: string = '';
  @Input() Extres: string[] = [];

  constructor() { }

  update($event: string[]) { this.Dada.Val = $event; this.DadaChange.emit(this.Dada); }

  ngOnInit() {
  }


}
