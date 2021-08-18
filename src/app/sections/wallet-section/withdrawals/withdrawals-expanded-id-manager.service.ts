import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Withdrawal } from '@dsh/api-codegen/wallet-api';
import { ExpandedIdManager, Fragment } from '@dsh/app/shared/services';

import { FetchWithdrawalsService } from './services/fetch-withdrawals/fetch-withdrawals.service';

@Injectable()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore:next-line
export class WithdrawalsExpandedIdManager extends ExpandedIdManager<Withdrawal> {
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private fetchWithdrawalsService: FetchWithdrawalsService
    ) {
        super(route, router);
    }

    protected toFragment(w: Withdrawal): Fragment {
        return w.id;
    }

    protected get dataSet$(): Observable<Withdrawal[]> {
        return this.fetchWithdrawalsService.searchResult$;
    }
}
