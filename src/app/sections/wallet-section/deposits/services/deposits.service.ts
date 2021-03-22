import { Inject, Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { DepositsSearchParams } from '@dsh/api';
import { Deposit } from '@dsh/api-codegen/wallet-api';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { ErrorService } from '@dsh/app/shared';
import { FetchedDataAggregator } from '@dsh/app/shared/services/list/fetched-data-aggregator';

import { DEPOSITS_UPDATE_DELAY_TOKEN } from '../consts';
import { DepositsCachingService } from './deposits-caching.service';
import { FetchDepositsService } from './fetch-deposits.service';

@UntilDestroy()
@Injectable()
export class DepositsService extends FetchedDataAggregator<DepositsSearchParams, Deposit> {
    constructor(
        fetchDepositsService: FetchDepositsService,
        cacheService: DepositsCachingService,
        errorsService: ErrorService,
        @Inject(SEARCH_LIMIT)
        searchLimit: number,
        @Inject(DEPOSITS_UPDATE_DELAY_TOKEN)
        updateDelay: number
    ) {
        super(errorsService, fetchDepositsService, searchLimit, updateDelay, cacheService);
    }
}
