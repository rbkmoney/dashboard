import { Pipe, PipeTransform } from '@angular/core';

import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';
import { Color } from '../../../../status';

@Pipe({
    name: 'paymentStatusColor'
})
export class PaymentStatusColorPipe implements PipeTransform {
    transform(status: PaymentSearchResult.StatusEnum): Color {
        const statusEnum = PaymentSearchResult.StatusEnum;
        switch (status) {
            case statusEnum.Captured:
            case statusEnum.Processed:
            case statusEnum.Refunded:
                return Color.success;
            case statusEnum.Failed:
            case statusEnum.Cancelled:
                return Color.warn;
            case statusEnum.Pending:
                return Color.pending;
        }
    }
}
