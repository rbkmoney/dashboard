import { TextMaskConfig } from 'angular2-text-mask';

import { maskToValidator, createCustomInputWithMask } from '../utils';

export const seriesNumberMask: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    guide: false
};

export const seriesNumberValidator = maskToValidator(seriesNumberMask);

export const seriesNumberInput = createCustomInputWithMask({
    selector: 'dsh-series-number-input',
    mask: seriesNumberMask,
    placeholder: '0000 000000'
});
