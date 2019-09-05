import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import isEmpty from 'lodash/isEmpty';
import negate from 'lodash/negate';

import { ShopService, filterTestShops } from '../../../../api/shop';
import { booleanDelay } from '../../../../custom-operators/boolean-delay';

@Injectable()
export class PaymentsService {
    hasTestEnvironment$ = this.shopService.shops$.pipe(
        filterTestShops,
        map(negate(isEmpty))
    );
    isLoading$ = this.hasTestEnvironment$.pipe(booleanDelay());

    constructor(private shopService: ShopService) {}
}
