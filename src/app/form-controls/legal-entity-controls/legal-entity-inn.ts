import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator, createCustomInputWithMask } from '../utils';

export const legalEntityInnMask: TextMaskConfig = {
    mask: new Array(10).fill(/\d/),
    guide: false
};

export const legalEntityInnValidator = maskToValidator(legalEntityInnMask);

export const legalEntityInnInput = createCustomInputWithMask({
    selector: 'dsh-legal-entity-inn-input',
    mask: legalEntityInnMask,
    placeholder: new Array(10).fill('0').join('')
});
