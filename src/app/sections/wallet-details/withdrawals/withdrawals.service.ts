import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { Withdrawal } from '@dsh/api-codegen/wallet-api/swagger-codegen';
import { WithdrawalsService as ApiWithdrawalsService } from '@dsh/api/withdrawals';

@Injectable()
export class WithdrawalsService extends PartialFetcher<Withdrawal, null> {
    private searchLimit = 3;

    constructor(private route: ActivatedRoute, private withdrawalsService: ApiWithdrawalsService) {
        super();
    }

    protected fetch(continuationToken: string): Observable<FetchResult<Withdrawal>> {
        return this.route.params.pipe(
            pluck('walletID'),
            switchMap((walletID) =>
                this.withdrawalsService.listWithdrawals({ walletID }, this.searchLimit, continuationToken)
            )
        );
    }
}
