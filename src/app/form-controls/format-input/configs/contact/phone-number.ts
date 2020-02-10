import { TextMaskConfig } from 'angular2-text-mask';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { ValidatorFn } from '@angular/forms';

import { FormatInputConfig } from '../format-input-config';

const DIGIT_REG_EXP = /\d/;
const PREFIX = '+7 ';

const parsePhoneNumber = (text: string) => {
    return parsePhoneNumberFromString(text, 'RU');
};

const formatPhoneNumber = (text: string) => {
    const parsed = parsePhoneNumber(text);
    if (!parsed) {
        return text;
    }
    if (text[0] === '+') {
        return parsed.formatInternational();
    }
    return parsed.formatNational();
};

export const phoneNumberMask: TextMaskConfig = {
    mask: rawValue => {
        const value = PREFIX + rawValue;
        const phoneNumber = formatPhoneNumber(value);
        console.log(value);
        const phoneNumberParts: string[] = phoneNumber.split('');
        const mask: Array<RegExp | string> = [];
        for (const num of phoneNumberParts) {
            if (num === '+') {
                mask.push(/\+/);
            } else if (DIGIT_REG_EXP.test(num)) {
                mask.push(DIGIT_REG_EXP);
            } else {
                mask.push(num);
            }
        }
        mask.push(DIGIT_REG_EXP);
        return mask.slice(PREFIX.length);
    },
    guide: false
};

export const phoneNumberValidator: ValidatorFn = control => {
    if (control.value) {
        const phoneNumber = parsePhoneNumber(control.value);
        if (!phoneNumber || !phoneNumber.isValid()) {
            return { invalidPhoneNumber: control.value };
        }
    }
    return null;
};

export const phoneNumberConfig: FormatInputConfig = {
    mask: phoneNumberMask,
    prefix: PREFIX,
    placeholder: '*** *** ** **'
};
