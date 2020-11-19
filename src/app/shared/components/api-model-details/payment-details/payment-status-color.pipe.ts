import { Pipe, PipeTransform } from '@angular/core';

import { PaymentSearchResult } from '../../../../api-codegen/capi/swagger-codegen';
import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'paymentStatusColor',
})
export class PaymentStatusColorPipe implements PipeTransform {
    transform(status: PaymentSearchResult.StatusEnum): StatusColor {
        const statuses = PaymentSearchResult.StatusEnum;
        switch (status) {
            case statuses.Processed:
            case statuses.Captured:
                return StatusColor.success;
            case statuses.Cancelled:
            case statuses.Failed:
                return StatusColor.warn;
            case statuses.Pending:
                return StatusColor.pending;
            case statuses.Refunded:
            default:
                return StatusColor.neutral;
        }
    }
}
