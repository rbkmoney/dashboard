import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

const LEGAL_ENTITY_INN_LENGTH = 10;

export const legalEntityInnMask: TextMaskConfig = {
    mask: new Array(LEGAL_ENTITY_INN_LENGTH).fill(/\d/),
    guide: false
};

export const legalEntityInnValidator = maskToValidator(legalEntityInnMask);

export const legalEntityInnConfig: FormatInputConfig = {
    mask: legalEntityInnMask,
    placeholder: '0'.repeat(LEGAL_ENTITY_INN_LENGTH)
};
