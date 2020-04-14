import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

const BIK_LENGTH = 9;

export const bikMask: TextMaskConfig = {
    mask: new Array(BIK_LENGTH).fill(/\d/),
    guide: false
};

export const bikValidator = maskToValidator(bikMask);

export const bikConfig: FormatInputConfig = {
    mask: bikMask,
    placeholder: '0'.repeat(BIK_LENGTH)
};
