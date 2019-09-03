import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice } from '../../../api-codegen/capi/swagger-codegen';
import { InvoiceSearchService } from '../../../api/search';

@Injectable()
export class InvoiceDetailsService {
    constructor(private invoiceSearchService: InvoiceSearchService) {}

    getInvoiceByID(invoiceID: string): Observable<Invoice> {
        return this.invoiceSearchService.getInvoiceByDuration({ amount: 1, unit: 'y' }, invoiceID);
    }
}
