import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { RefundSearchResult } from '../../../../api-codegen/capi';
import { FetchRefundsService } from './fetch-refunds.service';

@Injectable()
export class RefundsExpandedIdManager extends ExpandedIdManager<RefundSearchResult> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchRefundsService: FetchRefundsService
    ) {
        super(route, router);
    }

    dataIdToFragment = (data: RefundSearchResult): string => (!!data?.id ? data.id + '' : '');

    byFragment = (fragment: string) => ({ id }: RefundSearchResult) => id + '' === fragment;

    findExpandedId = (fragment: string) => (d: RefundSearchResult[]) => d.findIndex(this.byFragment(fragment));

    protected get dataSet$(): Observable<RefundSearchResult[]> {
        return this.fetchRefundsService.searchResult$;
    }
}
