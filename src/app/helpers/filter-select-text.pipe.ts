import { ElementExtra } from './type-helper.object';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSelectText'
})
export class FilterSelectTextPipe implements PipeTransform {

  transform(Elements: ElementExtra[], id: string): ElementExtra[] {
    if (Elements && Elements.length > 0) {
      return Elements.filter( (E: ElementExtra) => { return E.nom.Val.includes(id) } );
    }
  }

}
