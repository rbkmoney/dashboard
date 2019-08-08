import { SearchFormValue } from '../../search-form-value';
import { RefundStatus } from '../../../../../api/capi/swagger-codegen';

export interface RefundSearchFormValue extends SearchFormValue {
    limit: string;
    offset?: number;
    invoiceID?: string;
    paymentID?: string;
    refundID?: string;
    refundStatus?: RefundStatus.StatusEnum;
    excludedShops?: string;
}
