import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const binMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
    guide: false
};

export const binValidator = maskToValidator(binMask);

export const binConfig: FormatInputConfig = {
    mask: binMask,
    placeholder: '0000 00',
    postfix: '** **** ****'
};
