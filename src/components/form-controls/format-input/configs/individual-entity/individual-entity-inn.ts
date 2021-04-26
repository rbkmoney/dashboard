import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

const INDIVIDUAL_ENTITY_INN_LENGTH = 12;

export const INDIVIDUAL_ENTITY_INN_MASK: TextMaskConfig = {
    mask: new Array(INDIVIDUAL_ENTITY_INN_LENGTH).fill(/\d/),
    guide: false,
};

export const individualEntityInnValidator = maskToValidator(INDIVIDUAL_ENTITY_INN_MASK);

export const INDIVIDUAL_ENTITY_INN_CONFIG: FormatInputConfig = {
    mask: INDIVIDUAL_ENTITY_INN_MASK,
    placeholder: '0'.repeat(INDIVIDUAL_ENTITY_INN_LENGTH),
};
