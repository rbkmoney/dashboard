import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

import { PaymentSearchService } from '../../api';
import { PaymentSearchResult } from '../../api-codegen/capi/swagger-codegen';

@Injectable()
export class RouteParamPaymentService {
    private receivePayment$ = new Subject();
    private currentPayment: PaymentSearchResult;

    payment$ = timer(0, 500).pipe(
        switchMap(() => this.route.params),
        switchMap(({ invoiceID, paymentID }) =>
            this.paymentSearchService.getPaymentByDuration({ amount: 3, unit: 'y' }, invoiceID, paymentID)
        ),
        take(10),
        filter(p => p?.status !== this.currentPayment?.status),
        tap(p => (this.currentPayment = p)),
        first()
    );

    constructor(private route: ActivatedRoute, private paymentSearchService: PaymentSearchService) {
        this.route.params.subscribe(() => this.receivePayment$.next());
    }
}
