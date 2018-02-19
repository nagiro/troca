import { ElementExtra, NumberType, TextType } from './type-helper.object';

export class ExtresSiNo {
  A: ElementExtra[] = [];

  constructor() {
    this.A.push(new ElementExtra('1', 'Sí'));
    this.A.push(new ElementExtra('0', 'No'));
  }
}

export class ExtresSiNoIndif {
  A: ElementExtra[] = [];

  constructor() {
    this.A.push(new ElementExtra('1', 'Sí'));
    this.A.push(new ElementExtra('0', 'No'));
    this.A.push(new ElementExtra('-1', '---'));
  }
}
