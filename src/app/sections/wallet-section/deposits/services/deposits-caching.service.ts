import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { Deposit } from '@dsh/api-codegen/wallet-api';
import { DataCachingService } from '@dsh/app/shared/services/list/data-caching.service';

@UntilDestroy()
@Injectable()
export class DepositsCachingService extends DataCachingService<Deposit> {
    constructor() {
        super();
    }
}
