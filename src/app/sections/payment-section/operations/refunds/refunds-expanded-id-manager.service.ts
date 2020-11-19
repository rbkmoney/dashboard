import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { RefundSearchResult } from '../../../../api-codegen/capi';
import { FetchRefundsService } from './fetch-refunds.service';

const refundToFragment = (refund: RefundSearchResult): string => `${refund.invoiceID}-${refund.paymentID}-${refund.id}`;
const byFragment = (fragment: string) => (refund: RefundSearchResult) => refundToFragment(refund) === fragment;

@Injectable()
export class RefundsExpandedIdManager extends ExpandedIdManager<RefundSearchResult> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchRefundsService: FetchRefundsService
    ) {
        super(route, router);
    }

    dataIdToFragment(refund: RefundSearchResult): string {
        return !!refund ? refundToFragment(refund) : '';
    }

    findExpandedId(fragment: string) {
        return (d: RefundSearchResult[]) => d.findIndex(byFragment(fragment));
    }

    protected get dataSet$(): Observable<RefundSearchResult[]> {
        return this.fetchRefundsService.searchResult$;
    }
}
