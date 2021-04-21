import isNil from 'lodash-es/isNil';

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
        depositAmountFrom: isNil(depositAmountFrom) || isNaN(amountFromNum) ? null : toMajor(amountFromNum),
        depositAmountTo: isNil(depositAmountTo) || isNaN(amountToNum) ? null : toMajor(amountToNum),
    });
}
