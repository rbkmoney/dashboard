import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { PaymentSearchResult } from '@dsh/api-codegen/capi/swagger-codegen';

@Pipe({
    name: 'paymentStatusName',
})
export class PaymentStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: PaymentSearchResult.StatusEnum): string {
        const statuses = PaymentSearchResult.StatusEnum;
        switch (status) {
            case statuses.Cancelled:
            case statuses.Processed:
            case statuses.Captured:
            case statuses.Refunded:
            case statuses.Failed:
            case statuses.Pending:
                return this.transloco.translate(`paymentStatus.${status}`);
            default:
                return status;
        }
    }
}
