import { Pipe, PipeTransform } from '@angular/core';

import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';
import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'invoiceStatusColor',
})
export class InvoiceStatusColorPipe implements PipeTransform {
    transform(status: Invoice.StatusEnum): StatusColor {
        const statuses = Invoice.StatusEnum;
        switch (status) {
            case statuses.Paid:
            case statuses.Fulfilled:
                return StatusColor.success;
            case statuses.Cancelled:
                return StatusColor.warn;
            case statuses.Unpaid:
                return StatusColor.pending;
            default:
                return StatusColor.neutral;
        }
    }
}
