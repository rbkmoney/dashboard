import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator, createCustomInputWithMask } from '../utils';

export const binMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
    guide: false
};

export const binValidator = maskToValidator(binMask);

export const binInput = createCustomInputWithMask({
    selector: 'dsh-bin-input',
    mask: binMask,
    placeholder: '0000 00',
    postfix: '** **** ****'
});
