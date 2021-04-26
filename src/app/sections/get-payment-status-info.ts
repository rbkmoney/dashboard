import { PaymentStatus } from '@dsh/api-codegen/capi/swagger-codegen';

import { StatusColor as Color } from '../theme-manager';

export interface PaymentStatusInfo {
    color: Color;
    status: string;
}

export const getPaymentStatusInfo = (status: PaymentStatus.StatusEnum): PaymentStatusInfo => {
    const statusEnum = PaymentStatus.StatusEnum;
    switch (status) {
        case statusEnum.Processed:
            return { color: Color.Success, status: 'processed' };
        case statusEnum.Failed:
            return { color: Color.Warn, status: 'failed' };
        case statusEnum.Refunded:
            return { color: Color.Neutral, status: 'refunded' };
        case statusEnum.Cancelled:
            return { color: Color.Warn, status: 'cancelled' };
        case statusEnum.Captured:
            return { color: Color.Success, status: 'captured' };
        case statusEnum.Pending:
            return { color: Color.Pending, status: 'pending' };
    }
};
