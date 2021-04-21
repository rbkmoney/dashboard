import isEmpty from 'lodash-es/isEmpty';
import isNil from 'lodash-es/isNil';

import { formatNumDot } from './format-num-dot';

export function getAmountNum(amount: string | null): number | null {
    if (isNil(amount) || isEmpty(amount)) {
        return null;
    }

    const amountNum = Number(formatNumDot(amount));
    return isNaN(amountNum) ? null : amountNum;
}
