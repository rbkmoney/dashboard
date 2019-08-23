import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

import { PaymentSearchResult } from '../../../../api/capi/swagger-codegen';
import { PaymentsService } from './payments.service';
import { PaymentSearchFormValue } from './search-form/payment-search-form-value';

@Component({
    selector: 'dsh-payments',
    templateUrl: 'payments.component.html',
    providers: [PaymentsService]
})
export class PaymentsComponent implements OnInit {
    lastUpdated: string = moment().format();

    payments$: Observable<PaymentSearchResult[]>;
    hasMorePayments$: Observable<boolean>;

    constructor(private paymentService: PaymentsService) {}

    ngOnInit() {
        this.payments$ = this.paymentService.payments().pipe(tap(_ => (this.lastUpdated = moment().format())));
        this.hasMorePayments$ = this.paymentService.hasMorePayments();
    }

    loadMore() {
        this.paymentService.loadMore();
    }

    search(searchFormValue?: PaymentSearchFormValue) {
        this.paymentService.loadPayments(searchFormValue);
    }

    refresh() {
        this.paymentService.loadPayments();
    }
}
