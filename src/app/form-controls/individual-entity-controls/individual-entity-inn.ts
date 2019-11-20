import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator, createCustomInputWithMask } from '../utils';

export const individualEntityInnMask: TextMaskConfig = {
    mask: new Array(12).fill(/\d/),
    guide: false
};

export const individualEntityInnValidator = maskToValidator(individualEntityInnMask);

export const individualEntityInnInput = createCustomInputWithMask({
    selector: 'dsh-individual-entity-input',
    mask: individualEntityInnMask,
    placeholder: new Array(12).fill('0').join('')
});
