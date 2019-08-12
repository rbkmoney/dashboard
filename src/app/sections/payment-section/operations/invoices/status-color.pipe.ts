import { Pipe, PipeTransform } from '@angular/core';

import { InvoiceStatus } from '../../../../api/capi/swagger-codegen';
import { Color } from '../../../../status';

@Pipe({
    name: 'invoiceStatusColor'
})
export class InvoiceStatusColorPipe implements PipeTransform {
    transform(status: InvoiceStatus.StatusEnum): Color {
        const statusEnum = InvoiceStatus.StatusEnum;
        switch (status) {
            case statusEnum.Paid:
            case statusEnum.Fulfilled:
                return Color.success;
            case statusEnum.Cancelled:
                return Color.warn;
            case statusEnum.Unpaid:
                return Color.pending;
        }
    }
}
