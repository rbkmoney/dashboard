import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { Deposit } from '../../../api-codegen/wallet-api/swagger-codegen';
import { DepositsSearchParams, DepositsService as ApiDepositsService } from '../../../api/deposits';
import { FetchResult, PartialFetcher } from '../../partial-fetcher';

@Injectable()
export class DepositsService extends PartialFetcher<Deposit, DepositsSearchParams> {
    private searchLimit = 3;

    constructor(private route: ActivatedRoute, private depositsService: ApiDepositsService) {
        super();
    }

    protected fetch(params: DepositsSearchParams, continuationToken: string): Observable<FetchResult<Deposit>> {
        return this.route.params.pipe(
            pluck('walletID'),
            switchMap((walletID) =>
                this.depositsService.listDeposits({ ...params, walletID }, this.searchLimit, continuationToken)
            )
        );
    }
}
