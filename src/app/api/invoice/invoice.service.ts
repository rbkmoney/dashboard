import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice, InvoiceParams, Reason } from '@dsh/api-codegen/capi';
import { InvoicesService } from '@dsh/api-codegen/capi/invoices.service';

import { Replace } from '../../../type-utils';
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
            dueDate: dueDate as any as Date,
        });
    }

    createInvoiceAccessToken(invoiceID: string) {
        return this.invoicesService.createInvoiceAccessToken(genXRequestID(), invoiceID);
    }

    getInvoicePaymentMethods(invoiceID: string) {
        return this.invoicesService.getInvoicePaymentMethods(genXRequestID(), invoiceID);
    }

    fulfillInvoice(invoiceID: string, reason: Reason) {
        return this.invoicesService.fulfillInvoice(genXRequestID(), invoiceID, reason);
    }

    rescindInvoice(invoiceID: string, reason: Reason) {
        return this.invoicesService.rescindInvoice(genXRequestID(), invoiceID, reason);
    }
}
