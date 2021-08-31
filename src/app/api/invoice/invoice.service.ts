import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';
import { Overwrite } from 'utility-types';

import { Invoice, InvoiceParams, Reason } from '@dsh/api-codegen/capi';
import { InvoicesService } from '@dsh/api-codegen/capi/invoices.service';

@Injectable()
export class InvoiceService {
    constructor(private invoicesService: InvoicesService, private idGenerator: IdGeneratorService) {}

    getInvoiceByID(invoiceID: string): Observable<Invoice> {
        return this.invoicesService.getInvoiceByID(this.idGenerator.shortUuid(), invoiceID);
    }

    createInvoice({ dueDate, ...invoiceParams }: Overwrite<InvoiceParams, { dueDate: string }>) {
        return this.invoicesService.createInvoice(this.idGenerator.shortUuid(), {
            ...invoiceParams,
            dueDate: dueDate as any as Date,
        });
    }

    createInvoiceAccessToken(invoiceID: string) {
        return this.invoicesService.createInvoiceAccessToken(this.idGenerator.shortUuid(), invoiceID);
    }

    getInvoicePaymentMethods(invoiceID: string) {
        return this.invoicesService.getInvoicePaymentMethods(this.idGenerator.shortUuid(), invoiceID);
    }

    fulfillInvoice(invoiceID: string, reason: Reason) {
        return this.invoicesService.fulfillInvoice(this.idGenerator.shortUuid(), invoiceID, reason);
    }

    rescindInvoice(invoiceID: string, reason: Reason) {
        return this.invoicesService.rescindInvoice(this.idGenerator.shortUuid(), invoiceID, reason);
    }
}
