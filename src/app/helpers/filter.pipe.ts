import { ElementExtra } from './type-helper.object';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAuto'
})
export class FilterPipe implements PipeTransform {

  transform(items: ElementExtra[], filter: string): any {
    if (!items || !filter) {
      return items;
    } else {
      return items.filter(item => item.nom.toString().indexOf(filter) !== -1);
    }

  }
}
