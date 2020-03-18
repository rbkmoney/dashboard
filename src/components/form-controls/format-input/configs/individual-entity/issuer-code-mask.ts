import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const issuerCodeMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    guide: false
};

export const issuerCodeValidator = maskToValidator(issuerCodeMask);

export const issuerCodeConfig: FormatInputConfig = {
    mask: issuerCodeMask,
    placeholder: '000-000'
};
