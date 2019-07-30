import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { InvoicesService, PaymentSearchResult } from '../../api/capi/swagger-codegen';
import { RefundSearchService } from '../../search/refund-search.service';
import { PaymentSearchService } from '../../search/payment-search.service';

@Injectable()
export class PaymentDetailsService {
    constructor(
        private refundSearchService: RefundSearchService,
        private paymentSearchService: PaymentSearchService,
        private invoicesService: InvoicesService,
        private route: ActivatedRoute
    ) {}

    getPayment(): Observable<PaymentSearchResult> {
        return this.route.params.pipe(
            switchMap(params => {
                const invoiceID = params['invoiceID'];
                const paymentID = params['paymentID'];

                return this.paymentSearchService.getPayment(invoiceID, paymentID);
            })
        );
    }
}
