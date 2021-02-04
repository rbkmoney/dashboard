import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { getPaymentId } from '../../utils/get-payment-id';
import { PaymentsService } from '../payments/payments.service';

// TODO: implement ux solve for pagination list to display elements from not the first page(like 3 dots between our details element and main list data)
// load everything until it's found is a bad decision
@Injectable()
export class PaymentsExpandedIdManager extends ExpandedIdManager<PaymentSearchResult> {
    constructor(protected route: ActivatedRoute, protected router: Router, private paymentsService: PaymentsService) {
        super(route, router);
    }

    protected toFragment(payment: PaymentSearchResult): Fragment {
        return getPaymentId(payment);
    }

    protected fragmentNotFound(): void {
        this.paymentsService.loadMore();
    }

    protected get dataSet$(): Observable<PaymentSearchResult[]> {
        return this.paymentsService.paymentsList$;
    }
}
