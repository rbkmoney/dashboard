import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Invoice } from '../../api-codegen/capi/swagger-codegen';
import { Duration, InvoiceSearchService } from '../search';

@Injectable()
export class InvoiceService {
    constructor(private searchInvoiceService: InvoiceSearchService) {}

    getInvoiceByDuration(duration: Duration, invoiceID: string): Observable<Invoice> {
        return this.searchInvoiceService.getInvoiceByDuration(duration, invoiceID);
    }
}
