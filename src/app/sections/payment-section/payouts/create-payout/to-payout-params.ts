import uuid from 'uuid';

import { toMinor } from '../../../../../utils';
import { PayoutParams } from '../../../../api-codegen/capi/swagger-codegen';

export const toPayoutParams = ({ shopID, payoutToolID, amount }: any, currency: string): PayoutParams => {
    return {
        id: uuid(),
        shopID,
        payoutToolID,
        amount: toMinor(amount),
        currency,
    };
};
