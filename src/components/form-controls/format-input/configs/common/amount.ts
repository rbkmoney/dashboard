import { isNil } from '@dsh/utils';

import { createNumberMask } from '../../../masks';
import { FormatInputConfig } from '../format-input-config';

export const amountMask = createNumberMask({
    thousandsSeparatorSymbol: ' ',
    allowDecimal: true,
    decimalSymbol: ',',
});

// TODO: need to add both formatters to support numbers with dot(now it formats "2.3" to "23")
// TODO: need to fix bug when after getting first amount form doesn't format it and returns string as is
export const amountConfig: FormatInputConfig<string, number> = {
    mask: amountMask,
    // return major number
    toPublicValue: (v) => {
        if (v) {
            return Number(v.replace(/ /g, '').replace(',', '.'));
        }
        if (isNil(v)) {
            return v;
        }
        return null;
    },
};
