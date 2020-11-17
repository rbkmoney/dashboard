import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayoutToolParams } from './payout-tool-params';
import { ShopPayoutToolDetailsService } from './shop-payout-tool-details.service';

@Component({
    selector: 'dsh-shop-payout-tool-details',
    templateUrl: 'shop-payout-tool-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopPayoutToolDetailsService],
})
export class ShopPayoutToolDetailsComponent {
    @Input()
    set payoutToolParams(p: PayoutToolParams) {
        this.shopPayoutToolDetailsService.getPayoutTool(p);
    }

    payoutTool$ = this.shopPayoutToolDetailsService.shopPayoutTool$;
    errorOccurred$ = this.shopPayoutToolDetailsService.errorOccurred$;

    constructor(private shopPayoutToolDetailsService: ShopPayoutToolDetailsService) {}
}
