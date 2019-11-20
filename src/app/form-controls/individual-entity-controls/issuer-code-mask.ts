import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator, createCustomInputWithMask } from '../utils';

export const issuerCodeMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    guide: false
};

export const issuerCodeValidator = maskToValidator(issuerCodeMask);

export const issuerCodeInput = createCustomInputWithMask({
    selector: 'dsh-issuer-code-input',
    mask: issuerCodeMask,
    placeholder: '000-000'
});
