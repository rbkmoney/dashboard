import { Pipe, PipeTransform } from '@angular/core';

import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';
import { StatusColor } from '../../../../theme-manager';

@Pipe({
    name: 'invoiceStatusColor',
})
export class InvoiceStatusColorPipe implements PipeTransform {
    transform(status: Invoice.StatusEnum): StatusColor {
        const statusEnum = Invoice.StatusEnum;
        switch (status) {
            case statusEnum.Paid:
            case statusEnum.Fulfilled:
                return StatusColor.success;
            case statusEnum.Cancelled:
                return StatusColor.warn;
            case statusEnum.Unpaid:
                return StatusColor.pending;
        }
    }
}
