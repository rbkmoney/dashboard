import { Pipe, PipeTransform } from '@angular/core';

import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';
import { Color } from '../../../../status';

@Pipe({
    name: 'paymentStatusColor'
})
export class PaymentStatusColorPipe implements PipeTransform {
    transform(status: PaymentSearchResult.StatusEnum): Color {
        switch (status) {
            case PaymentSearchResult.StatusEnum.Captured:
            case PaymentSearchResult.StatusEnum.Processed:
            case PaymentSearchResult.StatusEnum.Refunded:
                return Color.success;
            case PaymentSearchResult.StatusEnum.Failed:
            case PaymentSearchResult.StatusEnum.Cancelled:
                return Color.warn;
            case PaymentSearchResult.StatusEnum.Pending:
                return Color.pending;
        }
    }
}
