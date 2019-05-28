import { TextMaskConfig } from 'angular2-text-mask';

import { createNumberMask } from './create-number-mask';

export const currencyMask: TextMaskConfig = {
    mask: createNumberMask({
        prefix: '',
        thousandsSeparatorSymbol: ' ',
        allowDecimal: true,
        decimalSymbol: ','
    })
};
