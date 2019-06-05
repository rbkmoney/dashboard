import { createNumberMask } from './create-number-mask';

export const currencyMask = createNumberMask({
    prefix: '',
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: ','
});
