import isNil from 'lodash.isnil';

import { createNumberMask } from '../../../masks';
import { FormatInputConfig } from '../format-input-config';

export const amountMask = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: ','
});

export const amountConfig: FormatInputConfig<string, number> = {
    mask: amountMask,
    // return major number
    toPublicValue: v => {
        if (v) {
            return Number(v.replace(/ /g, '').replace(',', '.'));
        }
        if (isNil(v)) {
            return v;
        }
        return null;
    }
};
