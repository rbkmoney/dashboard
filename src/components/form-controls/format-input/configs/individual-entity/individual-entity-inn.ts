import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

const INDIVIDUAL_ENTITY_INN_LENGTH = 12;

export const individualEntityInnMask: TextMaskConfig = {
    mask: new Array(INDIVIDUAL_ENTITY_INN_LENGTH).fill(/\d/),
    guide: false,
};

export const individualEntityInnValidator = maskToValidator(individualEntityInnMask);

export const individualEntityInnConfig: FormatInputConfig = {
    mask: individualEntityInnMask,
    placeholder: '0'.repeat(INDIVIDUAL_ENTITY_INN_LENGTH),
};
