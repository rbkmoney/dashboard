import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Replace } from '../../../type-utils';
import { Invoice, InvoiceParams, InvoicesService } from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';

@Injectable()
export class InvoiceService {
    constructor(private invoicesService: InvoicesService) {}

    getInvoiceByID(invoiceID: string): Observable<Invoice> {
        return this.invoicesService.getInvoiceByID(genXRequestID(), invoiceID);
    }

    createInvoice({ dueDate, ...invoiceParams }: Replace<InvoiceParams, { dueDate: string }>) {
        return this.invoicesService.createInvoice(genXRequestID(), {
            ...invoiceParams,
            dueDate: (dueDate as any) as Date,
        });
    }

    createInvoiceAccessToken(invoiceID: string) {
        return this.invoicesService.createInvoiceAccessToken(genXRequestID(), invoiceID);
    }
}
