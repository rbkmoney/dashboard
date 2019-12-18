import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const bikMask: TextMaskConfig = {
    mask: new Array(9).fill(/\d/),
    guide: false
};

export const bikValidator = maskToValidator(bikMask);

export const bikConfig: FormatInputConfig = {
    mask: bikMask,
    placeholder: new Array(9).fill('0').join('')
};
