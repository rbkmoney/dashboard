import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice, InvoicesService } from '../../../api/capi/swagger-codegen';
import { genXRequestID } from '../../../api/gen-x-request-id';

@Injectable()
export class InvoiceDetailsService {
    constructor(private invoicesService: InvoicesService) {}

    getInvoiceByID = (invoiceID: string): Observable<Invoice> =>
        this.invoicesService.getInvoiceByID(genXRequestID(), invoiceID);
}
