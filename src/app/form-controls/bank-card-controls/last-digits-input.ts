import { TextMaskConfig } from 'angular2-text-mask';

import { createCustomInputWithMask, maskToValidator } from '../utils';

export const lastDigitsMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/],
    guide: false
};

export const lastDigitsValidator = maskToValidator(lastDigitsMask);

export const lastDigitsInput = createCustomInputWithMask({
    selector: 'dsh-last-digits-input',
    mask: lastDigitsMask,
    placeholder: '0000',
    prefix: '**** **** **** '
});
