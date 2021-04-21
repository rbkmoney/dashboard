import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const LAST_DIGITS_MASK: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/],
    guide: false,
};

export const lastDigitsValidator = maskToValidator(LAST_DIGITS_MASK);

export const LAST_DIGITS_CONFIG: FormatInputConfig = {
    mask: LAST_DIGITS_MASK,
    placeholder: '0000',
    prefix: '**** **** **** ',
};
