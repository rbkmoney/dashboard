import { SearchFormValue } from '../../search-form-value';
import { RefundStatus } from '../../../../../api-codegen/capi/swagger-codegen';

export interface RefundsSearchFormValue extends SearchFormValue {
    offset?: number;
    invoiceID?: string;
    paymentID?: string;
    refundID?: string;
    refundStatus?: RefundStatus.StatusEnum;
}
