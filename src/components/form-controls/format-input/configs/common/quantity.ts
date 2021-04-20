import { isNil } from '@dsh/utils';

import { createNumberMask } from '../../../masks';
import { FormatInputConfig } from '../format-input-config';

export const quantityMask = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: false,
});

export const quantityConfig: FormatInputConfig = {
    mask: quantityMask,
    toPublicValue: (v) => {
        if (v) {
            return Number(v.replace(/ /g, '')).toString();
        }
        if (isNil(v)) {
            return v;
        }
        return null;
    },
};
