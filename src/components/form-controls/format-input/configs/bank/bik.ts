import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

const BIK_LENGTH = 9;

export const BIK_MASK: TextMaskConfig = {
    mask: new Array(BIK_LENGTH).fill(/\d/),
    guide: false,
};

export const bikValidator = maskToValidator(BIK_MASK);

export const BIK_CONFIG: FormatInputConfig = {
    mask: BIK_MASK,
    placeholder: '0'.repeat(BIK_LENGTH),
};
