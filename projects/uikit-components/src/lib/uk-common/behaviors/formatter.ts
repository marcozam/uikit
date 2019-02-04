import { Constructor } from './constructor';
import { Subject } from 'rxjs/Subject';
import { KEY_CODE } from '../../helpers/keys';

export interface UkSpacePatternResult {
    value: string;
    position: number;
}

export interface UkPatternFormatter {
    separator: string;
    separatorReg: RegExp;
    spaceFormat(value: string, splitEvery: number, position: number, rtl: boolean): UkSpacePatternResult;
    getDigitChar(keyCode: number): string;
}

export function mixinPatternFormatter<T extends Constructor<{}>>(base: T): Constructor<UkPatternFormatter> & T {
    return class extends base {

        private _separator: string;
        get separator(): string {
            return this._separator;
        }
        set separator(value: string) {
            this._separator = value;
            this._separatorReg = new RegExp(this._separator, 'g');
        }

        private _separatorReg: RegExp;
        get separatorReg(): RegExp {
            return this._separatorReg;
        }

        getDigitChar(keyCode: number): string {
            let respond = '';
            switch (keyCode) {
              case KEY_CODE.NUMBER_0:
              case KEY_CODE.DIGIT_0:
                respond = '0';
                break;
              case KEY_CODE.NUMBER_1:
              case KEY_CODE.DIGIT_1:
                respond = '1';
                break;
              case KEY_CODE.NUMBER_2:
              case KEY_CODE.DIGIT_2:
                respond = '2';
                break;
              case KEY_CODE.NUMBER_3:
              case KEY_CODE.DIGIT_3:
                respond = '3';
                break;
              case KEY_CODE.NUMBER_4:
              case KEY_CODE.DIGIT_4:
                respond = '4';
                break;
              case KEY_CODE.NUMBER_5:
              case KEY_CODE.DIGIT_5:
                respond = '5';
                break;
              case KEY_CODE.NUMBER_6:
              case KEY_CODE.DIGIT_6:
                respond = '6';
                break;
              case KEY_CODE.NUMBER_7:
              case KEY_CODE.DIGIT_7:
                respond = '7';
                break;
              case KEY_CODE.NUMBER_8:
              case KEY_CODE.DIGIT_8:
                respond = '8';
                break;
              case KEY_CODE.NUMBER_9:
              case KEY_CODE.DIGIT_9:
                respond = '9';
                break;
            }
            return respond;
          }

        spaceFormat(value: string, splitEvery: number, position: number, rtl: boolean = false): UkSpacePatternResult {
            let respond = value;
            if (value.length > splitEvery) {
                let newValue = '';
                if (rtl) {
                    console.log('rtl');
                    let spaceIndex = value.length;
                    while (spaceIndex > splitEvery) {
                        spaceIndex -= splitEvery;
                        newValue = this.separator + value.substring(spaceIndex, spaceIndex + splitEvery) + newValue;
                    }
                    respond = value.substring(0, spaceIndex) + newValue;
                } else {
                    if (value.length > splitEvery) {
                        newValue = value.substring(0, splitEvery);
                    }
                    let spaceIndex = splitEvery;
                    while (spaceIndex < value.length - splitEvery) {
                        spaceIndex += splitEvery;
                        const result = this.spaceLTR(value, spaceIndex - splitEvery, spaceIndex, position);
                        newValue += result.value;
                        position = result.position;
                        console.log('New Position:', position);
                    }
                    if (spaceIndex < value.length) {
                        const result = this.spaceLTR(value, spaceIndex, value.length, position);
                        newValue += result.value;
                        position = result.position;
                    }
                    respond = newValue + (spaceIndex < value.length ? this.separator + value.substring(spaceIndex, value.length) : '');
                }
            }
            return { value: respond, position: position };
        }

        private spaceLTR(value: string, start: number, end: number, position: number): UkSpacePatternResult {
            const newValue = this.separator + value.substring(start, end);
            if (position > end) { position++; }
            return { value: newValue, position: position };
        }

        spaceCaretPosition(val, currentPos) {
            if (currentPos > 0 && val.substring(currentPos - 1, currentPos) === this.separator) {
                currentPos -= 1;
            }
            if (val.substring(0, currentPos).indexOf(this.separator) >= 0) {
                currentPos = currentPos - val.substring(0, currentPos).match(this.separatorReg).length;
            }
            return currentPos;
        }
    };
}
