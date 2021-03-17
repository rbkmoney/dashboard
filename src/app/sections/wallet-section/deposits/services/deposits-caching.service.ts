import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { Deposit } from '@dsh/api-codegen/wallet-api';
import { ListCachingService } from '@dsh/app/shared/services/list-caching/list-caching.service';

@UntilDestroy()
@Injectable()
export class DepositsCachingService extends ListCachingService<Deposit> {
    constructor() {
        super();
    }
}
