import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { Invoice } from '../../../../api-codegen/anapi/swagger-codegen';

@Pipe({
    name: 'invoiceStatusName',
})
export class InvoiceStatusNamePipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(status: Invoice.StatusEnum): string {
        const statuses = Invoice.StatusEnum;
        switch (status) {
            case statuses.Cancelled:
            case statuses.Unpaid:
            case statuses.Paid:
            case statuses.Fulfilled:
                return this.transloco.translate(`invoiceStatus.${status}`);
            default:
                return status;
        }
    }
}
