import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PaymentSearchService } from '../../api';

@Injectable()
export class RouteParamPaymentService {
    payment$ = this.route.params.pipe(
        switchMap(({ invoiceID, paymentID }) =>
            this.paymentSearchService.getPaymentByDuration({ amount: 3, unit: 'y' }, invoiceID, paymentID)
        )
    );

    constructor(private route: ActivatedRoute, private paymentSearchService: PaymentSearchService) {}
}
