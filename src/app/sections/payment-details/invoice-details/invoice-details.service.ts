import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice } from '../../../api/capi/swagger-codegen';
import { InvoiceService } from '../../../invoice/invoice.service';

@Injectable()
export class InvoiceDetailsService {
    constructor(private invoiceService: InvoiceService) {}

    getInvoiceByID(invoiceID: string): Observable<Invoice> {
        return this.invoiceService.getInvoiceByID(invoiceID);
    }
}
