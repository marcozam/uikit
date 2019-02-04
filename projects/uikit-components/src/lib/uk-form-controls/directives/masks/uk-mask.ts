import { Input, HostListener } from '@angular/core';

import { UkFieldError } from '../../../uk-common/typings';
import {
    IS_DIGIT_KEY,
    IS_SYSTEM_KEY,
    KEY_CODE,
    IS_DELETE_KEY,
    GET_NUMBER_CHAR
} from '../../../helpers/keys';
import { UkBaseInput } from '../uk-base-input';

export interface UkMaskInputValue {
    value: string;
    position: number;
}

// TODO: What happens with null values?
export abstract class UkMask extends UkBaseInput {

    private _maskSections: number[];
    private _separator: string;
    private separatorReg: RegExp;

    protected leftToRight = true;
    protected mask: RegExp;
    protected maxLength: number;

    protected validationError: UkFieldError;

    get maskSections() { return this._maskSections; }
    set maskSections(value: number[]) {
        this._maskSections = value;
        this.setMaxLength();
        this.createRegExp();
    }

    @Input() validator: RegExp;

    @Input()
    get separator() { return this._separator; }
    set separator(value: string) {
        this._separator = value;
        this.separatorReg = new RegExp(this._separator, 'g');
    }

    @HostListener('keyup', ['$event'])
    onKeyUp($event) {
        const input = <HTMLInputElement>$event.target;
        const value = input.value;
        if (IS_DELETE_KEY($event.keyCode)) {
            const cPos = input.selectionStart;
            const _cTxt = this.cleanText(value, cPos, cPos, this.separatorReg);
            this.setFormatedText(_cTxt.value, _cTxt.position, input);
        }
    }

    @HostListener('keydown', ['$event'])
    onKeyDown($event) {
        const input = <HTMLInputElement>$event.target;
        let value = input.value;
        const key = $event.keyCode;
        if (!this.isSystemKey($event)) { $event.preventDefault(); }

        if (this.isValidKey($event)) {
            let cPos = input.selectionStart;

            const _cTxt = this.cleanText(value, cPos, input.selectionEnd, this.separatorReg);
            value = _cTxt.value;
            cPos = _cTxt.position;

            if (value.length < this.maxLength) {
                const before = value.substring(0, cPos);
                const after = value.substring(cPos);

                const newValue = this.proccessKeyDown(before, after, key);
                this.setFormatedText(newValue, cPos + 1, input, true);
            }
        }
    }

    protected createRegExp(){
        const _mask = [];
        this.maskSections.forEach((part) => {
            const _partExp = `(\\d{${part}})`;
            _mask.push(_partExp);
        });
        this.mask = new RegExp(`^${_mask.join('')}.*`);
    }

    protected setPlaceHolder() {
        const pad = new Array(this.maxLength + 1).join('0');
        this.placeholder = this.format(pad).replace(new RegExp('0','g'), '#');
    }

    private setMaxLength() {
        const sepChars = this.separator.length * this.maskSections.length;
        this.maxLength = this.maskSections.reduce((p, c) => p + c) + sepChars;
    }

    private setFormatedText(value: string, position: number, input: HTMLInputElement, end: boolean = false) {
        const newValues = this.spaceFormat(value);
        let newPos = position;
        this.value = newValues.value;
        newPos += newValues.position;
        input.selectionStart = newPos;
        if (end) { input.selectionEnd = newPos; }
    }

    proccessKeyDown(before: string, after: string, key: KEY_CODE) { 
        return before + GET_NUMBER_CHAR(key) + after;
    }

    cleanText(value: string, cPos: number, cEnd: number, separator: RegExp): UkMaskInputValue {
        let newValue = value;
        // Remove Selected text
        if (cPos !== cEnd) { newValue = value.substring(0, cPos) + value.substring(cEnd) };
        cPos = this.spaceCaretPosition(value, cPos, separator);
        return {
            position: cPos,
            value: newValue.replace(separator, '') 
        };
    }

    // Add spaces
    spaceFormat(value: string): UkMaskInputValue {
        let cIdx = 0;
        let position = 0;
        const newValue = [];
        this.maskSections.forEach(sec => {
            const secMax = cIdx + sec;
            if (value.length > secMax) { position++; }
            if (cIdx < value.length) {
                newValue.push(value.substring(cIdx, secMax));
            }
            cIdx = secMax;
        });
        return {
            value: newValue.join(this.separator),
            position
        };
    }

    // Get the right caret position without the spaces
    spaceCaretPosition(value: string, cPos: number, sepReg: RegExp) {
        if (cPos > 0) {
            const _matchs = value.substring(0, cPos).match(sepReg);
            if (_matchs) { cPos -= _matchs.length; }
        }
        return cPos;
    }

    checkErrors() {
        (this.validationError && this.isFormatInvalid && this.value) ?
                this.setError(this.validationError.name, this.validationError) :
                this.removeError(this.validationError.name);
        super.checkErrors();
    }

    get valueString(): string { return <string>this.value; }
    get isFormatInvalid() { return this.validator ? !this.validator.test(this.valueString) : false; }
    format(value: string) { return this.cleanText(value, 0, 0, this.separatorReg).value; }
    isValidKey($event: KeyboardEvent) { return IS_DIGIT_KEY($event.keyCode); }
    isSystemKey($event: KeyboardEvent) { return IS_SYSTEM_KEY($event.keyCode, $event); }
}
