import { TextMaskConfig } from 'angular2-text-mask';

import { regExpToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

const BIN_LENGTH = 6;

export const binMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
    guide: false
};

export const binValidator = regExpToValidator(new RegExp(`^\\d{${BIN_LENGTH}}$`));

export const binConfig: FormatInputConfig = {
    mask: binMask,
    placeholder: '0000 00',
    postfix: '** **** ****',
    getValue: (v: string) => (v ? v.replace(' ', '') : '')
};
