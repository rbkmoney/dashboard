import { Pipe, PipeTransform } from '@angular/core';

import { PaymentSearchResult } from '@dsh/api-codegen/capi/swagger-codegen';

import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'paymentStatusColor',
})
export class PaymentStatusColorPipe implements PipeTransform {
    transform(status: PaymentSearchResult.StatusEnum): StatusColor {
        const statusEnum = PaymentSearchResult.StatusEnum;
        switch (status) {
            case statusEnum.Captured:
            case statusEnum.Processed:
                return StatusColor.success;
            case statusEnum.Failed:
            case statusEnum.Cancelled:
                return StatusColor.warn;
            case statusEnum.Pending:
                return StatusColor.pending;
            case statusEnum.Refunded:
                return StatusColor.neutral;
        }
    }
}
