import { createNumberMask } from './create-number-mask';

export const currencyMask = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: ','
});
