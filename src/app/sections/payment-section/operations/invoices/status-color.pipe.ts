import { Pipe, PipeTransform } from '@angular/core';

import { StatusColor } from '../../../../theme-manager';
import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';

@Pipe({
    name: 'invoiceStatusColor'
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
