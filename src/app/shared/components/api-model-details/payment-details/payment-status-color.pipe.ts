import { Pipe, PipeTransform } from '@angular/core';

import { PaymentSearchResult } from '../../../../api-codegen/capi/swagger-codegen';
import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'paymentStatusColor',
})
export class PaymentStatusColorPipe implements PipeTransform {
    transform(status: PaymentSearchResult.StatusEnum): StatusColor {
        switch (status) {
            case 'processed':
            case 'captured':
                return StatusColor.success;
            case 'failed':
            case 'cancelled':
                return StatusColor.warn;
            case 'pending':
                return StatusColor.pending;
            case 'refunded':
            default:
                return StatusColor.neutral;
        }
    }
}
