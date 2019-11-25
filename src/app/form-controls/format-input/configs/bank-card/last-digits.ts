import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const lastDigitsMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/],
    guide: false
};

export const lastDigitsValidator = maskToValidator(lastDigitsMask);

export const lastDigitsConfig: FormatInputConfig = {
    mask: lastDigitsMask,
    placeholder: '0000',
    prefix: '**** **** **** '
};
