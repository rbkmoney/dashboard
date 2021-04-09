import { isNumber } from '@dsh/app/shared/utils';
import { toMinor } from '@dsh/utils';

import { PaymentAmountFilterData } from '../additional-filters';
import { PaymentAmountParams } from '../types/payment-amount-params';

export function formatPaymentAmountDataToParams({
    paymentAmountFrom,
    paymentAmountTo,
}: Partial<PaymentAmountFilterData>): PaymentAmountParams {
    return {
        paymentAmountFrom:
            isNumber(paymentAmountFrom) && !isNaN(paymentAmountFrom) ? String(toMinor(paymentAmountFrom)) : null,
        paymentAmountTo: isNumber(paymentAmountTo) && !isNaN(paymentAmountTo) ? String(toMinor(paymentAmountTo)) : null,
    };
}
