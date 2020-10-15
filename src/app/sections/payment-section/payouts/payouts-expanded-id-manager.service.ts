import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ExpandedIdManager } from '@dsh/app/shared/services';

import { Payout } from '../../../api-codegen/anapi';
import { FetchPayoutsService } from './fetch-payouts.service';

@Injectable()
export class PayoutsExpandedIdManager extends ExpandedIdManager<Payout> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchPayoutsService: FetchPayoutsService
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Payout[]> {
        return this.fetchPayoutsService.searchResult$;
    }
}
