import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const seriesNumberMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    guide: false
};

export const seriesNumberValidator = maskToValidator(seriesNumberMask);

export const seriesNumberConfig: FormatInputConfig = {
    mask: seriesNumberMask,
    placeholder: '0000 000000'
};
