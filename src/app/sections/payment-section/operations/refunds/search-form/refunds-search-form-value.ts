import { RefundStatus } from '../../../../../api-codegen/capi/swagger-codegen';
import { SearchFormValue } from '../../search-form-value';

export interface RefundsSearchFormValue extends SearchFormValue {
    offset?: number;
    invoiceID?: string;
    paymentID?: string;
    refundID?: string;
    refundStatus?: RefundStatus.StatusEnum;
    shopID?: string;
    shopIDs?: string[];
}
