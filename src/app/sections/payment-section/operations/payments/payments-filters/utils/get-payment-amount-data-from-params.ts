import isNil from 'lodash.isnil';

import { removeDictEmptyFields, toMajor } from '@dsh/utils';

import { PaymentAmountFilterData } from '../additional-filters';
import { PaymentAmountParams } from '../types/payment-amount-params';

export function getPaymentAmountDataFromParams({
    paymentAmountFrom,
    paymentAmountTo,
}: Partial<PaymentAmountParams>): Partial<PaymentAmountFilterData> {
    const amountFromNum = Number(paymentAmountFrom);
    const amountToNum = Number(paymentAmountTo);

    return removeDictEmptyFields({
        paymentAmountFrom: isNil(paymentAmountFrom) || isNaN(amountFromNum) ? null : toMajor(amountFromNum),
        paymentAmountTo: isNil(paymentAmountTo) || isNaN(amountToNum) ? null : toMajor(amountToNum),
    });
}
