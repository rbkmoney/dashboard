import { Injectable } from '@angular/core';

import { DepositsService as ApiDepositsService } from '@dsh/api-codegen/wallet-api/swagger-codegen';

import { genXRequestID, toDateLike } from '../utils';
import { DepositsSearchParams } from './deposits-search-params';

@Injectable()
export class DepositsService {
    constructor(private depositsService: ApiDepositsService) {}

    listDeposits(params: DepositsSearchParams, limit = 20, continuationToken?: string) {
        return this.depositsService.listDeposits(
            genXRequestID(),
            limit,
            undefined,
            params.walletID,
            params.identityID,
            params.depositID,
            params.sourceID,
            params.status,
            params.fromTime ? toDateLike(params.fromTime) : undefined,
            params.toTime ? toDateLike(params.toTime) : undefined,
            params.amountFrom,
            params.amountTo,
            params.currencyID,
            continuationToken
        );
    }

    listDepositReverts(params: DepositsSearchParams, limit = 20, continuationToken?: string) {
        return this.depositsService.listDepositReverts(
            genXRequestID(),
            limit,
            undefined,
            params.walletID,
            params.identityID,
            params.depositID,
            params.sourceID,
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
