import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const snilsMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
    guide: false
};

export const snilsValidator = maskToValidator(snilsMask);

export const snilsConfig: FormatInputConfig = {
    mask: snilsMask,
    placeholder: '000-000-000-00'
};
