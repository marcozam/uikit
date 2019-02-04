import { Pipe, PipeTransform } from '@angular/core';
import { UK_SSN_SEPERATOR, UK_SSN_MASK_SECTIONS } from '../../uk-form-controls/masks';

@Pipe({ name: 'ukSSNFormat' })
export class UkSSNPipe  implements PipeTransform {

  private separator = UK_SSN_SEPERATOR;
  private separatorReg = new RegExp(this.separator, 'g');

  transform(value: string): string {
    let cleanValue = value.replace(this.separatorReg, '').trim();
    let format = [], idx = 0;
    UK_SSN_MASK_SECTIONS.forEach(sec => {
        let secMax = idx + sec;
        if(cleanValue.length < secMax) { secMax = cleanValue.length }
        if(idx < value.length) {
          format.push(value.substring(idx, secMax));
        }
        idx = secMax;
    });
    return format.join(this.separator);
  }
  
}