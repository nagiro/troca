import { TextType } from '../../helpers/type-helper.object';
import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-helper',
  templateUrl: './input-helper.component.html',
  styleUrls: ['./input-helper.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class InputHelperComponent implements OnInit {

  @Input() Titol: string = '';
  @Input() Dada: TextType = new TextType();
  @Output() DadaChange = new EventEmitter<TextType>();
  @Input() isCO = false;
  @Input() CampsObligats = false;
  @Output() CampsObligatsChange = new EventEmitter<boolean>();
  @Input() Nom: string = '';

  constructor() { }

  update($event) { this.Dada.Val = $event; this.DadaChange.emit(this.Dada); }
  updateObligat($event) { this.CampsObligatsChange.emit($event); }

  ngOnInit() {
  }

}
