import isNil from 'lodash.isnil';

import { createNumberMask } from '../../../masks';
import { FormatInputConfig } from '../format-input-config';

export const currencyMask = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: ','
});

export const currencyConfig: FormatInputConfig<string, number> = {
    mask: currencyMask,
    // return minor number
    toPublicValue: v => {
        if (v) {
            return Number(v.replace(/ /g, '').replace(',', ''));
        }
        if (isNil(v)) {
            return v;
        }
        return null;
    }
};
