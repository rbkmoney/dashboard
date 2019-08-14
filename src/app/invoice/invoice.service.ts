import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice, InvoicesService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api';

@Injectable()
export class InvoiceService {
    constructor(private invoicesService: InvoicesService) {}

    getInvoiceByID(invoiceID: string): Observable<Invoice> {
        return this.invoicesService.getInvoiceByID(genXRequestID(), invoiceID);
    }
}
