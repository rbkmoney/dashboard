import { Injectable } from '@angular/core';

import { WithdrawalsService as ApiWithdrawalsService } from '../../api-codegen/wallet-api/swagger-codegen';
import { genXRequestID, toDateLike } from '../utils';
import { WithdrawalsSearchParams } from './withdrawals-search-params';

@Injectable()
export class WithdrawalsService {
    listWithdrawals(params: WithdrawalsSearchParams, limit = 20, continuationToken?: string) {
        return this.withdrawalsService.listWithdrawals(
            genXRequestID(),
            limit,
            undefined,
            params.walletID,
            params.identityID,
            params.withdrawalID,
            params.destinationID,
            params.status,
            toDateLike(params.fromTime),
            toDateLike(params.toTime),
            params.amountFrom,
            params.amountTo,
            params.currencyID,
            continuationToken
        );
    }

    getWithdrawal() {
        return this.withdrawalsService.getWithdrawal(genXRequestID(), '38019');
    }

    constructor(private withdrawalsService: ApiWithdrawalsService) {}
}