import { getTestScheduler } from 'jasmine-marbles';
import { Observable, of, scheduled } from 'rxjs';

import { Shop as ApiShop } from '@dsh/api-codegen/capi/swagger-codegen';

export class MockFetchShops {
    allShops$: Observable<ApiShop[]>;

    constructor(shops: ApiShop[]) {
        this.allShops$ = scheduled(of(shops), getTestScheduler());
    }
}
