import { TextMaskConfig } from 'angular2-text-mask';

import { FormatInputConfig } from '../format-input-config';
import { maskToValidator } from '../../../utils';

export const legalEntityInnMask: TextMaskConfig = {
    mask: new Array(10).fill(/\d/),
    guide: false
};

export const legalEntityInnValidator = maskToValidator(legalEntityInnMask);

export const legalEntityInnConfig: FormatInputConfig = {
    mask: legalEntityInnMask,
    placeholder: new Array(10).fill('0').join('')
};
