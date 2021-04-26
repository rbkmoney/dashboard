import isNil from 'lodash-es/isNil';

import { createNumberMask } from '../../../masks';
import { FormatInputConfig } from '../format-input-config';

export const QUANTITY_MASK = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: false,
});

export const QUANTITY_CONFIG: FormatInputConfig<string, number> = {
    mask: QUANTITY_MASK,
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
