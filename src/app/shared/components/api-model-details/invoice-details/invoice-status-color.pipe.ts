import { Pipe, PipeTransform } from '@angular/core';

import { Invoice } from '@dsh/api-codegen/anapi/swagger-codegen';

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
                return StatusColor.Success;
            case statuses.Cancelled:
                return StatusColor.Warn;
            case statuses.Unpaid:
                return StatusColor.Pending;
            default:
                return StatusColor.Neutral;
        }
    }
}
