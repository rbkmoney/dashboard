import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    InlineResponse2003,
    Invoice,
    InvoicesService,
    PaymentSearchResult,
    Shop,
    ShopsService
} from '../../api/capi/swagger-codegen';
import { genXRequestID } from '../../api/gen-x-request-id';
import { RefundSearchService } from '../../search/refund-search.service';
import { PaymentSearchService } from '../../search/payment-search.service';

@Injectable()
export class PaymentDetailsService {
    constructor(
        private refundSearchService: RefundSearchService,
        private paymentSearchService: PaymentSearchService,
        private invoicesService: InvoicesService,
        private shopsService: ShopsService
    ) {}

    getPayment = (invoiceID: string, paymentID: string): Observable<PaymentSearchResult> =>
        this.paymentSearchService.getPayment(invoiceID, paymentID);

    getInvoiceByID = (invoiceID: string): Observable<Invoice> =>
        this.invoicesService.getInvoiceByID(genXRequestID(), invoiceID);

    getShopByID = (shopID: string): Observable<Shop> => this.shopsService.getShopByID(genXRequestID(), shopID);

    getRefunds = (invoiceID: string, paymentID: string, offset: number): Observable<InlineResponse2003> =>
        this.refundSearchService.getRefunds(invoiceID, paymentID, offset);
}
