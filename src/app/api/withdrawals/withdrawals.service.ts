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
            params.fromTime ? toDateLike(params.fromTime) : undefined,
            params.toTime ? toDateLike(params.toTime) : undefined,
            params.amountFrom,
            params.amountTo,
            params.currencyID,
            continuationToken
        );
    }

    constructor(private withdrawalsService: ApiWithdrawalsService) {}
}
