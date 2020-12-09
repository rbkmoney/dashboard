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
            return { color: Color.success, status: 'processed' };
        case statusEnum.Failed:
            return { color: Color.warn, status: 'failed' };
        case statusEnum.Refunded:
            return { color: Color.neutral, status: 'refunded' };
        case statusEnum.Cancelled:
            return { color: Color.warn, status: 'cancelled' };
        case statusEnum.Captured:
            return { color: Color.success, status: 'captured' };
        case statusEnum.Pending:
            return { color: Color.pending, status: 'pending' };
    }
};
