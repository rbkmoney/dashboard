import { Observable, of, Subject } from 'rxjs';

import { Contract } from '@dsh/api-codegen/capi/swagger-codegen';

export class MockShopContractDetailsService {
    shopContract$: Observable<Contract>;
    errorOccurred$: Observable<boolean>;

    private contract$ = new Subject<Contract>();

    constructor() {
        this.shopContract$ = this.contract$.asObservable();
        this.errorOccurred$ = of(false);
    }

    getContract(): void {
        // do nothing
    }
}
