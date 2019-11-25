import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const individualEntityInnMask: TextMaskConfig = {
    mask: new Array(12).fill(/\d/),
    guide: false
};

export const individualEntityInnValidator = maskToValidator(individualEntityInnMask);

export const individualEntityInnConfig: FormatInputConfig = {
    mask: individualEntityInnMask,
    placeholder: new Array(12).fill('0').join('')
};
