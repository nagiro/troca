import { ElementExtra, CampsMultiplesFields, MultipleType } from '../../helpers/type-helper.object';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-autochips',
  templateUrl: './autochips.component.html',
  styleUrls: ['./autochips.component.css']
})
export class AutochipsComponent implements OnInit {

  @Input() Titol: string = '';
  @Input() CampMultiple: MultipleType = new MultipleType('', '');    // Variable amb els valors de camp múltiples
  @Input() idExtern: number = 0;
  @Input() Extres: ElementExtra[] = []; // Valors que apareixen al autocomplete
  @Input() isText: boolean = false;

  @Input()  Obligatori: boolean = false;  // Ens indica si aquest camp és obligatori... segons oferta ( només serveix per ofertes )
  @Output() ObligatoriChange = new EventEmitter();

  @Input() hasObligatori: boolean = false;  // Ens indica si aquest camp és obligatori... segons oferta ( només serveix per ofertes )
  @Output() onElementEscollit: EventEmitter<CampsMultiplesFields> = new EventEmitter(); // En retornem un perquè així sabem quin hem de canviar

  T: any;

  constructor() {}

  ngOnInit() {}

  addSelect( MSC: MatSelectChange) { this.add(MSC.value); }
  selectObligatori(e) { this.ObligatoriChange.emit(e); }

  addInput( T: string ) {
    if (T.includes('.')) {
      let CM = this.CampMultiple.getNewText(this.idExtern);
      CM.cm_Text.Val = T;
      CM.tmp_action = 'A';
      this.T = '';
      this.onElementEscollit.emit(CM);
    }
  }
  add( I: ElementExtra ) {
    let CM = this.CampMultiple.getNew(this.idExtern, I.idn.Val);
    CM.tmp_action = 'A';
    this.onElementEscollit.emit(CM);
  }
  remove( id: number ) {
    let CM = new CampsMultiplesFields(this.idExtern, this.CampMultiple.NomCamp, id, this.CampMultiple.Taula, 'D');
    this.onElementEscollit.emit(CM);
  }

}
