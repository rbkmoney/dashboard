import isNil from 'lodash.isnil';

import { createNumberMask } from '../../../masks';
import { FormatInputConfig } from '../format-input-config';

export const quantityMask = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: false,
});

export const quantityConfig: FormatInputConfig<string, number> = {
    mask: quantityMask,
    toPublicValue: (v) => {
        if (v) {
            return Number(v.replace(/ /g, ''));
        }
        if (isNil(v)) {
            return v;
        }
        return null;
    },
};
