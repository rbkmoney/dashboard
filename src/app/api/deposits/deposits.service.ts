import { Injectable } from '@angular/core';

import { DepositsService as ApiDepositsService } from '../../api-codegen/wallet-api/swagger-codegen';
import { genXRequestID, toDateLike } from '../utils';
import { DepositsSearchParams } from './deposits-search-params';

@Injectable()
export class DepositsService {
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
            toDateLike(params.fromTime),
            toDateLike(params.toTime),
            params.amountFrom,
            params.amountTo,
            params.currencyID,
            continuationToken
        );
    }

    constructor(private depositsService: ApiDepositsService) {}
}