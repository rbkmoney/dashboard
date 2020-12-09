import { Observable, of, Subject } from 'rxjs';

import { PayoutTool } from '@dsh/api-codegen/capi/swagger-codegen';

export class MockShopPayoutToolDetailsService {
    shopPayoutTool$: Observable<PayoutTool>;
    errorOccurred$: Observable<boolean>;

    private payoutTool$ = new Subject<PayoutTool>();

    constructor() {
        this.shopPayoutTool$ = this.payoutTool$.asObservable();
        this.errorOccurred$ = of(false);
    }

    getPayoutTool(): void {
        // do nothing
    }
}
