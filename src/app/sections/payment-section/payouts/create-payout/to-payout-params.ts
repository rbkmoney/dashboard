import uuid from 'uuid';

import { PayoutParams } from '@dsh/api-codegen/capi/swagger-codegen';

import { toMinor } from '../../../../../utils';

export const toPayoutParams = ({ shopID, payoutToolID, amount }: any, currency: string): PayoutParams => {
    return {
        id: uuid(),
        shopID,
        payoutToolID,
        amount: toMinor(amount),
        currency,
    };
};
