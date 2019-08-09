import { Moment } from 'moment';

import { RefundStatus } from '../api/capi/swagger-codegen';

export interface RefundSearchParams {
    fromTime: Moment;
    toTime: Moment;
    limit: number;
    shopID?: string;
    offset?: number;
    invoiceID?: string;
    paymentID?: string;
    refundID?: string;
    refundStatus?: RefundStatus.StatusEnum;
    excludedShops?: string[];
    continuationToken?: string;
}
