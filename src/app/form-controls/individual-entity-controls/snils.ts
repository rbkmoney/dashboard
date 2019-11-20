import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator, createCustomInputWithMask } from '../utils';

export const snilsMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    guide: false
};

export const snilsValidator = maskToValidator(snilsMask);

export const snilsInput = createCustomInputWithMask({
    selector: 'dsh-snils-input',
    mask: snilsMask,
    placeholder: '000-000-000-00'
});
