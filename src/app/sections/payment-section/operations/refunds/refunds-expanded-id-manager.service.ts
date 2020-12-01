import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { RefundSearchResult } from '../../../../api-codegen/capi';
import { FetchRefundsService } from './services/fetch-refunds/fetch-refunds.service';

@Injectable()
export class RefundsExpandedIdManager extends ExpandedIdManager<RefundSearchResult> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchRefundsService: FetchRefundsService
    ) {
        super(route, router);
    }

    protected toFragment(r: RefundSearchResult): Fragment {
        return `${r.invoiceID}${r.paymentID}${r.id}`;
    }

    protected get dataSet$(): Observable<RefundSearchResult[]> {
        return this.fetchRefundsService.searchResult$;
    }
}
