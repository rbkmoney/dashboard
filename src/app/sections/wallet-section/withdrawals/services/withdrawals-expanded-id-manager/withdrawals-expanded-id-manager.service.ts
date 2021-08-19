import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Withdrawal } from '@dsh/api-codegen/wallet-api';
import { ExpandedIdManager } from '@dsh/app/shared/services';

import { FetchWithdrawalsService } from '../fetch-withdrawals/fetch-withdrawals.service';

@Injectable()
export class WithdrawalsExpandedIdManager extends ExpandedIdManager<Withdrawal> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchWithdrawalsService: FetchWithdrawalsService
    ) {
        super(route, router);
    }

    protected get dataSet$(): Observable<Withdrawal[]> {
        return this.fetchWithdrawalsService.searchResult$;
    }
}
