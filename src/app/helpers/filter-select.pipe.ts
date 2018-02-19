import { Pipe, PipeTransform } from '@angular/core';
import { ElementExtra } from './type-helper.object';

@Pipe({
  name: 'filterSelect'
})
export class FilterSelectPipe implements PipeTransform {

  transform(id: string, Elements: ElementExtra[]): string {
    if (Elements && Elements.length > 0) {
      let T = Elements.find( E => String(E.id) === String(id));
      if (T) { return T.nom.toString();
      } else {
        return 'n/d';
      }
    }
  }

}
