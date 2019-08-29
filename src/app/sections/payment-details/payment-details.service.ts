import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PaymentSearchResult } from '../../api-codegen/capi/swagger-codegen';
import { PaymentSearchService } from '../../search';

@Injectable()
export class PaymentDetailsService {
    constructor(private paymentSearchService: PaymentSearchService, private route: ActivatedRoute) {}

    getPayment(): Observable<PaymentSearchResult> {
        return this.route.params.pipe(
            switchMap(({ invoiceID, paymentID }) =>
                this.paymentSearchService.getPaymentByDuration({ amount: 1, unit: 'y' }, invoiceID, paymentID)
            )
        );
    }
}
