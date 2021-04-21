import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const SERIES_NUMBER_MASK: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    guide: false,
};

export const seriesNumberValidator = maskToValidator(SERIES_NUMBER_MASK);

export const SERIES_NUMBER_CONFIG: FormatInputConfig = {
    mask: SERIES_NUMBER_MASK,
    placeholder: '0000 000000',
};
