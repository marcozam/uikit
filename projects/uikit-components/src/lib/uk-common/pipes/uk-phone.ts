import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'phone'})
export class UkPhonePipe  implements PipeTransform {
  transform(value: number): string {
    const str = value.toString();
    return `(${str.slice(0, 3)}) ${str.slice(3, 6)} ${str.slice(6)}`;
  }
}
