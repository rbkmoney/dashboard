import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const SNILS_MASK: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    guide: false,
};

export const snilsValidator = maskToValidator(SNILS_MASK);

export const SNILS_CONFIG: FormatInputConfig = {
    mask: SNILS_MASK,
    placeholder: '000-000-000-00',
};
