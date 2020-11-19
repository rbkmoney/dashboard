import { Pipe, PipeTransform } from '@angular/core';

import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';
import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'invoiceStatusColor',
})
export class InvoiceStatusColorPipe implements PipeTransform {
    transform(status: Invoice.StatusEnum): StatusColor {
        switch (status) {
            case 'paid':
            case 'fulfilled':
                return StatusColor.success;
            case 'unpaid':
                return StatusColor.pending;
            case 'cancelled':
                return StatusColor.warn;
            default:
                return StatusColor.neutral;
        }
    }
}
