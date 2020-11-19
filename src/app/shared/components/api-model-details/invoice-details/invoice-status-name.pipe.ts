import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';

@Pipe({
    name: 'invoiceStatusName',
})
export class InvoiceStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: Invoice.StatusEnum): string {
        switch (status) {
            case 'unpaid':
            case 'cancelled':
            case 'paid':
            case 'fulfilled':
                return this.transloco.translate(`invoiceStatus.${status}`);
            default:
                return status;
        }
    }
}
