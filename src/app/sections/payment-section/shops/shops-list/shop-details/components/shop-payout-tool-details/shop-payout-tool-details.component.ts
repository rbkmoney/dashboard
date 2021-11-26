import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ShopPayoutToolDetailsService } from '../../../../services/shop-payout-tool-details/shop-payout-tool-details.service';
import { PayoutToolParams } from '../../types/payout-tool-params';

@Component({
    selector: 'dsh-shop-payout-tool-details',
    templateUrl: 'shop-payout-tool-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ShopPayoutToolDetailsService],
})
export class ShopPayoutToolDetailsComponent {
    @Input()
    set payoutToolParams(p: PayoutToolParams) {
        this.shopPayoutToolDetailsService.requestPayoutTool(p);
    }

    payoutTool$ = this.shopPayoutToolDetailsService.shopPayoutTool$;
    errorOccurred$ = this.shopPayoutToolDetailsService.errorOccurred$;

    constructor(private shopPayoutToolDetailsService: ShopPayoutToolDetailsService) {}
}
