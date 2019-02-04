export * from './keys.enums';
import { KEY_CODE } from './keys.enums';

// Returns true if key is betwwen 0-9
export function IS_DIGIT_KEY(keyCode: number) {
  return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105));
}

export function IS_NAVIGATION_KEY(keyCode: number) {
  return (keyCode >= 37 && keyCode <= 40) /*Arrow Keys*/ ||
    keyCode === KEY_CODE.TAB || keyCode === KEY_CODE.HOME || keyCode === KEY_CODE.END;
}

export function IS_SYSTEM_KEY(keyCode: number, event: KeyboardEvent) {
  return IS_NAVIGATION_KEY(keyCode) || IS_SHORTCUT_KEY(keyCode, event) || IS_DELETE_KEY(keyCode);
}

export function IS_DELETE_KEY(keyCode: number) {
  return keyCode === KEY_CODE.BACKSPACE || keyCode === KEY_CODE.DELETE;
}

export function IS_SHORTCUT_KEY(keyCode: number, event: KeyboardEvent) {
  return ( event.ctrlKey &&
      (
        keyCode === KEY_CODE.LETTER_A ||
        keyCode === KEY_CODE.LETTER_C ||
        keyCode === KEY_CODE.LETTER_X ||
        keyCode === KEY_CODE.LETTER_Y ||
        keyCode === KEY_CODE.LETTER_Z
      )
    ) ||
    ( event.shiftKey &&
      (
        keyCode === KEY_CODE.TAB ||
        keyCode === KEY_CODE.HOME ||
        keyCode === KEY_CODE.END
      )
    );
}

export function GET_NUMBER_CHAR(keyCode: number) {
  switch (keyCode) {
    case KEY_CODE.NUMBER_0:
    case KEY_CODE.DIGIT_0:
      return '0';
    case KEY_CODE.NUMBER_1:
    case KEY_CODE.DIGIT_1:
      return '1';
    case KEY_CODE.NUMBER_2:
    case KEY_CODE.DIGIT_2:
      return '2';
    case KEY_CODE.NUMBER_3:
    case KEY_CODE.DIGIT_3:
      return '3';
    case KEY_CODE.NUMBER_4:
    case KEY_CODE.DIGIT_4:
      return '4';
    case KEY_CODE.NUMBER_5:
    case KEY_CODE.DIGIT_5:
      return '5';
    case KEY_CODE.NUMBER_6:
    case KEY_CODE.DIGIT_6:
      return '6';
    case KEY_CODE.NUMBER_7:
    case KEY_CODE.DIGIT_7:
      return '7';
    case KEY_CODE.NUMBER_8:
    case KEY_CODE.DIGIT_8:
      return '8';
    case KEY_CODE.NUMBER_9:
    case KEY_CODE.DIGIT_9:
      return '9';
    default:
      return '';
  }
}