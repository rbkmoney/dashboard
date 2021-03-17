import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { ListCachingService } from '@dsh/app/shared/services/list-caching/list-caching.service';

@UntilDestroy()
@Injectable()
export class PaymentsCachingService extends ListCachingService<PaymentSearchResult> {
    constructor() {
        super();
    }
}
