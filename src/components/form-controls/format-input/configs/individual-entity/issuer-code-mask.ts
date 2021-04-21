import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const ISSUER_CODE_MASK: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
    guide: false,
};

export const issuerCodeValidator = maskToValidator(ISSUER_CODE_MASK);

export const ISSUER_CODE_CONFIG: FormatInputConfig = {
    mask: ISSUER_CODE_MASK,
    placeholder: '000-000',
};
