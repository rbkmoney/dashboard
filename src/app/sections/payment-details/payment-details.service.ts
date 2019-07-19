import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import moment from 'moment';

import {
    InlineResponse2001,
    InlineResponse2003,
    Invoice,
    InvoicesService,
    PaymentsService,
    SearchService,
    Shop,
    ShopsService
} from '../../api/capi/swagger-codegen';
import { genXRequestID } from '../../api/gen-x-request-id';

@Injectable()
export class PaymentDetailsService {
    constructor(
        private searchService: SearchService,
        private invoicesService: InvoicesService,
        private shopsService: ShopsService,
        private paymentsService: PaymentsService
    ) {}

    searchPayments = (invoiceID: string, paymentID: string): Observable<InlineResponse2001> =>
        this.searchService.searchPayments(
            genXRequestID(),
            moment().subtract(1, 'year') as any,
            moment() as any,
            1,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            invoiceID,
            paymentID,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        );

    getInvoiceByID = (invoiceID: string): Observable<Invoice> =>
        this.invoicesService.getInvoiceByID(
            genXRequestID(),
            invoiceID
        );

    getShopByID = (shopID: string): Observable<Shop> =>
        this.shopsService.getShopByID(genXRequestID(), shopID);

    searchRefunds = (invoiceID: string, paymentID: string, offset: number): Observable<InlineResponse2003> =>
        this.searchService.searchRefunds(
            genXRequestID(),
            moment().subtract(1, 'year') as any,
            moment() as any,
            3,
            undefined,
            undefined,
            offset,
            invoiceID,
            paymentID,
            undefined,
            undefined,
            undefined,
            undefined
        );
}





