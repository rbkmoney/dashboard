import { TextMaskConfig } from 'angular2-text-mask';

import { createCustomInputWithMask } from '../custom-input-with-mask';

export const lastDigitsMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/],
    guide: false
};

export const lastDigitsInput = createCustomInputWithMask({
    selector: 'dsh-last-digits-input',
    mask: lastDigitsMask,
    placeholder: '0000',
    prefix: '**** **** **** '
});
