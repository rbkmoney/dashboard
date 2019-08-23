import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ShopService } from '../../../../shop/shop.service';
import { booleanDelay } from '../../../../custom-operators/boolean-delay';

@Injectable()
export class PaymentsService {
    hasTestEnvironment$ = this.shopService.testShops$.pipe(map(({ length }) => length > 0));
    isLoading$ = this.hasTestEnvironment$.pipe(booleanDelay());

    constructor(private shopService: ShopService) {}
}
