import { TextMaskConfig } from 'angular2-text-mask';

import { regExpToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const INDIVIDUAL_OR_LEGAL_ENTITY_INN_MASK: TextMaskConfig = {
    mask: new Array(12).fill(/\d/),
    guide: false,
};

export const individualOrLegalEntityInnValidator = regExpToValidator(/^(\d{10}|\d{12})$/, 'individualOrLegalEntityInn');

export const INDIVIDUAL_OR_LEGAL_ENTITY_INN_CONFIG: FormatInputConfig = {
    mask: INDIVIDUAL_OR_LEGAL_ENTITY_INN_MASK,
    placeholder: new Array(10).fill('0').join(''),
};
