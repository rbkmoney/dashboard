import { isNumber } from '@dsh/app/shared/utils';
import { toMinor } from '@dsh/utils';

import { DepositAmountFilterData } from '../additional-filters/types/deposit-amount-filter-data';
import { DepositAmountParams } from '../types/deposit-amount-params';

export function formatDepositAmountDataToParams({
    depositAmountFrom,
    depositAmountTo,
}: Partial<DepositAmountFilterData>): DepositAmountParams {
    return {
        depositAmountFrom:
            isNumber(depositAmountFrom) && !isNaN(depositAmountFrom) ? String(toMinor(depositAmountFrom)) : null,
        depositAmountTo: isNumber(depositAmountTo) && !isNaN(depositAmountTo) ? String(toMinor(depositAmountTo)) : null,
    };
}
