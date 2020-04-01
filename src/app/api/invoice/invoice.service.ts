import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice, InvoiceParams, InvoicesService } from '../../api-codegen/capi/swagger-codegen';
import { genXRequestID } from '../utils';

@Injectable()
export class InvoiceService {
    constructor(private invoicesService: InvoicesService) {}

    getInvoiceByID(invoiceID: string): Observable<Invoice> {
        return this.invoicesService.getInvoiceByID(genXRequestID(), invoiceID);
    }

    createInvoice(invoiceParams: InvoiceParams) {
        return this.invoicesService.createInvoice(genXRequestID(), invoiceParams);
    }
}
