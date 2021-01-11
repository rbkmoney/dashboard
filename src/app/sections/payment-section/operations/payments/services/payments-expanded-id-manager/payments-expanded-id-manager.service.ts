import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { Payment } from '../../types/payment';
import { FetchPaymentsService } from '../fetch-payments/fetch-payments.service';

// TODO: implement ux solve for pagination list to display elements from not the first page(like 3 dots between our details element and main list data)
// load everything until it's found is a bad decision
@Injectable()
export class PaymentsExpandedIdManager extends ExpandedIdManager<Payment> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private paymentsService: FetchPaymentsService
    ) {
        super(route, router);
    }

    protected toFragment({ paymentID, invoiceID }: Payment): Fragment {
        return `${invoiceID}${paymentID}`;
    }

    protected fragmentNotFound(): void {
        this.paymentsService.fetchMore();
    }

    protected get dataSet$(): Observable<Payment[]> {
        return this.paymentsService.paymentsList$;
    }
}
