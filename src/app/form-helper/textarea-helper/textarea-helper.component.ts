import { TextType } from '../../helpers/type-helper.object';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-textarea-helper',
  templateUrl: './textarea-helper.component.html',
  styleUrls: ['./textarea-helper.component.css']
})
export class TextareaHelperComponent implements OnInit {

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
