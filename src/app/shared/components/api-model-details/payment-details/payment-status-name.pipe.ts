import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { PaymentSearchResult } from '../../../../api-codegen/capi/swagger-codegen';

@Pipe({
    name: 'paymentStatusName',
})
export class PaymentStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: PaymentSearchResult.StatusEnum): string {
        switch (status) {
            case 'processed':
            case 'captured':
            case 'cancelled':
            case 'refunded':
            case 'failed':
            case 'pending':
                return this.transloco.translate(`paymentStatus.${status}`);
            default:
                return status;
        }
    }
}
