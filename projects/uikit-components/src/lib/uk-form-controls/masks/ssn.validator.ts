import { MASK_SECTION_VALIDATOR } from './mask.creator.validator';

export const UK_SSN_SEPERATOR = '-';
export const UK_SSN_MASK_SECTIONS = [3, 2, 4];
export const UK_SSN_VALIDATOR = MASK_SECTION_VALIDATOR(UK_SSN_MASK_SECTIONS, UK_SSN_SEPERATOR, true);
