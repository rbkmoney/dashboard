import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';

import { WithdrawalsService as ApiWithdrawalsService } from '@dsh/api-codegen/wallet-api/swagger-codegen';

import { toDateLike } from '../utils';
import { WithdrawalsSearchParams } from './withdrawals-search-params';

@Injectable()
export class WithdrawalsService {
    constructor(private withdrawalsService: ApiWithdrawalsService, private idGenerator: IdGeneratorService) {}

    listWithdrawals(params: WithdrawalsSearchParams, limit = 20, continuationToken?: string) {
        return this.withdrawalsService.listWithdrawals(
            this.idGenerator.shortUuid(),
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
}
