import { createNumberMask } from '../../../masks';
import { FormatInputConfig } from '../format-input-config';

export const quantityMask = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: false
});

export const quantityConfig: FormatInputConfig = {
    mask: quantityMask
};
