import { removeDictEmptyFields, toMajor } from '@dsh/utils';

import { DepositAmountFilterData } from '../additional-filters/types/deposit-amount-filter-data';
import { DepositAmountParams } from '../types/deposit-amount-params';

export function getDepositAmountDataFromParams({
    depositAmountFrom,
    depositAmountTo,
}: Partial<DepositAmountParams>): Partial<DepositAmountFilterData> {
    const amountFromNum = Number(depositAmountFrom);
    const amountToNum = Number(depositAmountTo);

    return removeDictEmptyFields({
        depositAmountFrom:
            depositAmountFrom === null || depositAmountFrom === undefined || isNaN(amountFromNum)
                ? null
                : toMajor(amountFromNum),
        depositAmountTo:
            depositAmountTo === null || depositAmountTo === undefined || isNaN(amountToNum)
                ? null
                : toMajor(amountToNum),
    });
}
