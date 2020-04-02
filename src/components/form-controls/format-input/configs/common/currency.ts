import { createNumberMask } from '../../../masks';
import { FormatInputConfig } from '../format-input-config';

export const currencyMask = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: ','
});

export const currencyConfig: FormatInputConfig = {
    mask: currencyMask
};
